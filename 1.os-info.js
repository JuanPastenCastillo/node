/* node 1.os-info.js */
const os = require("node:os")

console.log("OS data:")
console.log("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")

console.log("OS name:", os.platform())
console.log("OS version:", os.release())
console.log("OS Architecture:", os.arch())
console.log("CPUs:", os.cpus())
console.log("Free memory:", os.freemem() / 1024 / 1024)
console.log("Total memory:", os.totalmem() / 1024 / 1024)

const everythingOfOS = {
  // EOL: os.EOL(),
  availableParallelism: os.availableParallelism(),
  arch: os.arch(),
  constants: os.constants,
  cpus: os.cpus(),
  devNull: os.devNull,
  endianness: os.endianness(),
  freemem: os.freemem(),
  // getPriority: os.getPriority([pid]),
  homedir: os.homedir(),
  hostname: os.hostname(),
  loadavg: os.loadavg(),
  machine: os.machine(),
  networkInterfaces: os.networkInterfaces(),
  platform: os.platform(),
  release: os.release(),
  // setPriority: os.setPriority([pid, ]priority),
  tmpdir: os.tmpdir(),
  totalmem: os.totalmem(),
  type: os.type(),
  uptime: os.uptime() / 60 / 60,
  // userInfo: os.userInfo([options]),
  version: os.version(),
}

console.log("everythingOfOS", everythingOfOS)
