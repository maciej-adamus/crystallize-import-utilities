import { Shape } from '../../../types';
import { JsonSpec } from '../../json-spec';
import { AreaUpdate, BootstrapperContext } from '../utils';
export declare function getExistingShapesForSpec(context: BootstrapperContext, onUpdate: (t: AreaUpdate) => any): Promise<Shape[]>;
export interface Props {
    spec: JsonSpec | null;
    onUpdate(t: AreaUpdate): any;
    context: BootstrapperContext;
}
export declare function setShapes({ spec, onUpdate, context, }: Props): Promise<Shape[]>;
