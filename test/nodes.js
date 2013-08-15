var nodes = require('../lib/nodes');

require('should');

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
  });
});
