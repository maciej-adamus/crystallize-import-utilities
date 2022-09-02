"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const build_create_grid_mutation_1 = require("./build-create-grid-mutation");
(0, ava_1.default)('create grid', (t) => {
    const grid = {
        language: 'en',
        input: {
            tenantId: '1234',
            name: 'My grid',
            rows: [
                {
                    columns: [
                        {
                            itemId: '987',
                            layout: {
                                rowspan: 2,
                                colspan: 2,
                            },
                        },
                    ],
                },
            ],
        },
    };
    const got = (0, build_create_grid_mutation_1.buildCreateGridMutation)(grid).replace(/ /g, '');
    const want = `
    mutation {
      grid {
        create (
          language: "en",
          input: {
            tenantId: "1234",
            name: "My grid",
            rows: [
              {
                columns: [
                  {
                    itemId: "987",
                    layout: {
                      rowspan: 2,
                      colspan: 2
                    }
                  }
                ]
              }
            ]
          }
        ) {
          id
          name
        }
      }
    }
  `
        .replace(/\n/g, '')
        .replace(/ /g, '');
    t.is(got, want, 'mutation string should match');
});
