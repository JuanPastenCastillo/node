/* node 4.fs-async-await-parallel.mjs */

import { readFile } from "node:fs/promises"
import { allCSSConsoleLog_MJS } from "./css_console_log/mjs/allCSSConsoleLog_MJS.mjs"

Promise.all([
  readFile("./text.txt", "utf-8"),
  readFile("./text2.txt", "utf-8"),
]).then(([firstText, secondText]) => {
  /* Here, we, as developer, control what go first and what next */
  console.log(allCSSConsoleLog_MJS.FgMagenta, `secondText: ${secondText}`)
  console.log(allCSSConsoleLog_MJS.FgCyan, `firstText: ${firstText}`)
})
