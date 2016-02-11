var interval;

var no_of_player = function(){
	var e = document.getElementById("noOfPlayer");
	var players = e.options[e.selectedIndex].value;
	return players;
};

var sendConnectionRequest = function(){
	var data_to_send = {};
	data_to_send.name = $('input[name="user_name"]').val();
	data_to_send.no_of_players = no_of_player();


	$.post('login_user', data_to_send, function(data, status){
		if(data != 'Invalid')
			window.location.href = data;
		else{
			alert('Invalid name or no_of_players\nLogin your name without giving space');
			window.location.href = 'index.html'
		}
	})
};

var sendJoinRequest = function(id){
	var join_game = {};
	join_game.name= $('input[name="user_name"]').val();
	join_game.id = id;
	$.post('join_game', join_game, function(data, status){
		if(data != 'Invalid')
				window.location.href = data;
		else{
			alert('Invalid name\nLogin your name without giving space');
			window.location.href = 'index.html'
		}
	})
};

var giveList = function(gameList) {
	var html = "<html><body>";
	if(!gameList.length)
		return '';
	for (var i = 0; i<gameList.length;i++ ) {
		html+='<button id ="'+ gameList[i] +'"" onClick = "sendJoinRequest(this.id)">'+ gameList[i]+'</button></br><br/>';
	};
	html+="</body></html>";
	return html;
};

var existing_game_info = function(){
	$.get('give_list_of_game',function(data, status){
		$('#list_of_joinGame').html(giveList(data));
	})
};

var changePage = function(shown, hidden){
	// alert('hhihi')
	document.getElementById(shown).style.display = 'block';
	document.getElementById(hidden).style.display = 'none';
}

window.onload = function(){
	document.getElementById('play_button').onclick = sendConnectionRequest;
	interval = setInterval(existing_game_info, 1000);
};
