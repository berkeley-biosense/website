var swig  = require('swig')
var fs = require('fs')
var execSync = require('child_process').execSync
var joinPath = require('path').join
var relativePath = p => joinPath(__dirname, p)
var printLine = character => console.log(new Array(42).join(character))
var markdown = require('markdown').markdown
var write = (path, str) => fs.writeFileSync(path, new Buffer(str))

printLine('.')
console.log('loading config...')
var config = require('./config.js')

console.log('generating project pages...')
var projectPageTemplateFile = joinPath(__dirname, 'templates', 'project.html')
function buildProjectPage (project) {
  var projectPath = relativePath(project.url)
  // (destructively) make a path in dist/
  var distProjectPath = joinPath(__dirname, 'dist', project.url)
  execSync(`mkdir -p ${distProjectPath}`)
  // copy assets
  var projectAssetsPath = joinPath(projectPath, 'assets')
  var distProjectAssetsPath = joinPath(distProjectPath, 'assets')
  execSync(`cp -rf ${projectAssetsPath} ${distProjectAssetsPath}`)
  // generate html from project's index.md
  var indexMdPath = joinPath(projectPath, 'index.md')
  var indexMd = fs.readFileSync(indexMdPath).toString()
  var indexHTML = markdown.toHTML(indexMd)
  // put in project template
  project.html = indexHTML
  var template = swig.compileFile(projectPageTemplateFile)
  var output = template(project)
  // write index html to the new path
  var indexHTMLPath = joinPath(distProjectPath, 'index.html')
  write(indexHTMLPath, output)
}
config.projects.map(buildProjectPage)
console.log('bundling template files...')
execSync('bundledown templates/index.html -o bundled.html') 
var templateFile = relativePath('bundled.html')
var template = swig.compileFile(templateFile)
var output = template(config)

console.log('generated file, outputting index.html..')
var outputFile = relativePath('dist/index.html')
write(outputFile, output)

console.log('lab site generated! cleaning up..')
execSync('rm bundled.html')
console.log('done!')
printLine('.')
