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

    toSectionNode() {
        const nodes = this.toArray();
        const firstNode = nodes[0];
        const lastNode = nodes[nodes.length - 1];
        if (!firstNode || !lastNode) {
            return {
                type: "Section",
                children: []
            }
        }
        return {
            type: "Section",
            range: [firstNode.range[0], lastNode.range[1]],
            loc: {
                start: firstNode.loc.start,
                end: lastNode.loc.end
            },
            raw: nodes.map(node => node.raw).join(""),
            children: nodes
        };
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
    const headerType = /Header/i;
    // remark and txtast
    const rootType = /Document/i;

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
    return sections.map(section => section.toSectionNode());
};