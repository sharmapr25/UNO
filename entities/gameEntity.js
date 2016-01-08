exports.game = function(id,numOfPlayer) {
  this.id = id;
  this.no_of_players = numOfPlayer,
  this.usersInformation = [],//!array of players url
  this.user_names = undefined;
  this.user_cards = [],
  this.discard_pile = undefined;
  this.draw_pile = undefined;
  this.isGameStarted = false,
  this.players = undefined;//!player entity -current,next,prev   -> playersAttirbutes
  this.runningColour = undefined; 
  this.currentPlayer = undefined; // ?why are you define here currentplayer ?why it needed ?then where is other attribute
  this.plus_two_cards_count = 0, //? why we needed it 
  this.said_UNO_registry = [] //?why we needed 
};
