/* node 4.fs-promises-then.js */

const fs = require("node:fs/promises")
const {
  allCSSConsoleLog_CJS,
} = require("./css_console_log/cjs/allCSSConsoleLog_CJS.js")

console.log("⌛ Reading first file...")
fs.readFile("./text.txt", "utf-8").then((text) => {
  console.log(allCSSConsoleLog_CJS.FgCyan, "text:", text)
})

console.log("❤ Make things while the files is readed")

console.log("✨Reading second file...")
fs.readFile("./text2.txt", "utf-8").then((text) => {
  console.log(allCSSConsoleLog_CJS.FgMagenta, "text:", text)
})
