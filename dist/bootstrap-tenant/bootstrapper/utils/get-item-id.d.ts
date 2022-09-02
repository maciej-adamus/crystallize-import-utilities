import { BootstrapperContext } from '.';
export interface ItemAndParentId {
    itemId?: string;
    parentId?: string;
}
export interface IGetItemIdProps {
    context: BootstrapperContext;
    cataloguePath?: string;
    externalReference?: string;
    shapeIdentifier?: string;
    language: string;
}
export declare const getItemId: ({ context, cataloguePath, externalReference, shapeIdentifier, language, }: IGetItemIdProps) => Promise<ItemAndParentId>;
