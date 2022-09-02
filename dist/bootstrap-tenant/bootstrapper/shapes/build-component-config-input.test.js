"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const errors_1 = require("../errors");
const build_component_config_input_1 = require("./build-component-config-input");
const testCases = [
    {
        name: 'has no config when config is not provided',
        input: {
            component: {
                type: 'itemRelations',
            },
        },
        expected: null,
    },
    {
        name: 'sets min and max config',
        input: {
            component: {
                type: 'itemRelations',
                config: {
                    min: 1,
                    max: 3,
                },
            },
            existingShapes: [],
        },
        expected: {
            config: {
                itemRelations: {
                    min: 1,
                    max: 3,
                },
            },
        },
    },
    {
        name: 'does not defer update when shapes exist',
        input: {
            component: {
                type: 'itemRelations',
                config: {
                    acceptedShapeIdentifiers: ['foo'],
                },
            },
            existingShapes: [{ identifier: 'foo' }],
        },
        expected: {
            config: {
                itemRelations: {
                    acceptedShapeIdentifiers: ['foo'],
                },
            },
        },
    },
    {
        name: 'defers update when config contains a non-existent shape identifier',
        input: {
            component: {
                type: 'itemRelations',
                config: {
                    acceptedShapeIdentifiers: ['foo', 'bar'],
                },
            },
            existingShapes: [{ identifier: 'bar' }],
        },
        expected: {
            config: {
                itemRelations: {},
            },
            deferUpdate: true,
        },
    },
    {
        name: 'throws an error when config contains a non-existent shape identifier and request is already deferred',
        input: {
            component: {
                type: 'itemRelations',
                config: {
                    acceptedShapeIdentifiers: ['foo', 'bar'],
                },
            },
            existingShapes: [{ identifier: 'bar' }],
            isDeferred: true,
        },
        error: new errors_1.InvalidItemRelationShapeIdentifier('foo'),
    },
    {
        name: 'does not throw an error when config contains a shape identifier and request is already deferred',
        input: {
            component: {
                type: 'itemRelations',
                config: {
                    acceptedShapeIdentifiers: ['foo', 'bar'],
                },
            },
            existingShapes: [
                { identifier: 'foo' },
                { identifier: 'bar' },
            ],
            isDeferred: true,
        },
        expected: {
            config: {
                itemRelations: {
                    acceptedShapeIdentifiers: ['foo', 'bar'],
                },
            },
        },
    },
];
testCases.forEach((tc) => (0, ava_1.default)(`${tc.input.component.type} - ${tc.name}`, (t) => {
    try {
        const actual = (0, build_component_config_input_1.buildComponentConfigInput)(tc.input.component, tc.input.existingShapes || [], tc.input.isDeferred || false);
        if (tc.error) {
            t.fail('test case should throw an error');
        }
        t.deepEqual(actual, tc.expected);
    }
    catch (err) {
        if (!tc.error) {
            return t.fail('test case should not throw an error');
        }
        t.deepEqual(err, tc.error);
    }
}));
