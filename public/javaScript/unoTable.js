var sendConnectionRequest = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	console.log(req.responseText);
	        var comments = JSON.parse(req.responseText);
	        console.log('card on table',comments.cardOnTable);
	        console.log('Your cards',comments.userCards);
	        console.log('Other Player Cards',comments.allUsersCardsLength);
	        console.log('Current Turn',comments.currentPlayer);
	        console.log('Next Turn', comments.nextPlayer);
	        console.log('Previous Turn', comments.previousPlayer);
	    };
	};
	req.open('GET', 'all_information_on_table', true);
	req.send();
};

var interval = setInterval(sendConnectionRequest, 5000);
