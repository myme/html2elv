/*
 * Tag nodes
 */

var Tag = exports.Tag = function (name, children) {
  this.name = name;
  this.children = children || [];
};

Tag.prototype.tagSpec = function () {
  return this.name;
};

Tag.prototype.toJavaScript = function () {
  var output = "el('" + this.tagSpec() + "'";

  var children = this.children.map(function (each) {
    return each.toJavaScript();
  });

  if (children.length) {
    output += ",\n" + children.join(', ');
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
