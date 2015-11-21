var InitializePlayers = function(allPlayers){
	this.players = allPlayers;
};

InitializePlayers.prototype = {
	currentPlayer : function () {
		return this.players[0];
	},
	nextPlayer : function () {
		return this.players[1]
	},
	previousPlayer : function () {
		return this.players[this.players.length - 1];
	},
	changePlayersTurn : function () {
		var recentPlayer = this.players.shift();
		this.players.push(recentPlayer); 
	},
	changeDirection : function(){
		var playersExceptCurrentPlayer = this.players.splice(1);
		this.players = this.players.concat(playersExceptCurrentPlayer.reverse());
	}
};

exports.InitializePlayers = InitializePlayers;