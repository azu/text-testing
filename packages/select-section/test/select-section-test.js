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
            assert.equal(results.length, 2);
            const [section1, section2] = results;
            assert(section1.type === "Section");
            assert(section2.type === "Section");
            assert(section1.children.length === 2);
            assert(section2.children.length === 2);
            assert(section1.children[0].type === "Header");
            assert(section1.children[1].type === "Paragraph");
            assert(section2.children[0].type === "Header");
            assert(section2.children[1].type === "Paragraph");
        });
    })
});