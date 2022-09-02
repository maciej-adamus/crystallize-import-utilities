"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remoteFileUpload = exports.ffmpegAvailable = void 0;
const fs_1 = __importDefault(require("fs"));
const slugify_1 = __importDefault(require("slugify"));
const form_data_1 = __importDefault(require("form-data"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const xml_js_1 = __importDefault(require("xml-js"));
const download_1 = __importDefault(require("download"));
const file_type_1 = __importDefault(require("file-type"));
const uuid_1 = require("uuid");
// @ts-ignore
const m3u8_to_mp4_1 = __importDefault(require("m3u8-to-mp4"));
const execa_1 = __importDefault(require("execa"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.ffmpegAvailable = new Promise(async (resolve) => {
    try {
        await (0, execa_1.default)('ffmpeg', ['--help']);
        resolve(true);
    }
    catch (e) {
        resolve(false);
    }
});
function getUrlSafeFileName(fileName) {
    return (0, slugify_1.default)(fileName, {
        replacement: '-',
        lower: false,
        // @ts-ignore
        charmap: slugify_1.default.charmap,
        // @ts-ignore
        multicharmap: slugify_1.default.multicharmap, // replace multi-characters
    });
}
async function downloadRemoteOrLocal(fileURL) {
    try {
        await fs_1.default.promises.access(fileURL);
        return fs_1.default.promises.readFile(fileURL);
    }
    catch (e) {
        return (0, download_1.default)(fileURL);
    }
}
async function downloadFile(fileURL) {
    const urlSafeFilename = getUrlSafeFileName(fileURL.split('/')[fileURL.split('/').length - 1].split('.')[0]);
    // Videos
    if (fileURL.endsWith('.m3u8')) {
        const canConvert = await exports.ffmpegAvailable;
        if (!canConvert) {
            throw new Error('No support for video conversion');
        }
        const tmpFile = `./tmp-${(0, uuid_1.v4)()}.mp4`;
        const converter = new m3u8_to_mp4_1.default();
        await converter.setInputFile(fileURL).setOutputFile(tmpFile).start();
        const fileBuffer = await fs_1.default.promises.readFile(tmpFile);
        await fs_1.default.promises.unlink(tmpFile);
        return {
            filename: `${urlSafeFilename}.mp4`,
            contentType: 'video/mp4',
            file: fileBuffer,
        };
    }
    const fileBuffer = await downloadRemoteOrLocal(fileURL);
    let { ext, contentType } = await handleFileBuffer(fileBuffer);
    // Override for SVG files that somtimes get wrong mime type back
    if (fileURL.endsWith('.svg')) {
        ext = 'svg';
        contentType = 'image/svg+xml';
    }
    if (!ext || !contentType) {
        throw new Error(`Cannot determine filetype for "${fileURL}"`);
    }
    if (!contentType) {
        throw new Error(`Unsupported mime type "${contentType}"`);
    }
    const completeFilename = `${urlSafeFilename}.${ext}`;
    return {
        filename: completeFilename,
        contentType,
        file: fileBuffer,
    };
}
async function handleFileBuffer(fileBuffer) {
    const fType = await file_type_1.default.fromBuffer(fileBuffer);
    const contentType = fType === null || fType === void 0 ? void 0 : fType.mime;
    const ext = fType === null || fType === void 0 ? void 0 : fType.ext;
    return {
        contentType,
        ext,
    };
}
const mimeArray = {
    'image/jpeg': '.jpeg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/svg+xml': '.svg',
    'image/bmp': '.bmp',
    'image/webp': '.webp',
    'image/avif': '.avif',
};
async function remoteFileUpload({ fileUrl, fileBuffer, fileName = '', contentType, context, }) {
    var _a, _b;
    let file = fileBuffer || null;
    if (fileUrl) {
        const downloadResult = await downloadFile(fileUrl);
        file = downloadResult.file;
        fileName = downloadResult.filename;
        contentType = downloadResult.contentType;
    }
    else if (file && !contentType) {
        const result = await handleFileBuffer(file);
        contentType = result.contentType;
    }
    if (!file) {
        throw new Error('Could not handle file ' + JSON.stringify({ fileUrl, fileName }));
    }
    // Create the signature required to do an upload
    const signedUploadResponse = await context.callPIM({
        variables: {
            tenantId: context.tenantId,
            fileName,
            contentType,
        },
        query: (0, graphql_tag_1.default) `
      mutation generatePresignedRequest(
        $tenantId: ID!
        $fileName: String!
        $contentType: String!
      ) {
        fileUpload {
          generatePresignedRequest(
            tenantId: $tenantId
            filename: $fileName
            contentType: $contentType
          ) {
            url
            fields {
              name
              value
            }
          }
        }
      }
    `,
    });
    if (!signedUploadResponse || !((_a = signedUploadResponse.data) === null || _a === void 0 ? void 0 : _a.fileUpload)) {
        throw new Error('Could not get presigned request fields');
    }
    // Extract what we need for upload
    const { fields, url, } = (_b = signedUploadResponse.data) === null || _b === void 0 ? void 0 : _b.fileUpload.generatePresignedRequest;
    const formData = new form_data_1.default();
    fields.forEach((field) => formData.append(field.name, field.value));
    formData.append('file', file);
    // Upload the file
    const uploadResponse = await (0, node_fetch_1.default)(url, {
        method: 'post',
        body: formData,
    });
    if (uploadResponse.status !== 201) {
        throw new Error('Cannot upload ' + fileUrl);
    }
    const jsonResponse = JSON.parse(xml_js_1.default.xml2json(await uploadResponse.text()));
    const attrs = jsonResponse.elements[0].elements.map((el) => ({
        name: el.name,
        value: el.elements[0].text,
    }));
    return {
        mimeType: contentType,
        key: attrs.find((a) => a.name === 'Key').value,
    };
}
exports.remoteFileUpload = remoteFileUpload;
