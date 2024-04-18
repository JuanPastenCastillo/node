/* node 4.fs-async-await-IIFE.js */

const { readFile } = require("node:fs/promises")
const {
  allCSSConsoleLog_CJS,
} = require("./css_console_log/cjs/allCSSConsoleLog_CJS")

;(async () => {
  console.log("⌛ Reading first file...")

  let firstText = await readFile("./text.txt", "utf-8")
  console.log(allCSSConsoleLog_CJS.FgCyan, `firstText: ${firstText}`)

  console.log("❤ Make things while the files is readed")

  console.log("✨Reading second file...")
  let secondText = await readFile("./text2.txt", "utf-8")
  console.log(allCSSConsoleLog_CJS.FgMagenta, `secondText: ${secondText}`)
})()
