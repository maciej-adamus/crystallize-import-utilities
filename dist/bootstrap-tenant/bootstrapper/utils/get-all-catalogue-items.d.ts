import { BootstrapperContext } from '.';
import { JSONItem } from '../../json-spec';
export interface ItemsCreateSpecOptions {
    basePath?: String;
    version?: 'published' | 'draft';
}
export declare function getAllCatalogueItems(lng: string, context: BootstrapperContext, options?: ItemsCreateSpecOptions): Promise<JSONItem[]>;
