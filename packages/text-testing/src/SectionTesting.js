// LICENSE : MIT
"use strict";
export default class SectionTesting {
    /**
     * @param {Object} section section node
     */
    constructor(section) {
        this.section = section;
    }

    contains(text) {
        return this.section.raw.indexOf(text) !== -1;
    }
}