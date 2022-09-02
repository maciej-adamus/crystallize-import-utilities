"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildcomponentInput = void 0;
const build_component_config_input_1 = require("./build-component-config-input");
const get_component_type_1 = require("./get-component-type");
const buildcomponentInput = (component, existingShapes, isDeferred) => {
    const conf = (0, build_component_config_input_1.buildComponentConfigInput)(component, existingShapes, isDeferred);
    const input = Object.assign({ id: component.id, name: component.name, type: (0, get_component_type_1.getComponentType)(component.type) }, (component.description && { description: component.description }));
    if (conf === null || conf === void 0 ? void 0 : conf.config) {
        input.config = conf.config;
    }
    return {
        input,
        deferUpdate: conf === null || conf === void 0 ? void 0 : conf.deferUpdate,
    };
};
exports.buildcomponentInput = buildcomponentInput;
