import { DocumentNode } from 'graphql'
import { request } from 'graphql-request'
import { v4 as uuid } from 'uuid'
import { LogLevel } from './types'

export interface IcallAPI {
  query: DocumentNode | string
  variables?: any
  suppressErrors?: boolean
}

export interface IcallAPIResult {
  data: null | Record<string, any>
  errors?: Record<string, any>[]
}

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

interface QueuedRequest {
  id: string
  props: IcallAPI
  failCount: number
  resolve: (value: IcallAPIResult) => void
  working?: boolean
}

type errorNotifierFn = (args: { error: string }) => void

type RequestStatus = 'ok' | 'error'

export class ApiManager {
  queue: QueuedRequest[] = []
  url: string = ''
  maxWorkers: number = 1
  errorNotifier: errorNotifierFn
  logLevel: LogLevel = 'silent'
  CRYSTALLIZE_ACCESS_TOKEN_ID = ''
  CRYSTALLIZE_ACCESS_TOKEN_SECRET = ''
  CRYSTALLIZE_STATIC_AUTH_TOKEN = ''

  constructor(url: string) {
    this.url = url
    this.errorNotifier = () => null

    setInterval(() => this.work(), 5)
  }

  setErrorNotifier(fn: errorNotifierFn) {
    this.errorNotifier = fn
  }

  setLogLevel(level: LogLevel) {
    this.logLevel = level
  }

  push = (props: IcallAPI) => {
    return new Promise<IcallAPIResult>((resolve) => {
      this.queue.push({
        id: uuid(),
        resolve,
        props,
        failCount: 0,
      })
    })
  }

  /**
   * Adjust the maximum amount of workers up and down depending on
   * the amount of errors coming from the API
   */
  lastRequestsStatuses: RequestStatus[] = []
  recordRequestStatus = (status: RequestStatus) => {
    this.lastRequestsStatuses.unshift(status)

    const maxRequests = 20

    const errors = this.lastRequestsStatuses.filter(
      (r) => r === 'error'
    )?.length
    if (errors > 5) {
      this.maxWorkers--
      this.lastRequestsStatuses.length = 0
    } else if (errors === 0 && this.lastRequestsStatuses.length > maxRequests) {
      this.maxWorkers++
      this.lastRequestsStatuses.length = 0
    }

    const maxWorkers = 5
    if (this.maxWorkers < 1) {
      this.maxWorkers = 1
    } else if (this.maxWorkers > maxWorkers) {
      this.maxWorkers = maxWorkers
    }

    if (this.lastRequestsStatuses.length > maxRequests) {
      this.lastRequestsStatuses.length = maxRequests
    }
  }

  async work() {
    const currentWorkers = this.queue.filter((q) => q.working).length
    if (currentWorkers === this.maxWorkers) {
      return
    }
    // Get the first none-working item in the queue
    const item = this.queue.find((q) => !q.working)
    if (!item) {
      return
    }

    item.working = true

    let queryError: string = ''
    let otherError: string = ''
    let serverError: string = ''

    const resolveWith = (response: IcallAPIResult) => {
      if (item) {
        item.resolve(response)

        // Remove item from queue
        this.queue.splice(
          this.queue.findIndex((q) => q.id === item.id),
          1
        )
      }
    }

    let response: any
    try {
      if (this.logLevel === 'verbose') {
        console.log(JSON.stringify(item.props, null, 1))
      }
      response = await request(
        this.url,
        item.props.query,
        item.props.variables,
        {
          'X-Crystallize-Access-Token-Id': this.CRYSTALLIZE_ACCESS_TOKEN_ID,
          'X-Crystallize-Access-Token-Secret':
            this.CRYSTALLIZE_ACCESS_TOKEN_SECRET,
          'X-Crystallize-Static-Auth-Token': this.CRYSTALLIZE_STATIC_AUTH_TOKEN,
        }
      )
      if (this.logLevel === 'verbose') {
        console.log(JSON.stringify(response, null, 1))
      }
    } catch (e: any) {
      if (this.logLevel === 'verbose') {
        console.log(e)
      }

      // Network/system errors
      if (e?.type === 'system') {
        otherError = e.message || JSON.stringify(e, null, 1)

        if (!item.props.suppressErrors) {
          this.errorNotifier({
            error: otherError,
          })
        }
      } else {
        /**
         * The API might stumble and throw an internal error "reason: socket hang up".
         * Deal with this as "serverError" even though the request comes back with a
         * status 200
         */
        if (
          e.message.includes('reason: socket hang up') ||
          e.message.includes('ECONNRESET') ||
          e.message.includes('502 Bad Gateway')
        ) {
          serverError = e.message
        } else {
          queryError = e.message
        }
      }
    }

    /**
     * When server errors or other errors occur, we want to not discard the item
     * that is being worked on, but rather wait until the API is back up
     */
    if (otherError || serverError) {
      this.recordRequestStatus('error')

      const err = otherError || serverError

      item.failCount++

      await sleep(item.failCount * 1000)

      // Start reporting this as an error after a while
      if (item.failCount > 10 && !item.props.suppressErrors) {
        this.errorNotifier({
          error: err,
        })
      }

      item.working = false
    } else {
      this.recordRequestStatus('ok')

      // Report errors in usage of the API
      if (queryError) {
        if (!item.props.suppressErrors) {
          this.errorNotifier({
            error: queryError,
          })
        }
        resolveWith({ data: null, errors: [{ error: queryError }] })
      } else {
        resolveWith({ data: response })
      }
    }
  }
}

export function createAPICaller({
  uri,
  errorNotifier,
  logLevel,
}: {
  uri: string
  errorNotifier: errorNotifierFn
  logLevel?: LogLevel
}) {
  const manager = new ApiManager(uri)
  manager.errorNotifier = errorNotifier
  if (logLevel) {
    manager.logLevel = logLevel
  }

  return manager
}
