import { SubscriptionPlan } from '../../../generated/graphql';
import { Shape } from '../../../types';
import { JSONLanguage, JSONPriceVariant, JSONVatType, JSONStockLocation } from '../../json-spec';
import { IcallAPI, IcallAPIResult } from './api';
import { ItemAndParentId } from './get-item-id';
import { RemoteFileUploadResult } from './remote-file-upload';
import { LogLevel } from './types';
export * from './api';
export * from './get-item-id';
export declare const EVENT_NAMES: {
    DONE: string;
    ERROR: string;
    STATUS_UPDATE: string;
    SHAPES_UPDATE: string;
    SHAPES_DONE: string;
    PRICE_VARIANTS_UPDATE: string;
    PRICE_VARIANTS_DONE: string;
    SUBSCRIPTION_PLANS_UPDATE: string;
    SUBSCRIPTION_PLANS_DONE: string;
    LANGUAGES_UPDATE: string;
    LANGUAGES_DONE: string;
    VAT_TYPES_UPDATE: string;
    VAT_TYPES_DONE: string;
    TOPICS_UPDATE: string;
    TOPICS_DONE: string;
    GRIDS_UPDATE: string;
    GRIDS_DONE: string;
    ITEMS_UPDATE: string;
    ITEMS_DONE: string;
    ORDERS_UPDATE: string;
    ORDERS_DONE: string;
    CUSTOMERS_UPDATE: string;
    CUSTOMERS_DONE: string;
    STOCK_LOCATIONS_UPDATE: string;
    STOCK_LOCATIONS_DONE: string;
};
export interface AreaWarning {
    message: string;
    code: 'FFMPEG_UNAVAILABLE' | 'UPLOAD_FAILED' | 'SHAPE_ID_TRUNCATED' | 'CANNOT_HANDLE_ITEM' | 'CANNOT_HANDLE_PRODUCT' | 'CANNOT_HANDLE_ITEM_RELATION' | 'OTHER';
}
export interface AreaUpdate {
    progress?: number;
    message?: string;
    warning?: AreaWarning;
}
export interface Config {
    itemTopics?: 'amend' | 'replace';
    itemPublish?: 'publish' | 'auto';
    logLevel?: LogLevel;
    multilingual?: boolean;
    experimental: {
        parallelize?: boolean;
    };
}
export interface BootstrapperContext {
    tenantId: string;
    tenantIdentifier: string;
    defaultLanguage: JSONLanguage;
    languages: JSONLanguage[];
    shapes?: Shape[];
    priceVariants?: JSONPriceVariant[];
    subscriptionPlans?: SubscriptionPlan[];
    vatTypes?: JSONVatType[];
    config: Config;
    useReferenceCache: boolean;
    stockLocations?: JSONStockLocation[];
    itemCataloguePathToIDMap: Map<string, ItemAndParentId>;
    itemExternalReferenceToIDMap: Map<string, ItemAndParentId>;
    topicPathToIDMap: Map<string, string>;
    itemVersions: Map<string, ItemVersionsForLanguages>;
    fileUploader: FileUploadManager;
    uploadFileFromUrl: (url: string) => Promise<RemoteFileUploadResult | null>;
    callPIM: (props: IcallAPI) => Promise<IcallAPIResult>;
    callCatalogue: (props: IcallAPI) => Promise<IcallAPIResult>;
    callSearch: (props: IcallAPI) => Promise<IcallAPIResult>;
    callOrders: (props: IcallAPI) => Promise<IcallAPIResult>;
    emitError: (error: string) => void;
}
export declare function getTranslation(translation?: any, language?: string): string;
declare type uploadFileRecord = {
    url: string;
    result: Promise<RemoteFileUploadResult | null>;
};
declare type fileUploadQueueItem = {
    url: string;
    status: 'not-started' | 'working' | 'done';
    failCount?: number;
    resolve?: (result: RemoteFileUploadResult | null) => void;
    reject?: (r: any) => void;
};
export declare class FileUploadManager {
    uploads: uploadFileRecord[];
    maxWorkers: number;
    workerQueue: fileUploadQueueItem[];
    context?: BootstrapperContext;
    constructor();
    work(): Promise<void>;
    uploadFromUrl(url: string): Promise<RemoteFileUploadResult | null>;
    scheduleUpload(url: string): Promise<RemoteFileUploadResult | null>;
}
export declare function validShapeIdentifier(str: string, onUpdate: (t: AreaUpdate) => any): string;
export declare enum ItemVersionDescription {
    Unpublished = 0,
    StaleVersionPublished = 1,
    Published = 2
}
interface IgetItemVersionsForLanguages {
    languages: string[];
    itemId: string;
    context: BootstrapperContext;
}
export declare type ItemVersionsForLanguages = Record<string, ItemVersionDescription>;
export declare function getItemVersionsForLanguages({ languages, itemId, context, }: IgetItemVersionsForLanguages): Promise<ItemVersionsForLanguages>;
export declare function chunkArray<T>({ array, chunkSize, }: {
    array: T[];
    chunkSize: number;
}): [T[]];
export declare function removeUnwantedFieldsFromThing(thing: any, fieldsToRemove: string[]): any;
