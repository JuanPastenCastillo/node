/* node 8.ls-advance-prompt.js */

const readline = require('readline')
const path = require('node:path')
const fsPromise = require('node:fs/promises')
const {
  allCSSConsoleLog_CJS: camelCase
} = require('./css_console_log/cjs/allCSSConsoleLog_CJS')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askQuestion(question) {
  console.log()

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

async function askMultipleQuestions() {
  let done = false
  while (!done) {
    const folderToSearch_ASK = await askQuestion('Which folder to search? ')
    const folderToSearch_ANS =
      folderToSearch_ASK === '' ? '.' : folderToSearch_ASK

    const filesToSearch_ASK = await askQuestion(
      'Which files to search? Separated by comma: all (a), visible (v), hidden (h): '
    )

    const filesToSearch_ANS =
      filesToSearch_ASK === 'h' ? 'h' : filesToSearch_ASK === 'v' ? 'v' : 'a'

    let theFiles = await theMethodToDisplayData({
      theFolder: folderToSearch_ANS,
      filesToDisplay: filesToSearch_ANS
    })

    if (theFiles === undefined) {
      return
    }

    const MACHINE = process.env.OS
    const USER_NAME = process.env.USERNAME
    console.log(`MACHINE: ${MACHINE}`)
    console.log(`USER NAME: ${USER_NAME}`)

    theFiles.forEach(({ fileType, fileSize, fileModified, theActualFile }) => {
      console.log(fileModified, fileSize, fileType, theActualFile)
    })

    const shouldContinue = await askQuestion(`
Do you want to try another time? ${allCSSConsoleLog_CJS.Underscore}(no/n)${allCSSConsoleLog_CJS.Reset}
${allCSSConsoleLog_CJS.Bright}Enter any key to continue${allCSSConsoleLog_CJS.Reset}
`)

    if (
      shouldContinue.toLowerCase() === 'no' ||
      shouldContinue.toLowerCase() === 'n'
    ) {
      done = true
    }
  }

  rl.close()
}

let theMethodToDisplayData = async ({ theFolder, filesToDisplay }) => {
  let theFiles
  try {
    theFiles = await fsPromise.readdir(theFolder)
  } catch {
    console.log(
      `Error on trying to read the directory ${allCSSConsoleLog_CJS.Bright}${theFolder}${allCSSConsoleLog_CJS.Reset}`
    )
    return askMultipleQuestions()
  }

  let widthText = {
    fileTypeWidth: 0,
    fileSizeWidth: 0,
    fileModifiedWidth: 0,
    theActualFile: 0
  }
  //  Not sequential here, this mean: parallel
  const filesPromises = theFiles
    .filter((x) => {
      if (filesToDisplay === 'h' && x.startsWith('.')) {
        return true
      }
      if (filesToDisplay === 'v' && !x.startsWith('.')) {
        return true
      }
      if (filesToDisplay === 'a') {
        return true
      }
    })
    .map(async (xFilesPromises, index) => {
      const filePath = path.join(theFolder, xFilesPromises)
      let stats

      // console.log("No wait", index)

      try {
        stats = await fsPromise.stat(filePath)
        // The await here will not wait actually
        // console.log("This will NOT wait:", xFilesPromises)
      } catch {
        console.log('Error on trying to read the directory')
        process.exit(1)
      }

      const isDirectory = stats.isDirectory()
      const fileType = isDirectory ? `\x1b[34md\x1b[0m` : 'f'
      const fileSize = stats.size
      let theActualFile = isDirectory
        ? `\x1b[34m${xFilesPromises}\x1b[0m`
        : xFilesPromises

      const options = {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }

      const fileModified = stats.mtime.toLocaleString(undefined, options)

      widthText.fileTypeWidth = 1
      widthText.fileSizeWidth = Math.max(
        widthText.fileSizeWidth,
        fileSize.toString().length
      )
      widthText.fileModifiedWidth = Math.max(
        widthText.fileModifiedWidth,
        fileModified.length
      )
      widthText.theActualFile = Math.max(
        widthText.theActualFile,
        xFilesPromises.length
      )

      return {
        fileType: `${fileType}`,
        fileSize: `${fileSize.toString()}`,
        fileModified,
        theActualFile
      }
    })

  const filesInfo = await Promise.all(filesPromises)

  if (filesInfo.length === 0) {
    console.log(
      `${allCSSConsoleLog_CJS.Reverse}Nothing to show${allCSSConsoleLog_CJS.Reset}`
    )
    return askMultipleQuestions()
  }

  let toReturn = []

  filesInfo.forEach(({ fileType, fileSize, fileModified, theActualFile }) => {
    let fileModifiedObj = fileModified.padEnd(widthText.fileModifiedWidth)
    let fileSizeObj = fileSize.padEnd(widthText.fileSizeWidth)
    let fileTypeObj = fileType.padEnd(widthText.fileTypeWidth)
    let theActualFileObj = theActualFile.padEnd(widthText.theActualFile)

    let objToReturn = {
      fileModified: fileModifiedObj,
      fileSize: fileSizeObj,
      fileType: fileTypeObj,
      theActualFile: theActualFileObj
    }

    toReturn.push(objToReturn)
  })
  return toReturn
}

askMultipleQuestions()
