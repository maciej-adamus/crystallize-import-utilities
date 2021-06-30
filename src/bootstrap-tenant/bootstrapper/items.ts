import {
  BooleanComponentContentInput,
  Component,
  ComponentChoiceComponentContentInput,
  ComponentContentInput,
  ContentChunkComponentContentInput,
  CreateProductVariantInput,
  DateTimeComponentContentInput,
  GridRelationsComponentContentInput,
  ImageComponentContentInput,
  ImagesComponentContentInput,
  ItemRelationsComponentContentInput,
  ItemType,
  KeyValuePairInput,
  LocationComponentContentInput,
  NumericComponentContentInput,
  ParagraphCollectionComponentContentInput,
  PropertiesTableComponentContentInput,
  RichTextContentInput,
  SelectionComponentContentInput,
  Shape,
  SingleLineComponentContentInput,
  VideosComponentContentInput,
} from '../../types'
import { buildCreateItemMutation, buildUpdateItemMutation } from '../../graphql'

import {
  JSONItem,
  JSONParagraphCollection,
  JsonSpec,
  JSONRichText,
  JSONImages,
  JSONFolder,
  JSONProduct,
  JSONPropertiesTable,
  JSONNumeric,
  JSONLocation,
  JSONDateTime,
  JSONImage,
  JSONComponentContent,
  JSONComponentChoice,
  JSONContentChunk,
  JSONItemRelations,
  JSONItemRelation,
  JSONItemTopic,
  JSONSelection,
} from '../json-spec'
import {
  callCatalogue,
  callPIM,
  getItemIdFromCataloguePath,
  getTenantId,
  getTranslation,
  StepStatus,
  TenantContext,
  uploadFileFromUrl,
  validShapeIdentifier,
} from './utils'

export interface Props {
  spec: JsonSpec | null
  onUpdate(t: StepStatus): any
  context: TenantContext
}

async function getTenantRootItemId(): Promise<string> {
  const tenantId = getTenantId()
  const r = await callPIM({
    query: `
      query GET_TENANT_ROOT_ITEM_ID($tenantId: ID!) {
        tenant {
          get(id: $tenantId) {
            rootItemId
          }
        }
      }
    `,
    variables: {
      tenantId,
    },
  })

  return r.data?.tenant?.get?.rootItemId || ''
}

function publishItem(language: string, id: string) {
  if (!id) {
    console.log('cannot publish without id')
    return Promise.resolve()
  }

  return callPIM({
    query: `
      mutation PUBLISH_ITEM($id: ID!, $language: String!) {
        item {
          publish(id: $id, language: $language) {
            id
          }
        }
      }
    `,
    variables: {
      id,
      language,
    },
  })
}

function createRichTextInput(content: JSONRichText, language: string) {
  function stringToJson(str: string) {
    return [
      JSON.parse(
        JSON.stringify({
          kind: 'block',
          type: 'paragraph',
          textContent: str,
        })
      ),
    ]
  }

  const inp: RichTextContentInput = {}
  if (typeof content === 'string') {
    inp.json = stringToJson(content)
  } else if (typeof content === 'object') {
    /**
     * Determine if the rich text content is one of
     * {
     *  json: ...,
     *  html: ...,
     *  plainText: ...
     * }
     * or
     * {
     *  [lang]: {
     *    json: ...
     *    ...
     *  }
     * }
     *
     **/
    let c = content as any

    const keys = Object.keys(content || {})
    const isNotTranslated = keys.length > 0 && typeof c[keys[0]] !== 'string'
    const translatedContent = isNotTranslated ? c : getTranslation(c, language)

    if (typeof translatedContent === 'string') {
      inp.json = stringToJson(translatedContent)
    } else {
      if (translatedContent.json) {
        inp.json = translatedContent.json
      } else if (translatedContent.html) {
        inp.html = [translatedContent.html]
      } else if (translatedContent.plainText) {
        inp.json = stringToJson(translatedContent.plainText)
      }
    }
  }

  return inp
}

