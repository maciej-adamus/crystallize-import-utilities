"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductVariants = void 0;
async function getProductVariants(language, itemId, context) {
    var _a, _b, _c;
    const response = await context.callPIM({
        query: QUERY,
        variables: {
            language,
            itemId,
        },
    });
    return ((_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.get) === null || _c === void 0 ? void 0 : _c.variants) || [];
}
exports.getProductVariants = getProductVariants;
const QUERY = `
query GET_PRODUCT_INFO($language: String!, $itemId: ID!) {
  product {
    get(id: $itemId, language: $language) {
      variants {
        id
        name
        isDefault
        externalReference
        attributes {
          attribute
          value
        }
        priceVariants {
          ...pr
        }
        stockLocations {
          ...stockLocation
        }
        sku
        subscriptionPlans {
          identifier
          name
          periods {
            id
            initial {
              ...planPricing
            }
            recurring {
              ...planPricing
            }
          }
        }
        images {
          key
          altText
          caption {
            json
          }
          meta {
            key
            value
          }
        }
      }
    }
  }
}

fragment planPricing on ProductVariantSubscriptionPlanPricing {
  period
  unit
  meteredVariables {
    id
    identifier
    name
    tierType
    tiers {
      threshold
      priceVariants {
        ...pr
      }
    }
  }
  priceVariants {
    ...pr
  }
}

fragment pr on ProductPriceVariant {
  currency
  identifier
  name
  price
}

fragment stockLocation on ProductStockLocation {
  identifier
  name
  settings {
    minimum
    unlimited
  }
  stock
}
`;
