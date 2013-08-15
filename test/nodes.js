var nodes = require('../lib/nodes');

require('should');

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
  });
});
