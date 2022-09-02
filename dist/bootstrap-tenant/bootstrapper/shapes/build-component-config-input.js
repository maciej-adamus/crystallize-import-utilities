"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildComponentConfigInput = void 0;
const errors_1 = require("../errors");
const get_component_type_1 = require("./get-component-type");
const json_to_graphql_query_1 = require("json-to-graphql-query");
const buildItemRelationsComponentConfigInput = (component, existingShapes, isDeferred) => {
    var _a, _b, _c, _d, _e, _f;
    if (!component.config) {
        return null;
    }
    const conf = {
        config: {
            itemRelations: Object.assign({}, component.config),
        },
    };
    if (!((_b = (_a = component.config) === null || _a === void 0 ? void 0 : _a.acceptedShapeIdentifiers) === null || _b === void 0 ? void 0 : _b.length)) {
        (_d = (_c = conf.config) === null || _c === void 0 ? void 0 : _c.itemRelations) === null || _d === void 0 ? true : delete _d.acceptedShapeIdentifiers;
        return conf;
    }
    // API throws an error if related shape identifier does not exist.
    // We need to defer an update for this shape after the initial shape creation is complete.
    let deferUpdate = false;
    component.config.acceptedShapeIdentifiers.map((identifier) => {
        if (!existingShapes.find((shape) => shape.identifier === identifier)) {
            if (isDeferred) {
                // If we're updating the shape then we will throw an error, as the
                // related shapes should already exist. This also prevents an
                // endless loop of deferred updates when spec is invalid.
                throw new errors_1.InvalidItemRelationShapeIdentifier(identifier);
            }
            deferUpdate = true;
        }
    });
    if (deferUpdate) {
        conf.deferUpdate = true;
        (_f = (_e = conf.config) === null || _e === void 0 ? void 0 : _e.itemRelations) === null || _f === void 0 ? true : delete _f.acceptedShapeIdentifiers;
    }
    return conf;
};
const buildComponentConfigInput = (component, existingShapes, isDeferred) => {
    var _a, _b, _c, _d, _e;
    switch (component.type) {
        case 'propertiesTable': {
            // When updating an existing shape, we get "sections"
            const conf = ((_a = component.config) === null || _a === void 0 ? void 0 : _a.sections) || component.config;
            return {
                config: {
                    propertiesTable: { sections: conf || [] },
                },
            };
        }
        case 'numeric': {
            return {
                config: {
                    numeric: component.config,
                },
            };
        }
        case 'files': {
            if (component.config) {
                return {
                    config: {
                        files: Object.assign(Object.assign({}, component.config), { maxFileSize: component.config.maxFileSize
                                ? {
                                    size: component.config.maxFileSize.size,
                                    unit: new json_to_graphql_query_1.EnumType(component.config.maxFileSize.unit),
                                }
                                : undefined }),
                    },
                };
            }
            return null;
        }
        case 'selection': {
            return {
                config: {
                    selection: component.config,
                },
            };
        }
        case 'itemRelations':
            return buildItemRelationsComponentConfigInput(component, existingShapes, isDeferred);
        case 'componentChoice': {
            let shouldDefer;
            return {
                config: {
                    componentChoice: Object.assign(Object.assign({}, component.config), { choices: (_c = (_b = component.config) === null || _b === void 0 ? void 0 : _b.choices) === null || _c === void 0 ? void 0 : _c.map((c) => {
                            const conf = (0, exports.buildComponentConfigInput)(c, existingShapes, isDeferred);
                            const cmp = Object.assign(Object.assign({}, c), { type: (0, get_component_type_1.getComponentType)(c.type) });
                            if (conf === null || conf === void 0 ? void 0 : conf.config) {
                                cmp.config = conf.config;
                            }
                            if (conf === null || conf === void 0 ? void 0 : conf.deferUpdate) {
                                shouldDefer = true;
                            }
                            return cmp;
                        }) }),
                },
                deferUpdate: shouldDefer,
            };
        }
        case 'contentChunk': {
            let shouldDefer;
            return {
                config: {
                    contentChunk: Object.assign(Object.assign({}, component.config), { components: (_e = (_d = component.config) === null || _d === void 0 ? void 0 : _d.components) === null || _e === void 0 ? void 0 : _e.map((c) => {
                            const conf = (0, exports.buildComponentConfigInput)(c, existingShapes, isDeferred);
                            const cmp = Object.assign(Object.assign({}, c), { type: (0, get_component_type_1.getComponentType)(c.type) });
                            if (conf === null || conf === void 0 ? void 0 : conf.config) {
                                cmp.config = conf.config;
                            }
                            if (conf === null || conf === void 0 ? void 0 : conf.deferUpdate) {
                                shouldDefer = true;
                            }
                            return cmp;
                        }) }),
                },
                deferUpdate: shouldDefer,
            };
        }
    }
    return null;
};
exports.buildComponentConfigInput = buildComponentConfigInput;
