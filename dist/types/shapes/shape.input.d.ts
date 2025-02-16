import { EnumType } from 'json-to-graphql-query';
import { ComponentInput } from './components/component.input';
import { KeyValuePairInput } from './key-value-pair.input';
export declare const shapeTypes: {
    product: EnumType;
    document: EnumType;
    folder: EnumType;
};
export interface ShapeInput {
    identifier?: string;
    tenantId?: string;
    name: string;
    type: EnumType;
    meta?: KeyValuePairInput[];
    components?: ComponentInput[];
}
export interface ShapeUpdateInput {
    id: string;
    name?: string;
    identifier: string;
    tenantId: string;
    input: ShapeUpdateInputInput;
}
export interface ShapeUpdateInputInput {
    name?: string;
    meta?: KeyValuePairInput[];
    components?: ComponentInput[];
}
