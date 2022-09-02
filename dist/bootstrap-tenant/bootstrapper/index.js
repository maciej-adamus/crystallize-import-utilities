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
exports.Bootstrapper = exports.createSpecDefaults = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const events_1 = require("events");
const immer_1 = __importDefault(require("immer"));
// @ts-ignore
const duration_1 = __importDefault(require("duration"));
__exportStar(require("./utils"), exports);
const utils_1 = require("./utils");
const shapes_1 = require("./shapes");
const price_variants_1 = require("./price-variants");
const languages_1 = require("./languages");
const vat_types_1 = require("./vat-types");
const topics_1 = require("./topics");
const items_1 = require("./items");
const get_all_catalogue_items_1 = require("./utils/get-all-catalogue-items");
const get_all_grids_1 = require("./utils/get-all-grids");
const grids_1 = require("./grids");
const stock_locations_1 = require("./stock-locations");
const subscription_plans_1 = require("./subscription-plans");
const api_1 = require("./utils/api");
const orders_1 = require("./orders");
const customers_1 = require("./customers");
exports.createSpecDefaults = {
    shapes: true,
    grids: true,
    items: true,
    languages: true,
    priceVariants: true,
    vatTypes: true,
    subscriptionPlans: true,
    topicMaps: true,
    stockLocations: true,
    onUpdate: () => null,
};
function defaultAreaStatus() {
    return {
        progress: 0,
        warnings: [],
    };
}
class Bootstrapper extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.SPEC = null;
        this.PIMAPIManager = null;
        this.catalogueAPIManager = null;
        this.searchAPIManager = null;
        this.ordersAPIManager = null;
        this.tenantIdentifier = '';
        this.context = {
            defaultLanguage: { code: 'en', name: 'English' },
            languages: [],
            config: {
                experimental: {},
            },
            /**
             * If it should allow for using cache when resolving
             * externalReference to item id, or topic paths to
             * topic id
             */
            useReferenceCache: false,
            /**
             * A map keeping a reference of all of the items in
             * the current spec and their (possible) item id
             */
            itemCataloguePathToIDMap: new Map(),
            /**
             * A map keeping a reference of all of the items in
             * the current spec and their (possible) item id
             */
            itemExternalReferenceToIDMap: new Map(),
            /**
             * A map keeping a reference of all of the items in
             * the current spec and their (possible) item versions
             */
            itemVersions: new Map(),
            tenantId: '',
            tenantIdentifier: '',
            /**
             * A map keeping a reference of all of the topics in the current
             * spec and their id.
             */
            topicPathToIDMap: new Map(),
            fileUploader: new utils_1.FileUploadManager(),
            uploadFileFromUrl: (url) => this.context.fileUploader.uploadFromUrl(url),
            callPIM: () => Promise.resolve({ data: {} }),
            callCatalogue: () => Promise.resolve({ data: {} }),
            callSearch: () => Promise.resolve({ data: {} }),
            callOrders: () => Promise.resolve({ data: {} }),
            emitError: (error) => {
                this.emit(utils_1.EVENT_NAMES.ERROR, { error });
            },
        };
        this.config = {
            itemTopics: 'amend',
            itemPublish: 'auto',
            logLevel: 'silent',
            experimental: {},
        };
        this.status = {
            media: defaultAreaStatus(),
            shapes: defaultAreaStatus(),
            grids: defaultAreaStatus(),
            items: defaultAreaStatus(),
            languages: defaultAreaStatus(),
            customers: defaultAreaStatus(),
            orders: defaultAreaStatus(),
            priceVariants: defaultAreaStatus(),
            vatTypes: defaultAreaStatus(),
            subscriptionPlans: defaultAreaStatus(),
            topicMaps: defaultAreaStatus(),
            stockLocations: defaultAreaStatus(),
        };
        this.getStatus = () => this.status;
        this.setAccessToken = (ACCESS_TOKEN_ID, ACCESS_TOKEN_SECRET) => {
            // PIM
            this.PIMAPIManager = (0, api_1.createAPICaller)({
                uri: `https://${process.env.CRYSTALLIZE_ENV === 'dev'
                    ? 'pim-dev.crystallize.digital'
                    : 'pim.crystallize.com'}/graphql`,
                errorNotifier: ({ error }) => {
                    this.emit(utils_1.EVENT_NAMES.ERROR, { error });
                },
            });
            this.PIMAPIManager.CRYSTALLIZE_ACCESS_TOKEN_ID = ACCESS_TOKEN_ID;
            this.PIMAPIManager.CRYSTALLIZE_ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
            this.context.callPIM = this.PIMAPIManager.push;
            // Orders
            if (!this.tenantIdentifier) {
                console.warn('⚠️ Tenant identifier not set. Could not create API manager for orders');
            }
            else {
                this.ordersAPIManager = (0, api_1.createAPICaller)({
                    uri: `https://${process.env.CRYSTALLIZE_ENV === 'dev'
                        ? 'api-dev.crystallize.digital'
                        : 'api.crystallize.com'}/${this.tenantIdentifier}/orders`,
                    errorNotifier: ({ error }) => {
                        this.emit(utils_1.EVENT_NAMES.ERROR, { error });
                    },
                });
                this.ordersAPIManager.CRYSTALLIZE_ACCESS_TOKEN_ID = ACCESS_TOKEN_ID;
                this.ordersAPIManager.CRYSTALLIZE_ACCESS_TOKEN_SECRET =
                    ACCESS_TOKEN_SECRET;
                this.context.callOrders = this.ordersAPIManager.push;
            }
        };
        this.setTenantIdentifier = async (tenantIdentifier) => {
            this.context.tenantIdentifier = tenantIdentifier;
            this.tenantIdentifier = tenantIdentifier;
            // Clear existing maps if the tenant is changed
            this.context.itemCataloguePathToIDMap = new Map();
            this.context.itemExternalReferenceToIDMap = new Map();
            this.context.topicPathToIDMap = new Map();
        };
        this.getTenantBasics = async () => {
            var _a, _b;
            /**
             * Allow for access tokens to be set synchronosly after the
             * the setTenantIdentifier is set
             */
            await (0, utils_1.sleep)(5);
            if (this.PIMAPIManager && this.config.multilingual) {
                /**
                 * Due to a potential race condition when operating on
                 * multiple languages on the same time, we need to limit
                 * the amount of workers to 1 for now
                 */
                this.PIMAPIManager.maxWorkers = 1;
            }
            const r = await this.context.callPIM({
                query: (0, graphql_tag_1.default) `
          {
            tenant {
              get(identifier: "${this.context.tenantIdentifier}") {
                id
                identifier
                staticAuthToken
              }
            }
          }
        `,
            });
            const tenant = (_b = (_a = r === null || r === void 0 ? void 0 : r.data) === null || _a === void 0 ? void 0 : _a.tenant) === null || _b === void 0 ? void 0 : _b.get;
            if (!tenant) {
                const error = `⛔️ You do not have access to tenant "${this.context.tenantIdentifier}" ⛔️`;
                this.emit(utils_1.EVENT_NAMES.ERROR, { error });
                return false;
            }
            else {
                this.context.tenantId = tenant.id;
                this.context.fileUploader.context = this.context;
                const baseUrl = `https://${process.env.CRYSTALLIZE_ENV === 'dev'
                    ? 'api-dev.crystallize.digital'
                    : 'api.crystallize.com'}/${this.context.tenantIdentifier}`;
                // Catalogue
                this.catalogueAPIManager = (0, api_1.createAPICaller)({
                    uri: `${baseUrl}/catalogue`,
                    errorNotifier: ({ error }) => {
                        this.emit(utils_1.EVENT_NAMES.ERROR, { error });
                    },
                    logLevel: this.config.logLevel,
                });
                this.catalogueAPIManager.CRYSTALLIZE_STATIC_AUTH_TOKEN =
                    tenant.staticAuthToken;
                this.context.callCatalogue = this.catalogueAPIManager.push;
                // Search
                this.searchAPIManager = (0, api_1.createAPICaller)({
                    uri: `${baseUrl}/search`,
                    errorNotifier: ({ error }) => {
                        this.emit(utils_1.EVENT_NAMES.ERROR, { error });
                    },
                    logLevel: this.config.logLevel,
                });
                this.searchAPIManager.CRYSTALLIZE_STATIC_AUTH_TOKEN =
                    tenant.staticAuthToken;
                this.context.callSearch = this.searchAPIManager.push;
                // Set log level late so that we'll catch late changes to the config
                if (this.PIMAPIManager && this.config.logLevel) {
                    this.PIMAPIManager.logLevel = this.config.logLevel;
                }
                return true;
            }
        };
    }
    setSpec(spec) {
        this.SPEC = spec;
    }
    async ensureTenantExists() {
        var _a, _b, _c, _d;
        /**
         * Allow for access tokens to be set synchronosly after the
         * the setTenantIdentifier is set
         */
        await (0, utils_1.sleep)(5);
        if (!this.tenantIdentifier) {
            throw new Error('tenantIdentifier is not set. Use bootstrapper.setTenantIdentifier(<identifier>)');
        }
        const identifier = this.tenantIdentifier;
        const resultGetTenant = await ((_a = this.PIMAPIManager) === null || _a === void 0 ? void 0 : _a.push({
            query: `
      query ($identifier: String!) {
        tenant {
          get(identifier: $identifier) {
            identifier
          }
        }
      }`,
            variables: {
                identifier,
            },
            // No need to report for this query, as it will error out if the tenant does not exist
            suppressErrors: true,
        }));
        const match = ((_c = (_b = resultGetTenant === null || resultGetTenant === void 0 ? void 0 : resultGetTenant.data) === null || _b === void 0 ? void 0 : _b.tenant) === null || _c === void 0 ? void 0 : _c.get) || null;
        if (match) {
            return true;
        }
        // Attempt to create the tenant
        const resultCreate = await ((_d = this.PIMAPIManager) === null || _d === void 0 ? void 0 : _d.push({
            query: `
        mutation ($identifier: String!) {
          tenant {
            create (
              input: {
                identifier: $identifier
                name: $identifier
              }
            ) {
              identifier
            }
          }
        }`,
            variables: {
                identifier,
            },
        }));
        // This tenant identifier exists, but you do not have access
        if (resultCreate === null || resultCreate === void 0 ? void 0 : resultCreate.errors) {
            return false;
        }
        return true;
    }
    async createSpec(props = exports.createSpecDefaults) {
        var _a;
        const spec = {};
        try {
            await this.getTenantBasics();
            // Store the config in the context for easy access
            this.context.config = this.config;
            const tenantLanguageSettings = await (0, languages_1.getTenantSettings)(this.context);
            // Languages
            const availableLanguages = tenantLanguageSettings.availableLanguages
                .map((l) => ({
                code: l.code,
                name: l.name,
                isDefault: l.code === tenantLanguageSettings.defaultLanguage,
            }))
                .sort((a, b) => (a.isDefault ? 1 : 0));
            if (!availableLanguages.some((l) => l.isDefault)) {
                availableLanguages[0].isDefault = true;
            }
            const defaultLanguage = ((_a = availableLanguages.find((s) => s.isDefault)) === null || _a === void 0 ? void 0 : _a.code) || 'en';
            if (props.languages) {
                spec.languages = availableLanguages;
            }
            if (this.config.multilingual) {
                this.context.languages = availableLanguages;
            }
            const languageToUse = props.language || defaultLanguage;
            // VAT types
            if (props.vatTypes) {
                spec.vatTypes = await (0, vat_types_1.getExistingVatTypes)(this.context);
                (0, utils_1.removeUnwantedFieldsFromThing)(spec.vatTypes, ['id', 'tenantId']);
            }
            // Subscription plans
            if (props.subscriptionPlans) {
                const subscriptionPlans = await (0, subscription_plans_1.getExistingSubscriptionPlans)(this.context);
                // @ts-ignore
                spec.subscriptionPlans = subscriptionPlans.map((s) => {
                    var _a, _b;
                    return ({
                        identifier: s.identifier,
                        name: s.name || '',
                        meteredVariables: ((_a = s.meteredVariables) === null || _a === void 0 ? void 0 : _a.map((m) => ({
                            identifier: m.identifier,
                            name: m.name || '',
                            unit: m.unit,
                        }))) || [],
                        periods: ((_b = s.periods) === null || _b === void 0 ? void 0 : _b.map((p) => ({
                            name: p.name || '',
                            initial: (0, utils_1.removeUnwantedFieldsFromThing)(p.initial, ['id']),
                            recurring: (0, utils_1.removeUnwantedFieldsFromThing)(p.recurring, ['id']),
                        }))) || [],
                    });
                });
            }
            // Price variants
            const priceVariants = await (0, price_variants_1.getExistingPriceVariants)(this.context);
            if (props.priceVariants) {
                spec.priceVariants = priceVariants;
            }
            // Topic maps (in just 1 language right now)
            if (props.topicMaps) {
                spec.topicMaps = await (0, topics_1.getAllTopicsForSpec)(languageToUse, this.context);
                (0, utils_1.removeUnwantedFieldsFromThing)(spec.topicMaps, ['id']);
            }
            // Shapes
            if (props.shapes) {
                spec.shapes = await (0, shapes_1.getExistingShapesForSpec)(this.context, props.onUpdate);
            }
            // Grids
            if (props.grids) {
                spec.grids = await (0, get_all_grids_1.getAllGrids)(languageToUse, this.context);
            }
            // Items
            if (props.items) {
                const options = { basePath: '/' };
                if (typeof props.items !== 'boolean') {
                    const optionsOverride = props.items;
                    Object.assign(options, optionsOverride);
                }
                spec.items = await (0, get_all_catalogue_items_1.getAllCatalogueItems)(languageToUse, this.context, options);
                spec.items.forEach((i) => {
                    function handleLevel(a) {
                        if (a && typeof a === 'object') {
                            if ('subscriptionPlans' in a && 'sku' in a) {
                                (0, utils_1.removeUnwantedFieldsFromThing)(a.subscriptionPlans, ['id']);
                            }
                            else {
                                Object.values(a).forEach(handleLevel);
                            }
                        }
                        else if (Array.isArray(a)) {
                            a.forEach(handleLevel);
                        }
                    }
                    handleLevel(i);
                });
            }
            // Stock locations
            if (props.stockLocations) {
                spec.stockLocations = await (0, stock_locations_1.getExistingStockLocations)(this.context);
            }
        }
        catch (error) {
            this.emit(utils_1.EVENT_NAMES.ERROR, {
                error,
            });
        }
        return spec;
    }
    async start() {
        try {
            await this.ensureTenantExists();
            await this.getTenantBasics();
            // Store the config in the context for easy access
            this.context.config = this.config;
            const start = new Date();
            await this.setLanguages();
            await this.setPriceVariants();
            await this.setStockLocations();
            await this.setSubscriptionPlans();
            await this.setVatTypes();
            await this.setShapes();
            await this.setTopics();
            await this.setGrids();
            await this.setItems();
            await this.setCustomers();
            await this.setOrders();
            // Set (update) grids again to update include the items
            await this.setGrids(true);
            const end = new Date();
            this.emit(utils_1.EVENT_NAMES.DONE, {
                start,
                end,
                duration: new duration_1.default(start, end).toString(1),
                spec: this.SPEC,
            });
        }
        catch (error) {
            this.emit(utils_1.EVENT_NAMES.ERROR, {
                error,
            });
        }
    }
    areaUpdate(statusArea, areaUpdate) {
        if ('progress' in areaUpdate) {
            this.status = (0, immer_1.default)(this.status, (status) => {
                if (areaUpdate.progress) {
                    status[statusArea].progress = areaUpdate.progress;
                }
                if (areaUpdate.warning) {
                    status[statusArea].warnings.push(areaUpdate.warning);
                }
            });
            this.emit(utils_1.EVENT_NAMES.STATUS_UPDATE, (0, immer_1.default)(this.status, () => { }));
        }
        else if (areaUpdate.warning) {
            this.emit(utils_1.EVENT_NAMES.ERROR, {
                error: JSON.stringify(areaUpdate.warning, null, 1),
            });
        }
    }
    async setLanguages() {
        var _a;
        const languages = await (0, languages_1.setLanguages)({
            spec: this.SPEC,
            context: this.context,
            onUpdate: (stepStatus) => {
                this.emit(utils_1.EVENT_NAMES.LANGUAGES_UPDATE, stepStatus);
                this.areaUpdate('languages', stepStatus);
            },
        });
        if (!languages) {
            throw new Error('Cannot get languages for the tenant');
        }
        this.context.languages = languages;
        const defaultLanguage = (_a = this.context.languages) === null || _a === void 0 ? void 0 : _a.find((l) => l.isDefault);
        if (!defaultLanguage) {
            throw new Error('Cannot determine default language for the tenant');
        }
        this.context.defaultLanguage = defaultLanguage;
        if (!this.config.multilingual) {
            this.context.languages = [defaultLanguage];
        }
        this.emit(utils_1.EVENT_NAMES.LANGUAGES_DONE);
    }
    async setShapes() {
        this.context.shapes = await (0, shapes_1.setShapes)({
            spec: this.SPEC,
            context: this.context,
            onUpdate: (areaUpdate) => {
                this.emit(utils_1.EVENT_NAMES.SHAPES_UPDATE, areaUpdate);
                this.areaUpdate('shapes', areaUpdate);
            },
        });
        this.emit(utils_1.EVENT_NAMES.SHAPES_DONE);
    }
    async setPriceVariants() {
        this.context.priceVariants = await (0, price_variants_1.setPriceVariants)({
            spec: this.SPEC,
            context: this.context,
            onUpdate: (areaUpdate) => {
                this.emit(utils_1.EVENT_NAMES.PRICE_VARIANTS_UPDATE, areaUpdate);
                this.areaUpdate('priceVariants', areaUpdate);
            },
        });
        this.emit(utils_1.EVENT_NAMES.PRICE_VARIANTS_DONE);
    }
    async setSubscriptionPlans() {
        this.context.subscriptionPlans = await (0, subscription_plans_1.setSubscriptionPlans)({
            spec: this.SPEC,
            context: this.context,
            onUpdate: (areaUpdate) => {
                this.emit(utils_1.EVENT_NAMES.SUBSCRIPTION_PLANS_UPDATE, areaUpdate);
                this.areaUpdate('subscriptionPlans', areaUpdate);
            },
        });
        this.emit(utils_1.EVENT_NAMES.SUBSCRIPTION_PLANS_DONE);
    }
    async setVatTypes() {
        this.context.vatTypes = await (0, vat_types_1.setVatTypes)({
            spec: this.SPEC,
            context: this.context,
            onUpdate: (areaUpdate) => {
                this.emit(utils_1.EVENT_NAMES.VAT_TYPES_UPDATE, areaUpdate);
                this.areaUpdate('vatTypes', areaUpdate);
            },
        });
        this.emit(utils_1.EVENT_NAMES.VAT_TYPES_DONE);
    }
    async setTopics() {
        await (0, topics_1.setTopics)({
            spec: this.SPEC,
            onUpdate: (areaUpdate) => {
                this.emit(utils_1.EVENT_NAMES.TOPICS_UPDATE, areaUpdate);
                this.areaUpdate('topicMaps', areaUpdate);
            },
            context: this.context,
        });
        this.emit(utils_1.EVENT_NAMES.TOPICS_DONE);
    }
    async setGrids(allowUpdate) {
        await (0, grids_1.setGrids)({
            spec: this.SPEC,
            onUpdate: (areaUpdate) => {
                this.emit(utils_1.EVENT_NAMES.GRIDS_UPDATE, areaUpdate);
                this.areaUpdate('grids', areaUpdate);
            },
            context: this.context,
            allowUpdate,
        });
        this.emit(utils_1.EVENT_NAMES.GRIDS_DONE);
    }
    async setItems() {
        await (0, items_1.setItems)({
            spec: this.SPEC,
            onUpdate: (areaUpdate) => {
                if (areaUpdate.message === 'media-upload-progress') {
                    this.areaUpdate('media', areaUpdate);
                }
                else {
                    this.emit(utils_1.EVENT_NAMES.ITEMS_UPDATE, areaUpdate);
                    this.areaUpdate('items', areaUpdate);
                }
            },
            context: this.context,
        });
        this.emit(utils_1.EVENT_NAMES.ITEMS_DONE);
    }
    async setStockLocations() {
        this.context.stockLocations = await (0, stock_locations_1.setStockLocations)({
            spec: this.SPEC,
            context: this.context,
            onUpdate: (areaUpdate) => {
                this.emit(utils_1.EVENT_NAMES.STOCK_LOCATIONS_UPDATE, areaUpdate);
                this.areaUpdate('stockLocations', areaUpdate);
            },
        });
        this.emit(utils_1.EVENT_NAMES.STOCK_LOCATIONS_DONE);
    }
    async setCustomers() {
        await (0, customers_1.setCustomers)({
            spec: this.SPEC,
            context: this.context,
            onUpdate: (areaUpdate) => {
                this.emit(utils_1.EVENT_NAMES.CUSTOMERS_UPDATE, areaUpdate);
                this.areaUpdate('customers', areaUpdate);
            },
        });
        this.emit(utils_1.EVENT_NAMES.CUSTOMERS_DONE);
    }
    async setOrders() {
        await (0, orders_1.setOrders)({
            spec: this.SPEC,
            context: this.context,
            onUpdate: (areaUpdate) => {
                this.emit(utils_1.EVENT_NAMES.ORDERS_UPDATE, areaUpdate);
                this.areaUpdate('orders', areaUpdate);
            },
        });
        this.emit(utils_1.EVENT_NAMES.ORDERS_DONE);
    }
}
exports.Bootstrapper = Bootstrapper;
