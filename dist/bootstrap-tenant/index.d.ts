import { JsonSpec } from './json-spec';
import { AreaUpdate, Bootstrapper } from './bootstrapper';
export { Bootstrapper, AreaUpdate } from './bootstrapper';
export { EVENT_NAMES } from './bootstrapper/utils';
interface BaseProps {
    tenantIdentifier: string;
    CRYSTALLIZE_ACCESS_TOKEN_ID: string;
    CRYSTALLIZE_ACCESS_TOKEN_SECRET: string;
}
interface BootstrapperProps extends BaseProps {
    jsonSpec: JsonSpec;
}
interface CreateSpecProps extends BaseProps {
    onUpdate: (t: AreaUpdate) => any;
}
export declare function createJSONSpec(props: CreateSpecProps): Promise<JsonSpec>;
export declare function bootstrapTenant(props: BootstrapperProps): Bootstrapper;
