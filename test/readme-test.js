// LICENSE : MIT
"use strict";
const tester = require("../packages/text-testing-mocha");
const fs = require("fs");
const content = fs.readFileSync(__dirname + "/../README.md", "utf-8");
tester(content, (section) => {
    section("What is this?", (test) => {
        test("It is");
    });
});