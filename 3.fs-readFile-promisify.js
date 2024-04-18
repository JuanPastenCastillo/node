/* node 3.fs-readFile-promisify.js  */

/*
 * Use this only in native modules who doesn't support promises
 */
const fs = require("node:fs")
const { promisify } = require("node:util")

const readFilePromisify = promisify(fs.readFile)

const {
  allCSSConsoleLog_CJS,
} = require("./css_console_log/cjs/allCSSConsoleLog_CJS.js")

console.log("⌛ Reading first file...")
readFilePromisify("./text.txt", "utf-8").then((text) => {
  console.log(allCSSConsoleLog_CJS.FgCyan, "text:", text)
})

console.log("❤ Make things while the files is readed")

console.log("✨Reading second file...")
readFilePromisify("./text2.txt", "utf-8").then((text) => {
  console.log(allCSSConsoleLog_CJS.FgMagenta, "text:", text)
})
