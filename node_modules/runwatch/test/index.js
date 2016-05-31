'use strict'
let write = require('fs').writeFileSync
let spawn = require('child_process').spawn
function runwatch (glob, cmd) {
  return spawn('npm', ['start', glob, cmd])
}

let programPath = require('path').join(__dirname, './program')
let program1 = 'echo "hi"'
let program2 = 'echo "sup"'

let proc = runwatch(programPath, 'bash ' + programPath)

proc.stdout.pipe(process.stdout)
write(programPath, program1)
write(programPath, program2)
write(programPath, program1)
write(programPath, program2)

