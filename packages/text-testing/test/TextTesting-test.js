// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import TextTesting from "../src/TextTesting";
import DocumentTesting from "../src/DocumentTesting";
import SectionTesting from "../src/SectionTesting";
const testing = new TextTesting();
describe("content", function() {

    const content = `
# section

text is.
`;
    it("should pass", function() {
        testing.load(content, (document) => {
            assert(document instanceof DocumentTesting);
            document.forEachSection("section", (section) => {
                assert(section instanceof SectionTesting);
                assert(section.contains("text"));
            });
        });
    });
});
