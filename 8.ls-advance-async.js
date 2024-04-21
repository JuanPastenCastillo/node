/* node 8.ls-advance-async.js */
const path = require("node:path")
const fsPromise = require("node:fs/promises")

const folder = process.argv[2] ?? "."

const MACHINE = process.env.OS
const USER_NAME = process.env.USERNAME

const ls = async (theFolder) => {
  let theFiles
  try {
    theFiles = await fsPromise.readdir(theFolder)
  } catch {
    console.log(` Error on trying to read the directory ${theFolder}`)
    process.exit(1)
  }

  let widthText = {
    fileTypeWidth: 0,
    fileSizeWidth: 0,
    fileModifiedWidth: 0,
    theActualFile: 0,
  }
  /* Not sequential here */
  const filesPromises = theFiles.map(async (xFilesPromises, index) => {
    const filePath = path.join(folder, xFilesPromises)
    let stats

    console.log("No wait", index)

    try {
      stats = await fsPromise.stat(filePath)
      console.log("stats", index)
    } catch {
      console.log("Error on trying to read the directory")
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? `\x1b[34md\x1b[0m` : "f"
    const fileSize = stats.size

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
      fileModified: `${fileModified}`,
      theActualFile: `${xFilesPromises}`,
    }
  })

  const filesInfo = await Promise.all(filesPromises)

  console.log(`MACHINE: ${MACHINE}`)
  console.log(`USER NAME: ${USER_NAME}`)

  filesInfo.forEach(({ fileType, fileSize, fileModified, theActualFile }) => {
    console.log(
      fileModified.padEnd(widthText.fileModifiedWidth),
      fileSize.padEnd(widthText.fileSizeWidth),
      fileType.padEnd(widthText.fileTypeWidth),
      theActualFile.padEnd(widthText.theActualFile),
    )
  })
}

ls(folder)
