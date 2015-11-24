var sendConnectionRequest = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	console.log(req.responseText);
	        var comments = JSON.parse(req.responseText);
	        console.log('card on table',comments.cardOnTable);
	        console.log('Your cards',comments.userCards);
	    };
	};
	req.open('GET', 'all_information_on_table', true);
	req.send();
};

var interval = setInterval(sendConnectionRequest, 3000);
