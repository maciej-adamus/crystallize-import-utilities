import { BootstrapperContext } from '.';
import { JSONItemTopic } from '../../json-spec';
import { IcallAPI, IcallAPIResult } from './api';
export interface TopicAndTenantId {
    topicId: string;
    tenantId: string;
}
export interface IGetTopicIdProps {
    topic: JSONItemTopic;
    language: string;
    useCache: boolean;
    context: BootstrapperContext;
    apiFn?: ApiFN;
}
export declare type ApiFN = (props: IcallAPI) => Promise<IcallAPIResult>;
export declare function getTopicId(props: IGetTopicIdProps): Promise<string | null>;
export declare function getTopicIds({ topics, language, useCache, context, apiFn, }: {
    topics: JSONItemTopic[];
    language: string;
    useCache?: boolean;
    context: BootstrapperContext;
    apiFn?: ApiFN;
}): Promise<string[]>;
