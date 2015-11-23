var removeCardFromTheUsersCards = require('../../serverUtilities.js').server.removeCardFromTheUsersCards;
var expect = require('chai').expect;

describe('removeCardFromTheUsersCards', function(){
	it('should return an array of cards', function(){
		var cardToRemove = { a : 1};
		var userCards = [ { a : 1}, {b : 2}, { c : 3}, { d : 4} ];
		expect(removeCardFromTheUsersCards(cardToRemove, userCards)).to.be.an('array');
	});
	it('should remove the specified card from the users cards', function(){
		var cardToRemove = { b : 2};
		var userCards = [ { a : 1}, {b : 2}, { c : 3}, { d : 4} ];
		expect(removeCardFromTheUsersCards(cardToRemove, userCards)).to.eql([{a : 1}, { c : 3}, { d : 4} ]);
	});
});