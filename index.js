var swig  = require('swig')
function relativePath (p) {
  return require('path').join(__dirname, p)
} 
var templateFile = relativePath('templates/index.html')
var template = swig.compileFile(templateFile)
var output = template(require('./config.js'))
console.log('generated file, outputting')
var fs = require('fs')
var outputFile = relativePath('dist/index.html')
fs.writeFileSync(outputFile, new Buffer(output))
console.log
console.log('generated!')