async function getTopicIds(
  topics: JSONItemTopic[],
  language: string
): Promise<string[]> {
  const ids: string[] = []

  await Promise.all(
    topics.map(async (topic) => {
      let searchTerm = ''

      if (typeof topic === 'string') {
        searchTerm = topic
      } else {
        searchTerm = topic.hierarchy
      }

      const result = await callPIM({
        query: `
          query GET_TOPIC($tenantId: ID!, $language: String!, $searchTerm: String!) {
            search {
              topics(tenantId: $tenantId, language: $language, searchTerm: $searchTerm) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
      `,
        variables: {
          tenantId: getTenantId(),
          language,
          searchTerm,
        },
      })

      const edges = result?.data?.search?.topics?.edges || []
      const edge = edges[edges.length - 1]
      if (edge) {
        ids.push(edge.node.id as string)
      }
    })
  )

  return ids
}

async function createImagesInput(
  images: JSONImages,
  language: string
): Promise<ImageComponentContentInput[]> {
  const imgs: ImageComponentContentInput[] = []

  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    let { key, mimeType } = image

    if (!key) {
      try {
        const uploadResult = await uploadFileFromUrl(image.src)
        key = uploadResult.key
        mimeType = uploadResult.mimeType

        // Store the values so that we don't re-upload again during import
        image.key = uploadResult.key
        image.mimeType = uploadResult.mimeType
      } catch (e) {
        console.log('Error: Could not upload image', image.src)
      }
    }

    if (key) {
      imgs.push({
        key,
        mimeType,
        altText: getTranslation(image.altText, language),
        ...(image.caption && {
          caption: createRichTextInput(image.caption, language),
        }),
      })
    }
  }

  return imgs
}

