var alreadyGameStarted = function(){
	return 'Sorry..!!! Game has already been started..!';
};

var playersInformation = function(comments){
	return '<h4> Number of Players in The Game :'+comments.numberOfPlayers+'</h4>';
};

var alreadyConnected = function(){
	return 'Already Connected Boss..!!';
};

var getUpdatedData = function(){
	// $.get('updated_login_data', function(data){
	// 	data = JSON.parse(data);
	// 	console.log(data);

	// });
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	try{
	    		console.log("give me comment",req.responseText);
	        	var comments = JSON.parse(req.responseText);
	        	var keys = Object.keys(comments);
	        	console.log(req.responseText[keys[0]].no_of_players);
	        	// console.log(Object.keys(comments).no_of_players);
		        if(comments.isGameStarted == true){
			      	document.querySelector('#current_game_information').innerHTML = alreadyGameStarted();
		        }else if(comments.alreadyConnected == true){
		        	document.querySelector('#current_game_information').innerHTML = alreadyConnected();;
		    	}else{
		        	document.querySelector('#current_game_information').innerHTML = playersInformation(comments);
		        }
	    	}catch(e){
	    		clearInterval(interval);
	    		window.location = req.responseText;
	    	};
	    };
	};
	req.open('GET', 'updated_login_data', true);
	req.send();
};

var interval = setInterval(getUpdatedData, 3000);
