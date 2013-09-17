var Parser = require('../lib/parser').Parser;

require('should');


describe('Parser', function () {
  it('skips array notation for single item lists', function () {
    var tree = new Parser().parse('<div><h1>Header</h1></div>');
    tree.toJavaScript().should.equal("el('div', el('h1', 'Header'))");
  });

  it('can parse and serialize simple markup', function () {
    var tree = new Parser().parse('<div><h1>Header</h1><div>Lorem ipsum</div></div>');
    tree.toJavaScript().should.equal(
      "el('div', [\n" +
      "  el('h1', 'Header'),\n" +
      "  el('div', 'Lorem ipsum')\n" +
      "])");
  });
});
