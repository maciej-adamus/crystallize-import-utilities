import { ComponentConfigInput } from '../../../generated/graphql';
import { Shape, Component } from '../../../types';
export interface ComponentConfigInputSettings {
    config: ComponentConfigInput;
    deferUpdate?: boolean;
}
export declare const buildComponentConfigInput: (component: Component, existingShapes: Shape[], isDeferred: boolean) => ComponentConfigInputSettings | null;
