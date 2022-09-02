"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCatalogueItems = void 0;
const _1 = require(".");
const multilingual_1 = require("./multilingual");
function handlePriceVariants(priceVariants) {
    if (!priceVariants) {
        return {};
    }
    const p = {};
    priceVariants.forEach((pV) => {
        p[pV.identifier] = pV.price;
    });
    return p;
}
function handleSubscriptionPlan(plan) {
    function handleTier(tier) {
        return {
            threshold: tier.threshold,
            price: handlePriceVariants(tier.priceVariants),
        };
    }
    function handlePricing(pricing) {
        return {
            period: pricing.period,
            unit: pricing.unit,
            price: handlePriceVariants(pricing.priceVariants),
            meteredVariables: pricing.meteredVariables.map((m) => {
                var _a;
                return ({
                    id: m.id,
                    identifier: m.identifier,
                    name: m.name,
                    tierType: m.tierType,
                    tiers: (_a = m.tiers) === null || _a === void 0 ? void 0 : _a.map(handleTier),
                });
            }),
        };
    }
    function handlePeriod(period) {
        return {
            id: period.id,
            name: period.name,
            initial: period.initial ? handlePricing(period.initial) : undefined,
            recurring: handlePricing(period.recurring),
        };
    }
    return {
        identifier: plan.identifier,
        name: plan.name,
        periods: plan.periods.map(handlePeriod),
    };
}
function handlePropertiesTableSection(section) {
    const properties = {};
    section === null || section === void 0 ? void 0 : section.properties.forEach(({ key, value }) => (properties[key] = value));
    return {
        title: section === null || section === void 0 ? void 0 : section.title,
        properties,
    };
}
function getItemById(items, id) {
    let found = null;
    function search(item) {
        var _a;
        if (!found) {
            if (item.id === id) {
                found = item;
            }
            else {
                ;
                (_a = item.children) === null || _a === void 0 ? void 0 : _a.forEach(search);
            }
        }
    }
    items.forEach(search);
    return found;
}
async function getAllCatalogueItems(lng, context, options) {
    const version = (options === null || options === void 0 ? void 0 : options.version) || 'draft';
    const languages = context.config.multilingual
        ? context.languages.map((l) => l.code)
        : [lng];
    async function handleLanguage(language) {
        var _a, _b;
        const allCatalogueItemsForLanguage = [];
        const tr = (0, multilingual_1.trFactory)(language);
        async function getItem(path) {
            var _a;
            /**
             * "/" represents the catalogue root and is not retrieved here.
             * If an item path is "/", then it is most likely not published
             * to the catalogue
             */
            if (path === '/') {
                return null;
            }
            const itemResponse = await context.callCatalogue({
                query: GET_ITEM_QUERY,
                variables: {
                    language,
                    version,
                    path,
                },
            });
            const rawData = (_a = itemResponse.data) === null || _a === void 0 ? void 0 : _a.catalogue;
            if (!rawData) {
                return null;
            }
            return handleItem(rawData);
        }
        async function handleItem(item) {
            const jsonItem = {
                id: item.id,
                name: tr(item.name, `${item.id}.name`),
                cataloguePath: item.cataloguePath,
                externalReference: item.externalReference,
                shape: item.shape.identifier,
                components: handleComponents(item.components),
                topics: item.topics,
            };
            // Product specifics
            if (item.vatType) {
                const jsonProduct = jsonItem;
                jsonProduct.vatType = item.vatType.name;
                jsonProduct.variants = item.variants.map((v) => {
                    var _a, _b, _c;
                    const attributes = {};
                    (_a = v.attributes) === null || _a === void 0 ? void 0 : _a.forEach(({ attribute, value }) => (attributes[attribute] = value));
                    const variant = {
                        name: tr(v.name, `${v.sku}.name`),
                        sku: v.sku,
                        price: handlePriceVariants(v.priceVariants),
                        isDefault: v.isDefault,
                        attributes,
                        externalReference: v.externalReference,
                        stock: v.stock,
                        images: (_b = v.images) === null || _b === void 0 ? void 0 : _b.map((i, index) => handleImage(i, `${v.sku}.images.${index}`)),
                        subscriptionPlans: (_c = v.subscriptionPlans) === null || _c === void 0 ? void 0 : _c.map(handleSubscriptionPlan),
                    };
                    return variant;
                });
            }
            else {
                const itemWithChildren = jsonItem;
                const children = await getChildren();
                if (children.length > 0) {
                    itemWithChildren.children = children;
                }
            }
            async function getChildren() {
                const children = [];
                let after = undefined;
                async function crawlChildren() {
                    var _a, _b, _c, _d, _e;
                    const pageSize = 1000;
                    const pageResponse = await context.callCatalogue({
                        query: GET_ITEM_CHILDREN_PAGE,
                        variables: {
                            language,
                            version,
                            path: item.cataloguePath,
                            after,
                            pageSize,
                        },
                    });
                    const page = (_b = (_a = pageResponse.data) === null || _a === void 0 ? void 0 : _a.catalogue) === null || _b === void 0 ? void 0 : _b.subtree;
                    if ((_c = page.edges) === null || _c === void 0 ? void 0 : _c.length) {
                        const paths = page.edges.map((e) => e.node.path);
                        for (let i = 0; i < paths.length; i++) {
                            const item = await getItem(paths[i]);
                            if (item) {
                                children.push(item);
                            }
                        }
                        if (((_d = page.pageInfo) === null || _d === void 0 ? void 0 : _d.hasNextPage) && ((_e = page.edges) === null || _e === void 0 ? void 0 : _e.length) === pageSize) {
                            after = page.pageInfo.endCursor;
                            await crawlChildren();
                        }
                    }
                }
                await crawlChildren();
                return children;
            }
            function handleImage(image, id) {
                return {
                    src: image.url,
                    altText: tr(image.altText, `${id}.altText`),
                    caption: tr(image.caption, `${id}.caption`),
                };
            }
            function handleVideo(video, id) {
                var _a;
                return {
                    src: video.playlist,
                    title: tr(video.title, `${id}.title`),
                    thumbnails: (_a = video.thumbnails) === null || _a === void 0 ? void 0 : _a.map((i, index) => handleImage(i, `${id}.thumbnails.${index}`)),
                };
            }
            function handleFile(file, id) {
                return {
                    src: file.url,
                    title: tr(file.title, `${id}.title`),
                };
            }
            function handleParagraph(paragraph, id) {
                var _a, _b, _c;
                return {
                    title: tr((_a = paragraph === null || paragraph === void 0 ? void 0 : paragraph.title) === null || _a === void 0 ? void 0 : _a.text, `${id}.title`),
                    body: tr(paragraph === null || paragraph === void 0 ? void 0 : paragraph.body, `${id}.body`),
                    images: (_b = paragraph === null || paragraph === void 0 ? void 0 : paragraph.images) === null || _b === void 0 ? void 0 : _b.map((i, index) => handleImage(i, `${id}.images.${index}`)),
                    videos: (_c = paragraph === null || paragraph === void 0 ? void 0 : paragraph.videos) === null || _c === void 0 ? void 0 : _c.map((v, index) => handleVideo(v, `${id}.videos.${index}`)),
                };
            }
            function handleComponents(cmps) {
                const components = {};
                function getComponentContent(c, id) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
                    if (!c) {
                        return null;
                    }
                    switch (c.type) {
                        case 'singleLine': {
                            return tr((_a = c.content) === null || _a === void 0 ? void 0 : _a.text, id);
                        }
                        case 'richText': {
                            return tr(c.content, id);
                        }
                        case 'itemRelations': {
                            return (_b = c.content) === null || _b === void 0 ? void 0 : _b.items;
                        }
                        case 'gridRelations': {
                            return (_c = c.content) === null || _c === void 0 ? void 0 : _c.grids;
                        }
                        case 'boolean': {
                            return (_d = c.content) === null || _d === void 0 ? void 0 : _d.value;
                        }
                        case 'images': {
                            return (_f = (_e = c.content) === null || _e === void 0 ? void 0 : _e.images) === null || _f === void 0 ? void 0 : _f.map((i, index) => handleImage(i, `${id}.${index}`));
                        }
                        case 'videos': {
                            return (_h = (_g = c.content) === null || _g === void 0 ? void 0 : _g.videos) === null || _h === void 0 ? void 0 : _h.map((v, index) => handleVideo(v, `${id}.${index}`));
                        }
                        case 'files': {
                            return (_k = (_j = c.content) === null || _j === void 0 ? void 0 : _j.files) === null || _k === void 0 ? void 0 : _k.map((v, index) => handleFile(v, `${id}.${index}`));
                        }
                        case 'datetime': {
                            return (_l = c.content) === null || _l === void 0 ? void 0 : _l.datetime;
                        }
                        case 'paragraphCollection': {
                            return (_o = (_m = c.content) === null || _m === void 0 ? void 0 : _m.paragraphs) === null || _o === void 0 ? void 0 : _o.map((v, index) => handleParagraph(v, `${id}.${index}`));
                        }
                        case 'propertiesTable': {
                            return (_q = (_p = c.content) === null || _p === void 0 ? void 0 : _p.sections) === null || _q === void 0 ? void 0 : _q.map(handlePropertiesTableSection);
                        }
                        case 'selection': {
                            return (_s = (_r = c.content) === null || _r === void 0 ? void 0 : _r.options) === null || _s === void 0 ? void 0 : _s.map((o) => o.key);
                        }
                        case 'componentChoice': {
                            const sel = (_t = c.content) === null || _t === void 0 ? void 0 : _t.selectedComponent;
                            if (!sel) {
                                return null;
                            }
                            return {
                                [sel.id]: getComponentContent(sel, `${id}.${sel.id}`),
                            };
                        }
                        case 'contentChunk': {
                            const chunks = [];
                            (_u = c.content) === null || _u === void 0 ? void 0 : _u.chunks.forEach((catalogueChunk, chunkIndex) => {
                                const chunk = {};
                                catalogueChunk.forEach((component) => {
                                    chunk[component.id] = getComponentContent(component, `${id}.${chunkIndex}.${component.id}`);
                                });
                                chunks.push(chunk);
                            });
                            return chunks;
                        }
                        default: {
                            return c.content;
                        }
                    }
                }
                cmps === null || cmps === void 0 ? void 0 : cmps.forEach((c) => {
                    const content = getComponentContent(c, `${item.id}.${c.id}`);
                    if (content) {
                        components[c.id] = content;
                    }
                });
                return components;
            }
            return jsonItem;
        }
        const rootItemsResponse = await context.callCatalogue({
            query: GET_ROOT_ITEMS_QUERY,
            variables: {
                language,
                version,
                path: (options === null || options === void 0 ? void 0 : options.basePath) || '/',
            },
        });
        const rootItems = ((_b = (_a = rootItemsResponse.data) === null || _a === void 0 ? void 0 : _a.catalogue) === null || _b === void 0 ? void 0 : _b.children) || [];
        for (let i = 0; i < rootItems.length; i++) {
            const item = await getItem(rootItems[i].path);
            if (item) {
                allCatalogueItemsForLanguage.push(item);
            }
        }
        return allCatalogueItemsForLanguage;
    }
    const allCatalogueItems = [];
    for (let i = 0; i < languages.length; i++) {
        const language = languages[i];
        const itemsForLanguage = await handleLanguage(language);
        function mergeWithExisting(itemForNewLang) {
            var _a;
            const existingItem = getItemById(allCatalogueItems, itemForNewLang.id);
            if (!existingItem) {
                console.log('Huh, weird. Could not find existing item with id', itemForNewLang.id);
            }
            else {
                (0, multilingual_1.mergeInTranslations)(existingItem, itemForNewLang);
            }
            ;
            (_a = itemForNewLang.children) === null || _a === void 0 ? void 0 : _a.forEach(mergeWithExisting);
        }
        if (allCatalogueItems.length === 0) {
            allCatalogueItems.push(...itemsForLanguage);
        }
        else {
            /**
             * Remove catalogue path here, as we only want the default language
             * catalogue path to be in the spec
             */
            (0, _1.removeUnwantedFieldsFromThing)(itemsForLanguage, ['cataloguePath']);
            itemsForLanguage.forEach(mergeWithExisting);
        }
    }
    return (0, _1.removeUnwantedFieldsFromThing)(allCatalogueItems, [
        'id',
        multilingual_1.translationFieldIdentifier,
    ]);
}
exports.getAllCatalogueItems = getAllCatalogueItems;
const GET_ROOT_ITEMS_QUERY = `
query GET_ROOT_CATALOGUE_ITEMS ($language: String!, $path: String!, $version: VersionLabel!) {
  catalogue(language: $language, path: $path, version: $version) {
    children {
      path
    }
  }
}
`;
const GET_ITEM_QUERY = `
query GET_ITEM ($language: String!, $path: String!, $version: VersionLabel!) {
  catalogue(language: $language, path: $path, version: $version) {
    ...item
    ...product
  }
}

fragment item on Item {
  id
  name
  type
  cataloguePath: path
  externalReference
  shape {
    identifier
  }
  topics {
    path
  }
  components {
    id
    name
    type
    content {
      ...primitiveComponentContent
      ... on ComponentChoiceContent {
        selectedComponent {
          id
          name
          type
          content {
            ...primitiveComponentContent
          }
        }
      }
      ... on ContentChunkContent {
        chunks {
          id
          name
          type
          content {
            ...primitiveComponentContent
          }
        }
      }
    }
  }
}

fragment primitiveComponentContent on ComponentContent {
  ...singleLineContent
  ...richTextContent
  ...imageContent
  ...videoContent
  ...fileContent
  ...paragraphCollectionContent
  ...itemRelationsContent
  ...gridRelationsContent
  ...locationContent
  ...selectionContent
  ...booleanContent
  ...propertiesTableContent
  ...dateTimeContent
  ...numericContent
}

fragment product on Product {
  id
  language
  vatType {
    name
    percent
  }
  variants {
    id
    externalReference
    name
    sku
    isDefault
    attributes {
      attribute
      value
    }
    priceVariants {
      identifier
      price
    }
    stock
    stockLocations {
      identifier
      name
      stock
    }
    images {
      ...image
    }
    subscriptionPlans {
      identifier
      name
      periods {
        id
        name
        initial {
          ...subscriptionPlanPricing
        }
        recurring {
          ...subscriptionPlanPricing
        }
      }
    }
  }
}

fragment image on Image {
  url
  altText
  caption {
    json
  }
}

fragment video on Video {
  id
  title
  playlist(type: "m3u8")
  thumbnails {
    ...image
  }
}

fragment file on File {
  url
  title
}

fragment dateTimeContent on DatetimeContent {
  datetime
}

fragment numericContent on NumericContent {
  number
  unit
}

fragment propertiesTableContent on PropertiesTableContent {
  sections {
    title
    properties {
      key
      value
    }
  }
}

fragment booleanContent on BooleanContent {
  value
}

fragment selectionContent on SelectionContent {
  options {
    key
    value
  }
}

fragment imageContent on ImageContent {
  images {
    ...image
  }
}

fragment videoContent on VideoContent {
  videos {
    ...video
  }
}

fragment fileContent on FileContent {
  files {
    ...file
  }
}

fragment singleLineContent on SingleLineContent {
  text
}

fragment richTextContent on RichTextContent {
  json
}

fragment itemRelationsContent on ItemRelationsContent {
  items {
    cataloguePath: path
    externalReference
  }
}

fragment gridRelationsContent on GridRelationsContent {
  grids {
    name
  }
}

fragment locationContent on LocationContent {
  lat
  long
}

fragment paragraphCollectionContent on ParagraphCollectionContent {
  paragraphs {
    title {
      ...singleLineContent
    }
    body {
      ...richTextContent
    }
    images {
      ...image
    }
  }
}

fragment subscriptionPlanPricing on ProductVariantSubscriptionPlanPricing {
  period
  unit
  priceVariants {
    identifier
    price
  }
  meteredVariables {
    id
    identifier
    name
    tierType
    tiers {
      threshold
      priceVariants {
        identifier
        price
      }
    }
  }
}
`;
const GET_ITEM_CHILDREN_PAGE = `
query GET_ITEM_CHILDREN_PAGE (
  $path: String!,
  $language: String!,
  $version: VersionLabel!,
  $after: String,
  $pageSize: Int
  ) {
  catalogue(path: $path, language: $language, version: $version) {
    subtree (
      first: $pageSize
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          path
        }
      }
    }
  }
}
`;
