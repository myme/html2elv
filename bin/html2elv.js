#!/usr/bin/env node

var fs = require('fs');
var optimist = require('optimist')
  .usage('Usage: $0 [file]')
  .describe('help', 'Display options')
  .alias('help', 'h');
var argv = optimist.argv;
var Parser = require('../lib/parser').Parser;

if (argv.help) {
  optimist.showHelp();
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
  console.log(data.toJavaScript());
});
