var cheerio = require('cheerio');
var nodes = require('./nodes');

var Parser = exports.Parser = function () {};


Parser.prototype.parse = function (html) {
  var parsed = cheerio.parseHTML(html);
  return walk(parsed[0]);
};


var handlers = {
  'tag': function (node) {
    if (node.children instanceof Array) {
      children = node.children.map(walk).filter(function (each) {
        return each;
      });
    }
    return new nodes.Tag(node.name, children);
  },

  'text': function (node) {
    var text = node.data;
    text = text.replace(/^(\s+)/, ' ');
    text = text.replace(/(\s+)$/, ' ');
    if (!text.trim()) {
      return null;
    }
    return new nodes.Text(text);
  }
};


var walk = function (node) {
  if (!handlers[node.type]) {
    throw new TypeError('Unknown node type: ' + node.type);
  }
  return handlers[node.type](node);
};
