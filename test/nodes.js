var nodes = require('../lib/nodes');

require('should');


describe('List', function () {
  describe('.toJavaScript', function () {
    it('passes options to child nodes', function () {
      var node = new nodes.List([
        new nodes.Tag('span', null, [ new nodes.Text('foo') ])
      ]);
      node.toJavaScript({
        createEl: 'foo',
        quotes: '"'
      }).should.equal('foo("span", "foo")');
    });
  });
});


describe('Tag', function () {
  describe('.toJavaScript', function () {
    it('should use "el" by default', function () {
      var node = new nodes.Tag('span');
      node.toJavaScript().should.equal("el('span')");
    });
    it('can change create element function name', function () {
      var node = new nodes.Tag('span');
      node.toJavaScript({ createEl: 'foo' }).should.equal("foo('span')");
    });
    it('can change quote style through options', function () {
      var node = new nodes.Tag('span');
      node.toJavaScript({ quotes: '"' }).should.equal('el("span")');
    });
    it('uses options quotes for attributes', function () {
      var node = new nodes.Tag('a', { href: 'http://example.com' });
      var output = node.toJavaScript({ quotes: '"' }).replace(/\s+/g, ' ');
      output.should.equal('el("a", { href: "http://example.com" })');
    });
    it('quotes dashed attribute names', function () {
      var node = new nodes.Tag('span', { 'data-foo': 'bar' });
      var output = node.toJavaScript({ quotes: '"' }).replace(/\s+/g, ' ');
      output.should.equal('el("span", { "data-foo": "bar" })');
    });
    it('escapes attribute values', function () {
      var node = new nodes.Tag('span', { style: 'background: url("/example.png")' });
      var output = node.toJavaScript({ quotes: '"' }).replace(/\s+/g, ' ');
      output.should.equal('el("span", { style: "background: url(\\"/example.png\\")" })');
    });
    it('passes quotes options to Text child node', function () {
      var node = new nodes.Tag('span', null, [ new nodes.Text('foo') ]);
      node.toJavaScript({ quotes: '"' }).should.equal('el("span", "foo")');
    });
  });
});


describe('Text', function () {
  describe('.toJavaScript', function () {
    it('should surround text value in single quotes', function () {
      var node = new nodes.Text('foobar');
      node.toJavaScript().should.equal("'foobar'");
    });
    it('should escape single quotes in string', function () {
      var node = new nodes.Text("foo'bar");
      node.toJavaScript().should.equal("'foo\\'bar'");
    });
    it('can change quote types through options', function () {
      var node = new nodes.Text('foobar');
      node.toJavaScript({ quotes: '"' }).should.equal('"foobar"');
    });
    it('should escape double quotes when used', function () {
      var node = new nodes.Text('foo"bar');
      node.toJavaScript({ quotes: '"' }).should.equal('"foo\\"bar"');
    });
  });
});
