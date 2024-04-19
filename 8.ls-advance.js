/* node 8.ls-advance.js */
const path = require("node:path")
const fsPromise = require("node:fs/promises")

const folder = process.argv[2] ?? "."

const MACHINE = process.env.OS
const USER_NAME = process.env.USERNAME

const fileDataArray = []
let biggerWidth = 0

fsPromise
  .readdir(folder)
  .then(async (files) => {
    for (const x of files) {
      const filePath = path.join(folder, x)

      try {
        const xStat = await fsPromise.stat(filePath)
        const options = {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }
        let theDateFormatted = new Date(xStat.birthtime).toLocaleString(
          undefined,
          options,
        )

        let fileIsFolder = xStat.isDirectory()
        let fileFormatted = fileIsFolder
          ? `\x1b[34m${filePath}\x1b[0m`
          : filePath

        const formattedSize = xStat.size.toString()

        const fileDataObject = {
          theDateFormatted,
          fileFormatted,
          formattedSize,
        }

        if (formattedSize.length > biggerWidth) {
          biggerWidth = formattedSize.length
        }

        fileDataArray.push(fileDataObject)
      } catch (errorStat) {
        console.log(false, errorStat)
      }
    }

    fileDataArray.forEach((x) => {
      console.log(
        MACHINE,
        USER_NAME,
        x.theDateFormatted,
        x.formattedSize.padEnd(biggerWidth),
        x.fileFormatted,
      )
    })
  })
  .catch((err) => {
    if (err) {
      console.log("Error on trying to read the directory", err)
      return
    }

    console.log("💫Keep running!")
  })
