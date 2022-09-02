"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemId = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const externalReferenceQuery = (0, graphql_tag_1.default) `
  query GET_ID_FROM_EXTERNAL_REFERENCE(
    $externalReferences: [String!]
    $language: String!
    $tenantId: ID!
  ) {
    item {
      getMany(
        externalReferences: $externalReferences
        language: $language
        tenantId: $tenantId
      ) {
        id
        shape {
          identifier
        }
        tree {
          path
          parentId
        }
      }
    }
  }
`;
const cataloguePathQuery = (0, graphql_tag_1.default) `
  query GET_ID_FROM_PATH($path: String, $language: String) {
    published: catalogue(path: $path, language: $language, version: published) {
      id
      parent {
        id
      }
    }
    draft: catalogue(path: $path, language: $language, version: draft) {
      id
      parent {
        id
      }
    }
  }
`;
const getItemId = async ({ context, cataloguePath, externalReference, shapeIdentifier, language, }) => {
    let idAndParent = {};
    if (cataloguePath) {
        idAndParent = context.itemCataloguePathToIDMap.get(cataloguePath) || {};
        if (idAndParent.itemId) {
            return idAndParent;
        }
        idAndParent = await fetchItemIdFromCataloguePath({
            context,
            cataloguePath,
            language,
        });
        if (idAndParent.itemId) {
            return idAndParent;
        }
    }
    if (externalReference) {
        idAndParent =
            context.itemExternalReferenceToIDMap.get(externalReference) || {};
        if (idAndParent === null || idAndParent === void 0 ? void 0 : idAndParent.itemId) {
            return idAndParent;
        }
        return fetchItemIdFromExternalReference({
            context,
            externalReference,
            shapeIdentifier,
            language,
        });
    }
    return idAndParent;
};
exports.getItemId = getItemId;
const fetchItemIdFromExternalReference = async ({ context, externalReference, shapeIdentifier, language, }) => {
    var _a, _b, _c;
    const response = await context.callPIM({
        query: externalReferenceQuery,
        variables: {
            externalReferences: [externalReference],
            language,
            tenantId: context.tenantId,
        },
    });
    let items = ((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.getMany) || [];
    if (shapeIdentifier) {
        items = items.filter((s) => s.shape.identifier === shapeIdentifier);
    }
    const item = items[0];
    if (!item) {
        return {};
    }
    return {
        itemId: item.id,
        parentId: (_c = item.tree) === null || _c === void 0 ? void 0 : _c.parentId,
    };
};
const fetchItemIdFromCataloguePath = async ({ context, cataloguePath, language, }) => {
    var _a, _b, _c;
    const response = await context.callCatalogue({
        query: cataloguePathQuery,
        variables: {
            path: cataloguePath,
            language,
        },
    });
    // Favor published version over draft
    const item = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.published) || ((_b = response.data) === null || _b === void 0 ? void 0 : _b.draft);
    if (!item) {
        return {};
    }
    const idAndParent = {
        itemId: item.id,
        parentId: (_c = item.parent) === null || _c === void 0 ? void 0 : _c.id,
    };
    return idAndParent;
};
