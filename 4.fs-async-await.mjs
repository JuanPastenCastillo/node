import { readFile } from "node:fs/promises"
import { allCSSConsoleLog_MJS } from "./css_console_log/mjs/allCSSConsoleLog_MJS.mjs"

console.log("⌛ Reading first file...")

let firstText = await readFile("./text.txt", "utf-8")
console.log(allCSSConsoleLog_MJS.FgCyan, `firstText: ${firstText}`)

console.log("❤ Make things while the files is readed")

console.log("✨Reading second file...")
let secondText = await readFile("./text2.txt", "utf-8")
console.log(allCSSConsoleLog_MJS.FgMagenta, `secondText: ${secondText}`)
