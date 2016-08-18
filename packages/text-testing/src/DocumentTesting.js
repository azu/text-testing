// LICENSE : MIT
"use strict";
const selectSection = require("select-section");
import SectionTesting from "./SectionTesting";
export default class DocumentTesting {
    constructor(AST) {
        this.AST = AST;
        this.sections = selectSection(AST);
    }

    mapSection(expectedSectionName, cb) {
        const sectionTestings = this.sections.filter(section => {
            if (!section.raw) {
                return false;
            }
            return section.raw.indexOf(expectedSectionName) !== -1;
        }).map(section => {
            return new SectionTesting(section);
        });
        if (sectionTestings.length === 0) {
            throw new Error(`Section:"${expectedSectionName}" is not found.`);
        }
        return sectionTestings.map(section => cb(section));
    }

    forEachSection(expectedSectionName, cb) {
        this.mapSection(expectedSectionName, cb);
    }
}