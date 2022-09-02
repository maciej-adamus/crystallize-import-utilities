"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setShapes = exports.getExistingShapesForSpec = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const graphql_1 = require("../../../graphql");
const utils_1 = require("../utils");
const get_shape_type_1 = require("./get-shape-type");
const build_component_input_1 = require("./build-component-input");
var Status;
(function (Status) {
    Status["created"] = "created";
    Status["updated"] = "updated";
    Status["error"] = "error";
    Status["deferred"] = "deferred";
})(Status || (Status = {}));
async function getExistingShapesForSpec(context, onUpdate) {
    const existingShapes = await getExistingShapes(context);
    function handleComponent(cmp) {
        const base = {
            id: cmp.id,
            name: cmp.name,
            type: cmp.type,
            description: cmp.description,
            config: cmp.config,
        };
        switch (cmp.type) {
            case 'componentChoice': {
                base.config = Object.assign(Object.assign({}, cmp.config), { choices: cmp.config.choices.map(handleComponent) });
                break;
            }
            case 'contentChunk': {
                base.config = Object.assign(Object.assign({}, cmp.config), { components: cmp.config.components.map(handleComponent) });
                break;
            }
        }
        return base;
    }
    return existingShapes.map((eShape) => {
        var _a;
        let identifier;
        if (eShape.identifier) {
            identifier = (0, utils_1.validShapeIdentifier)(eShape.identifier, onUpdate);
        }
        else if (eShape.id) {
            identifier = (0, utils_1.validShapeIdentifier)(eShape.id, onUpdate);
        }
        if (!identifier) {
            throw new Error('Cannot handle shape without identifier (' + eShape.name + ')');
        }
        const shape = {
            name: eShape.name,
            id: identifier,
            identifier,
            type: eShape.type,
            components: (_a = eShape === null || eShape === void 0 ? void 0 : eShape.components) === null || _a === void 0 ? void 0 : _a.map(handleComponent),
        };
        return shape;
    });
}
exports.getExistingShapesForSpec = getExistingShapesForSpec;
async function getExistingShapes(context) {
    var _a, _b;
    const tenantId = context.tenantId;
    const r = await context.callPIM({
        query: (0, graphql_tag_1.default) `
      query GET_TENANT_SHAPES($tenantId: ID!) {
        shape {
          getMany(tenantId: $tenantId) {
            id
            identifier
            type
            name
            components {
              ...componentBase
              config {
                ...primitiveComponentConfig
                ... on ContentChunkComponentConfig {
                  repeatable
                  components {
                    ...componentBase
                    config {
                      ...primitiveComponentConfig
                    }
                  }
                }
                ... on ComponentChoiceComponentConfig {
                  choices {
                    ...componentBase
                    config {
                      ...primitiveComponentConfig
                    }
                  }
                }
              }
            }
          }
        }
      }

      fragment componentBase on ShapeComponent {
        id
        name
        type
        description
      }

      fragment primitiveComponentConfig on ComponentConfig {
        ... on NumericComponentConfig {
          decimalPlaces
          units
        }
        ... on PropertiesTableComponentConfig {
          sections {
            title
            keys
          }
        }
        ... on SelectionComponentConfig {
          min
          max
          options {
            key
            value
            isPreselected
          }
        }
        ... on FilesComponentConfig {
          acceptedContentTypes {
            contentType
            extensionLabel
          }
          min
          max
          maxFileSize {
            size
            unit
          }
        }
        ... on ItemRelationsComponentConfig {
          acceptedShapeIdentifiers
          min
          max
        }
      }
    `,
        variables: {
            tenantId,
        },
    });
    return ((_b = (_a = r.data) === null || _a === void 0 ? void 0 : _a.shape) === null || _b === void 0 ? void 0 : _b.getMany) || [];
}
async function createOrUpdateShape(shape, existingShapes, onUpdate, context, isDeferred = false) {
    var _a, _b, _c, _d, _e;
    let shouldDefer;
    let status;
    try {
        const tenantId = context.tenantId;
        const existingShape = existingShapes.find((s) => s.identifier === shape.identifier);
        const components = ((_a = shape.components) === null || _a === void 0 ? void 0 : _a.map((component) => {
            const { input, deferUpdate } = (0, build_component_input_1.buildcomponentInput)(component, existingShapes, isDeferred);
            if (deferUpdate) {
                shouldDefer = true;
            }
            return input;
        })) || [];
        if (existingShape) {
            if (existingShape === null || existingShape === void 0 ? void 0 : existingShape.components) {
                existingShape.components.forEach((component) => {
                    if (!components.some((existingComponent) => existingComponent.id === component.id)) {
                        const { input, deferUpdate } = (0, build_component_input_1.buildcomponentInput)(component, existingShapes, isDeferred);
                        if (deferUpdate) {
                            shouldDefer = true;
                        }
                        components.push(input);
                    }
                });
            }
            const identifier = existingShape.identifier || existingShape.id;
            if (!identifier) {
                throw new Error('Cannot update shape without identifier (' + existingShape.name + ')');
            }
            const r = await context.callPIM({
                query: (0, graphql_1.buildUpdateShapeMutation)({
                    id: identifier,
                    identifier,
                    tenantId,
                    input: Object.assign({ components }, (shape.name && { name: shape.name })),
                }),
            });
            status = ((_c = (_b = r === null || r === void 0 ? void 0 : r.data) === null || _b === void 0 ? void 0 : _b.shape) === null || _c === void 0 ? void 0 : _c.update) ? Status.updated : Status.error;
        }
        else {
            const r = await context.callPIM({
                query: (0, graphql_1.buildCreateShapeMutation)({
                    type: (0, get_shape_type_1.getShapeType)(shape.type),
                    name: shape.name,
                    tenantId: context.tenantId,
                    components,
                }),
            });
            status = ((_e = (_d = r === null || r === void 0 ? void 0 : r.data) === null || _d === void 0 ? void 0 : _d.shape) === null || _e === void 0 ? void 0 : _e.create) ? Status.created : Status.error;
        }
    }
    catch (err) {
        console.error(err);
        return Status.error;
    }
    if (shouldDefer && status !== Status.error) {
        status = Status.deferred;
    }
    return status;
}
async function setShapes({ spec, onUpdate, context, }) {
    // Get all the shapes from the tenant
    const existingShapes = await getExistingShapes(context);
    const deferredShapes = [];
    if (!(spec === null || spec === void 0 ? void 0 : spec.shapes)) {
        return existingShapes;
    }
    let finished = 0;
    for (let i = 0; i < spec.shapes.length; i++) {
        const shape = spec.shapes[i];
        const result = await createOrUpdateShape(shape, existingShapes, onUpdate, context);
        if (result === 'deferred') {
            deferredShapes.push(shape);
        }
        else {
            finished++;
        }
        onUpdate({
            progress: finished / spec.shapes.length,
            message: `${shape.name} (${shape.identifier}): ${result}`,
        });
    }
    for (let i = 0; i < deferredShapes.length; i++) {
        const existingShapes = await getExistingShapes(context);
        const shape = deferredShapes[i];
        const result = await createOrUpdateShape(shape, existingShapes, onUpdate, context, true);
        finished++;
        onUpdate({
            progress: finished / spec.shapes.length,
            message: `${shape.name} (${shape.identifier}): ${result}`,
        });
    }
    onUpdate({
        progress: 1,
    });
    return await getExistingShapes(context);
}
exports.setShapes = setShapes;
