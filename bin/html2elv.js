#!/usr/bin/env node

var fs = require('fs');
var argv = require('optimist').argv;
var Parser = require('../lib/parser').Parser;


if (argv._.length !== 1) {
  console.log('Usage: html2elv <filename>');
  process.exit(1);
}

var filename = argv._[0];
var data = fs.readFileSync(filename, 'utf8');
console.log(new Parser().parse(data).toJavaScript());
