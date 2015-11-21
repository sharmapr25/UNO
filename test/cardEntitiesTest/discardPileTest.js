var discard_pile = require('../../cardEntities.js').DiscardPile;
var lodash = require('lodash');
var assert = require('chai').assert;
var expect = require('chai').expect;

//DO NOT WRITE ANYTHING OUTSIDE THE TESTING FRAMEWORK..CODE NEEDS TO BE TESTED..KINDLY MOVE IT INSIDE..

// var sampleCards = [{color:'red',number:1,speciality:null},
// 				{color:null,number:null,speciality:'wildDrawFour'},
// 				{color:'yellow',number:null,speciality:'reverse'}]

// var discardPile = new discard_pile(sampleCards);

// var fieldsOfDiscardCard=function(discardCards){
// 	return discardCards.cards.filter(function(card){
// 		return Object.keys(card)==['color','number','speciality']
// 	})
// }

describe('discardPile', function(){
	it('should be a contructor', function(){
		expect(discardPile).to.be.instanceof(discard_pile);
	});

	it('should contain only one field named "cards" in it', function(){
		expect(discardPile).to.have.any.keys('cards');
	});
})

describe('discardPile',function(){
	it('should generate the discardPile',function(){
		assert.deepEqual(sampleCards,discardPile.cards);
	})

	describe('addCard',function(){
		it('should add one card in discard pile',function(){ 
			var discard_pile_length = discardPile.cards.length;
			var newCard = {color:'green',number:9,speciality:null};
			discardPile.addCard(newCard);
			expect(discard_pile_length + 1).to.equal(discardPile.cards.length);
		})	
	})

	describe('get top most card',function(){
		it('should give topmost card from the discardPile',function(){
			expect({color:'green',number:9,speciality:null}).to.deep.equal(discardPile.getTopMostCard());
		})
	})
});

