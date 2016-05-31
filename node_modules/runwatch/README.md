# runwatch

watch some files, run a command (when the files change)

## install

```
npm install -g runwatch
```

## use
```
runwatch [files to watch] -r "[command to run]"
```

## example

```
echo "echo \"hello\"" > test.sh
runwatch test.sh -r "bash test.sh"
```

now modify test.sh, and watch the script re-run!

## about

heavily inspired by [npm-watch](https://www.npmjs.com/package/npm-watch), but with a few differences:

- runs from the command line, no npm dependencies
- uses standard [file globs](https://github.com/isaacs/node-glob)
- when the watched script errors, it prints *only* the error, with no npm erroring boilerplate (!)
- no nodemon dependencies - just `child_process.spawn()`


## license

BSD
