var InitializePlayers = require('../../playerEntities.js').InitializePlayers;
var allCards = require('../../playerEntities.js').allCards;
var expect = require('chai').expect;

//--------------------------------------------------------------------------------------------------------------//

describe('InitializePlayers', function(){
	it('should be a contructor', function(){
		var players = new InitializePlayers(['john', 'johny']);
		expect(players).to.be.an.instanceof(InitializePlayers);
	});

	it('should contruct an object which should contain only one field in it and that is players', function(){
		var players = new InitializePlayers(['john', 'johny']);
		expect(players).to.have.any.keys('players');
	});

	it('should contain 5 function in its prototype', function(){
		expect(Object.keys(InitializePlayers.prototype)).to.eql([ 'currentPlayer', 'nextPlayer', 'previousPlayer', 'changePlayersTurn', 'changeDirection' ]);
	});

	describe('InitializePlayers.prototype',function(){
		it('should contain currentPlayer function which will return the name of the currentPlayer', function(){
			var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ]);
			expect(players.currentPlayer()).to.equal('john');
		});

		it('should contain nextPlayer function which will return the name of the nextPlayer', function(){
			var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ]);
			expect(players.nextPlayer()).to.equal('johny');
		});

		it('should contain previousPlayer function which will return the name of the previousPlayer', function(){
			var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ]);
			expect(players.previousPlayer()).to.equal('nani');
		});

		it('should contain changePlayersTurn function which will change the players turn', function(){
			var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ]);
			expect(players.players).to.eql(['john', 'johny', 'kaka', 'nani' ]);
			players.changePlayersTurn();
			expect(players.players).to.eql(['johny', 'kaka', 'nani', 'john' ]);
			players.changePlayersTurn();
			expect(players.players).to.eql(['kaka', 'nani', 'john', 'johny' ]);
		});

		it('should contain a changeDirection function which will change the direction of the play', function(){
			var players = new InitializePlayers(['john', 'johny', 'kaka', 'nani' ]);
			expect(players.players).to.eql(['john', 'johny', 'kaka', 'nani' ]);
			expect(players.currentPlayer()).to.equal('john');
			expect(players.nextPlayer()).to.equal('johny');
			expect(players.previousPlayer()).to.equal('nani');
			players.changeDirection();
			expect(players.players).to.eql(['john', 'nani','kaka', 'johny' ]);
			expect(players.currentPlayer()).to.equal('john');
			expect(players.nextPlayer()).to.equal('nani');
			expect(players.previousPlayer()).to.equal('johny');
		});
	});

});