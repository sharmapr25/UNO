var InitializePlayers = function(allPlayers){
	this.players = allPlayers;
	this.direction = true;

	Object.defineProperties(this,{
		currentPlayer : {value : this.players[0],writable : true},
		nextPlayer : {value : (this.players.length>1)?this.players[1]:this.players[0],writable : true},
		previousPlayer : {value : this.players[this.players.length - 1],writable : true}
	})
};

var getElementIndex = function (allPlayers,player,direction) {
	var index = allPlayers.indexOf(player);
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
		if (this.players.length>0) {
			if (this.direction) {
				this.currentPlayer = this.players[getElementIndex(this.players,this.currentPlayer,this.direction)];
				this.nextPlayer = this.players[getElementIndex(this.players,this.nextPlayer,this.direction)];
				this.previousPlayer = this.players[getElementIndex(this.players,this.previousPlayer,this.direction)];
			}else{
				this.currentPlayer = this.players[getElementIndex(this.players,this.currentPlayer,this.direction)];
				this.nextPlayer = this.players[getElementIndex(this.players,this.nextPlayer,this.direction)];
				this.previousPlayer = this.players[getElementIndex(this.players,this.previousPlayer,this.direction)];
			};
		};
	},
	changeDirection : function(){
		this.direction = this.direction ? false : true;
		if (!this.direction) {
			var temp = this.nextPlayer
			this.nextPlayer = this.previousPlayer;
			this.previousPlayer = temp;
		};
	}
};

exports.InitializePlayers = InitializePlayers;