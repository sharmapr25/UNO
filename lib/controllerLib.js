exports.genrateId = function(games) {
	return "game_"+ Object.keys(games).length;
};
