import { JsonSpec } from '../json-spec';
import { AreaUpdate, BootstrapperContext } from './utils';
export interface Props {
    spec: JsonSpec | null;
    onUpdate(t: AreaUpdate): any;
    context: BootstrapperContext;
}
export declare function setItems({ spec, onUpdate, context, }: Props): Promise<void>;
