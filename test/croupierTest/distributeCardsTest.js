var distributeCards = require('../../server/serverUtilities.js').server.distributeCards;
var expect = require('chai').expect;

//--------------------------------------------------------------------------------------------------------------//

describe('distributeCards', function(){
	it('should return an array', function(){
		var players = ['gaurav', 'jay', 'danny'];
		expect(distributeCards(players, [1,2,3,4,5,6,7,8,9])).to.be.an('array');
	});

	it('should contain an object that will contain the cards that each user will have and the remaining cards', function(){
		var players = ['gaurav', 'jay'];
		var resultAfterDistribution = distributeCards(players, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
		var playersCards = resultAfterDistribution[0];
		var remainingCards = resultAfterDistribution[1];

		expect(playersCards).to.be.an('object');
		expect(Object.keys(playersCards)).to.eql([ 'gaurav', 'jay' ]);

		players.forEach(function(playerName){
				expect(playersCards[playerName].length).to.equal(7);
		});

		expect(playersCards['gaurav']).to.eql([ 1,3,5,7,9,11,13]);
		expect(playersCards['jay']).to.eql([2,4,6,8,10,12,14 ]);

		expect(remainingCards).to.eql([15,16,17,18,19,20]);
	});
});