var InitializePlayers = require('../../entities/playerEntities.js').InitializePlayers;
var allCards = require('../../entities/playerEntities.js').allCards;
var expect = require('chai').expect;

//--------------------------------------------------------------------------------------------------------------//

describe('InitializePlayers', function(){
	it('should be a contructor', function(){
		var players = new InitializePlayers(['john', 'johny','asus']);
		expect(players).to.be.an.instanceof(InitializePlayers);
	});

	it('should contruct an object which should contain only two fields in it and that are players and direction', function(){
		var players = new InitializePlayers(['john', 'johny','asus']);
		expect(players).to.have.keys('players','direction');
	});

	it('should contain 2 fields in its prototype', function(){
		expect(Object.keys(InitializePlayers.prototype)).to.eql([ 'changePlayersTurn', 'changeDirection' ]);
	});

	describe('InitializePlayers.prototype',function(){
		describe('single player',function(){	
			it('currentPlayer should be equal to nextPlayer and previous player if player number is one',function(){
				var players = new InitializePlayers(['john']);
				expect(players.currentPlayer).to.equal('john');
				expect(players.previousPlayer).to.equal('john');
				expect(players.nextPlayer).to.equal('john');
			})
		})

		describe('two players',function(){
			it('nextPlayer should be equal to previousPlayer and previousPlayer should be same if players number are two',function(){
				var players = new InitializePlayers(['john','gaurav']);
				expect(players.currentPlayer).to.equal('john');
				expect(players.nextPlayer).to.equal('gaurav');
				expect(players.previousPlayer).to.equal('gaurav');
				expect(players.previousPlayer).to.equal(players.nextPlayer);
			})
		})

		describe('multiple player',function(){

			describe('current player',function(){
					it('should contain currentPlayer function which will return the name of the currentPlayer', function(){
					var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ]);
					expect(players.currentPlayer).to.equal('john');
					expect(players.nextPlayer).to.equal('johny');
					expect(players.previousPlayer).to.equal('nani');
				});

				it('changePlayersTurn change the turn of currentPlayer by increasing the index when the direction is true',function(){
					var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav']);
					players.changePlayersTurn();
					expect(players.direction).to.equal(true);
					expect('laxmi').to.equal(players.currentPlayer);
					expect(players.nextPlayer).to.equal('joshaf');
					expect(players.previousPlayer).to.equal('gaurav');
				});

				it('changePlayersTurn changes the turn of currentPlayer by decreasing the index when the direction is false',function(){
					var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav']);
					players.changePlayersTurn();
					expect(players.direction).to.equal(true);
					expect('laxmi').to.equal(players.currentPlayer);
					expect(players.nextPlayer).to.equal('joshaf');
					expect(players.previousPlayer).to.equal('gaurav');
				});

			});

			describe('previousPlayer',function(){
				it('should contain previousPlayer function which will return the name of the previousPlayer', function(){
					var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ]);
					expect(players.previousPlayer).to.equal('nani');
					expect(players.currentPlayer).to.equal('john');
					expect(players.nextPlayer).to.equal('johny');
				});

				it('changePlayersTurn change the turn of previousPlayer by increasing the index',function(){
					var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav']);
					players.changePlayersTurn();
					expect('gaurav').to.equal(players.previousPlayer);
					expect(players.currentPlayer).to.equal('laxmi');
					expect(players.nextPlayer).to.equal('joshaf');
				});
				
				it('changePlayersTurn changes the turn of previousPlayerPlayer by decreasing the index when the direction is false',function(){
					var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav']);
					players.changePlayersTurn();
					expect(players.direction).to.equal(true);
					expect('gaurav').to.equal(players.previousPlayer);
					expect(players.currentPlayer).to.equal('laxmi');
					expect(players.nextPlayer).to.equal('joshaf');
				});
			});

			describe('nextPlayer',function(){
				it('should contain nextPlayer function which will return the name of the nextPlayer', function(){
					var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ]);
					expect(players.nextPlayer).to.equal('johny');
				});

				it('changePlayersTurn change the turn of nextPlayer by increasing the index',function(){
					var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav']);
					players.changePlayersTurn();
					expect('joshaf').to.equal(players.nextPlayer);
				});

				it('changePlayersTurn changes the turn of nextPlayer by decreasing the index when the direction is false',function(){
					var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav']);
					players.changePlayersTurn();
					expect(players.direction).to.equal(true);
					expect('joshaf').to.equal(players.nextPlayer);
		
				});
			});
		})

		describe('changeDirection',function() {
			it('after calling the function called changeDirection() the direction becomes false from true',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav']);
				 expect(true).to.equal(players.direction);
				 players.changeDirection();
				 expect(false).to.equal(players.direction);
			});
			it('after calling two times the function called changeDirection() the direction becomes true',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav']);
				 expect(true).to.equal(players.direction);
				 players.changeDirection();
				 expect(false).to.equal(players.direction);
				 players.changeDirection();
				 expect(true).to.equal(players.direction);
			});
			it('after changed direction nextPlayer and previousPlayer should be interchanged when direction is false',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav']);
				 players.changeDirection();
				 expect(false).to.equal(players.direction);
				 expect('gaurav').to.equal(players.currentPlayer);
				 expect('laxmi').to.equal(players.previousPlayer);
				 expect('sourav').to.equal(players.nextPlayer);

			});
			it('direction of nextPlayer and previousPlayer should not be interchanged when direction is true',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav']);
				 expect(true).to.equal(players.direction);
				 players.direction = false;
				 players.changeDirection();
				 expect(true).to.equal(players.direction);
				 expect('gaurav').to.equal(players.currentPlayer);
				 expect('sourav').to.equal(players.previousPlayer);
				 expect('laxmi').to.equal(players.nextPlayer);
			});
		});
	});

});