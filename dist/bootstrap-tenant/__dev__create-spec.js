"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const fs_1 = require("fs");
const path_1 = require("path");
const index_1 = require("./index");
async function createSpec() {
    const tenantIdentifier = 'my-tech-blog';
    if (!process.env.CRYSTALLIZE_ACCESS_TOKEN_ID ||
        !process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET) {
        throw new Error('CRYSTALLIZE_ACCESS_TOKEN_ID and CRYSTALLIZE_ACCESS_TOKEN_SECRET must be set');
    }
    console.log(`✨ Creating spec for ${tenantIdentifier} ✨`);
    const bootstrapper = new index_1.Bootstrapper();
    bootstrapper.setAccessToken(process.env.CRYSTALLIZE_ACCESS_TOKEN_ID, process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET);
    bootstrapper.setTenantIdentifier(tenantIdentifier);
    bootstrapper.config.multilingual = true;
    bootstrapper.on(index_1.EVENT_NAMES.ERROR, ({ error }) => {
        console.log(error);
    });
    const spec = await bootstrapper.createSpec({
        shapes: true,
        grids: true,
        items: true,
        languages: true,
        priceVariants: true,
        stockLocations: true,
        vatTypes: true,
        subscriptionPlans: true,
        topicMaps: true,
        onUpdate: (u) => console.log(JSON.stringify(u, null, 1)),
    });
    (0, fs_1.writeFileSync)((0, path_1.resolve)(__dirname, `../../json-spec/${tenantIdentifier}.json`), JSON.stringify(spec, null, 2), 'utf-8');
    console.log(`✨ Spec created (${tenantIdentifier}.json) ✨`);
}
createSpec();
