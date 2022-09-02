"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUnwantedFieldsFromThing = exports.chunkArray = exports.getItemVersionsForLanguages = exports.ItemVersionDescription = exports.validShapeIdentifier = exports.FileUploadManager = exports.getTranslation = exports.EVENT_NAMES = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const remote_file_upload_1 = require("./remote-file-upload");
__exportStar(require("./api"), exports);
__exportStar(require("./get-item-id"), exports);
exports.EVENT_NAMES = {
    DONE: 'BOOTSTRAPPER_DONE',
    ERROR: 'BOOTSTRAPPER_ERROR',
    STATUS_UPDATE: 'BOOTSTRAPPER_STATUS_UPDATE',
    SHAPES_UPDATE: 'BOOTSTRAPPER_SHAPES_UPDATE',
    SHAPES_DONE: 'BOOTSTRAPPER_SHAPES_DONE',
    PRICE_VARIANTS_UPDATE: 'BOOTSTRAPPER_PRICE_VARIANTS_UPDATE',
    PRICE_VARIANTS_DONE: 'BOOTSTRAPPER_PRICE_VARIANTS_DONE',
    SUBSCRIPTION_PLANS_UPDATE: 'BOOTSTRAPPER_SUBSCRIPTION_PLANS_UPDATE',
    SUBSCRIPTION_PLANS_DONE: 'BOOTSTRAPPER_SUBSCRIPTION_PLANS_DONE',
    LANGUAGES_UPDATE: 'BOOTSTRAPPER_LANGUAGES_UPDATE',
    LANGUAGES_DONE: 'BOOTSTRAPPER_LANGUAGES_DONE',
    VAT_TYPES_UPDATE: 'BOOTSTRAPPER_VAT_TYPES_UPDATE',
    VAT_TYPES_DONE: 'BOOTSTRAPPER_VAT_TYPES_DONE',
    TOPICS_UPDATE: 'BOOTSTRAPPER_TOPICS_UPDATE',
    TOPICS_DONE: 'BOOTSTRAPPER_TOPICS_DONE',
    GRIDS_UPDATE: 'BOOTSTRAPPER_GRIDS_UPDATE',
    GRIDS_DONE: 'BOOTSTRAPPER_GRIDS_DONE',
    ITEMS_UPDATE: 'BOOTSTRAPPER_ITEMS_UPDATE',
    ITEMS_DONE: 'BOOTSTRAPPER_ITEMS_DONE',
    ORDERS_UPDATE: 'BOOTSTRAPPER_ORDERS_UPDATE',
    ORDERS_DONE: 'BOOTSTRAPPER_ORDERS_DONE',
    CUSTOMERS_UPDATE: 'BOOTSTRAPPER_CUSTOMERS_UPDATE',
    CUSTOMERS_DONE: 'BOOTSTRAPPER_CUSTOMERS_DONE',
    STOCK_LOCATIONS_UPDATE: 'BOOTSTRAPPER_STOCK_LOCATIONS_UPDATE',
    STOCK_LOCATIONS_DONE: 'BOOTSTRAPPER_STOCK_LOCATIONS_DONE',
};
function getTranslation(translation, language) {
    var _a;
    if (!translation || !language) {
        return '';
    }
    if (typeof translation === 'string') {
        return translation;
    }
    return (_a = translation[language]) !== null && _a !== void 0 ? _a : '';
}
exports.getTranslation = getTranslation;
class FileUploadManager {
    constructor() {
        this.uploads = [];
        this.maxWorkers = 2;
        this.workerQueue = [];
        setInterval(() => this.work(), 5);
    }
    async work() {
        var _a, _b;
        if (!this.context) {
            return;
        }
        const currentWorkers = this.workerQueue.filter((q) => q.status === 'working').length;
        if (currentWorkers === this.maxWorkers) {
            return;
        }
        const item = this.workerQueue.find((q) => q.status === 'not-started');
        if (!item) {
            return;
        }
        const removeWorker = (item) => {
            item.status = 'done';
            // Remove unused fields to reduce memory footprint
            item.resolve = undefined;
            item.reject = undefined;
        };
        item.status = 'working';
        try {
            const result = await (0, remote_file_upload_1.remoteFileUpload)({
                fileUrl: item.url,
                context: this.context,
            });
            (_a = item.resolve) === null || _a === void 0 ? void 0 : _a.call(item, result);
            removeWorker(item);
        }
        catch (e) {
            if (!item.failCount) {
                item.failCount = 1;
            }
            // Allow for 3 fails
            const isLastAttempt = item.failCount === 3;
            if (isLastAttempt) {
                const msg = e.message || JSON.stringify(e, null, 1);
                (_b = item.reject) === null || _b === void 0 ? void 0 : _b.call(item, msg);
                removeWorker(item);
                // this.context.emitError(msg)
            }
            else {
                item.failCount++;
                item.status = 'not-started';
            }
        }
    }
    uploadFromUrl(url) {
        const existing = this.uploads.find((u) => u.url === url);
        if (existing) {
            return existing.result;
        }
        const result = this.scheduleUpload(url);
        result.catch((e) => { });
        this.uploads.push({
            url,
            result,
        });
        return result;
    }
    scheduleUpload(url) {
        return new Promise((resolve, reject) => {
            this.workerQueue.push({
                url,
                status: 'not-started',
                resolve,
                reject,
            });
        });
    }
}
exports.FileUploadManager = FileUploadManager;
function validShapeIdentifier(str, onUpdate) {
    if (str.length <= 64)
        return str;
    const validIdentifier = str.substr(0, 31) + '-' + str.substr(str.length - 32);
    onUpdate({
        warning: {
            code: 'SHAPE_ID_TRUNCATED',
            message: `Truncating shape identifier "${str}" to "${validIdentifier}"`,
        },
    });
    return validIdentifier;
}
exports.validShapeIdentifier = validShapeIdentifier;
var ItemVersionDescription;
(function (ItemVersionDescription) {
    ItemVersionDescription[ItemVersionDescription["Unpublished"] = 0] = "Unpublished";
    ItemVersionDescription[ItemVersionDescription["StaleVersionPublished"] = 1] = "StaleVersionPublished";
    ItemVersionDescription[ItemVersionDescription["Published"] = 2] = "Published";
})(ItemVersionDescription = exports.ItemVersionDescription || (exports.ItemVersionDescription = {}));
async function getItemVersionInfo({ language, itemId, context, }) {
    var _a, _b, _c, _d, _e, _f;
    const result = await context.callPIM({
        query: (0, graphql_tag_1.default) `
      query GET_ITEM_VERSION_INFO($itemId: ID!, $language: String!) {
        item {
          published: get(
            id: $itemId
            language: $language
            versionLabel: published
          ) {
            version {
              createdAt
            }
          }
          draft: get(id: $itemId, language: $language, versionLabel: draft) {
            version {
              createdAt
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
    const draftInfo = (_c = (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.draft) === null || _c === void 0 ? void 0 : _c.version.createdAt;
    const publishInfo = (_f = (_e = (_d = result.data) === null || _d === void 0 ? void 0 : _d.item) === null || _e === void 0 ? void 0 : _e.published) === null || _f === void 0 ? void 0 : _f.version.createdAt;
    if (publishInfo) {
        const publishDate = new Date(publishInfo);
        const draftDate = new Date(draftInfo);
        if (publishDate >= draftDate) {
            return ItemVersionDescription.Published;
        }
        return ItemVersionDescription.StaleVersionPublished;
    }
    return ItemVersionDescription.Unpublished;
}
async function getItemVersionsForLanguages({ languages, itemId, context, }) {
    const existing = context.itemVersions.get(itemId);
    if (existing) {
        return existing;
    }
    const itemVersionsForLanguages = {};
    await Promise.all(languages.map(async (language) => {
        itemVersionsForLanguages[language] = await getItemVersionInfo({
            language,
            itemId,
            context,
        });
    }));
    context.itemVersions.set(itemId, itemVersionsForLanguages);
    return itemVersionsForLanguages;
}
exports.getItemVersionsForLanguages = getItemVersionsForLanguages;
function chunkArray({ array, chunkSize, }) {
    return array.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        if (!resultArray[chunkIndex]) {
            resultArray.push([]);
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
    }, [[]]);
}
exports.chunkArray = chunkArray;
function removeUnwantedFieldsFromThing(thing, fieldsToRemove) {
    function handleThing(thing) {
        if (Array.isArray(thing)) {
            thing.forEach(handleThing);
        }
        else if (thing && typeof thing === 'object') {
            try {
                fieldsToRemove.forEach((field) => delete thing[field]);
                Object.values(thing).forEach(handleThing);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    handleThing(thing);
    return thing;
}
exports.removeUnwantedFieldsFromThing = removeUnwantedFieldsFromThing;
