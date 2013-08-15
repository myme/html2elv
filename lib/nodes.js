var indent = '  ';

var indentChild = function (output) {
  return output.split('\n').map(function (line) {
    return indent + line;
  }).join('\n');
};


/*
 * List
 */

var List = exports.List = function (children) {
  this.children = children || [];
};

List.prototype.toJavaScript = function () {
  return this.children.map(function (node) {
    return node.toJavaScript();
  }).join('\n');
};


/*
 * Tag nodes
 */

var Tag = exports.Tag = function (name, attributes, children) {
  var attr;

  this.name = name;
  this.id = '';
  this.classes = [];
  this.attributes = {};
  this.children = children || [];

  for (attr in attributes) {
    if (attributes.hasOwnProperty(attr)) {
      if (attr === 'id') {
        this.id = attributes.id;
      } else if (attr === 'class') {
        this.classes = attributes.class.split(/\s+/);
      } else {
        this.attributes[attr] = attributes[attr];
      }
    }
  }
};

Tag.prototype.tagSpec = function () {
  var id = this.id;
  var classes = this.classes.slice();

  if (id) {
    id = '#' + id;
  }

  if (classes.length) {
    classes.unshift('');
  }

  return this.name + id + classes.join('.');
};

Tag.prototype.toJavaScript = function () {
  var attr;
  var attributes = [];
  var output = "el('" + this.tagSpec() + "'";

  for (attr in this.attributes) {
    if (this.attributes.hasOwnProperty(attr)) {
      attributes.push(indent + attr + ": '" + this.attributes[attr] + "'");
    }
  }

  if (attributes.length) {
    output += ", {\n" + attributes.join(',\n') + '\n}';
  }

  var children = this.children.map(function (each) {
    return each.toJavaScript();
  });

  if (this.children.length === 1 && this.children[0] instanceof Text) {
    output += ", " + children[0];
  } else if (children.length >= 1) {
    output += ", [\n" + children.map(indentChild).join(',\n') + '\n]';
  }

  output += ")";
  return output;
};


/*
 * Text nodes
 */

var Text = exports.Text = function (value) {
  this.value = value;
};

Text.prototype.toJavaScript = function () {
  return "'" + this.value + "'";
};
