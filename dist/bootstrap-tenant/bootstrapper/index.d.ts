/// <reference types="node" />
import { EventEmitter } from 'events';
import { JsonSpec } from '../json-spec';
export * from './utils';
import { AreaUpdate, BootstrapperContext, AreaWarning, Config, ApiManager } from './utils';
import { ItemsCreateSpecOptions } from './utils/get-all-catalogue-items';
export interface ICreateSpec {
    language?: string;
    shapes: boolean;
    grids: boolean;
    items: boolean | ItemsCreateSpecOptions;
    languages: boolean;
    priceVariants: boolean;
    vatTypes: boolean;
    subscriptionPlans: boolean;
    topicMaps: boolean;
    stockLocations: boolean;
    onUpdate: (t: AreaUpdate) => any;
}
export declare const createSpecDefaults: ICreateSpec;
interface AreaStatus {
    progress: number;
    warnings: AreaWarning[];
}
export interface Status {
    media: AreaStatus;
    shapes: AreaStatus;
    grids: AreaStatus;
    items: AreaStatus;
    languages: AreaStatus;
    customers: AreaStatus;
    orders: AreaStatus;
    priceVariants: AreaStatus;
    vatTypes: AreaStatus;
    subscriptionPlans: AreaStatus;
    topicMaps: AreaStatus;
    stockLocations: AreaStatus;
}
export declare class Bootstrapper extends EventEmitter {
    SPEC: JsonSpec | null;
    PIMAPIManager: ApiManager | null;
    catalogueAPIManager: ApiManager | null;
    searchAPIManager: ApiManager | null;
    ordersAPIManager: ApiManager | null;
    tenantIdentifier: string;
    context: BootstrapperContext;
    config: Config;
    status: Status;
    getStatus: () => Status;
    setAccessToken: (ACCESS_TOKEN_ID: string, ACCESS_TOKEN_SECRET: string) => void;
    setSpec(spec: JsonSpec): void;
    setTenantIdentifier: (tenantIdentifier: string) => Promise<void>;
    getTenantBasics: () => Promise<boolean>;
    ensureTenantExists(): Promise<boolean>;
    createSpec(props?: ICreateSpec): Promise<JsonSpec>;
    start(): Promise<void>;
    private areaUpdate;
    setLanguages(): Promise<void>;
    setShapes(): Promise<void>;
    setPriceVariants(): Promise<void>;
    setSubscriptionPlans(): Promise<void>;
    setVatTypes(): Promise<void>;
    setTopics(): Promise<void>;
    setGrids(allowUpdate?: boolean): Promise<void>;
    setItems(): Promise<void>;
    setStockLocations(): Promise<void>;
    setCustomers(): Promise<void>;
    setOrders(): Promise<void>;
}
