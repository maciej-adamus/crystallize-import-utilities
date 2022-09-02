"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAPICaller = exports.ApiManager = exports.sleep = void 0;
const graphql_request_1 = require("graphql-request");
const uuid_1 = require("uuid");
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
exports.sleep = sleep;
class ApiManager {
    constructor(url) {
        this.queue = [];
        this.url = '';
        this.maxWorkers = 1;
        this.logLevel = 'silent';
        this.CRYSTALLIZE_ACCESS_TOKEN_ID = '';
        this.CRYSTALLIZE_ACCESS_TOKEN_SECRET = '';
        this.CRYSTALLIZE_STATIC_AUTH_TOKEN = '';
        this.push = (props) => {
            return new Promise((resolve) => {
                this.queue.push({
                    id: (0, uuid_1.v4)(),
                    resolve,
                    props,
                    failCount: 0,
                });
            });
        };
        /**
         * Adjust the maximum amount of workers up and down depending on
         * the amount of errors coming from the API
         */
        this.lastRequestsStatuses = [];
        this.recordRequestStatus = (status) => {
            var _a;
            this.lastRequestsStatuses.unshift(status);
            const maxRequests = 20;
            const errors = (_a = this.lastRequestsStatuses.filter((r) => r === 'error')) === null || _a === void 0 ? void 0 : _a.length;
            if (errors > 5) {
                this.maxWorkers--;
                this.lastRequestsStatuses.length = 0;
            }
            else if (errors === 0 && this.lastRequestsStatuses.length > maxRequests) {
                this.maxWorkers++;
                this.lastRequestsStatuses.length = 0;
            }
            const maxWorkers = 5;
            if (this.maxWorkers < 1) {
                this.maxWorkers = 1;
            }
            else if (this.maxWorkers > maxWorkers) {
                this.maxWorkers = maxWorkers;
            }
            if (this.lastRequestsStatuses.length > maxRequests) {
                this.lastRequestsStatuses.length = maxRequests;
            }
        };
        this.url = url;
        this.errorNotifier = () => null;
        setInterval(() => this.work(), 5);
    }
    setErrorNotifier(fn) {
        this.errorNotifier = fn;
    }
    setLogLevel(level) {
        this.logLevel = level;
    }
    async work() {
        const currentWorkers = this.queue.filter((q) => q.working).length;
        if (currentWorkers === this.maxWorkers) {
            return;
        }
        // Get the first none-working item in the queue
        const item = this.queue.find((q) => !q.working);
        if (!item) {
            return;
        }
        item.working = true;
        let queryError = '';
        let otherError = '';
        let serverError = '';
        const resolveWith = (response) => {
            if (item) {
                item.resolve(response);
                // Remove item from queue
                this.queue.splice(this.queue.findIndex((q) => q.id === item.id), 1);
            }
        };
        let response;
        try {
            if (this.logLevel === 'verbose') {
                console.log(JSON.stringify(item.props, null, 1));
            }
            response = await (0, graphql_request_1.request)(this.url, item.props.query, item.props.variables, {
                'X-Crystallize-Access-Token-Id': this.CRYSTALLIZE_ACCESS_TOKEN_ID,
                'X-Crystallize-Access-Token-Secret': this.CRYSTALLIZE_ACCESS_TOKEN_SECRET,
                'X-Crystallize-Static-Auth-Token': this.CRYSTALLIZE_STATIC_AUTH_TOKEN,
            });
            if (this.logLevel === 'verbose') {
                console.log(JSON.stringify(response, null, 1));
            }
        }
        catch (e) {
            if (this.logLevel === 'verbose') {
                console.log(e);
            }
            // Network/system errors
            if ((e === null || e === void 0 ? void 0 : e.type) === 'system') {
                otherError = e.message || JSON.stringify(e, null, 1);
                if (!item.props.suppressErrors) {
                    this.errorNotifier({
                        error: otherError,
                    });
                }
            }
            else {
                /**
                 * The API might stumble and throw an internal error "reason: socket hang up".
                 * Deal with this as "serverError" even though the request comes back with a
                 * status 200
                 */
                if (e.message.includes('reason: socket hang up') ||
                    e.message.includes('ECONNRESET') ||
                    e.message.includes('502 Bad Gateway')) {
                    serverError = e.message;
                }
                else {
                    queryError = e.message;
                }
            }
        }
        /**
         * When server errors or other errors occur, we want to not discard the item
         * that is being worked on, but rather wait until the API is back up
         */
        if (otherError || serverError) {
            this.recordRequestStatus('error');
            const err = otherError || serverError;
            item.failCount++;
            await sleep(item.failCount * 1000);
            // Start reporting this as an error after a while
            if (item.failCount > 10 && !item.props.suppressErrors) {
                this.errorNotifier({
                    error: err,
                });
            }
            item.working = false;
        }
        else {
            this.recordRequestStatus('ok');
            // Report errors in usage of the API
            if (queryError) {
                if (!item.props.suppressErrors) {
                    this.errorNotifier({
                        error: queryError,
                    });
                }
                resolveWith({ data: null, errors: [{ error: queryError }] });
            }
            else {
                resolveWith({ data: response });
            }
        }
    }
}
exports.ApiManager = ApiManager;
function createAPICaller({ uri, errorNotifier, logLevel, }) {
    const manager = new ApiManager(uri);
    manager.errorNotifier = errorNotifier;
    if (logLevel) {
        manager.logLevel = logLevel;
    }
    return manager;
}
exports.createAPICaller = createAPICaller;
