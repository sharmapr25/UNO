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

window.onload = function(){
	document.querySelector('button').onclick = sendConnectionRequest;
};
