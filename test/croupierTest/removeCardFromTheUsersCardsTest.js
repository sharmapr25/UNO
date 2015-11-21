var removeCardFromTheUsersCards = require('../entities.js').removeCardFromTheUsersCards;
var expect = require('chai').expect;

describe('removeCardFromTheUsersCards', function(){
	it('should return an array of cards', function(){
		var cardToRemove = { a : 1};
		var userCards = [ { a : 1}, {b : 2}, { c : 3}, { d : 4} ];
		expect(removeCardFromTheUsersCards(cardToRemove, userCards)).to.be.an('array');
	});
	it('should remove the specified card from the users cards', function(){
		var cardToRemove = { a : 1};
		var userCards = [ { a : 1}, {b : 2}, { c : 3}, { d : 4} ];
		expect(removeCardFromTheUsersCards(cardToRemove, userCards)).to.eql([{b : 2}, { c : 3}, { d : 4} ]);
	});
});