var InitializePlayers = function(allPlayers,direction){
	this.players = allPlayers;
	this.direction = direction;

	Object.defineProperties(this,{
		currentPlayer : {value : this.players[0],writable : true},
		nextPlayer : {value : this.players[1],writable : true},
		previousPlayer : {value : this.players[this.players.length - 1],writable : true}
	})
};

var getElementIndex = function (allPlayers,currentPlayer,direction) {
	var index = allPlayers.indexOf(currentPlayer);
	if(direction){
		if ((index+1) == allPlayers.length) {
			return index = 0;
		};
		return index+1;
	}else{
		if ((index-1)<0) {
			return index = allPlayers.length-1;
		};
		return index-1;
	}
}

InitializePlayers.prototype = {
	changePlayersTurn : function () {
		var playerInfo = new InitializePlayers(this.players,this.direction);

		if (playerInfo.direction) {
			playerInfo.currentPlayer = this.players[getElementIndex(this.players,this.currentPlayer,true)];
			playerInfo.nextPlayer = this.players[getElementIndex(this.players,this.nextPlayer,true)];
			playerInfo.previousPlayer = this.players[getElementIndex(this.players,this.previousPlayer,true)];
		}else{
			playerInfo.currentPlayer = this.players[getElementIndex(this.players,this.currentPlayer,false)];
			playerInfo.nextPlayer = this.players[getElementIndex(this.players,this.nextPlayer,false)];
			playerInfo.previousPlayer = this.players[getElementIndex(this.players,this.previousPlayer,false)];
		};

		return playerInfo;
	},
	changeDirection : function(){
		var playerInfo = new InitializePlayers(this.players,this.direction);

		if (!this.direction) {
			playerInfo.previousPlayer = this.nextPlayer;
			playerInfo.nextPlayer = this.previousPlayer;
		};
		
		return playerInfo;
	}
};

exports.InitializePlayers = InitializePlayers;