"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGrids = void 0;
const QUERY = `
query GET_GRIDS($tenantId: ID!, $language: String!) {
	grid {
    getMany (
      tenantId: $tenantId
      language: $language
    ) {
      id
      name
      rows {
        columns {
          item {
            externalReference
            tree {
              path(language: $language)
            }
          }
          layout {
            rowspan
            colspan
          }
        }
      }
    }
  }
}
`;
async function getAllGrids(language, context) {
    var _a, _b, _c;
    const response = await context.callPIM({
        query: QUERY,
        variables: {
            language,
            tenantId: context.tenantId,
        },
    });
    function handleRow(row) {
        return {
            columns: row.columns.map((c) => ({
                layout: c.layout,
                item: !c.item
                    ? null
                    : {
                        externalReference: c.item.tree.externalReference,
                        cataloguePath: c.item.tree.path,
                    },
            })),
        };
    }
    function handleGrid(grid) {
        var _a;
        return Object.assign(Object.assign({}, grid), { rows: ((_a = grid.rows) === null || _a === void 0 ? void 0 : _a.map(handleRow)) || [] });
    }
    return ((_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.grid) === null || _b === void 0 ? void 0 : _b.getMany) === null || _c === void 0 ? void 0 : _c.map(handleGrid)) || [];
}
exports.getAllGrids = getAllGrids;
