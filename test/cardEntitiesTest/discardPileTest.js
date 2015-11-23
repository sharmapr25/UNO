var DiscardPile = require('../../entities/cardEntities.js').DiscardPile;
var lodash = require('lodash');
var expect = require('chai').expect;

describe('discardPile', function(){
	it('should be a contructor', function(){
		var discardPile = new DiscardPile([1]);
		expect(discardPile).to.be.instanceof(DiscardPile);
	});

	it('should contain only one field named "cards" in it', function(){
		var discardPile = new DiscardPile([1]);
		expect(discardPile).to.have.any.keys('cards');
	});
})

describe('discardPile.prototype',function(){
	it('should have only 2 functions', function(){
		expect(DiscardPile.prototype).to.include.keys('addCard', 'getTopMostCard');
	});

	it('should have a addCard function that will add the provided card at the top of the pile', function(){
		var discardPile = new DiscardPile([1]);
		expect(discardPile.cards).to.eql([1]);
		discardPile.addCard(2);
		expect(discardPile.cards).to.eql([2,1]);
		discardPile.addCard(100);
		expect(discardPile.cards).to.eql([100,2,1]);
	});

	it('should have a getTopMostCard function that will tell which is the topmost card', function(){
		var discardPile = new DiscardPile([1]);
		expect(discardPile.cards).to.eql([1]);
		expect(discardPile.getTopMostCard()).to.equal(1);
		discardPile.addCard(2);
		expect(discardPile.getTopMostCard()).to.equal(2);
	});
});

