var allRules = require('../../entities/rulesEntities.js').allRules;
var assert = require('chai').assert;

describe('colour card',function(){

	it('should be play same colour card',function(){
		var discardCard = {colour:'Red',number:1,speciality:null,points:1};
		var playerCard = {colour:'Red',number:9,speciality:null,points:9};
		assert.ok(allRules.areSameColouredCards(playerCard, discardCard,'Red',0));
	});

	it('should not be play different colour card',function(){
		var discardCard = {colour:'Red',number:1,speciality:null,points:1};
		var playerCard = {colour:'Yellow',number:9,speciality:null,points:9};
		assert.notOk(allRules.areSameColouredCards(playerCard, discardCard));
	});
});

describe('number card',function(){

	it('should be play same number card',function(){
		var discardCard = {colour:'Red',number:9,speciality:null,points:9};
		var playerCard = {colour:'Green',number:9,speciality:null,points:9};
		assert.ok(allRules.areSameNumberedCards(playerCard, discardCard));
	});

	it('should not be play different number card',function(){
		var discardCard = {colour:'Blue',number:3,speciality:null,points:3};
		var playerCard = {colour:'Yellow',number:9,speciality:null,points:9};
		assert.notOk(allRules.areSameNumberedCards(playerCard, discardCard));
	});
});

describe('skip card',function(){
	it('should be play skip card on skip card',function(){
		var discardCard = {colour:'Red',number:null,speciality:'Skip',points:20};
		var playerCard = {colour:'Green',number:null,speciality:'Skip',points:20};
		assert.ok(allRules.isSkipCardPlayed(playerCard, discardCard));
	});

	it('should not be play skip card on other coloured number card',function(){
		var discardCard = {colour:'Red',number:null,speciality:'Skip',points:20};
		var playerCard = {colour:'Green',number:0,speciality:null,points:0};
		assert.notOk(allRules.isSkipCardPlayed(playerCard, discardCard));
	});
});

describe('Reverse card',function(){

	it('should be play reverse card on reverse card',function(){
		var discardCard = {colour:'Blue',number:null,speciality:'Reverse',points:20};
		var playerCard = {colour:'Red',number:null,speciality:'Reverse',points:20};
		assert.ok(allRules.isReverseCardPlayed(playerCard, discardCard));
	});

	it('should not be play reverse card on other coloured number card',function(){
		var discardCard = {colour:'Red',number:null,speciality:'Reverse',points:20};
		var playerCard = {colour:'Yellow',number:6,speciality:null,points:6};
		assert.notOk(allRules.isReverseCardPlayed(playerCard, discardCard));
	});
});