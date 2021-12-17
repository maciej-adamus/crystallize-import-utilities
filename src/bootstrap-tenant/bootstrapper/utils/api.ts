import fetch from 'node-fetch'
import { v4 as uuid } from 'uuid'
import { LogLevel } from './types'

export interface IcallAPI {
  query: string
  variables?: any
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

export class ApiManager {
  queue: QueuedRequest[] = []
  url: string = ''
  maxWorkers: number = 5
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

  async work() {
    const currentWorkers = this.queue.filter((q) => q.working).length
    if (currentWorkers === this.maxWorkers) {
      return
    }

    const item = this.queue.find((q) => !q.working)
    if (!item) {
      return
    }

    item.working = true

    let json: IcallAPIResult | undefined

    // Always sleep for some time between requests
    await sleep(10)

    let errorString: string = ''

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

    try {
      if (this.logLevel === 'verbose') {
        console.log(JSON.stringify(item.props, null, 1))
      }
      const response = await fetch(this.url, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'X-Crystallize-Access-Token-Id': this.CRYSTALLIZE_ACCESS_TOKEN_ID,
          'X-Crystallize-Access-Token-Secret': this
            .CRYSTALLIZE_ACCESS_TOKEN_SECRET,
          'X-Crystallize-Static-Auth-Token': this.CRYSTALLIZE_STATIC_AUTH_TOKEN,
        },
        body: JSON.stringify(item.props),
      })

      json = await response.json()

      // When failing, try again
      if (!response.ok) {
        errorString = JSON.stringify(json, null, 1)
      }
    } catch (e) {
      errorString = JSON.stringify(e, null, 1)
    }

    // There are errors in the payload
    if (json?.errors) {
      errorString = JSON.stringify(
        {
          ...item.props,
          apiReponse: json.errors,
        },
        null,
        1
      )

      this.errorNotifier({
        error: errorString,
      })

      resolveWith({
        data: null,
        errors: [{ error: errorString }],
      })
    } else if (errorString) {
      item.failCount++

      await sleep(item.failCount * 1000)

      if (item.failCount > 5) {
        if (this.logLevel === 'verbose') {
          console.log(errorString)
        }

        /**
         * Reduce the amount of workers to lessen the
         * toll on the API
         */
        this.maxWorkers--
        if (this.maxWorkers < 1) {
          this.maxWorkers = 1
        }
      }

      // Stop if there are too many errors
      if (item.failCount > 10) {
        this.errorNotifier({ error: errorString })
        resolveWith({
          data: null,
          errors: [{ error: errorString }],
        })
      }
      item.working = false
    } else if (json) {
      resolveWith(json)
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
