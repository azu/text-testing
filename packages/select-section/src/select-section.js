// LICENSE : MIT
"use strict";
const traverse = require("txt-ast-traverse").traverse;
class Section {
    constructor(level) {
        this._sectionLevel = level;
        this.nodes = [];
    }

    isSameLevel(level) {
        return level === this._sectionLevel;
    }

    add(node) {
        this.nodes.push(node);
    }

    toArray() {
        return this.nodes.slice();
    }
}
/**
 * create `sections` from `txtAST`
 * @param {Object} txtAST
 * @returns {Array[]} sections - the section is array of the section nodes
 */
module.exports = function(txtAST) {
    let level = 0;
    let currentSection = new Section(NaN);
    const sections = [];
    const headerType = /heading/i;
    // remark and txtast
    const rootType = /(root|document)/i;

    traverse(txtAST, {
        enter(node) {
            if (headerType.test(node.type)) {
                currentSection = new Section(level);
                currentSection.add(node);
                sections.push(currentSection);
            } else if (currentSection.isSameLevel(level)) {
                currentSection.add(node);
            }
            level++;
        },
        leave(node) {
            level--;
            if (rootType.test(node.type)) {
                if (sections.indexOf(currentSection) === -1) {
                    sections.push(currentSection);
                }
            }
        }
    });
    return sections.map(section => section.toArray());
};