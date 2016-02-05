var interval;

var no_of_player = function(){
	var e = document.getElementById("noOfPlayer");
	var players = e.options[e.selectedIndex].value;
	return players;
};

var sendConnectionRequest = function(){
	var info = $('input[name="user_name"]').val()+'~/'+ no_of_player();
	$.post('login_user', info,function(data, status){
		window.location.href = data;
	})
};

var sendJoinRequest = function(id){
	var join_game = $('input[name="user_name"]').val()+"~/"+ id;
	$.post('join_game', join_game, function(data, status){
		window.location.href = data;
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
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
			var gameList = JSON.parse(req.responseText);
			document.getElementById('list_of_joinGame').innerHTML = giveList(gameList);
		};
	};
	req.open('GET','give_list_of_game',true);
	req.send();
};

var changePage = function(shown, hidden){
	document.getElementById(shown).style.display = 'block';
	document.getElementById(hidden).style.display = 'none';
}

window.onload = function(){
	document.getElementById('play_button').onclick = sendConnectionRequest;
	interval = setInterval(existing_game_info, 1000);
};
