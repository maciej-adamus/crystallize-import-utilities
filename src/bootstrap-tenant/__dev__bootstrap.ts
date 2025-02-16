import { config } from 'dotenv'
config()

import { readFile } from 'fs/promises'
import { resolve } from 'path'
// import Progress from 'cli-progress'

import { Bootstrapper, EVENT_NAMES, Status } from './bootstrapper'
import {
  JSONImages,
  JSONParagraphCollection,
  JSONProduct,
  JSONShapeComponentFilesConfig,
} from './json-spec'

async function bootstrap() {
  try {
    const tenantIdentifier = 'photofinder-clone'
    const jsonSpec = JSON.parse(
      await readFile(
        resolve(__dirname, '../../json-spec/photofinder.json'),
        'utf-8'
      )
    )

    if (
      !process.env.CRYSTALLIZE_ACCESS_TOKEN_ID ||
      !process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET
    ) {
      throw new Error(
        'CRYSTALLIZE_ACCESS_TOKEN_ID and CRYSTALLIZE_ACCESS_TOKEN_SECRET must be set'
      )
    }

    console.log(`✨ Bootstrapping ${tenantIdentifier} ✨`)

    const bootstrapper = new Bootstrapper()

    bootstrapper.setTenantIdentifier(tenantIdentifier)

    bootstrapper.setAccessToken(
      process.env.CRYSTALLIZE_ACCESS_TOKEN_ID,
      process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET
    )

    bootstrapper.setSpec(jsonSpec)

    // const ProgressBar = new Progress.MultiBar({
    //   clearOnComplete: false,
    //   hideCursor: false,
    //   autopadding: true,
    //   format: '{bar} | {percentage}% | {area} | ETA: {eta}s',
    // })

    // function createProgress(area: string) {
    //   return ProgressBar.create(1, 0, {
    //     area,
    //   })
    // }

    // const ProgressLanguages = createProgress('Languages')
    // const ProgressPriceVariants = createProgress('Price variants')
    // const ProgressVatTypes = createProgress('Vat types')
    // const ProgressShapes = createProgress('Shapes')
    // const ProgressTopics = createProgress('Topics')
    // const ProgressGrids = createProgress('Grids')
    // const ProgressItems = createProgress('Items')
    // const ProgressMedia = createProgress('Media uploads')

    // bootstrapper.on(EVENT_NAMES.STATUS_UPDATE, function (status: Status) {
    //   ProgressMedia.update(status.media.progress)
    //   ProgressLanguages.update(status.languages.progress)
    //   ProgressPriceVariants.update(status.priceVariants.progress)
    //   ProgressVatTypes.update(status.vatTypes.progress)
    //   ProgressShapes.update(status.shapes.progress)
    //   ProgressTopics.update(status.topicMaps.progress)
    //   ProgressGrids.update(status.grids.progress)
    //   ProgressItems.update(status.items.progress)
    // })

    // bootstrapper.on(EVENT_NAMES.SHAPES_DONE, ProgressShapes.stop)
    // bootstrapper.on(EVENT_NAMES.PRICE_VARIANTS_DONE, ProgressPriceVariants.stop)
    // bootstrapper.on(EVENT_NAMES.LANGUAGES_DONE, ProgressLanguages.stop)
    // bootstrapper.on(EVENT_NAMES.VAT_TYPES_DONE, ProgressVatTypes.stop)
    // bootstrapper.on(EVENT_NAMES.TOPICS_DONE, ProgressTopics.stop)
    // bootstrapper.on(EVENT_NAMES.ITEMS_DONE, ProgressItems.stop)
    // bootstrapper.on(EVENT_NAMES.GRIDS_DONE, ProgressGrids.stop)

    let itemProgress = -1
    bootstrapper.on(EVENT_NAMES.STATUS_UPDATE, (a) => {
      const i = a.items.progress
      if (i !== itemProgress) {
        itemProgress = i
        console.log(new Date(), itemProgress)
      }
    })

    bootstrapper.on(EVENT_NAMES.ERROR, ({ error }) => {
      console.log(error)
      process.exit(1)
    })

    // bootstrapper.config.itemTopics = 'amend'
    // bootstrapper.config.logLevel = 'verbose'
    // bootstrapper.config.multilingual = true

    bootstrapper.once(EVENT_NAMES.DONE, function ({ duration }) {
      // ProgressBar.stop()
      console.log(
        `✓ Done bootstrapping ${tenantIdentifier}. Duration: ${duration}`
      )
      process.exit(0)
    })

    bootstrapper.start()
  } catch (e) {
    console.log(e)
  }
}

bootstrap()
