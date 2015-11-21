var shuffled=require('../entities.js').shuffledCards;
var allCards=require('../entities.js').allCards;

//PLEASE DO NOT WRITE THE CODE OUTSIDE THE TESTING FRAMEWORK..
//HARD TO TEST THE CODE
//PLEASE MOVE IT INSIDE..

// var cardsLength = allCards.length;
// var shuffledCards = shuffled(allCards);

var assert=require('chai').assert;
var expect=require('chai').expect;


describe('shuffle',function(){
	it('should equal number of cards before and after shuffling',function(){
		expect(cardsLength).to.equal(shuffledCards.length);
	})

	it('should not change the values of cards after shuffling',function(){
		var checkValues = allCards.every(function(card){
			return (JSON.stringify(shuffledCards.indexOf(card))!=-1);
		})
		assert.ok(checkValues);
	})

	it('should change the sequence of cards after shuffling',function(){
		assert.notEqual(JSON.stringify(shuffledCards),JSON.stringify(allCards));
	})

	it('cards should be object before and after shuffling',function(){
		var checkType = function(cards){
			return cards.map(function(card){return typeof(card)=='object'})
		}
		assert.ok(checkType(shuffledCards));
		assert.ok(checkType(allCards));
	})

	it('list of cards should be an array before and after shuffling',function(){
		expect(shuffledCards).to.be.an('array');
		expect(allCards).to.be.an('array');
	})
})