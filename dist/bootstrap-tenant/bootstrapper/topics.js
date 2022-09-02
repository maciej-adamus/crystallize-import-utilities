"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTopics = exports.removeTopicId = exports.getAllTopicsForSpec = void 0;
const graphql_1 = require("../../graphql");
const utils_1 = require("./utils");
const build_update_topic_mutation_1 = require("../../graphql/build-update-topic-mutation");
const get_topic_id_1 = require("./utils/get-topic-id");
var get_all_topics_1 = require("./utils/get-all-topics");
Object.defineProperty(exports, "getAllTopicsForSpec", { enumerable: true, get: function () { return get_all_topics_1.getAllTopicsForSpec; } });
function removeTopicId(topic) {
    const { id, children } = topic, rest = __rest(topic, ["id", "children"]);
    return Object.assign(Object.assign({}, rest), (children && { children: children.map(removeTopicId) }));
}
exports.removeTopicId = removeTopicId;
function prepareTopicForInput(topic, language, context) {
    const tenantId = context.tenantId;
    function translateChild(t) {
        return Object.assign({ name: (0, utils_1.getTranslation)(t.name, language) || '' }, (t.children && { children: t.children.map(translateChild) }));
    }
    let pathIdentifier;
    if (topic.pathIdentifier) {
        pathIdentifier = (0, utils_1.getTranslation)(topic.pathIdentifier, language);
    }
    else if (topic.path) {
        const parts = (0, utils_1.getTranslation)(topic.path).split('/');
        pathIdentifier = parts[parts.length - 1];
    }
    return Object.assign(Object.assign(Object.assign({ tenantId, name: (0, utils_1.getTranslation)(topic.name, language) || '' }, (pathIdentifier && { pathIdentifier })), (topic.parentId && { parentId: topic.parentId })), (topic.children && {
        children: topic.children.map(translateChild),
    }));
}
async function createTopic(topic, context, parentId) {
    var _a, _b;
    const language = context.defaultLanguage.code;
    /**
     * Do not include children here, as we have no control over
     * how many children and levels that are passed. The API might
     * throw a 413 "request entity too large" if we send to much
     */
    const { children } = topic, topicWithoutChildren = __rest(topic, ["children"]);
    const preparedTopic = prepareTopicForInput(topicWithoutChildren, language, context);
    if (parentId) {
        preparedTopic.parentId = parentId;
    }
    else if (topic.path) {
        // Check if there is a parent with first part of path
        const translatedPath = (0, utils_1.getTranslation)(topic.path, language);
        if (translatedPath) {
            const pathParts = (0, utils_1.getTranslation)(topic.path, language).split('/');
            pathParts.pop();
            const parentPath = pathParts.join('/');
            const id = await (0, get_topic_id_1.getTopicId)({
                topic: {
                    path: parentPath,
                },
                language: context.defaultLanguage.code,
                context,
                useCache: false,
            });
            if (id) {
                preparedTopic.parentId = id;
            }
        }
    }
    // Create the topic
    const response = await context.callPIM({
        query: (0, graphql_1.buildCreateTopicMutation)(preparedTopic, language, {
            name: true,
            id: true,
            parentId: true,
        }),
    });
    const createdTopic = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.topic) === null || _b === void 0 ? void 0 : _b.create;
    return createdTopic.id;
}
async function setTopics({ spec, onUpdate, context, }) {
    if (!(spec === null || spec === void 0 ? void 0 : spec.topicMaps)) {
        return;
    }
    const languages = context.config.multilingual
        ? context.languages.map((l) => l.code)
        : [context.defaultLanguage.code];
    let finished = 0;
    let totalTopics = 0;
    function count(topic) {
        totalTopics++;
        if (topic.children) {
            topic.children.forEach(count);
        }
    }
    spec.topicMaps.forEach(count);
    async function handleLevel(level, parentId) {
        try {
            const exists = Boolean(level.id);
            // Can't find this topic, let's create it
            if (!exists) {
                level.id = await createTopic(level, context, parentId);
            }
            for (let i = 0; i < languages.length; i++) {
                // Due to a race condition in the PIM, we need to sleep for a bit
                await (0, utils_1.sleep)(25);
                const language = languages[i];
                const name = (0, utils_1.getTranslation)(level.name, language) || '';
                if (level.id && name) {
                    await context.callPIM({
                        query: (0, build_update_topic_mutation_1.buildUpdateTopicMutation)({
                            id: level.id,
                            language,
                            input: Object.assign(Object.assign({ name }, (level.pathIdentifier && {
                                pathIdentifier: (0, utils_1.getTranslation)(level.pathIdentifier, language),
                            })), (level.parentId && { parentId: level.parentId })),
                        }),
                    });
                }
            }
            finished++;
            onUpdate({
                progress: finished / totalTopics,
                message: `${(0, utils_1.getTranslation)(level.name, context.defaultLanguage.code)}: ${!exists ? 'updated' : 'created'}`,
            });
            if (level.children) {
                const childNames = new Set();
                for (let i = 0; i < level.children.length; i++) {
                    const child = level.children[i];
                    if (!childNames.has(child.name)) {
                        await handleLevel(child, level.id);
                        childNames.add(child.name);
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async function getIdForLevel(level) {
        try {
            const language = context.defaultLanguage.code;
            const existingTopicId = await (0, get_topic_id_1.getTopicId)({
                topic: level.path
                    ? { path: (0, utils_1.getTranslation)(level.path, language) }
                    : level.name,
                language,
                context,
                useCache: false,
            });
            if (existingTopicId) {
                level.id = existingTopicId;
            }
            if (level.children) {
                for (let i = 0; i < level.children.length; i++) {
                    await getIdForLevel(level.children[i]);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    // Pull ids for all topics before modifying them
    for (let i = 0; i < spec.topicMaps.length; i++) {
        await getIdForLevel(spec.topicMaps[i]);
    }
    // Create/update topics
    for (let i = 0; i < spec.topicMaps.length; i++) {
        await handleLevel(spec.topicMaps[i]);
    }
    onUpdate({
        progress: 1,
    });
}
exports.setTopics = setTopics;
