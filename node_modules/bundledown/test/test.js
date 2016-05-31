var test = require('tape')
  , fs = require('fs')
  , path = require('path')
 
test('simple example should be ok', function (t) {
  t.plan(1)
  var correct   = fs.readFileSync(path.join(__dirname,  'simple', 'correct.md'))
  var generated = fs.readFileSync(path.join(__dirname,  'simple', 'bundle.md'))
  t.deepEquals(correct.toString(), generated.toString())
})



test('advanced example should be ok', function (t) {
  t.plan(1)
  var correct   = fs.readFileSync(path.join(__dirname,  'advanced', 'correct.md'))
  var generated = fs.readFileSync(path.join(__dirname,  'advanced', 'bundle.md'))
  t.deepEquals(correct.toString(), generated.toString())
})


