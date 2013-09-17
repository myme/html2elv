#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var optimist = require('optimist')
  .usage('Usage: $0 [file]')
  .option('help', {
    alias: 'h',
    describe: 'Display options'
  })
  .option('create-element', {
    describe: 'Name of the create element alias',
    default: 'el'
  })
  .option('quotes', {
    describe: 'Type of quotes used',
    default: "'"
  })
  .option('version', {
    alias: 'v',
    describe: 'Display version information'
  });
var argv = optimist.argv;
var Parser = require('../lib/parser').Parser;

if (argv.help) {
  optimist.showHelp();
  process.exit(0);
}

if (argv.version) {
  var pkg_path = path.normalize(path.join(__dirname, '..', 'package.json'));
  var pkg = JSON.parse(fs.readFileSync(pkg_path));
  console.log(pkg.name + ': v' + pkg.version);
  process.exit(0);
}

var stream;
if (!argv._.length) {
  stream = process.stdin;
  stream.resume();
} else {
  stream = fs.createReadStream(argv._[0]);
}

stream.setEncoding('utf8');

new Parser().parseStream(stream, function (err, data) {
  console.log(data.toJavaScript({
    createEl: argv['create-element'],
    quotes: argv.quotes
  }));
});
