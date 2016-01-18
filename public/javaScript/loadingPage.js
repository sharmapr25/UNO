var waitingMessage = function(noOfPlayers){
	return '<h2>Players in The Game :'+noOfPlayers+'</h2>'
}


var getUpdatedData = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	var status = JSON.parse(req.responseText);
	    	if(status.isStarted){
	    		window.location = status.location;
	    	}
	    	else if(status.noOfPlayers){
	    		document.querySelector('#current_game_information').innerHTML = waitingMessage(status.noOfPlayers);
	    	}
	    	else if(!status.noOfPlayers){
	    		window.location = status.location;
	    	};
	    };
	};
	req.open('GET', 'updated_login_data', true);
	req.send();
};

var interval = setInterval(getUpdatedData, 1000);