async function createComponentsInput(
  item: JSONItem,
  shape: Shape,
  language: string
) {
  if (!item.components) {
    return null
  }

  const input: Record<string, ComponentContentInput> = {}

  async function createComponentInput(
    componentDefinition: Component,
    component: JSONComponentContent
  ) {
    switch (componentDefinition.type) {
      case 'boolean': {
        const inp: BooleanComponentContentInput = {
          boolean: {
            value: component as boolean,
          },
        }
        return inp
      }
      case 'singleLine': {
        const inp: SingleLineComponentContentInput = {
          singleLine: {
            text: getTranslation(component, language),
          },
        }
        return inp
      }
      case 'numeric': {
        const n = component as JSONNumeric

        if (!n) {
          return {
            numeric: null,
          }
        }

        const inp: NumericComponentContentInput = {
          numeric: {
            number: n.number,
            unit: n.unit,
          },
        }
        return inp
      }
      case 'location': {
        const l = component as JSONLocation

        if (!l) {
          return {
            location: null,
          }
        }

        const inp: LocationComponentContentInput = {
          location: {
            lat: l.lat,
            long: l.long,
          },
        }
        return inp
      }
      case 'datetime': {
        const d = component as JSONDateTime

        if (!d) {
          return {
            datetime: null,
          }
        }

        const parsedDate = new Date(d)
        const inp: DateTimeComponentContentInput = {
          datetime: {
            datetime: parsedDate.toISOString(),
          },
        }

        return inp
      }
      case 'images': {
        const i = component as JSONImage[]

        const inp: ImagesComponentContentInput = {
          images: await createImagesInput(i, language),
        }

        return inp
      }
      case 'videos': {
        const inp: VideosComponentContentInput = {
          videos: [], // Not supported atm.
        }
        return inp
      }
      case 'richText': {
        const inp: RichTextContentInput = createRichTextInput(
          component as JSONRichText,
          language
        )

        if (Object.keys(inp).length > 0) {
          return {
            richText: inp,
          }
        }
        break
      }
      case 'selection': {
        const inp: SelectionComponentContentInput = {
          selection: {
            keys: [], // Todo
          },
        }
        const s = component as JSONSelection
        if (typeof s === 'string') {
          inp.selection.keys.push(s as string)
        } else if (Array.isArray(s)) {
          s.forEach((key: string) => inp.selection.keys.push(key))
        }
        return inp
      }
      case 'paragraphCollection': {
        const inp: ParagraphCollectionComponentContentInput = {
          paragraphCollection: {
            paragraphs: [],
          },
        }

        const paragraphs = component as JSONParagraphCollection[]
        for (let i = 0; i < paragraphs.length; i++) {
          const { title, body, images } = paragraphs[i]

          inp.paragraphCollection.paragraphs.push({
            title: {
              text: getTranslation(title, language),
            },
            ...(body && { body: createRichTextInput(body, language) }),
            ...(images && {
              images: await createImagesInput(images, language),
            }),
          })
        }

        if (Object.keys(inp).length > 0) {
          return inp
        }

        break
      }
      case 'propertiesTable': {
        const inp: PropertiesTableComponentContentInput = {
          propertiesTable: {
            sections: [],
          },
        }

        const sections = (component as JSONPropertiesTable) || []
        sections.forEach((section) => {
          const properties: KeyValuePairInput[] = []
          if (section.properties) {
            Object.keys(section.properties).forEach((key) => {
              properties.push({
                key,
                value: section.properties?.[key],
              } as KeyValuePairInput)
            })
          }

          inp.propertiesTable.sections?.push({
            title: section.title,
            properties,
          })
        })

        return inp
      }
      case 'componentChoice': {
        const choice = component as JSONComponentChoice

        const [selectedComponentId] = Object.keys(choice)

        if (!selectedComponentId) {
          return {
            componentChoice: null,
          }
        }

        const componentConfig = componentDefinition.config as any
        const selectedComponentDefinition = componentConfig.choices.find(
          (c: any) => c.id === selectedComponentId
        )

        const content = await createComponentInput(
          selectedComponentDefinition,
          choice[selectedComponentId]
        )

        const inp: ComponentChoiceComponentContentInput = {
          componentChoice: {
            componentId: selectedComponentId,
            ...content,
          },
        }
        return inp
      }
      case 'itemRelations': {
        const inp: ItemRelationsComponentContentInput = {
          itemRelations: {
            itemIds: [], // Will be populated later
          },
        }
        return inp
      }
      case 'gridRelations': {
        const inp: GridRelationsComponentContentInput = {
          gridRelations: {
            gridIds: [], // Not supported atm.
          },
        }
        return inp
      }
      case 'contentChunk': {
        const chunks = (component as JSONContentChunk) || []
        const inp: ContentChunkComponentContentInput = {
          contentChunk: {
            chunks: [],
          },
        }

        for (let i = 0; i < chunks.length; i++) {
          const newChunk: ComponentContentInput[] = []
          const chunk = chunks[i]
          const chunkKeys = Object.keys(chunk)
          for (let x = 0; x < chunkKeys.length; x++) {
            const componentId = chunkKeys[x]
            const selectedComponentDefinition = componentDefinition.config.components.find(
              (c: any) => c.id === componentId
            )

            if (selectedComponentDefinition) {
              const content: any = await createComponentInput(
                selectedComponentDefinition,
                chunk[componentId]
              )
              if (content) {
                newChunk.push({
                  componentId,
                  ...content,
                })
              }
            }
          }
          if (newChunk.length > 0) {
            inp.contentChunk.chunks.push(newChunk)
          }
        }

        return inp
      }
    }
  }

  const componentIds = Object.keys(item.components)
  for (let i = 0; i < componentIds.length; i++) {
    const componentId = componentIds[i]
    const componentDefinition = shape.components.find(
      (c) => c.id === componentId
    )
    if (componentDefinition && item.components) {
      if (componentId in item.components) {
        const component = item.components?.[componentId]
        if (component) {
          const content = await createComponentInput(
            componentDefinition,
            component
          )

          if (typeof content !== 'undefined') {
            input[componentId] = {
              componentId,
              ...content,
            }
          }
        }
      }
    }
  }

  return input
}

