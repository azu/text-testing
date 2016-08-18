// LICENSE : MIT
"use strict";
const TextTesting = require("text-testing").TextTesting;
const textTesting = new TextTesting();
const describe = (typeof global.describe === "function") ? global.describe : function(text, method) {
    return method.apply(this);
};
const it = (typeof global.it === "function") ? global.it : function(text, method) {
    return method.apply(this);
};

module.exports = function tester(content, loadCallback) {
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
                 * @param {string} text
                 * @param {SectionTesting} section
                 * @returns {boolean}
                 */
                const defaultPredicate = (text, section) => {
                    return section.contains(text);
                };
                const test = (text, predicate = defaultPredicate) => {
                    testText(trimmedSectionName, text, predicate);

                };
                sectionCallback(test, document.sections);
            });
        };
        const testText = (sectionName, text, predicate) => {
            const matches = text.match(/\*\*(.*?)\*\*/);
            const matchText = matches ? matches[1] : text;
            it(text, () => {
                let isContained = false;
                document.forEachSection(sectionName, (section) => {
                    if (isContained) {
                        return;
                    }
                    if (predicate(matchText, section)) {
                        isContained = true;
                    }
                });
                if (!isContained) {
                    throw new Error(`"${matchText}" is not contained.`);
                }
            });
        };
        loadCallback(sectionTest);
    })
};
