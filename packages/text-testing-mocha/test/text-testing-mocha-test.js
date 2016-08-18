// LICENSE : MIT
"use strict";
const assert = require("assert");
const SectionTesting = require("text-testing").SectionTesting;
const tester = require("../src/text-testing-mocha");
const content = `
# Header

Body content.
This is text.
`;

tester(content, (section) => {
    section("**Header**", (it) => {
        it("contain **text**");
    });
});
tester(content, (section) => {
    section("**Body** section", (it) => {
        it("contain **text**");
    });
});
tester(content, (section) => {
    section("Header", (it) => {
        it("Header");
    });
});
tester(content, (section) => {
    section("text", (it) => {
        it("text");
        it("Header");
    });
});
tester(content, (section) => {
    section("Header", (it, sections) => {
        assert(Array.isArray(sections));
        it("unknown", (texts, section) => {
            assert(section instanceof SectionTesting);
            assert(Array.isArray(texts));
            return texts.every(text => !section.contains(text));
        });
    });
});