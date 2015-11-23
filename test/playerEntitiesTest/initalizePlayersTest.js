var InitializePlayers = require('../../entities/playerEntities.js').InitializePlayers;
var allCards = require('../../entities/playerEntities.js').allCards;
var expect = require('chai').expect;

//--------------------------------------------------------------------------------------------------------------//

describe('InitializePlayers', function(){
	it('should be a contructor', function(){
		var players = new InitializePlayers(['john', 'johny','asus'],true);
		expect(players).to.be.an.instanceof(InitializePlayers);
	});

	it('should contruct an object which should contain only two fields in it and that are players and direction', function(){
		var players = new InitializePlayers(['john', 'johny','asus'],true);
		expect(players).to.have.keys('players','direction');
	});

	it('should contain 2 fields in its prototype', function(){
		expect(Object.keys(InitializePlayers.prototype)).to.eql([ 'changePlayersTurn', 'changeDirection' ]);
	});

	describe('InitializePlayers.prototype',function(){
		describe('current player',function(){
				it('should contain currentPlayer function which will return the name of the currentPlayer', function(){
				var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ],true);
				expect(players.currentPlayer).to.equal('john');
			});

			it('changePlayersTurn change the turn of currentPlayer by increasing the index when the direction is true',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav'],true);
				var re_init_players=players.changePlayersTurn();
				expect(re_init_players.direction).to.equal(true);
				expect('laxmi').to.equal(re_init_players.currentPlayer);
			})	

			it('changePlayersTurn changes the turn of currentPlayer by decreasing the index when the direction is false',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav'],false);
				var re_init_players=players.changePlayersTurn();
				expect(re_init_players.direction).to.equal(false);
				expect('sourav').to.equal(re_init_players.currentPlayer);
	
			})

		});

		describe('previousPlayer',function(){
			it('should contain previousPlayer function which will return the name of the previousPlayer', function(){
				var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ],true);
				expect(players.previousPlayer).to.equal('nani');
			});

			it('changePlayersTurn change the turn of previousPlayer by increasing the index',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav'],true);
				var re_init_players=players.changePlayersTurn();
				expect('gaurav').to.equal(re_init_players.previousPlayer);
			});
			
			it('changePlayersTurn changes the turn of previousPlayerPlayer by decreasing the index when the direction is false',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav'],false);
				var re_init_players=players.changePlayersTurn();
				expect(re_init_players.direction).to.equal(false);
				expect('joshaf').to.equal(re_init_players.previousPlayer);
			})
		});

		describe('nextPlayer',function(){
			it('should contain nextPlayer function which will return the name of the nextPlayer', function(){
				var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ],true);
				expect(players.nextPlayer).to.equal('johny');
			});

			it('changePlayersTurn change the turn of nextPlayer by increasing the index',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav'],true);
				var re_init_players=players.changePlayersTurn();
				expect('joshaf').to.equal(re_init_players.nextPlayer);
			})

			it('changePlayersTurn changes the turn of nextPlayer by decreasing the index when the direction is false',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav'],false);
				var re_init_players = players.changePlayersTurn();
				expect(re_init_players.direction).to.equal(false);
				expect('gaurav').to.equal(re_init_players.nextPlayer);
	
			})	
		});

		describe('changeDirection',function() {
			it('after changed direction nextPlayer and previousPlayer should be interchanged when direction is false',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav'],false);
				 var re_init_direction = players.changeDirection();
				 expect('gaurav').to.equal(re_init_direction.currentPlayer);
				 expect('laxmi').to.equal(re_init_direction.previousPlayer);
				 expect('sourav').to.equal(re_init_direction.nextPlayer);

			})
			it('direction of nextPlayer and previousPlayer should not be interchanged when direction is true',function(){
				var players = new InitializePlayers(['gaurav','laxmi','joshaf','sourav'],true);
				 var re_init_direction = players.changeDirection();
				 expect('gaurav').to.equal(re_init_direction.currentPlayer);
				 expect('sourav').to.equal(re_init_direction.previousPlayer);
				 expect('laxmi').to.equal(re_init_direction.nextPlayer);

			})
		});
	});

});