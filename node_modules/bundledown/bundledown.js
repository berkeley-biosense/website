#!/usr/bin/env node

// TODO should work with e.g. '../../file.md'

var fs          = require('fs')
, path          = require('path')
, argv          = require('minimist')(process.argv.slice(2))
, through       = require('through2')
, split         = require('split')
, duplexer      = require('duplexer2')
, includeRegex  = /@include\('.+'\)/g

function startsWith (str1, str2) {
  return str1[0] === str2
}

function baseDirOf (p) {
  return path.dirname(p)
}

function read (f) {
  if (startsWith(f, '/'))
    return fs.createReadStream(f)
  else
    return fs.createReadStream(f)
}

function write (f) {
  return fs.createWriteStream(f)
}

// return absolute filepath from include statement, given a root directory
//
//    getFilePath("@include('./my/path.md'", 'chapter1')
//    > 'chapter1/my/path.md'
//
function getFilePath (inclStatement, baseDir) {

  //ex.
  //    relPath('@include('./my/path')
  //    > './my/path'
  function relPath (inclStatement) {
    return inclStatement.match(/'.+'/g)[0].split('\'')[1]
  }
  
  // turn relative paths into absolute paths 
  function absPath (relativePath, baseDir) {
    // remove leading period
    var p = relativePath.slice(1)
    return path.join(baseDir, p)
  }
  
  return absPath(
      relPath(inclStatement)
    , baseDir)
}

function recursivelyParseBuffer (baseDirectory) {

  function recurse (includeStatement) {
    var p       = getFilePath(includeStatement, baseDirectory)
    var base    = baseDirOf(p)
    return read(p)
      .pipe(split())
      .pipe(recursivelyParseBuffer(base))
  }

  var input  = through()
  var output = through()
  input
    .pipe(through(function (buff, _, next) {
      var line    = buff.toString()
      var matches = line.match(includeRegex)
      if (matches) {
        var r = recurse(matches[0])
        r.pipe(output, {end: false})
        r.on('end', next)
      }
      else {
        output.write(buff+'\n\n')
        next()
      }
    }
    , function () {
      output.end()
    }))

  return duplexer(input, output)
}

// usage: `bundledown my-file.md -o bundle.md`
var infile    = argv._[0]
var outstream = argv.o ? write(argv.o) : process.stdout

read(infile)
  .pipe(split())
  .pipe(recursivelyParseBuffer(baseDirOf(infile)))
  .pipe(outstream)
