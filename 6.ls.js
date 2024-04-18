/* node 6.ls.js */

const fs = require("node:fs")

let exists = fs.existsSync("./text.txt") /* true */
console.log("exists:", exists)

let noExist = fs.existsSync("./text9999999.txt") /* false */
console.log("noExist:", noExist)

let onlyPath = fs.existsSync("./mjs/") /* true */
console.log("onlyPath:", onlyPath)

fs.readdir("./", (err, files) => {
  if (err) {
    console.log("Error on trying to read the directory", err)
    return
  }
  files.forEach((x, index) => console.log(`${index}: ${x}`))
})
