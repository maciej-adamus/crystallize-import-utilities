"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setItems = void 0;
// @ts-ignore
const fromHTML_1 = __importDefault(require("@crystallize/content-transformer/fromHTML"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const graphql_1 = require("../../graphql");
const utils_1 = require("./utils");
const get_all_grids_1 = require("./utils/get-all-grids");
const remote_file_upload_1 = require("./utils/remote-file-upload");
const get_product_variants_1 = require("./utils/get-product-variants");
const get_topic_id_1 = require("./utils/get-topic-id");
async function getTenantRootItemId(context) {
    var _a, _b, _c;
    const tenantId = context.tenantId;
    const r = await context.callPIM({
        query: (0, graphql_tag_1.default) `
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
    });
    return ((_c = (_b = (_a = r.data) === null || _a === void 0 ? void 0 : _a.tenant) === null || _b === void 0 ? void 0 : _b.get) === null || _c === void 0 ? void 0 : _c.rootItemId) || '';
}
function publishItem(language, id, context) {
    if (!id) {
        return Promise.resolve();
    }
    return context.callPIM({
        query: (0, graphql_tag_1.default) `
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
    });
}
function createRichTextInput(content, language) {
    function stringToJson(str) {
        return [
            JSON.parse(JSON.stringify({
                kind: 'block',
                type: 'paragraph',
                children: [
                    {
                        kind: 'inline',
                        type: 'span',
                        textContent: str,
                    },
                ],
            })),
        ];
    }
    const inp = {};
    if (typeof content === 'string') {
        inp.json = stringToJson(content);
    }
    else if (typeof content === 'object') {
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
        let c = content;
        const keys = Object.keys(content || {});
        const isNotTranslated = ['json', 'html', 'plainText'].includes(keys[0]);
        const translatedContent = isNotTranslated ? c : (0, utils_1.getTranslation)(c, language);
        if (translatedContent === null || translatedContent === void 0 ? void 0 : translatedContent.html) {
            inp.json = (0, fromHTML_1.default)(translatedContent === null || translatedContent === void 0 ? void 0 : translatedContent.html);
        }
        else {
            if (typeof translatedContent === 'string') {
                inp.json = stringToJson(translatedContent);
            }
            else {
                if (translatedContent.json) {
                    inp.json = translatedContent.json;
                }
                else if (translatedContent.html) {
                    inp.json = (0, fromHTML_1.default)(translatedContent.html);
                }
                else if (translatedContent.plainText) {
                    inp.json = stringToJson(translatedContent.plainText);
                }
            }
        }
    }
    return inp;
}
async function createImagesInput(props) {
    const { images, language, onUpdate, context } = props;
    const imgs = [];
    for (let i = 0; i < (images === null || images === void 0 ? void 0 : images.length); i++) {
        const image = images[i];
        let { key, mimeType } = image;
        if (!key) {
            try {
                const uploadResult = await context.uploadFileFromUrl(image.src);
                if (uploadResult) {
                    key = uploadResult.key;
                    mimeType = uploadResult.mimeType;
                    // Store the values so that we don't re-upload again during import
                    image.key = uploadResult.key;
                    image.mimeType = uploadResult.mimeType;
                }
            }
            catch (e) {
                onUpdate({
                    warning: {
                        code: 'UPLOAD_FAILED',
                        message: `Could not upload image "${JSON.stringify(image)}"`,
                    },
                });
            }
        }
        if (key) {
            imgs.push(Object.assign({ key,
                mimeType, altText: (0, utils_1.getTranslation)(image.altText, language) }, (image.caption && {
                caption: createRichTextInput(image.caption, language),
            })));
        }
    }
    return imgs;
}
async function createVideosInput(props) {
    const { videos, language, context, onUpdate } = props;
    const vids = [];
    for (let i = 0; i < (videos === null || videos === void 0 ? void 0 : videos.length); i++) {
        const video = videos[i];
        let { key } = video;
        if (!key) {
            try {
                const uploadResult = await context.uploadFileFromUrl(video.src);
                if (uploadResult) {
                    key = uploadResult.key;
                    // Store the values so that we don't re-upload again during import
                    video.key = uploadResult.key;
                }
            }
            catch (e) {
                onUpdate({
                    warning: {
                        code: 'UPLOAD_FAILED',
                        message: `Could not upload video "${JSON.stringify(video)}"`,
                    },
                });
            }
        }
        if (key) {
            vids.push(Object.assign({ key, title: (0, utils_1.getTranslation)(video.title, language) }, (video.thumbnails && {
                thumbnails: await createImagesInput({
                    images: video.thumbnails,
                    language,
                    onUpdate,
                    context,
                }),
            })));
        }
    }
    return vids;
}
async function createFilesInput(props) {
    const { files, language, context, onUpdate } = props;
    const fs = [];
    for (let i = 0; i < (files === null || files === void 0 ? void 0 : files.length); i++) {
        const file = files[i];
        let { key } = file;
        if (!key) {
            try {
                const uploadResult = await context.uploadFileFromUrl(file.src);
                if (uploadResult) {
                    key = uploadResult.key;
                    // Store the values so that we don't re-upload again during import
                    file.key = uploadResult.key;
                }
            }
            catch (e) {
                onUpdate({
                    warning: {
                        code: 'UPLOAD_FAILED',
                        message: `Could not upload file "${JSON.stringify(file)}"`,
                    },
                });
            }
        }
        if (key) {
            fs.push({
                key,
                title: (0, utils_1.getTranslation)(file.title, language),
            });
        }
    }
    return fs;
}
async function createComponentsInput(props) {
    var _a, _b;
    const { item, shape, language, grids, context, onUpdate } = props;
    /**
     * If you pass null, then we assume you want to
     * clear all the components data
     */
    if (item.components === null) {
        return null;
    }
    /**
     * Returing undefined here leaves the
     * existing components untouched
     */
    if (!item.components) {
        return undefined;
    }
    const input = {};
    async function createComponentInput(componentDefinition, component, context) {
        var _a;
        switch (componentDefinition === null || componentDefinition === void 0 ? void 0 : componentDefinition.type) {
            case 'boolean': {
                const inp = {
                    boolean: {
                        value: component,
                    },
                };
                return inp;
            }
            case 'singleLine': {
                const inp = {
                    singleLine: {
                        text: (0, utils_1.getTranslation)(component, language),
                    },
                };
                return inp;
            }
            case 'numeric': {
                const n = component;
                if (!n) {
                    return {
                        numeric: null,
                    };
                }
                const inp = {
                    numeric: {
                        number: n.number,
                        unit: (_a = n.unit) !== null && _a !== void 0 ? _a : '',
                    },
                };
                return inp;
            }
            case 'location': {
                const l = component;
                if (!l) {
                    return {
                        location: null,
                    };
                }
                const inp = {
                    location: {
                        lat: l.lat,
                        long: l.long,
                    },
                };
                return inp;
            }
            case 'datetime': {
                const d = component;
                if (!d) {
                    return {
                        datetime: null,
                    };
                }
                const parsedDate = new Date(d);
                const inp = {
                    datetime: {
                        datetime: parsedDate.toISOString(),
                    },
                };
                return inp;
            }
            case 'images': {
                const images = component;
                const inp = {
                    images: await createImagesInput({
                        images,
                        language,
                        onUpdate,
                        context,
                    }),
                };
                return inp;
            }
            case 'videos': {
                const videos = component;
                const inp = {
                    videos: await createVideosInput({
                        videos,
                        language,
                        onUpdate,
                        context,
                    }),
                };
                return inp;
            }
            case 'files': {
                const files = component;
                const inp = {
                    files: await createFilesInput({
                        files,
                        language,
                        onUpdate,
                        context,
                    }),
                };
                return inp;
            }
            case 'richText': {
                const inp = createRichTextInput(component, language);
                if (Object.keys(inp).length > 0) {
                    return {
                        richText: inp,
                    };
                }
                break;
            }
            case 'selection': {
                const inp = {
                    selection: {
                        keys: [], // Todo
                    },
                };
                const s = component;
                if (typeof s === 'string') {
                    inp.selection.keys.push(s);
                }
                else if (Array.isArray(s)) {
                    s.forEach((key) => inp.selection.keys.push(key));
                }
                return inp;
            }
            case 'paragraphCollection': {
                const inp = {
                    paragraphCollection: {
                        paragraphs: [],
                    },
                };
                const paragraphs = component;
                for (let i = 0; i < (paragraphs === null || paragraphs === void 0 ? void 0 : paragraphs.length); i++) {
                    const { title, body, images, videos } = paragraphs[i];
                    inp.paragraphCollection.paragraphs.push(Object.assign(Object.assign(Object.assign({ title: {
                            text: (0, utils_1.getTranslation)(title, language),
                        } }, (body && { body: createRichTextInput(body, language) })), (images && {
                        images: await createImagesInput({
                            images,
                            language,
                            context,
                            onUpdate,
                        }),
                    })), (videos && {
                        videos: await createVideosInput({
                            videos,
                            language,
                            context,
                            onUpdate,
                        }),
                    })));
                }
                if (Object.keys(inp).length > 0) {
                    return inp;
                }
                break;
            }
            case 'propertiesTable': {
                const inp = {
                    propertiesTable: {
                        sections: [],
                    },
                };
                const sections = component || [];
                sections.forEach((section) => {
                    var _a;
                    const properties = [];
                    if (section.properties) {
                        Object.keys(section.properties).forEach((key) => {
                            var _a;
                            properties.push({
                                key,
                                value: (_a = section.properties) === null || _a === void 0 ? void 0 : _a[key],
                            });
                        });
                    }
                    (_a = inp.propertiesTable.sections) === null || _a === void 0 ? void 0 : _a.push({
                        title: section.title,
                        properties,
                    });
                });
                return inp;
            }
            case 'componentChoice': {
                const choice = component;
                const [selectedComponentId] = Object.keys(choice);
                if (!selectedComponentId) {
                    return {
                        componentChoice: null,
                    };
                }
                const componentConfig = componentDefinition.config;
                const selectedComponentDefinition = componentConfig.choices.find((c) => c.id === selectedComponentId);
                const content = await createComponentInput(selectedComponentDefinition, choice[selectedComponentId], context);
                const inp = {
                    componentChoice: Object.assign({ componentId: selectedComponentId }, content),
                };
                return inp;
            }
            case 'itemRelations': {
                const inp = {
                    itemRelations: {
                        itemIds: [], // Will be populated later
                    },
                };
                return inp;
            }
            case 'gridRelations': {
                const gridsComponent = component;
                const gridIds = [];
                gridsComponent.forEach((g) => {
                    const found = grids.find((a) => a.name === (0, utils_1.getTranslation)(g.name, language));
                    if (found === null || found === void 0 ? void 0 : found.id) {
                        gridIds.push(found.id);
                    }
                });
                const inp = {
                    gridRelations: {
                        gridIds,
                    },
                };
                return inp;
            }
            case 'contentChunk': {
                const chunks = component || [];
                const inp = {
                    contentChunk: {
                        chunks: [],
                    },
                };
                for (let i = 0; i < (chunks === null || chunks === void 0 ? void 0 : chunks.length); i++) {
                    const newChunk = [];
                    const chunk = chunks[i];
                    const chunkKeys = Object.keys(chunk);
                    for (let x = 0; x < chunkKeys.length; x++) {
                        const componentId = chunkKeys[x];
                        const selectedComponentDefinition = componentDefinition.config.components.find((c) => c.id === componentId);
                        if (selectedComponentDefinition) {
                            const content = await createComponentInput(selectedComponentDefinition, chunk[componentId], context);
                            if (content) {
                                newChunk.push(Object.assign({ componentId }, content));
                            }
                        }
                    }
                    if (newChunk.length > 0) {
                        inp.contentChunk.chunks.push(newChunk);
                    }
                }
                return inp;
            }
        }
    }
    const componentIds = Object.keys(item.components);
    /**
     * If you don't supply any components, let's not continue.
     * The intention of the user is probably to only update
     * any provided components
     */
    if (componentIds.length === 0) {
        return undefined;
    }
    for (let i = 0; i < componentIds.length; i++) {
        const componentId = componentIds[i];
        const componentDefinition = (_a = shape.components) === null || _a === void 0 ? void 0 : _a.find((c) => c.id === componentId);
        if (componentDefinition && item.components) {
            if (componentId in item.components) {
                const component = (_b = item.components) === null || _b === void 0 ? void 0 : _b[componentId];
                /**
                 * Make sure we don't just do a truthy check here,
                 * because true & "" & 0 are all valid content
                 */
                if (typeof component !== 'undefined') {
                    const content = await createComponentInput(componentDefinition, component, context);
                    if (typeof content !== 'undefined') {
                        input[componentId] = Object.assign({ componentId }, content);
                    }
                }
            }
        }
    }
    return input;
}
function getAllMediaUrls(items) {
    const medias = [];
    function handleItem(item) {
        if (!item) {
            return;
        }
        Object.values(item).forEach((value) => {
            if (!value) {
                return;
            }
            if (typeof value === 'object') {
                // Check for media signature
                if ('src' in value) {
                    medias.push(value.src);
                }
                else {
                    Object.values(value).forEach(handleItem);
                }
            }
            else if (Array.isArray(value)) {
                value.forEach(handleItem);
            }
        });
    }
    items.forEach(handleItem);
    return medias;
}
async function getExistingTopicIdsForItem(itemId, language, context) {
    var _a, _b, _c, _d;
    const result = await context.callPIM({
        query: (0, graphql_tag_1.default) `
      query GET_ITEM_TOPICS($itemId: ID!, $language: String!) {
        item {
          get(id: $itemId, language: $language) {
            topics {
              id
            }
          }
        }
      }
    `,
        variables: {
            itemId,
            language,
        },
    });
    return ((_d = (_c = (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.get) === null || _c === void 0 ? void 0 : _c.topics) === null || _d === void 0 ? void 0 : _d.map((t) => t.id)) || [];
}
function getSubscriptionPlanMeteredVariables({ planIdentifier, context, }) {
    var _a;
    const plan = (_a = context.subscriptionPlans) === null || _a === void 0 ? void 0 : _a.find((p) => p.identifier === planIdentifier);
    return (plan === null || plan === void 0 ? void 0 : plan.meteredVariables) || [];
}
function getSubscriptionPlanPeriodId({ planIdentifier, periodName, context, }) {
    var _a, _b, _c;
    const plan = (_a = context.subscriptionPlans) === null || _a === void 0 ? void 0 : _a.find((p) => p.identifier === planIdentifier);
    if (plan) {
        return ((_c = (_b = plan.periods) === null || _b === void 0 ? void 0 : _b.find((p) => p.name === periodName)) === null || _c === void 0 ? void 0 : _c.id) || null;
    }
    return null;
}
function subscriptionPlanPrincingJsonToInput(pricing, meteredVaribles) {
    function handleMeteredVariable(mv) {
        var _a, _b;
        const id = (_a = meteredVaribles.find((m) => m.identifier === mv.identifier)) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            throw new Error('Cannot find id for metered variable ' + mv.identifier);
        }
        return {
            id,
            tierType: mv.tierType,
            tiers: (_b = mv.tiers) === null || _b === void 0 ? void 0 : _b.map((t) => ({
                threshold: t.threshold,
                priceVariants: handleJsonPriceToPriceInput({
                    jsonPrice: t.price,
                }),
            })),
        };
    }
    return {
        priceVariants: handleJsonPriceToPriceInput({
            jsonPrice: pricing.price,
        }),
        meteredVariables: pricing.meteredVariables.map(handleMeteredVariable),
    };
}
function handleJsonPriceToPriceInput({ jsonPrice, existingProductVariantPriceVariants, }) {
    if (typeof jsonPrice === 'undefined' &&
        !existingProductVariantPriceVariants) {
        return [
            {
                identifier: 'default',
                price: 0,
            },
        ];
    }
    const priceVariants = existingProductVariantPriceVariants || [];
    if (jsonPrice && typeof jsonPrice === 'object') {
        const p = jsonPrice;
        Object.keys(jsonPrice).forEach((identifier) => {
            const existingEntry = priceVariants.find((i) => i.identifier === identifier);
            if (existingEntry) {
                existingEntry.price = p[identifier];
            }
            else {
                priceVariants.push({
                    identifier,
                    price: p[identifier],
                });
            }
        });
    }
    else if (typeof jsonPrice !== 'undefined') {
        const defaultStock = priceVariants.find((i) => i.identifier === 'default');
        if (defaultStock) {
            defaultStock.price = jsonPrice;
        }
        else {
            priceVariants.push({
                identifier: 'default',
                price: jsonPrice,
            });
        }
    }
    return priceVariants.map(({ identifier, price }) => ({
        identifier,
        price,
    }));
}
function handleJsonStockToStockInput({ jsonStock, existingProductVariantStockLocations, }) {
    if (typeof jsonStock === undefined && !existingProductVariantStockLocations) {
        return undefined;
    }
    const stockVariants = existingProductVariantStockLocations || [];
    if (jsonStock && typeof jsonStock === 'object') {
        const p = jsonStock;
        Object.keys(jsonStock).forEach((identifier) => {
            const existingEntry = stockVariants.find((i) => i.identifier === identifier);
            if (existingEntry) {
                existingEntry.stock = p[identifier];
            }
            else {
                stockVariants.push({
                    identifier,
                    stock: p[identifier],
                });
            }
        });
    }
    else if (typeof jsonStock !== 'undefined') {
        const defaultStock = stockVariants.find((i) => i.identifier === 'default');
        if (defaultStock) {
            defaultStock.stock = jsonStock;
        }
        else {
            stockVariants.push({
                identifier: 'default',
                stock: jsonStock,
            });
        }
    }
    return stockVariants.map(({ identifier, stock, meta }) => ({
        identifier,
        stock: stock !== null && stock !== void 0 ? stock : 0,
        meta: meta || [],
    }));
}
async function setItems({ spec, onUpdate, context, }) {
    if (!(spec === null || spec === void 0 ? void 0 : spec.items)) {
        return;
    }
    const ffmpeg = await remote_file_upload_1.ffmpegAvailable;
    if (!ffmpeg) {
        onUpdate({
            warning: {
                code: 'FFMPEG_UNAVAILABLE',
                message: 'ffmpeg is not available. Videos will not be included. Installment instructions for ffmpeg: https://ffmpeg.org/download.html',
            },
        });
    }
    const rootItemId = await getTenantRootItemId(context);
    const allGrids = await (0, get_all_grids_1.getAllGrids)(context.defaultLanguage.code, context);
    /**
     * First off, let's start uploading all the images
     * in parallel with all the other PIM mutations
     */
    const allMediaUrls = getAllMediaUrls(spec.items);
    allMediaUrls.forEach(context.uploadFileFromUrl);
    // Pull the status every second
    const getFileuploaderStatusInterval = setInterval(() => {
        const queue = context.fileUploader.workerQueue;
        const endedUploads = queue.filter((u) => u.status === 'done');
        const progress = endedUploads.length / queue.length;
        onUpdate({
            message: 'media-upload-progress',
            progress,
        });
        if (progress === 1) {
            clearInterval(getFileuploaderStatusInterval);
        }
    }, 1000);
    onUpdate({
        message: `Initiating upload of ${allMediaUrls.length} media item(s)`,
    });
    // Get a total item count
    let totalItems = 0;
    function getCount(item) {
        var _a;
        totalItems++;
        if ('children' in item) {
            (_a = item.children) === null || _a === void 0 ? void 0 : _a.forEach(getCount);
        }
    }
    spec.items.forEach(getCount);
    // Double the item count since we're doing add/update _and_ item relations later
    totalItems *= 2;
    let finishedItems = 0;
    async function createOrUpdateItem(item, parentId, treePosition) {
        var _a, _b, _c, _d, _e, _f;
        // Create the object to store the component data in
        item._componentsData = {};
        // Ensure shape identifier is not too long (max 24 characters)
        item.shape = (0, utils_1.validShapeIdentifier)(item.shape, onUpdate);
        // Get the shape type
        const shape = (_a = context.shapes) === null || _a === void 0 ? void 0 : _a.find((s) => s.identifier === item.shape);
        if (!shape) {
            onUpdate({
                warning: {
                    code: 'CANNOT_HANDLE_ITEM',
                    message: `Skipping  "${(0, utils_1.getTranslation)(item.name, context.defaultLanguage.code)}". Could not locate its shape (${item.shape}}))`,
                },
            });
            return null;
        }
        async function createForLanguage(language) {
            var _a;
            if (!shape) {
                return;
            }
            // @ts-ignore
            item._componentsData[language] = await createComponentsInput({
                item,
                shape,
                language,
                grids: allGrids,
                context,
                onUpdate,
            });
            item._topicsData = {};
            if (item.topics) {
                item._topicsData = {
                    topicIds: await (0, get_topic_id_1.getTopicIds)({
                        topics: item.topics || [],
                        language: context.defaultLanguage.code,
                        context,
                    }),
                };
            }
            return context.callPIM((0, graphql_1.buildCreateItemQueryAndVariables)(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ name: (0, utils_1.getTranslation)(item.name, language) || '', shapeIdentifier: item.shape, tenantId: context.tenantId }, (item.externalReference && {
                externalReference: item.externalReference,
            })), { tree: {
                    parentId,
                    position: treePosition,
                } }), (item.topics && item._topicsData)), { components: (_a = item._componentsData) === null || _a === void 0 ? void 0 : _a[language] }), ((shape === null || shape === void 0 ? void 0 : shape.type) === 'product' && Object.assign({}, (await createProductItemMutation(language))))), 
            // @ts-ignore
            shape === null || shape === void 0 ? void 0 : shape.type, language));
        }
        async function updateForLanguage(language, itemId) {
            var _a, _b;
            if (!shape || !itemId) {
                onUpdate({
                    warning: {
                        code: 'CANNOT_HANDLE_PRODUCT',
                        message: `Cannot update "${(0, utils_1.getTranslation)(item.name, language)}" for language "${language}". Missing shape or itemId`,
                    },
                });
                return;
            }
            // @ts-ignore
            item._componentsData[language] = await createComponentsInput({
                item,
                shape,
                language,
                grids: allGrids,
                context,
                onUpdate,
            });
            const clearComponentsData = ((_a = item._componentsData) === null || _a === void 0 ? void 0 : _a[language]) === null;
            const updates = [];
            /**
             * If it is a product, we need to pull all the product
             * variants first, and then update each field.
             * We need to do this because there is (currently) not
             * any product.addVariant mutation
             */
            let existingProductVariants;
            if ((shape === null || shape === void 0 ? void 0 : shape.type) === 'product') {
                existingProductVariants = await (0, get_product_variants_1.getProductVariants)(language, itemId, context);
            }
            /**
             * Start with the basic item information
             */
            updates.push(context.callPIM((0, graphql_1.buildUpdateItemQueryAndVariables)(itemId, Object.assign(Object.assign(Object.assign({ name: (0, utils_1.getTranslation)(item.name, language) || '' }, (item.topics && item._topicsData)), ((shape === null || shape === void 0 ? void 0 : shape.type) === 'product' && Object.assign({}, (await createProductItemMutation(language, existingProductVariants))))), (clearComponentsData && {
                components: {},
            })), shape.type, language)));
            /**
             * Create a single update component mutation on
             * each component. This will ensure that no
             * component data will be lost during the update
             */
            if ((_b = item._componentsData) === null || _b === void 0 ? void 0 : _b[language]) {
                Object.keys(item._componentsData[language]).forEach((componentId) => {
                    var _a;
                    const componentContent = (_a = item._componentsData) === null || _a === void 0 ? void 0 : _a[language][componentId];
                    updates.push(context.callPIM((0, graphql_1.buildUpdateItemComponentQueryAndVariables)({
                        itemId,
                        language,
                        input: Object.assign({ componentId }, componentContent),
                    })));
                });
            }
            return Promise.all(updates);
        }
        function createProductBaseInfo() {
            var _a;
            const product = item;
            const vatType = (_a = context.vatTypes) === null || _a === void 0 ? void 0 : _a.find((v) => { var _a; return ((_a = v.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === product.vatType.toLowerCase(); });
            if (!vatType) {
                onUpdate({
                    warning: {
                        code: 'CANNOT_HANDLE_PRODUCT',
                        message: `Cannot create product "${product.name}". Vat type "${product.vatType}" does not exist`,
                    },
                });
                return;
            }
            return {
                vatTypeId: vatType.id || '',
            };
        }
        async function createProductVariant(jsonVariant, language, existingProductVariant) {
            let attributes;
            if (jsonVariant.attributes) {
                attributes = Object.keys(jsonVariant.attributes).map((attribute) => {
                    var _a;
                    return ({
                        attribute,
                        value: ((_a = jsonVariant.attributes) === null || _a === void 0 ? void 0 : _a[attribute]) || '',
                    });
                });
            }
            const _a = existingProductVariant || {}, { priceVariants: existingProductVariantPriceVariants, stockLocations: existingProductVariantStockLocations } = _a, restOfExistingProductVariant = __rest(_a, ["priceVariants", "stockLocations"]);
            const variant = Object.assign(Object.assign(Object.assign({}, restOfExistingProductVariant), { name: (0, utils_1.getTranslation)(jsonVariant.name, language), sku: jsonVariant.sku, isDefault: jsonVariant.isDefault || false, stockLocations: handleJsonStockToStockInput({
                    jsonStock: jsonVariant.stock,
                    existingProductVariantStockLocations,
                }), priceVariants: handleJsonPriceToPriceInput({
                    jsonPrice: jsonVariant.price,
                    existingProductVariantPriceVariants,
                }) }), (attributes && { attributes }));
            if (jsonVariant.subscriptionPlans) {
                variant.subscriptionPlans = jsonVariant.subscriptionPlans.map((sP) => {
                    const meteredVariables = getSubscriptionPlanMeteredVariables({
                        planIdentifier: sP.identifier,
                        context,
                    });
                    return {
                        identifier: sP.identifier,
                        periods: sP.periods.map((p) => {
                            const id = getSubscriptionPlanPeriodId({
                                planIdentifier: sP.identifier,
                                periodName: p.name,
                                context,
                            });
                            if (!id) {
                                throw new Error('Plan period id is null');
                            }
                            return Object.assign(Object.assign({ id }, (p.initial && {
                                initial: subscriptionPlanPrincingJsonToInput(p.initial, meteredVariables),
                            })), { recurring: subscriptionPlanPrincingJsonToInput(p.recurring, meteredVariables) });
                        }),
                    };
                });
            }
            if (jsonVariant.images) {
                variant.images = await createImagesInput({
                    images: jsonVariant.images,
                    language,
                    context,
                    onUpdate,
                });
            }
            return variant;
        }
        async function createProductItemMutation(language, existingProductVariants) {
            const product = item;
            const variants = [];
            const inp = Object.assign(Object.assign({}, createProductBaseInfo()), { variants });
            // Add existing product variants
            if (existingProductVariants) {
                inp.variants.push(...existingProductVariants.map((_a) => {
                    var { priceVariants, stockLocations } = _a, rest = __rest(_a, ["priceVariants", "stockLocations"]);
                    return (Object.assign(Object.assign({}, rest), { priceVariants: priceVariants === null || priceVariants === void 0 ? void 0 : priceVariants.map((p) => ({
                            identifier: p.identifier,
                            price: p.price,
                        })), stockLocations: stockLocations === null || stockLocations === void 0 ? void 0 : stockLocations.map((p) => ({
                            identifier: p.identifier,
                            stock: p.stock,
                            meta: p.meta,
                        })) }));
                }));
            }
            for (let i = 0; i < product.variants.length; i++) {
                const vr = product.variants[i];
                let existingProductVariant = existingProductVariants === null || existingProductVariants === void 0 ? void 0 : existingProductVariants.find((v) => v.sku === vr.sku ||
                    (v.externalReference &&
                        v.externalReference === vr.externalReference));
                if (!existingProductVariant && vr.externalReference) {
                    existingProductVariant = existingProductVariants === null || existingProductVariants === void 0 ? void 0 : existingProductVariants.find((v) => v.externalReference === vr.externalReference);
                }
                const variant = await createProductVariant(vr, language, existingProductVariant);
                if (existingProductVariant) {
                    inp.variants[inp.variants.findIndex((v) => v.sku === vr.sku || v.externalReference === vr.externalReference)] = variant;
                }
                else {
                    inp.variants.push(variant);
                }
            }
            // Ensure that only one is set as the default
            const defaultVariants = inp.variants.filter((v) => v.isDefault);
            if (defaultVariants.length !== 1) {
                inp.variants.forEach((v) => (v.isDefault = false));
                inp.variants[0].isDefault = true;
            }
            return inp;
        }
        let itemId = item.id;
        let versionsInfo;
        // Get new topics
        item._topicsData = {
            topicIds: await (0, get_topic_id_1.getTopicIds)({
                topics: item.topics || [],
                language: context.defaultLanguage.code,
                context,
            }),
        };
        if (itemId) {
            /**
             * Get the item version info now and store it in the
             * context cace before any changes are made to it.
             * The version info will be read later before a
             * potential publishing of an item
             */
            if (context.config.itemPublish === 'auto') {
                versionsInfo = await (0, utils_1.getItemVersionsForLanguages)({
                    itemId,
                    languages: context.languages.map((l) => l.code),
                    context,
                });
            }
            if ((_b = item._options) === null || _b === void 0 ? void 0 : _b.moveToRoot) {
                if (item._parentId !== rootItemId) {
                    await context.callPIM({
                        query: (0, graphql_1.buildMoveItemMutation)(itemId, {
                            parentId: rootItemId,
                        }),
                    });
                }
            }
            else if (item._exists &&
                item._parentId !== parentId &&
                itemId !== parentId &&
                parentId !== rootItemId // Do not move items to root unless _moveToRoot is set
            ) {
                /**
                 * Move the item if it is a part of a children array,
                 * or if item.parentExternalReference is passed
                 */
                await context.callPIM({
                    query: (0, graphql_1.buildMoveItemMutation)(itemId, {
                        parentId,
                        position: treePosition,
                    }),
                });
            }
            // Merge in existing topic
            if (item.topics && context.config.itemTopics === 'amend') {
                const existingTopicIds = await getExistingTopicIdsForItem(itemId, context.defaultLanguage.code, context);
                item._topicsData.topicIds = Array.from(new Set([...existingTopicIds, ...item._topicsData.topicIds]));
            }
            const responses = await updateForLanguage(context.defaultLanguage.code, itemId);
            if (responses === null || responses === void 0 ? void 0 : responses.length) {
                responses.forEach((response) => {
                    var _a, _b, _c, _d;
                    if ((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a[shape === null || shape === void 0 ? void 0 : shape.type]) === null || _b === void 0 ? void 0 : _b.update) {
                        const { id, externalReference, tree: { path }, } = (_d = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c[shape === null || shape === void 0 ? void 0 : shape.type]) === null || _d === void 0 ? void 0 : _d.update;
                        context.itemCataloguePathToIDMap.set(item.cataloguePath || path, {
                            itemId: id,
                        });
                        if (externalReference) {
                            context.itemExternalReferenceToIDMap.set(externalReference, {
                                itemId: id,
                            });
                        }
                    }
                });
            }
        }
        else {
            // Ensure a name is set for the default language (required by the API)
            if (!(0, utils_1.getTranslation)(item.name, context.defaultLanguage.code)) {
                onUpdate({
                    warning: {
                        code: 'CANNOT_HANDLE_ITEM',
                        message: `Item name cannot be empty for the default language`,
                    },
                });
                throw new Error(`Item name cannot be empty for the default language`);
            }
            /**
             * Ensure that variants are present when creating
             * a product
             */
            if (shape.type === 'product') {
                const product = item;
                if (!product.variants || product.variants.length === 0) {
                    onUpdate({
                        warning: {
                            code: 'CANNOT_HANDLE_PRODUCT',
                            message: `Skipping  "${(0, utils_1.getTranslation)(item.name, context.defaultLanguage.code)}". No variants defined for product`,
                        },
                    });
                    return null;
                }
            }
            const response = await createForLanguage(context.defaultLanguage.code);
            if ((_d = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c[shape === null || shape === void 0 ? void 0 : shape.type]) === null || _d === void 0 ? void 0 : _d.create) {
                const { id, externalReference, tree: { path }, } = (_f = (_e = response === null || response === void 0 ? void 0 : response.data) === null || _e === void 0 ? void 0 : _e[shape === null || shape === void 0 ? void 0 : shape.type]) === null || _f === void 0 ? void 0 : _f.create;
                context.itemCataloguePathToIDMap.set(item.cataloguePath || path, {
                    itemId: id,
                });
                if (externalReference) {
                    context.itemExternalReferenceToIDMap.set(externalReference, {
                        itemId: id,
                    });
                }
                itemId = id;
            }
        }
        if (!itemId) {
            onUpdate({
                warning: {
                    code: 'CANNOT_HANDLE_ITEM',
                    message: `Could not create or update item "${(0, utils_1.getTranslation)(item.name, context.defaultLanguage.code)}"`,
                },
            });
            return null;
        }
        // Handle remaining languages
        const remainingLanguages = context.languages
            .filter((l) => !l.isDefault)
            .map((l) => l.code);
        for (let i = 0; i < remainingLanguages.length; i++) {
            await updateForLanguage(remainingLanguages[i], itemId);
        }
        return itemId;
    }
    async function handleItem(item, index, parentId) {
        if (!item) {
            return;
        }
        const itemAndParentId = await (0, utils_1.getItemId)({
            context,
            externalReference: item.externalReference,
            cataloguePath: item.cataloguePath,
            shapeIdentifier: item.shape,
            language: context.defaultLanguage.code,
        });
        item.id = itemAndParentId.itemId;
        item._parentId = itemAndParentId.parentId;
        if (item.parentExternalReference || item.parentCataloguePath) {
            const parentItemAndParentId = await (0, utils_1.getItemId)({
                context,
                externalReference: item.parentExternalReference,
                cataloguePath: item.parentCataloguePath,
                shapeIdentifier: item.shape,
                language: context.defaultLanguage.code,
            });
            parentId = parentItemAndParentId.itemId;
        }
        // If the item exists in Crystallize already
        item._exists = Boolean(item.id);
        item.id = (await createOrUpdateItem(item, parentId || rootItemId, index + 1));
        finishedItems++;
        onUpdate({
            progress: finishedItems / totalItems,
            message: `Handled ${(0, utils_1.getTranslation)(item.name, context.defaultLanguage.code)}`,
        });
        if (item.id) {
            /**
             * Store the item id for the cataloguePath. Very useful if the generated
             * cataloguePath is different than the one in the JSON spec
             */
            if (item.cataloguePath) {
                context.itemCataloguePathToIDMap.set(item.cataloguePath, {
                    itemId: item.id,
                    parentId: parentId || rootItemId,
                });
            }
            if (item.externalReference) {
                context.itemExternalReferenceToIDMap.set(item.externalReference, {
                    itemId: item.id,
                    parentId: parentId || rootItemId,
                });
            }
            if ('children' in item) {
                const itm = item;
                if (itm.children) {
                    await Promise.all(itm.children.map((child, index) => handleItem(child, index, itm.id)));
                }
            }
        }
    }
    async function handleItemRelationsAndPublish(item) {
        var _a;
        if (!item) {
            return;
        }
        onUpdate({
            message: `Item relations: ${(0, utils_1.getTranslation)(item.name, context.defaultLanguage.code)}`,
        });
        async function getItemIdsForItemRelation(itemRelations) {
            const ids = [];
            if (!itemRelations ||
                !itemRelations.map ||
                typeof itemRelations.map !== 'function') {
                return ids;
            }
            await Promise.all(itemRelations.map(async (itemRelation) => {
                if (typeof itemRelation === 'object') {
                    const { itemId } = await (0, utils_1.getItemId)({
                        context,
                        externalReference: itemRelation.externalReference,
                        cataloguePath: itemRelation.cataloguePath,
                        language: context.defaultLanguage.code,
                    });
                    if (itemId) {
                        ids.push(itemId);
                    }
                    else {
                        onUpdate({
                            warning: {
                                code: 'CANNOT_HANDLE_ITEM_RELATION',
                                message: `Could not determine an ID for related item "${itemRelation.externalReference
                                    ? itemRelation.externalReference
                                    : itemRelation.cataloguePath}`,
                            },
                        });
                    }
                }
            }));
            return ids;
        }
        if (item.id) {
            // Pull the item info from the cache
            const versionsInfo = context.itemVersions.get(item.id);
            if (item.components && item.id) {
                await Promise.all(Object.keys(item.components).map(async (componentId) => {
                    var _a, _b, _c, _d;
                    const jsonItem = (_a = item.components) === null || _a === void 0 ? void 0 : _a[componentId];
                    if (jsonItem) {
                        const shape = (_b = context.shapes) === null || _b === void 0 ? void 0 : _b.find((s) => s.identifier === item.shape);
                        const def = (_c = shape === null || shape === void 0 ? void 0 : shape.components) === null || _c === void 0 ? void 0 : _c.find((c) => c.id === componentId);
                        let mutationInput = null;
                        switch (def === null || def === void 0 ? void 0 : def.type) {
                            case 'itemRelations': {
                                mutationInput = {
                                    componentId,
                                    itemRelations: {
                                        itemIds: await getItemIdsForItemRelation(jsonItem),
                                    },
                                };
                                break;
                            }
                            case 'componentChoice':
                            case 'contentChunk': {
                                const itemRelationIds = (def.config.choices || def.config.components)
                                    .filter((s) => s.type === 'itemRelations')
                                    .map((s) => s.id);
                                // Get existing data for component
                                if (itemRelationIds.length > 0) {
                                    const existingComponentsData = (_d = item._componentsData) === null || _d === void 0 ? void 0 : _d[context.defaultLanguage.code];
                                    const componentData = existingComponentsData[componentId];
                                    if (componentData) {
                                        if (def.type === 'componentChoice') {
                                            const selectedDef = def.config.choices.find((c) => c.id === componentData.componentChoice.componentId);
                                            if ((selectedDef === null || selectedDef === void 0 ? void 0 : selectedDef.type) === 'itemRelations') {
                                                const chosenComponentId = componentData.componentChoice.componentId;
                                                const component = jsonItem;
                                                componentData.componentChoice;
                                                mutationInput = {
                                                    componentId,
                                                    componentChoice: {
                                                        componentId: chosenComponentId,
                                                        itemRelations: {
                                                            itemIds: await getItemIdsForItemRelation(component[chosenComponentId]),
                                                        },
                                                    },
                                                };
                                            }
                                        }
                                        else if (def.type === 'contentChunk') {
                                            mutationInput = Object.assign({ componentId }, componentData);
                                            await Promise.all(mutationInput.contentChunk.chunks.map(async (chunk, chunkIndex) => {
                                                const jsonChunk = jsonItem[chunkIndex];
                                                // Update all potential itemRelation components
                                                await Promise.all(itemRelationIds.map(async (itemRelationId) => {
                                                    const itemRelationComponentIndex = chunk.findIndex((c) => c.componentId === itemRelationId);
                                                    if (itemRelationComponentIndex !== -1) {
                                                        chunk[itemRelationComponentIndex].itemRelations.itemIds = await getItemIdsForItemRelation(jsonChunk[itemRelationId]);
                                                    }
                                                }));
                                            }));
                                        }
                                    }
                                }
                                break;
                            }
                        }
                        // Update the component
                        if (mutationInput) {
                            try {
                                const r = await context.callPIM({
                                    query: (0, graphql_tag_1.default) `
                      mutation UPDATE_RELATIONS_COMPONENT(
                        $itemId: ID!
                        $language: String!
                        $input: ComponentInput!
                      ) {
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
                                });
                                if (r.errors) {
                                    throw r.errors;
                                }
                            }
                            catch (err) {
                                onUpdate({
                                    warning: {
                                        code: 'CANNOT_HANDLE_ITEM_RELATION',
                                        message: `Unable to update relation for item "${item.id}" with input ${JSON.stringify(mutationInput)} `,
                                    },
                                });
                            }
                        }
                    }
                }));
            }
            // Publish if needed
            if (item.id) {
                for (let i = 0; i < context.languages.length; i++) {
                    const passedPublishConfig = (_a = item._options) === null || _a === void 0 ? void 0 : _a.publish;
                    if (typeof passedPublishConfig === 'boolean') {
                        if (passedPublishConfig) {
                            await publishItem(context.languages[i].code, item.id, context);
                        }
                    }
                    else if (context.config.itemPublish === 'publish' ||
                        !versionsInfo ||
                        versionsInfo[context.languages[i].code] ===
                            utils_1.ItemVersionDescription.Published) {
                        await publishItem(context.languages[i].code, item.id, context);
                    }
                }
            }
        }
        finishedItems++;
        onUpdate({
            progress: finishedItems / totalItems,
        });
        if ('children' in item) {
            const itm = item;
            if (itm.children) {
                for (let i = 0; i < itm.children.length; i++) {
                    await handleItemRelationsAndPublish(itm.children[i]);
                }
            }
        }
    }
    for (let i = 0; i < spec.items.length; i++) {
        const item = spec.items[i];
        try {
            await handleItem(item, i, rootItemId);
        }
        catch (e) {
            console.log(e);
            onUpdate({
                warning: {
                    code: 'CANNOT_HANDLE_ITEM',
                    message: `Skipping "${(0, utils_1.getTranslation)(item.name, context.defaultLanguage.code)}"`,
                },
            });
        }
    }
    /**
     * Item relations needs to be handled at the end, after all
     * items are created
     */
    onUpdate({
        message: 'Updating item relations...',
    });
    /**
     * At this point we want to start using cached values
     * so that we don't hit the API as much and speed things up
     */
    context.useReferenceCache = true;
    for (let i = 0; i < spec.items.length; i++) {
        await handleItemRelationsAndPublish(spec.items[i]);
    }
    clearInterval(getFileuploaderStatusInterval);
    onUpdate({
        progress: 1,
    });
}
exports.setItems = setItems;
