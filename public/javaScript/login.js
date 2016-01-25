var interval;

var no_of_player = function(){
	var e = document.getElementById("noOfPlayer");
	var players = e.options[e.selectedIndex].value;
	return players;
};

var sendConnectionRequest = function(){ 
	var req = new XMLHttpRequest();
	console.log('request toh kiya h')
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	window.location = req.responseText;
	    };
	};

	var info = { name : document.querySelector('input[name="user_name"]').value, setNoOfPlayer : no_of_player()};
	req.open('POST', 'login_user', true);
	req.send(JSON.stringify(info));
	document.querySelector('input[name="user_name"]').value = "";
};

var sendJoinRequest = function(id){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		window.location = req.responseText;
	};
	var game_id = id;
	var join_game = {name : document.querySelector('input[name="user_name"]').value, id : game_id};
	req.open('POST','join_game',true);
	req.send(JSON.stringify(join_game));
};

var giveList = function(gameList) {
	var html = "<html><body></br>";
	if(!gameList.length)
		return '';
	for (var i = 0; i<gameList.length;i++ ) {
		html+=gameList[i]+'&nbsp;&nbsp;&nbsp;&nbsp; <button id ="'+ gameList[i] +'"" onClick = "sendJoinRequest(this.id)">Join game</button></br>';
	};
	html+="</body></html>";
	return html;
};

var existing_game_info = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
			var gameList = JSON.parse(req.responseText);
			document.getElementById('gameInfo').innerHTML = giveList(gameList);
		};
	};
	req.open('GET','give_list_of_game',true);
	req.send();
};

window.onload = function(){
	document.getElementById('play_button').onclick = sendConnectionRequest;
	interval = setInterval(existing_game_info, 1000);
};
