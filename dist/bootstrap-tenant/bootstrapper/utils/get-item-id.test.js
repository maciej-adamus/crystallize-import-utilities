"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const get_item_id_1 = require("./get-item-id");
const testCases = [
    {
        name: 'gets item id by catalogue path from context if it exists',
        props: {
            context: {
                itemCataloguePathToIDMap: new Map().set('/foo/bar/baz', { itemId: 'some-id-1', parentId: 'some-parent-id-1' }),
            },
            language: 'en',
            cataloguePath: '/foo/bar/baz',
        },
        expected: {
            itemId: 'some-id-1',
            parentId: 'some-parent-id-1',
        },
    },
    {
        name: 'gets item id by catalogue path from the api if it exists',
        props: {
            context: {
                callCatalogue: async (_) => ({
                    data: {
                        published: {
                            id: 'some-id',
                            parent: {
                                id: 'some-parent-id',
                            },
                        },
                    },
                }),
                itemCataloguePathToIDMap: new Map(),
            },
            language: 'en',
            cataloguePath: '/foo/bar/baz',
        },
        expected: {
            itemId: 'some-id',
            parentId: 'some-parent-id',
        },
    },
    {
        name: 'gets item id by external reference from context if it exists',
        props: {
            context: {
                itemExternalReferenceToIDMap: new Map().set('some-item', { itemId: 'some-id', parentId: 'some-parent-id' }),
            },
            language: 'en',
            externalReference: 'some-item',
        },
        expected: {
            itemId: 'some-id',
            parentId: 'some-parent-id',
        },
    },
    {
        name: 'gets item id by external reference from the api if it exists',
        props: {
            context: {
                callPIM: async (_) => ({
                    data: {
                        item: {
                            getMany: [
                                {
                                    id: 'some-id',
                                    tree: {
                                        parentId: 'some-parent-id',
                                    },
                                },
                            ],
                        },
                    },
                }),
                itemExternalReferenceToIDMap: new Map(),
            },
            language: 'en',
            externalReference: 'some-item',
        },
        expected: {
            itemId: 'some-id',
            parentId: 'some-parent-id',
        },
    },
    {
        name: 'only gets items by external reference from the api matching the provided shape identifier',
        props: {
            context: {
                callPIM: async (_) => ({
                    data: {
                        item: {
                            getMany: [
                                {
                                    id: 'some-wrong-id',
                                    tree: {
                                        parentId: 'some-wrong-parent-id',
                                    },
                                    shape: {
                                        identifier: 'some-wrong-shape',
                                    },
                                },
                                {
                                    id: 'some-id',
                                    tree: {
                                        parentId: 'some-parent-id',
                                    },
                                    shape: {
                                        identifier: 'some-shape',
                                    },
                                },
                            ],
                        },
                    },
                }),
                itemExternalReferenceToIDMap: new Map(),
            },
            language: 'en',
            externalReference: 'some-item',
            shapeIdentifier: 'some-shape',
        },
        expected: {
            itemId: 'some-id',
            parentId: 'some-parent-id',
        },
    },
];
testCases.forEach((tc) => ava_1.default.serial(tc.name, async (t) => {
    const actual = await (0, get_item_id_1.getItemId)(tc.props);
    t.deepEqual(actual, tc.expected, 'id and parent respose matches expected value');
}));
