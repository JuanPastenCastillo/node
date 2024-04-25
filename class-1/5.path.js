/* node class-1/5.path.js */

/*
 * We going to use this to build the route of files, know if a file have some extension, recover an extension, create absolute routes, joinr routes and so on
 */
const path = require("node:path")
console.log("path:", path.sep) // path separator for your actual OS

const filePath = path.join(
  "folder",
  "file.txt"
) /* The ausencce of first "/" at the beginning of the path make this an relative path, the second "/" are optionals  */
console.log("filePath:", filePath)

console.log("filePath:", path.resolve("folder", "file.txt"))
console.log("filePath:", path.resolve("folder", "subfolder", "file.txt"))

// Is relativePath absolute?
console.log("Is relativePath absolute?:", path.isAbsolute(filePath))
console.log("Is relativePath relative?:", !path.isAbsolute(filePath))
// Make it absolute
console.log("absoluteFilePath:", path.resolve(__dirname, filePath))

const filePath2 = path.join(
  "/folder",
  "/file.txt"
) /* The presence of the first "/" at the beginning of the path make this an absolute path, the second "/" are optionals  */
console.log("filePath2:", filePath2)

// Is relativePath2 absolute?
console.log("Is relativePath2 absolute?:", path.isAbsolute(filePath2))
console.log("Is relativePath2 relative?:", !path.isAbsolute(filePath2))

// This should throw an error
console.log("absoluteFilePath:", path.resolve(__dirname, filePath2))

let some_route = "tmp/secrets/password.txt"

const base =
  path.basename(
    some_route
  ) /* From the whole route you will get the name of the file */
console.log("base:", base)

const extension =
  path.extname(
    some_route
  ) /* From the whole route you will get the extension of the file */
console.log("extension:", extension)

const filename = path.basename(
  some_route,
  ".txt"
) /* From the whole route you will get the name of the file */
console.log("filename:", filename)

const filename_with_variable = path.basename(
  some_route,
  extension
) /* From the whole route you will get the name of the file */
console.log("filename_with_variable:", filename_with_variable)
