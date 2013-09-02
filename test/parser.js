var Parser = require('../lib/parser').Parser;

require('should');


describe('Parser', function () {
  it('Can parse and serialize simple markup', function () {
    var tree = new Parser().parse('<div><h1>Header</h1><div>Lorem ipsum</div></div>');
    tree.toJavaScript().should.equal(
      "el('div', [\n" +
      "  el('h1', 'Header'),\n" +
      "  el('div', 'Lorem ipsum')\n" +
      "])");
  });
});
