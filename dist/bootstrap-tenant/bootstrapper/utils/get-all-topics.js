"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTopicsForSpec = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const _1 = require(".");
const multilingual_1 = require("./multilingual");
function getTopicById(topics, id) {
    let found = null;
    function search(item) {
        var _a;
        if (!found) {
            if (item.id === id) {
                found = item;
            }
            else {
                (_a = item.children) === null || _a === void 0 ? void 0 : _a.forEach(search);
            }
        }
    }
    topics.forEach(search);
    return found;
}
async function getAllTopicsForSpec(lng, context) {
    const tenantId = context.tenantId;
    const languages = context.config.multilingual
        ? context.languages.map((l) => l.code)
        : [lng];
    async function handleLanguage(language) {
        var _a, _b;
        const tr = (0, multilingual_1.trFactory)(language);
        async function getTopicChildren(id) {
            var _a, _b, _c;
            const response = await context.callPIM({
                query: (0, graphql_tag_1.default) `
          query GET_TOPIC($id: ID!, $language: String!) {
            topic {
              get(id: $id, language: $language) {
                children {
                  id
                  name
                  path
                }
              }
            }
          }
        `,
                variables: {
                    id,
                    language,
                },
            });
            const children = ((_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.topic) === null || _b === void 0 ? void 0 : _b.get) === null || _c === void 0 ? void 0 : _c.children) || [];
            return children;
        }
        async function handleTopic({ id, name, path, }) {
            const topic = {
                id,
                name: tr(name, `${id}.name`),
                path: tr(path, `${id}.path`),
            };
            const pathParts = path.split('/');
            topic.pathIdentifier = tr(pathParts[pathParts.length - 1], `${id}.pathIdentifier`);
            const children = await getTopicChildren(id);
            if ((children === null || children === void 0 ? void 0 : children.length) > 0) {
                const childrenWithChildren = [];
                await Promise.all(children.map(async (child) => {
                    const childTopic = await handleTopic(child);
                    childrenWithChildren.push(childTopic);
                }));
                topic.children = childrenWithChildren;
            }
            return topic;
        }
        const responseForRootTopics = await context.callPIM({
            query: (0, graphql_tag_1.default) `
        query GET_TENANT_ROOT_TOPICS($tenantId: ID!, $language: String!) {
          topic {
            getRootTopics(tenantId: $tenantId, language: $language) {
              id
              name
              path
            }
          }
        }
      `,
            variables: {
                tenantId,
                language,
            },
        });
        const topicMaps = [];
        const rootTopics = ((_b = (_a = responseForRootTopics.data) === null || _a === void 0 ? void 0 : _a.topic) === null || _b === void 0 ? void 0 : _b.getRootTopics) || [];
        await Promise.all(rootTopics.map(async (rootTopic) => {
            const topic = await handleTopic(rootTopic);
            if (topic) {
                topicMaps.push(topic);
            }
        }));
        return topicMaps;
    }
    const topicMaps = [];
    for (let i = 0; i < languages.length; i++) {
        const language = languages[i];
        const topicsForLanguage = await handleLanguage(language);
        function handleTopic(topic) {
            var _a;
            const existingTopic = getTopicById(topicMaps, topic.id);
            if (!existingTopic) {
                console.log('Could not find existing topic by id. Strange.', topic);
            }
            else {
                (0, multilingual_1.mergeInTranslations)(existingTopic, topic);
                (_a = topic.children) === null || _a === void 0 ? void 0 : _a.forEach(handleTopic);
            }
        }
        if (topicMaps.length === 0) {
            topicMaps.push(...topicsForLanguage);
        }
        else {
            topicsForLanguage.forEach(handleTopic);
        }
    }
    return (0, _1.removeUnwantedFieldsFromThing)(topicMaps, [
        'id',
        multilingual_1.translationFieldIdentifier,
    ]);
}
exports.getAllTopicsForSpec = getAllTopicsForSpec;
