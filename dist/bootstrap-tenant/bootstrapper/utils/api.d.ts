import { DocumentNode } from 'graphql';
import { LogLevel } from './types';
export interface IcallAPI {
    query: DocumentNode | string;
    variables?: any;
    suppressErrors?: boolean;
}
export interface IcallAPIResult {
    data: null | Record<string, any>;
    errors?: Record<string, any>[];
}
export declare function sleep(ms: number): Promise<unknown>;
interface QueuedRequest {
    id: string;
    props: IcallAPI;
    failCount: number;
    resolve: (value: IcallAPIResult) => void;
    working?: boolean;
}
declare type errorNotifierFn = (args: {
    error: string;
}) => void;
declare type RequestStatus = 'ok' | 'error';
export declare class ApiManager {
    queue: QueuedRequest[];
    url: string;
    maxWorkers: number;
    errorNotifier: errorNotifierFn;
    logLevel: LogLevel;
    CRYSTALLIZE_ACCESS_TOKEN_ID: string;
    CRYSTALLIZE_ACCESS_TOKEN_SECRET: string;
    CRYSTALLIZE_STATIC_AUTH_TOKEN: string;
    constructor(url: string);
    setErrorNotifier(fn: errorNotifierFn): void;
    setLogLevel(level: LogLevel): void;
    push: (props: IcallAPI) => Promise<IcallAPIResult>;
    /**
     * Adjust the maximum amount of workers up and down depending on
     * the amount of errors coming from the API
     */
    lastRequestsStatuses: RequestStatus[];
    recordRequestStatus: (status: RequestStatus) => void;
    work(): Promise<void>;
}
export declare function createAPICaller({ uri, errorNotifier, logLevel, }: {
    uri: string;
    errorNotifier: errorNotifierFn;
    logLevel?: LogLevel;
}): ApiManager;
export {};
