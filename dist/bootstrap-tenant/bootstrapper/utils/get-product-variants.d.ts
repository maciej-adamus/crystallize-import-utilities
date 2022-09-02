import { BootstrapperContext } from '.';
import { ProductVariant } from '../../../generated/graphql';
export declare function getProductVariants(language: string, itemId: string, context: BootstrapperContext): Promise<ProductVariant[]>;
