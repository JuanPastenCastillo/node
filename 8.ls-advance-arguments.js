/* node 8.ls-advance-arguments.js */
/* node 8.ls-advance-arguments.js -f=mjs/ -h -x nonesense_here -f=cmj/ -v */
/* node 8.ls-advance-arguments.js -f=cmj/ -v -x nonesense_here -f=mjs/ -h */
/* node 8.ls-advance-arguments.js -v -x nonesense_here */
/* node 8.ls-advance-arguments.js -h -x nonesense_here */
/* node 8.ls-advance-arguments.js -f=mjs/ -x nonesense_here */
/* node 8.ls-advance-arguments.js -f=cmj/ -x nonesense_here */

const path = require("node:path")
const fsPromise = require("node:fs/promises")

const ARGUMENTS_ACCEPTED = {
  "-h": "-h", // hidden
  "-v": "-v", // visible
  "-a": "-a", // all → this is the default
  "-f": "-f", // folder → by default, actual folder
}

const whichArgumentsUsed = () => {
  let allArguments = process.argv.slice(2)

  let folderToUse = ""
  let filesToDisplay = ""
  allArguments.forEach((xAllArguments) => {
    if (folderToUse === "") {
      let folderMatched = xAllArguments.match(/^\-f=*/)
      if (folderMatched) {
        folderToUse = folderMatched.input.match(/(?<=\-f=).*/g)[0]
        return
      }
    }

    if (filesToDisplay === "") {
      let filesMatched = xAllArguments.match(/^\-h|^\-v/)
      if (filesMatched) {
        filesToDisplay = filesMatched.input
        return
      }
    }
  })

  return {
    folderToUse: folderToUse || ".",
    filesToDisplay: filesToDisplay || "-a",
  }
}

const { folderToUse, filesToDisplay } = whichArgumentsUsed()
const MACHINE = process.env.OS
const USER_NAME = process.env.USERNAME

const ls = async ({ theFolder, filesToDisplay }) => {
  let theFiles
  try {
    theFiles = await fsPromise.readdir(theFolder)
  } catch {
    console.log(`Error on trying to read the directory ${theFolder}`)
    process.exit(1)
  }

  let widthText = {
    fileTypeWidth: 0,
    fileSizeWidth: 0,
    fileModifiedWidth: 0,
    theActualFile: 0,
  }
  //  Not sequential here, this mean: parallel
  const filesPromises = theFiles
    .filter((x) => {
      if (filesToDisplay === "-h" && x.startsWith(".")) {
        return true
      }
      if (filesToDisplay === "-v" && !x.startsWith(".")) {
        return true
      }
      if (filesToDisplay === "-a") {
        return true
      }
    })
    .map(async (xFilesPromises, index) => {
      const filePath = path.join(theFolder, xFilesPromises)
      let stats

      console.log("No wait", index)

      try {
        stats = await fsPromise.stat(filePath)
        // The await here will not wait actually
        // console.log("This will NOT wait:", xFilesPromises)
      } catch {
        console.log("Error on trying to read the directory")
        process.exit(1)
      }

      const isDirectory = stats.isDirectory()
      const fileType = isDirectory ? `\x1b[34md\x1b[0m` : "f"
      const fileSize = stats.size
      let theActualFile = isDirectory
        ? `\x1b[34m${xFilesPromises}\x1b[0m`
        : xFilesPromises

      const options = {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }

      const fileModified = stats.mtime.toLocaleString(undefined, options)

      widthText.fileTypeWidth = 1
      widthText.fileSizeWidth = Math.max(
        widthText.fileSizeWidth,
        fileSize.toString().length,
      )
      widthText.fileModifiedWidth = Math.max(
        widthText.fileModifiedWidth,
        fileModified.length,
      )
      widthText.theActualFile = Math.max(
        widthText.theActualFile,
        xFilesPromises.length,
      )

      return {
        fileType: `${fileType}`,
        fileSize: `${fileSize.toString()}`,
        fileModified,
        theActualFile,
      }
    })

  const filesInfo = await Promise.all(filesPromises)

  console.log(`MACHINE: ${MACHINE}`)
  console.log(`USER NAME: ${USER_NAME}`)

  if (filesInfo.length === 0) {
    console.log("Nothing to show")
    process.exit(0)
  }

  filesInfo.forEach(({ fileType, fileSize, fileModified, theActualFile }) => {
    console.log(
      fileModified.padEnd(widthText.fileModifiedWidth),
      fileSize.padEnd(widthText.fileSizeWidth),
      fileType.padEnd(widthText.fileTypeWidth),
      theActualFile.padEnd(widthText.theActualFile),
    )
  })
  process.exit(0)
}

ls({ theFolder: folderToUse, filesToDisplay })
