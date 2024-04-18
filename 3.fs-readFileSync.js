/* node 3.fs-readFileSync.js */

const fs = require("node:fs")

console.log("⌛reading first file...")
const text = fs.readFileSync("./text.txt", "utf-8")
console.log("text:", text)

console.log("❤Make things while the files is readed")

console.log("✨reading second file...")
const text2 = fs.readFileSync("./text2.txt", "utf-8")
console.log("text2:", text2)
