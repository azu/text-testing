// LICENSE : MIT
"use strict";
const assert = require("power-assert");
const remark = require("remark")();
import createSections  from "../src/select-section";
describe("select-section-test", function() {
    it("should return array", function() {
        const AST = remark.parse(`# Header
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
            const AST = remark.parse(`# Header
text1
text1

# Header

text2
text2`);
            const results = createSections(AST);
            console.log(JSON.stringify(results, null, 4));
            assert.equal(results.length, 2);
            const [section1, section2] = results;
            assert(section1.length === 2);
            assert(section2.length === 2);
            assert(section1[0].type === "heading");
            assert(section1[1].type === "paragraph");
            assert(section2[0].type === "heading");
            assert(section2[1].type === "paragraph");
        });
    })
});