/* node 7.process.js */

/* Argumentos of entry: with this you can configure things in the command line, if you made an API and you want put configurations there passing arguments to it*/
console.log("process.argv:", process.argv)

const { argv } = require("node:process")

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

let theVeryFirst = process.argv0
console.log("theVeryFirst:", theVeryFirst)

/* Control the process and their exit:
 * Number 0 means that the process exits successfully
 * Number 1 means that the process exits with an error
 */
console.log("process.exit(0) → Success")
console.log("process.exit(1) → Error")

/* This do things when the process end, of the process, specific errors, and so son */
process.on("exit", (code) => {
  /* Here we can: clean the resources, clean the console */
  console.log(`About to exit with code: ${code}`)
})

/* Current work directory (cwd): says where which folder we are running the process, not where is the file but from which folder the command was executed to run the file */
console.log("process.cwd():", process.cwd())

/* Platform */
// console.log("process:", process)
console.log("process.platform:", process.platform)
console.log("process.cpuUsage:", process.cpuUsage())

/* This is a bad thing on node becaus the process.env: it have access to all the environment variables */

// console.log("process.env:", process.env)
console.log("process.env.OS:", process.env.OS)
console.log("process.env.PWD:", process.env.PWD)
/* 
* To trigget this you have to put the variable name at the beggining of the call on the terminal like this 
  <CUSTOM_BY_ME=MY_VALUE node 7.process.js> or
  <CUSTOM_BY_ME="MY_VALUE WITH SPACES" node 7.process.js>
* This are the rules of the variable and the value: 

*/
console.log("process.env.CUSTOM_BY_ME:", process.env.CUSTOM_BY_ME)

/* execPath */
console.log("process.execPath:", process.execPath)
