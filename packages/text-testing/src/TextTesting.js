// LICENSE : MIT
"use strict";
const parse = require("markdown-to-ast").parse;
import DocumentTesting from "./DocumentTesting";
export default class TextTesting {
    constructor(options = {}) {

    }

    /**
     * load text and pass
     * @param {string} text
     * @param {Function} cb
     * @returns {*} return cb's return value
     */
    load(text, cb) {
        const txtNode = parse(text);
        const document = new DocumentTesting(txtNode);
        return cb(document);
    }
};