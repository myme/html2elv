var cheerio = require('cheerio');
var nodes = require('./nodes');

var Parser = exports.Parser = function () {};


Parser.prototype.parse = function (html) {
  var parsed = cheerio.parseHTML(html);
  return walk(parsed);
};


var id = function (node) {
  return node;
};


var handlers = {
  'comment': function (node) {
    return null;
  },

  'directive': function (node) {
    return null;
  },

  'tag': function (node) {
    if (node.children instanceof Array) {
      children = node.children.map(walk).filter(id);
    }
    return new nodes.Tag(node.name, node.attribs, children);
  },

  'text': function (node) {
    var text = node.data.split('\n').map(function (line) {
      return line.replace(/^(\s+)/, ' ').replace(/(\s+)$/, ' ');
    }).join(' ');
    if (!text.trim()) {
      return null;
    }
    return new nodes.Text(text);
  }
};


var walk = function (node) {
  if (node instanceof Array) {
    return new nodes.List(node.map(walk).filter(id));
  }
  if (!handlers[node.type]) {
    throw new TypeError('Unknown node type: ' + node.type);
  }
  return handlers[node.type](node);
};
