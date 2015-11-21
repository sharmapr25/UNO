var GenerateDeck = require('../cardEntities.js').GenerateDeck;
var allCards = require('../cardEntities.js').allCards;
var expect = require('chai').expect;

//--------------------------------------------------------------------------------------------------------------//

describe('GenerateDeck', function(){
	it('should be a contructor', function(){
		var deck = new GenerateDeck(allCards);
		expect(deck).to.be.an.instanceof(GenerateDeck);
	});

	it('should contruct an object which should contain only one field in it', function(){
		var deck = new GenerateDeck(allCards);
		expect(deck).to.have.any.keys('cards');
	});

	it('should contain 4 function in its prototype', function(){
		expect(Object.keys(GenerateDeck.prototype)).to.eql([ 'isFull', 'isEmpty', 'shuffleCards', 'drawCard' ]);
	});

	describe('GenerateDeck.prototype',function(){
		it('should contain isFull function which will return true if the deck is full or else it will return false', function(){
			var deck = new GenerateDeck(allCards);
			expect(deck.isFull()).to.equal(true);
			var deleteACard = deck.drawCard();
			expect(deck.isFull()).to.equal(false);
		});

		it('should contain isEmpty function which will return true if the deck is empty or else it will return false', function(){
			var deck = new GenerateDeck([]);
			expect(deck.isEmpty()).to.equal(true);
			var deck = new GenerateDeck([1]);
			expect(deck.isEmpty()).to.equal(false);
		});

		it('should contain shuffleCards function which will give a new set of shuffled cards', function(){
			var deck = new GenerateDeck(allCards);
			var shuffledDeck = deck.shuffleCards();
			expect(deck.cards).not.to.eql(shuffledDeck.cards);

			//the new shuffled deck should be an instance of generateDeck constructor
			expect(shuffledDeck).to.have.any.keys('cards');
			expect(shuffledDeck).to.be.an.instanceof(GenerateDeck);
			expect(Object.keys(GenerateDeck.prototype)).to.eql([ 'isFull', 'isEmpty', 'shuffleCards', 'drawCard' ]);
		});

		it('should contain a drawCard function which will draw the topmost card of the deck and will return the darwed card', function(){
			var deck = new GenerateDeck([1,2,3]);
			var withDrawedCard = deck.drawCard();
			expect(deck.cards).to.eql([2,3]);
			expect(deck.cards.length).to.equal(2);
			expect(withDrawedCard).to.eql(1);
		});
	});
});