function getAllImageUrls(items: JSONItem[]): string[] {
  const allImageUrls: string[] = []
  function handleItem(item: any) {
    if (!item) {
      return
    }

    Object.values(item).forEach((value: any) => {
      if (!value) {
        return
      }

      if (typeof value === 'object') {
        // Check for image signature
        if ('src' in value && 'altText' in value) {
          allImageUrls.push(value.src)
        } else {
          Object.values(value).forEach(handleItem)
        }
      } else if (Array.isArray(value)) {
        value.forEach(handleItem)
      }
    })
  }

  items.forEach(handleItem)

  return allImageUrls
}

export async function setItems({
  spec,
  onUpdate,
  context,
}: Props): Promise<void> {
  if (!spec?.items) {
    return
  }

  const rootItemId = await getTenantRootItemId()

  /**
   * First off, let's start uploading all the images
   * in parallel with all the other PIM mutations
   */
  const allImageUrls = getAllImageUrls(spec.items)
  allImageUrls.forEach(uploadFileFromUrl)

  onUpdate({
    done: false,
    message: `Initiating upload of ${allImageUrls.length} image(s)`,
  })

  async function createOrUpdateItem(
    item: JSONItem,
    parentId: string
  ): Promise<string | null> {
    // Create the object to store the component data in
    item._componentsData = {}

    // Ensure shape identifier is not too long (max 24 characters)
    item.shape = validShapeIdentifier(item.shape)

    // Get the shape type
    const shape = context.shapes?.find((s) => s.identifier === item.shape)
    if (!shape) {
      console.log(JSON.stringify(context.shapes, null, 1))
      console.log('No shape found for item', item)
      return null
    }

    async function createForLanguage(language: string) {
      if (!shape) {
        return
      }

      // @ts-ignore
      item._componentsData[language] = await createComponentsInput(
        item,
        shape,
        language
      )
      item._topicsData = {}
      if (item.topics) {
        item._topicsData = {
          topicIds: await getTopicIds(
            item.topics || [],
            context.defaultLanguage.code
          ),
        }
      }

      return callPIM({
        query: buildCreateItemMutation(
          {
            name: getTranslation(item.name, language) || '',
            shapeIdentifier: item.shape,
            tenantId: getTenantId(),
            tree: {
              parentId,
            },
            ...item._topicsData,
            components: item._componentsData?.[language],
            ...(shape?.type === 'product' && {
              ...(await createProductItemMutation(language)),
            }),
          },
          // @ts-ignore
          shape?.type,
          language
        ),
      })
    }

    async function updateForLanguage(language: string, itemId: string) {
      if (!shape || !itemId) {
        console.log(
          'Cannot update',
          getTranslation(item.name, language),
          'for',
          language
        )
        return
      }

      // @ts-ignore
      item._componentsData[language] = await createComponentsInput(
        item,
        shape,
        language
      )

      return callPIM({
        query: buildUpdateItemMutation(
          itemId,
          {
            name: getTranslation(item.name, language) || '',
            ...item._topicsData,
            components: item._componentsData?.[language],
            ...(shape?.type === 'product' && {
              ...(await createProductItemMutation(language)),
            }),
          },
          shape.type as ItemType,
          language
        ),
      })
    }

    async function createProductItemMutation(language: string) {
      const product = item as JSONProduct

      const vatType = context.vatTypes?.find((v) => v.name === product.vatType)
      if (!vatType) {
        throw new Error(
          `Cannot create product "${product.name}". Vat type "${product.vatType}" does not exist`
        )
      }

      const variants: CreateProductVariantInput[] = []
      const inp = {
        vatTypeId: vatType.id || '',
        variants,
      }

      for (let i = 0; i < product.variants.length; i++) {
        const jsonVariant = product.variants[i]

        let priceVariants
        let price
        if (jsonVariant.price && typeof jsonVariant.price === 'object') {
          const p = jsonVariant.price as Record<string, number>
          priceVariants = Object.keys(jsonVariant.price).map((identifier) => ({
            identifier,
            price: p[identifier],
          }))
        } else {
          price = jsonVariant.price
        }

        let attributes
        if (jsonVariant.attributes) {
          attributes = Object.keys(jsonVariant.attributes).map((attribute) => ({
            attribute,
            value: jsonVariant.attributes?.[attribute],
          }))
        }

        inp.variants.push({
          name: getTranslation(jsonVariant.name, language),
          sku: jsonVariant.sku,
          isDefault: jsonVariant.isDefault || false,
          stock: jsonVariant.stock,
          ...(priceVariants
            ? { priceVariants }
            : {
                price: price ?? 0,
              }),
          ...(jsonVariant.images && {
            images: await createImagesInput(jsonVariant.images, language),
          }),
          ...(attributes && { attributes }),
        })
      }

      return inp
    }

    let itemId = item.id

    if (itemId) {
      await updateForLanguage(context.defaultLanguage.code, itemId)
    } else {
      const response = await createForLanguage(context.defaultLanguage.code)
      itemId = response?.data?.[shape?.type]?.create?.id
    }

    if (!itemId) {
      throw new Error('Could not create or update item')
    }

    await publishItem(context.defaultLanguage.code, itemId)

    // Create for remaining languages
    const remainingLanguages = context.languages
      .filter((l) => !l.isDefault)
      .map((l) => l.code)

    for (let i = 0; i < remainingLanguages.length; i++) {
      await updateForLanguage(remainingLanguages[i], itemId)
      await publishItem(remainingLanguages[i], itemId)
    }

    return itemId
  }

  async function handleItem(item: JSONItem, parentId?: string) {
    if (item.cataloguePath) {
      item.id = await getItemIdFromCataloguePath(
        item.cataloguePath,
        context.defaultLanguage.code
      )
    }

    if (!item.id) {
      item.id = (await createOrUpdateItem(
        item,
        parentId || rootItemId
      )) as string
      onUpdate({
        done: false,
        message: `Created ${getTranslation(
          item.name,
          context.defaultLanguage.code
        )}`,
      })
    } else {
      await createOrUpdateItem(item, parentId || rootItemId)
      onUpdate({
        done: false,
        message: `Updated ${getTranslation(
          item.name,
          context.defaultLanguage.code
        )}`,
      })
    }

    if (item.id && 'children' in item) {
      const itm = item as JSONFolder

      if (itm.children) {
        await Promise.all(
          itm.children.map((child) => handleItem(child, itm.id))
        )
        // for (let i = 0; i < itm.children.length; i++) {
        //   await handleItem(itm.children[i], itm.id)
        // }
      }
    }
  }

  async function handleItemRelations(item: JSONItem) {
    async function getItemIdsForItemRelation(
      itemRelations?: JSONItemRelation[]
    ): Promise<string[]> {
      const ids: string[] = []

      if (!itemRelations) {
        return ids
      }

      await Promise.all(
        itemRelations.map(async (itemRelation) => {
          if (typeof itemRelation === 'object') {
            if ('cataloguePath' in itemRelation) {
              const response = await callCatalogue({
                query: `
                query GET_ID_FOR_PATH ($path: String!, $language: String!) {
                  catalogue(path: $path, language: $language) {
                    id
                  }
                }
              `,
                variables: {
                  path: itemRelation.cataloguePath,
                  language: context.defaultLanguage.code,
                },
              })
              const id = response?.data?.catalogue?.id || ''
              if (id) {
                ids.push(id)
              }
            }
          }
        })
      )

      return ids
    }

    onUpdate({
      done: false,
      message: `Item relations: ${getTranslation(
        item.name,
        context.defaultLanguage.code
      )}`,
    })

    if (item.components) {
      await Promise.all(
        Object.keys(item.components).map(async (componentId) => {
          const jsonItem = item.components?.[
            componentId
          ] as JSONComponentContent
          if (jsonItem) {
            const shape = context.shapes?.find(
              (s) => s.identifier === item.shape
            )
            const def = shape?.components.find((c) => c.id === componentId)

            let mutationInput = null

            switch (def?.type) {
              case 'itemRelations': {
                mutationInput = {
                  componentId,
                  itemRelations: {
                    itemIds: await getItemIdsForItemRelation(
                      jsonItem as JSONItemRelations
                    ),
                  },
                }
                break
              }
              case 'componentChoice':
              case 'contentChunk': {
                const itemRelationIds = (
                  def.config.choices || def.config.components
                )
                  .filter((s: any) => s.type === 'itemRelations')
                  .map((s: any) => s.id)

                // Get existing data for component
                if (itemRelationIds.length > 0) {
                  const existingComponentsData =
                    item._componentsData?.[context.defaultLanguage.code]
                  const componentData = existingComponentsData[componentId]

                  if (componentData) {
                    if (def.type === 'componentChoice') {
                      const selecteDef = def.config.choices.find(
                        (c: any) =>
                          c.id === componentData.componentChoice.componentId
                      )
                      if (selecteDef.type === 'itemRelations') {
                        mutationInput = {
                          componentId,
                          componentChoice: {
                            componentId:
                              componentData.componentChoice.componentId,
                            itemRelations: {
                              itemIds: await getItemIdsForItemRelation(
                                jsonItem as JSONItemRelations
                              ),
                            },
                          },
                        }
                      }
                    } else if (def.type === 'contentChunk') {
                      mutationInput = {
                        componentId,
                        ...componentData,
                      }
                      await Promise.all(
                        mutationInput.contentChunk.chunks.map(
                          async (chunk: any, chunkIndex: number) => {
                            const jsonChunk = (jsonItem as JSONContentChunk)[
                              chunkIndex
                            ]

                            // Update all potential itemRelation components
                            await Promise.all(
                              itemRelationIds.map(
                                async (itemRelationId: string) => {
                                  const itemRelationComponentIndex = chunk.findIndex(
                                    (c: any) => c.componentId === itemRelationId
                                  )

                                  if (itemRelationComponentIndex !== -1) {
                                    chunk[
                                      itemRelationComponentIndex
                                    ].itemRelations.itemIds = await getItemIdsForItemRelation(
                                      jsonChunk[
                                        itemRelationId
                                      ] as JSONItemRelation[]
                                    )
                                  }
                                }
                              )
                            )
                          }
                        )
                      )
                    }
                  }
                }
                break
              }
            }

            // Update the component
            if (mutationInput) {
              const r = await callPIM({
                query: `
                  mutation UPDATE_RELATIONS_COMPONENT($itemId: ID!, $language: String!, $input: ComponentInput!) {
                    item {
                      updateComponent(
                        itemId: $itemId
                        language: $language
                        input: $input
                      ) {
                        id
                      }
                    }
                  }
                `,
                variables: {
                  itemId: item.id,
                  language: context.defaultLanguage.code,
                  input: mutationInput,
                },
              })
            }
          }
        })
      )

      await publishItem(context.defaultLanguage.code, item.id as string)
    }

    if ('children' in item) {
      const itm = item as JSONFolder

      if (itm.children) {
        for (let i = 0; i < itm.children.length; i++) {
          await handleItemRelations(itm.children[i])
        }
      }
    }
  }

  for (let i = 0; i < spec.items.length; i++) {
    await handleItem(spec.items[i], rootItemId)
  }

  /**
   * Item relations needs to be handled at the end, after all
   * items are created
   */
  onUpdate({
    done: false,
    message: 'Updating item relations...',
  })
  for (let i = 0; i < spec.items.length; i++) {
    await handleItemRelations(spec.items[i])
  }
}
