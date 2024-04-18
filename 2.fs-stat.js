const fs = require("node:fs")

const stats = fs.statSync("./file.txt")
console.log(
  "stats:",
  stats.isFile() /* Is a file? */,
  stats.isDirectory() /* Is directory? */,
  stats.isSymbolicLink() /* Is symbolic link? */,
  stats.size /* Size in bytes */,
)
