import {
  arch as _arch,
  availableParallelism as _availableParallelism,
  constants as _constants,
  cpus as _cpus,
  devNull as _devNull,
  endianness as _endianness,
  freemem as _freemem,
  homedir as _homedir,
  hostname as _hostname,
  loadavg as _loadavg,
  machine as _machine,
  networkInterfaces as _networkInterfaces,
  platform as _platform,
  release as _release,
  tmpdir as _tmpdir,
  totalmem as _totalmem,
  type as _type,
  uptime as _uptime,
  version as _version,
} from "node:os"

console.log("OS data:")
console.log("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")

console.log("OS name:", _platform())
console.log("OS version:", _release())
console.log("OS Architecture:", _arch())
console.log("CPUs:", _cpus())
console.log("Free memory:", _freemem() / 1024 / 1024)
console.log("Total memory:", _totalmem() / 1024 / 1024)

const everythingOfOS = {
  // EOL: os.EOL(),
  availableParallelism: _availableParallelism(),
  arch: _arch(),
  constants: _constants,
  cpus: _cpus(),
  devNull: _devNull,
  endianness: _endianness(),
  freemem: _freemem(),
  // getPriority: os.getPriority([pid]),
  homedir: _homedir(),
  hostname: _hostname(),
  loadavg: _loadavg(),
  machine: _machine(),
  networkInterfaces: _networkInterfaces(),
  platform: _platform(),
  release: _release(),
  // setPriority: os.setPriority([pid, ]priority),
  tmpdir: _tmpdir(),
  totalmem: _totalmem(),
  type: _type(),
  uptime: _uptime() / 60 / 60,
  // userInfo: os.userInfo([options]),
  version: _version(),
}

console.log("everythingOfOS", everythingOfOS)
