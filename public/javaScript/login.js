var no_of_player = function(){
	var e = document.getElementById("noOfPlayer");
	var players = e.options[e.selectedIndex].value;
	return players;
};

var sendConnectionRequest = function(){ 
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	window.location = req.responseText;
	        // var comments = JSON.parse(req.responseText);
	        // console.log("....",comments.id)
	    };
	};

	var info = { name : document.querySelector('input[name="user_name"]').value, setNoOfPlayer : no_of_player()};
	req.open('POST', 'login_user', true);
	req.send(JSON.stringify(info));
	document.querySelector('input[name="user_name"]').value = "";
};

var sendJoinRequest = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		window.location = req.responseText;
	};
	var e = document.getElementById("existing_game_list");
	var game_id = e.options[e.selectedIndex].value;
	var join_game = {name : document.querySelector('input[name="user_name"]').value, id : game_id};
	req.open('POST','join_game',true);
	req.send(JSON.stringify(join_game));
};



window.onload = function(){
	document.getElementById('play_button').onclick = sendConnectionRequest;
};
