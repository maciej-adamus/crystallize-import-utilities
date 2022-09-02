"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGetItemsByShapeQuery = void 0;
const json_to_graphql_query_1 = require("json-to-graphql-query");
const basicComponentContent = [
    {
        __typeName: 'BooleanContent',
        value: true,
    },
    {
        __typeName: 'ComponentChoiceContent',
        selectedComponent: {
            componentId: true,
            type: true,
        },
    },
    {
        __typeName: 'DatetimeContent',
        datetime: true,
    },
    {
        __typeName: 'GridRelationsContent',
        grids: {
            id: true,
        },
    },
    {
        __typeName: 'ImageContent',
        images: {
            key: true,
        },
    },
    {
        __typeName: 'ItemRelationsContent',
        items: {
            id: true,
        },
    },
    {
        __typeName: 'LocationContent',
        lat: true,
        long: true,
    },
    {
        __typeName: 'NumericContent',
        number: true,
        unit: true,
    },
    {
        __typeName: 'PropertiesTableContent',
        sections: {
            title: true,
            properties: {
                key: true,
                value: true,
            },
        },
    },
    {
        __typeName: 'RichTextContent',
        json: true,
        html: true,
    },
    {
        __typeName: 'SingleLineContent',
        text: true,
    },
    {
        __typeName: 'VideoContent',
        videos: {
            id: true,
            title: true,
        },
    },
];
const buildGetItemsByShapeQuery = (tenantId, identifier, language) => {
    const query = {
        query: {
            shape: {
                get: {
                    __args: {
                        tenantId,
                        identifier,
                    },
                    identifier: true,
                    name: true,
                    items: {
                        __args: {
                            language,
                        },
                        __on: {
                            __typeName: 'Product',
                            variants: {
                                id: true,
                                isDefault: true,
                                name: true,
                                sku: true,
                                price: true,
                            },
                        },
                        id: true,
                        name: true,
                        components: {
                            componentId: true,
                            type: true,
                            content: {
                                __on: [
                                    ...basicComponentContent,
                                    {
                                        __typeName: 'ContentChunkContent',
                                        chunks: {
                                            componentId: true,
                                            type: true,
                                            content: {
                                                __on: basicComponentContent,
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
    };
    return (0, json_to_graphql_query_1.jsonToGraphQLQuery)(query);
};
exports.buildGetItemsByShapeQuery = buildGetItemsByShapeQuery;
