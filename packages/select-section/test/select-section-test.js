// LICENSE : MIT
"use strict";
const assert = require("power-assert");
const parse = require("markdown-to-ast").parse;
import createSections  from "../src/select-section";
describe("select-section-test", function() {
    it("should return array", function() {
        const AST = parse(`# Header
text1
text1

# Header

text2
text2`);
        const results = createSections(AST);
        assert(Array.isArray(results));
    });
    context("when has two header", function() {
        it("should return return array that has two sections", function() {
            const AST = parse(`# Header
text1
text1

# Header

text2
text2`);
            const results = createSections(AST);
            assert.equal(results.length, 3);
            const [rootSection, section1, section2] = results;
            assert(rootSection.type === "Section");
            assert(section1.type === "Section");
            assert(section2.type === "Section");
            const rootTypes = rootSection.children.map(child => {
                return child.type;
            });
            const section1Types = section1.children.map(child => {
                return child.type;
            });
            const section2Types = section2.children.map(child => {
                return child.type;
            });
            assert.deepEqual(rootTypes, [
                "Header",
                "Paragraph",
                "Header",
                "Paragraph"
            ]);
            assert.deepEqual(section1Types, [
                "Header",
                "Paragraph"
            ]);
            assert.deepEqual(section2Types, [
                "Header",
                "Paragraph"
            ]);
        });
    });

    context("when exist difference level header", function() {
        it("should return return array that has two sections", function() {
            const AST = parse(`# Header Lv1
text.
## Header Lv2

text.`);
            const results = createSections(AST);
            assert.equal(results.length, 3);
            const [rootSection, section1, section2] = results;
            assert(rootSection.type === "Section");
            assert(section1.type === "Section");
            assert(section2.type === "Section");
            const rootTypes = rootSection.children.map(child => {
                return child.type;
            });
            const section1Types = section1.children.map(child => {
                return child.type;
            });
            const section2Types = section2.children.map(child => {
                return child.type;
            });
            assert.deepEqual(rootTypes, [
                "Header",
                "Paragraph",
                "Header",
                "Paragraph"
            ]);
            assert.deepEqual(section1Types, [
                "Header",
                "Paragraph",
                "Header",
                "Paragraph"
            ]);
            assert.deepEqual(section2Types, [
                "Header",
                "Paragraph"
            ]);
        });
    })
});