"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGrids = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const build_create_grid_mutation_1 = require("../../graphql/build-create-grid-mutation");
const build_update_grid_mutation_1 = require("../../graphql/build-update-grid-mutation");
const utils_1 = require("./utils");
const get_all_grids_1 = require("./utils/get-all-grids");
// Get item ids from reference
async function setItemIds(grid, language, context) {
    return Promise.all(grid.rows.map(async (row) => {
        await Promise.all(row.columns.map(async (column) => {
            var _a, _b;
            const { itemId } = await (0, utils_1.getItemId)({
                context,
                externalReference: (_a = column.item) === null || _a === void 0 ? void 0 : _a.externalReference,
                cataloguePath: (_b = column.item) === null || _b === void 0 ? void 0 : _b.cataloguePath,
                language: context.defaultLanguage.code,
            });
            if (itemId) {
                column.itemId = itemId;
            }
            delete column.item;
        }));
    }));
}
async function createGrid(grid, language, context) {
    // Do NOT set item ids here. This will be done later in the
    // updateGrid mutation
    // await setItemIds(grid, language, context)
    var _a, _b, _c;
    const r = await context.callPIM({
        query: (0, build_create_grid_mutation_1.buildCreateGridMutation)({
            language,
            input: {
                tenantId: context.tenantId,
                name: (0, utils_1.getTranslation)(grid.name, language),
                rows: grid.rows.map(function removeItemField(row) {
                    return {
                        columns: row.columns.map(({ layout }) => ({ layout })),
                    };
                }),
            },
        }),
    });
    return ((_c = (_b = (_a = r.data) === null || _a === void 0 ? void 0 : _a.grid) === null || _b === void 0 ? void 0 : _b.create) === null || _c === void 0 ? void 0 : _c.id) || null;
}
async function updateGrid(grid, language, context) {
    var _a, _b, _c;
    if (!grid.id) {
        return null;
    }
    await setItemIds(grid, language, context);
    const r = await context.callPIM({
        query: (0, build_update_grid_mutation_1.buildUpdateGridMutation)({
            id: grid.id,
            language,
            input: {
                name: (0, utils_1.getTranslation)(grid.name, language),
                rows: grid.rows,
            },
        }),
    });
    return ((_c = (_b = (_a = r.data) === null || _a === void 0 ? void 0 : _a.grid) === null || _b === void 0 ? void 0 : _b.update) === null || _c === void 0 ? void 0 : _c.id) || null;
}
async function publishGrid(id, language, context) {
    return context.callPIM({
        query: (0, graphql_tag_1.default) `
      mutation ($id: ID!, $language: String!) {
        grid {
          publish(id: $id, language: $language) {
            id
          }
        }
      }
    `,
        variables: {
            id,
            language,
        },
    });
}
async function setGrids(props) {
    const { spec, context, onUpdate, allowUpdate } = props;
    if (!(spec === null || spec === void 0 ? void 0 : spec.grids)) {
        return;
    }
    const language = context.defaultLanguage.code;
    const existingGrids = await (0, get_all_grids_1.getAllGrids)(language, context);
    const missingGrids = [];
    // Determine missing grids by matching the name
    spec === null || spec === void 0 ? void 0 : spec.grids.forEach((grid) => {
        const translatedName = (0, utils_1.getTranslation)(grid.name, language);
        if (!existingGrids.some((t) => t.name === translatedName)) {
            missingGrids.push(grid);
        }
    });
    let finishedGrids = 0;
    // Add missing grids
    await Promise.all(missingGrids.map(async (grid) => {
        const id = await createGrid(grid, language, context);
        if (id) {
            grid.id = id;
            // No need to publish now. It will happen in the update phase later
            // await publishGrid(id, language, context)
            finishedGrids++;
            onUpdate({
                progress: finishedGrids / missingGrids.length,
                message: `Created ${(0, utils_1.getTranslation)(grid.name, language)}`,
            });
        }
    }));
    // Update existing grids
    if (allowUpdate) {
        await Promise.all(existingGrids.map(async (existingGrid) => {
            var _a;
            const jsonGrid = (_a = spec.grids) === null || _a === void 0 ? void 0 : _a.find((g) => (0, utils_1.getTranslation)(g.name, language) === existingGrid.name);
            if (jsonGrid) {
                jsonGrid.id = existingGrid.id;
                if (jsonGrid.id) {
                    await updateGrid(jsonGrid, language, context);
                    await publishGrid(jsonGrid.id, language, context);
                }
            }
        }));
    }
    onUpdate({
        progress: 1,
    });
}
exports.setGrids = setGrids;
