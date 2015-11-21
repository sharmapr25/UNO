var DrawPile = require('../../cardEntities.js').DrawPile;
var allCards = require('../../cardEntities.js').allCards;
var expect = require('chai').expect;

console.log('hey hello',DrawPile);
//--------------------------------------------------------------------------------------------------------------//

describe('DrawPile', function() {
	it('should be a contructor', function(){
		var closedDeck = new DrawPile(allCards);
		expect(closedDeck).to.be.an.instanceof(DrawPile);
	});

	it('should contruct an object which should contain only one field in it and that is cards', function(){
		var closedDeck = new DrawPile(allCards);
		expect(closedDeck).to.have.any.keys('cards');
	});

	it('should contain 2 function in its prototype', function(){
		expect(Object.keys(DrawPile.prototype)).to.eql([ 'drawCards', 'isEmpty' ]);
	});

	describe('drawPile.prototype', function(){
		it('should contain a drawCards function which will draw as many cards as specified in the function', function(){
			var closedDeck = new DrawPile([1,2,3,4,5,6,7,8,9,10]);
			expect(closedDeck.drawCards(1)).to.eql([1]);
			expect(closedDeck.cards.length).to.equal(9);
			expect(closedDeck.drawCards(2)).to.eql([2,3]);
			expect(closedDeck.cards.length).to.equal(7);
			expect(closedDeck.drawCards(4)).to.eql([4,5,6,7]);
			expect(closedDeck.cards.length).to.equal(3);
		});

		it('should contain an isEmpty function which will return true if the drawPile deck is empty', function(){
			var closedDeck = new DrawPile([1,2,3,4,5,6,7,8,9,10]);
			expect(closedDeck.isEmpty()).to.equal(false);
			var closedDeck = new DrawPile([]);
			expect(closedDeck.isEmpty()).to.equal(true);
		});
	});
});