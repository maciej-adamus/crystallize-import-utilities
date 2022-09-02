"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const build_get_items_by_shape_query_1 = require("./build-get-items-by-shape-query");
(0, ava_1.default)('get items with id and language', (t) => {
    const got = (0, build_get_items_by_shape_query_1.buildGetItemsByShapeQuery)('1234', 'my-shape', 'en').replace(/ /g, '');
    const want = `
    query {
      shape {
        get (tenantId: "1234", identifier: "my-shape") {
          identifier
          name
          items(language: "en") {
            id
            name
            components {
              componentId
              type
              content {
                ... on BooleanContent {
                  value
                }
                ... on ComponentChoiceContent {
                  selectedComponent {
                    componentId
                    type
                  }
                }
                ... on DatetimeContent {
                  datetime
                }
                ... on GridRelationsContent {
                  grids {
                    id
                  }
                }
                ... on ImageContent {
                  images {
                    key
                  }
                }
                ... on ItemRelationsContent {
                  items {
                    id
                  }
                }
                ... on LocationContent {
                  lat
                  long
                }
                ... on NumericContent {
                  number
                  unit
                }
                ... on PropertiesTableContent {
                  sections {
                    title
                    properties {
                      key
                      value
                    }
                  }
                }
                ... on RichTextContent {
                  json
                  html
                }
                ... on SingleLineContent {
                  text
                }
                ... on VideoContent {
                  videos {
                    id
                    title
                  }
                }

                ... on ContentChunkContent {
                  chunks {
                    componentId
                    type
                    content {
                      ... on BooleanContent {
                        value
                      }
                      ... on ComponentChoiceContent {
                        selectedComponent {
                          componentId
                          type
                        }
                      }
                      ... on DatetimeContent {
                        datetime
                      }
                      ... on GridRelationsContent {
                        grids {
                          id
                        }
                      }
                      ... on ImageContent {
                        images {
                          key
                        }
                      }
                      ... on ItemRelationsContent {
                        items {
                          id
                        }
                      }
                      ... on LocationContent {
                        lat
                        long
                      }
                      ... on NumericContent {
                        number
                        unit
                      }
                      ... on PropertiesTableContent {
                        sections {
                          title
                          properties {
                            key
                            value
                          }
                        }
                      }
                      ... on RichTextContent {
                        json
                        html
                      }
                      ... on SingleLineContent {
                        text
                      }
                      ... on VideoContent {
                        videos {
                          id
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on Product {
              variants {
                id
                isDefault
                name
                sku
                price
              }
            }
          }
        }
      }
    }
  `
        .replace(/\n/g, '')
        .replace(/ /g, '');
    t.is(got, want, 'query string should match');
});
