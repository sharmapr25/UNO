exports.game = function(id,numOfPlayer) {
  this.id = id;
  this.no_of_players = numOfPlayer,
  this.usersInformation = [],
  this.user_names = undefined;
  this.user_cards = [],
  this.discard_pile = undefined;
  this.draw_pile = undefined;
  this.isGameStarted = false,
  this.players = undefined;
  this.runningColour = undefined; 
  this.currentPlayer = undefined;
  this.plus_two_cards_count = 0, 
  this.said_UNO_registry = [] 
};
