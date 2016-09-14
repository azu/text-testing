// LICENSE : MIT
"use strict";
const matchAll = require("match-all");
const TextTesting = require("text-testing").TextTesting;
const textTesting = new TextTesting();
import requireMocha from "./require-mocha"
const describe = (typeof global.describe === "function") ? global.describe : function(text, method) {
    return method.apply(this);
};
const it = (typeof global.it === "function") ? global.it : function(text, method) {
    return method.apply(this);
};

module.exports = function tester(content, loadCallback) {
    requireMocha();
    textTesting.load(content, (document) => {
        const sectionTest = (sectionName, sectionCallback) => {
            const matches = sectionName.match(/\*\*(.*?)\*\*/);
            const trimmedSectionName = matches ? matches[1] : sectionName;
            describe(sectionName, () => {
                /*
                 tester(content, (section) => {
                    section("Header", (it, sections) => {

                    });
                 });
                 */
                /**
                 * predicate function
                 * @param {string[]} texts
                 * @param {SectionTesting} section
                 * @returns {boolean}
                 */
                const defaultPredicate = (texts, section) => {
                    return texts.every(text => section.contains(text));
                };
                const test = (text, predicate = defaultPredicate) => {
                    testText(trimmedSectionName, text, predicate);

                };
                sectionCallback(test, document.sections);
            });
        };
        const testText = (sectionName, text, predicate) => {
            const match = matchAll(text, /\*\*(.*?)\*\*/g);
            const matchTexts = match.toArray().length !== 0
                ? match.toArray()
                : [text];
            it(text, () => {
                let isContained = false;
                document.forEachSection(sectionName, (section) => {
                    if (isContained) {
                        return;
                    }
                    if (predicate(matchTexts, section)) {
                        isContained = true;
                    }
                });
                if (!isContained) {
                    throw new Error(`"${text}" is not contained.`);
                }
            });
        };
        loadCallback(sectionTest);
    })
};
