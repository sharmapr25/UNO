exports.genrateId = function(games) {
	return "game_"+ Object.keys(games).length;
};

exports.addUser = function(name,game){
	game.usersInformation.push({name : name});
};

exports.isUserExists = function(request){
  var cookies = request.headers.cookie;
  return gamelist[0].usersInformation.some(function(user){
    return (user.name == cookies);
  });
};

exports.sendUpdatedData = function(request, response, game){
  // if(game.usersInformation.length != game.no_of_players){
  //   var data =  {isGameStarted : game.isGameStarted,
  //           numberOfPlayers : game.usersInformation.length,
  //         };
  //   sendResponse(response, data);
  // }else if(isUserExists(request)){
  //   startUno();
    response.statusCode = 200;
    response.end('/unoTable.html');
//   }
// else{
//     var data =  { isGameStarted : true};
//     sendResponse(response, data);
//   }
};