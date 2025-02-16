import { EnumType } from 'json-to-graphql-query';
export declare const componentTypes: {
    boolean: EnumType;
    componentChoice: EnumType;
    contentChunk: EnumType;
    datetime: EnumType;
    gridRelations: EnumType;
    images: EnumType;
    itemRelations: EnumType;
    location: EnumType;
    numeric: EnumType;
    paragraphCollection: EnumType;
    propertiesTable: EnumType;
    richText: EnumType;
    singleLine: EnumType;
    videos: EnumType;
    selection: EnumType;
    files: EnumType;
};
export interface ComponentConfigInput {
}
export interface ComponentInput {
    id: string;
    name: string;
    type: EnumType;
    description?: string;
    config?: ComponentConfigInput;
}
