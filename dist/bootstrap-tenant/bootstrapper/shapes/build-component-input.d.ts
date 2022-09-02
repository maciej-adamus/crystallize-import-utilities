import { Component, ComponentInput, Shape } from '../../../types';
interface BuildComponentInputResponse {
    input: ComponentInput;
    deferUpdate?: boolean;
}
export declare const buildcomponentInput: (component: Component, existingShapes: Shape[], isDeferred: boolean) => BuildComponentInputResponse;
export {};
