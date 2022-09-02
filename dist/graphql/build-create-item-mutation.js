"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCreateItemQueryAndVariables = exports.buildCreateItemMutation = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const json_to_graphql_query_1 = require("json-to-graphql-query");
const types_1 = require("../types");
const buildCreateItemMutation = (input, type, language) => {
    const mutation = {
        mutation: {},
    };
    const components = input.components || {};
    mutation.mutation[type] = {
        create: {
            __args: {
                input: Object.assign(Object.assign({}, input), { components: Object.keys(components).map((componentId) => (Object.assign(Object.assign({}, components[componentId]), { componentId }))) }),
                language,
            },
            id: true,
            name: true,
            externalReference: true,
            tree: {
                path: true,
            },
        },
    };
    return (0, json_to_graphql_query_1.jsonToGraphQLQuery)(mutation);
};
exports.buildCreateItemMutation = buildCreateItemMutation;
function buildCreateItemQueryAndVariables(input, type, language) {
    let inputType;
    let topFieldName;
    switch (type) {
        case types_1.ItemType.Document: {
            inputType = 'CreateDocumentInput';
            topFieldName = 'document';
            break;
        }
        case types_1.ItemType.Folder: {
            inputType = 'CreateFolderInput';
            topFieldName = 'folder';
            break;
        }
        case types_1.ItemType.Product: {
            inputType = 'CreateProductInput';
            topFieldName = 'product';
            break;
        }
        default: {
            throw new Error(`Create item failed. Type "${type}" is not supported`);
        }
    }
    const components = input.components || {};
    let variables = {
        language,
        input: Object.assign(Object.assign({}, input), { components: Object.keys(components).map((componentId) => (Object.assign(Object.assign({}, components[componentId]), { componentId }))) }),
    };
    return {
        query: (0, graphql_tag_1.default) `
      mutation CREATE_ITEM ($language: String!, $input: ${inputType}!) {
        ${topFieldName} {
          create (language: $language, input: $input) {
            id
            externalReference
            tree {
              path
            }
          }
        }
      }
    `,
        variables,
    };
}
exports.buildCreateItemQueryAndVariables = buildCreateItemQueryAndVariables;
