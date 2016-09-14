// LICENSE : MIT
"use strict";
// https://github.com/mohayonao/run-with-mocha/blob/master/index.js
const MOCHA_GLOBAL_API = ["context", "describe", "it", "before", "after", "beforeEach", "afterEach"];
export default function runWithMocha() {
    if (MOCHA_GLOBAL_API.every(key => typeof global[key] === "function")) {
        return;
    }
    MOCHA_GLOBAL_API.forEach((key) => {
        global[key] = () => {
        };
        global[key].skip = global[key].only = () => {
        };
    });

    const cp = require("child_process");
    const bin = cp.execSync("npm bin", {encoding: "utf-8"}).trim();
    const proc = cp.exec(`${ bin }/mocha ${ process.argv[1] }`, {
        env: Object.assign(process.env, {"NODE_ENV": "development"})
    });

    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("exit", (code) => {
        process.exit(code);
    });
}