/* node 6.ls-promises.js */

const fsPromise = require("node:fs/promises")

let exists = fsPromise.stat("./text.txt")
exists
  .then((x) => {
    console.log(`${x.isFile()}:`, x) /* true */
  })
  .catch((x) => false)

let noExist = fsPromise.stat("./text9999999.txt")
noExist
  .then((x) => {
    console.log(`${x.isFile()}:`, x)
  })
  .catch((x) => console.log(false, x)) /* false */

let onlyPath = fsPromise.stat("./mjs/")
onlyPath
  .then((x) => {
    console.log(`${x.isFile()}:`, x) /* true */
  })
  .catch((x) => false)

fsPromise
  .readdir("./")
  .then((files) => {
    files.forEach((x, index) => console.log(`${index}: ${x}`))
  })
  .catch((err) => {
    if (err) {
      console.log("Error on trying to read the directory", err)
      return
    }
  })
