var addressGenrator = function (card) {
	var type,colour;
	(card.speciality) ? (type = card.speciality.toLowerCase()) : (type = card.number);
	(card.colour) ? (colour = card.colour.toLowerCase()+"_") : (colour = "");
	return "/public/images/allCards/"+colour+type+".png";
};


var generateTable  = function(userInfo) {
	var user_info = userInfo.map(function (eachUser) {
		return "<tr><td>"+eachUser.name+"</td><td>"+eachUser.noOfCards+"</td></tr>";
	});
	return "<table align='right'>"+user_info.join('')+"</table>";
};

var sendConnectionRequest = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	console.log(req.responseText);
	        var comments = JSON.parse(req.responseText);
	        console.log('Other Player Cards',comments.allUsersCardsLength);
	        console.log('Current Turn',comments.currentPlayer);
	        console.log('Next Turn', comments.nextPlayer);
	        console.log('Previous Turn', comments.previousPlayer);
	        document.querySelector('#all_user_cards_info').innerHTML = generateTable(comments.allUsersCardsLength);
	        var cardRef = '<img src="/public/images/allCards/close_face.png">';
	        cardRef += '<img src="'+addressGenrator(comments.cardOnTable)+'">';
	        document.querySelector('#All_pile').innerHTML = cardRef;
	    	var imgRef = '';
	    	for(var i=0; i<comments.userCards.length; i++){
	    		imgRef += '<img src="'+addressGenrator(comments.userCards[i])+'">';
	    	};
	    	document.querySelector('#my_cards').innerHTML = imgRef;
	    };
	};
	req.open('GET', 'all_information_on_table', true);
	req.send();
};

var interval = setInterval(sendConnectionRequest, 5000);