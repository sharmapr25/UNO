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
	var tableHead = "<tr><th>Name&nbsp;&nbsp;&nbsp;</th><th>Number Of Card</th></tr>"
	return "<table align='right'>"+tableHead+user_info.join('')+"</table>";
};

var flag = true;

var saidUNO = false;
var catchedUNO = false;
var drawCard = false;

var userCards;

var indexOfPlayedcard = 0;

var sendRequestToPlayCard = function(){
	var dataToSend = {};
	dataToSend.saidUNO = saidUNO;
	dataToSend.catchedUNO = catchedUNO;
	dataToSend.drawCard = drawCard;
	if(indexOfPlayedcard)
		dataToSend.playedCard = userCards[indexOfPlayedcard];
	else{
		alert('please select a card to play..!!');
		return;
	};

	saidUNO = false;
	catchedUNO = false;
	drawCard = false;

	indexOfPlayedcard = 0;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	console.log(req.responseText);
	        var responseStatus = JSON.parse(req.responseText).status;
			switch(responseStatus){
				case 'can not play the card':
					alert('Invalid Card..!!!');
					break;
				case 'not your turn':
					alert('not your turn');
					break;
				case 'Game end' :
	        		sendConnectionRequest();
					alert('Game End');
			};
	        sendConnectionRequest();
	    };
	};
	req.open('POST', 'play_card', true);
	req.send(JSON.stringify(dataToSend));
};

var updateIndex = function(id){
	indexOfPlayedcard = id[id.length-1];
};

var sendConnectionRequest = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	console.log(req.responseText);
	        var comments = JSON.parse(req.responseText);
	        userCards = comments.userCards;
	        console.log('Current Turn',comments.currentPlayer);
	        console.log('Next Turn', comments.nextPlayer);
	        console.log('Previous Turn', comments.previousPlayer);
	        
	        if(flag){
	        	var e = document.getElementById('loading');
	        	document.body.removeChild(e);
	        	
	        	var iDiv = document.createElement('div');
		  		iDiv.id = 'all_user_cards_info';
		  		document.body.appendChild(iDiv);


		   		var iDiv = document.createElement('div');
			  	iDiv.id = 'All_pile';
			  	document.body.appendChild(iDiv);

	        	var iDiv = document.createElement('div');
			  	iDiv.id = 'User_Cards_Name';
			  	document.body.appendChild(iDiv);

			  	var iDiv = document.createElement('div');
			  	iDiv.id = 'my_cards';
			  	document.body.appendChild(iDiv);

			  	var iDiv = document.createElement('div');
			  	iDiv.id = 'current_player';
			  	document.body.appendChild(iDiv);

			  	var iDiv = document.createElement('div');
			  	iDiv.id = 'next_player';
			  	document.body.appendChild(iDiv);

			  	var iDiv = document.createElement('div');
			  	iDiv.id = 'previous_player';
			  	document.body.appendChild(iDiv);

			  	//say UNO
			  	var iDiv = document.createElement('button');
			  	iDiv.id = 'say_UNO';
			  	iDiv.onclick = function(){ 
			  		alert('yeahhh..said UNO..!!');
			  		saidUNO = true;
			  	};
			  	document.body.appendChild(iDiv);
			  	document.getElementById('say_UNO').innerHTML = 'say UNO';

			  	//catch UNO
			  	var iDiv = document.createElement('button');
			  	iDiv.id = 'catch_UNO';
			  	iDiv.onclick = function(){ 
			  		alert('Call to catch UNO..!!');
			  		catchedUNO = true;
			  	};
			  	document.body.appendChild(iDiv);
			  	document.getElementById('catch_UNO').innerHTML = 'catch UNO';

			  	//draw
			  	var iDiv = document.createElement('button');
			  	iDiv.id = 'draw';
			  	iDiv.onclick = function(){ 
			  		alert('Draw cardsss..!!');
			  		drawCard = true;
			  	};
			  	document.body.appendChild(iDiv);
			  	document.getElementById('draw').innerHTML = 'DRAW';

			  	//Submit
				var iDiv = document.createElement('button');
			  	iDiv.id = 'submit';
			  	iDiv.onclick = function(){ 
			  		sendRequestToPlayCard();
			  	};
			  	document.body.appendChild(iDiv);
			  	document.getElementById('submit').innerHTML = 'Submit'
	        	
	        	flag = false;
	        };

	        
		  	document.getElementById('all_user_cards_info').innerHTML = generateTable(comments.allUsersCardsLength);
	        
	        var cardRef = '<img id="draw_pile" src="/public/images/allCards/close_face.png">';
	        cardRef += '<img id="discard_pile" src="'+addressGenrator(comments.cardOnTable)+'">';

		  	document.getElementById('All_pile').innerHTML = cardRef
		  	
		  	document.getElementById('User_Cards_Name').innerHTML = '<h3>'+'Players Cards :'+'</h3>'

	    	var imgRef = '';
	    	for(var i=0; i < comments.userCards.length; i++){
	    		imgRef += '<img id="card_num:'+i+'" onclick="updateIndex(this.id)" src="'+addressGenrator(comments.userCards[i])+'">';
	    	};			
		  	document.getElementById('my_cards').innerHTML = imgRef;

			document.getElementById('current_player').innerHTML = "<h3>"+"Current Player :"+comments.currentPlayer+"</h3>";
			document.getElementById('next_player').innerHTML = "<h3>"+"Current Player :"+comments.nextPlayer+"</h3>";
			document.getElementById('previous_player').innerHTML = "<h3>"+"Current Player :"+comments.previousPlayer+"</h3>";

	    };
	};
	req.open('GET', 'all_information_on_table', true);
	req.send();
};

var interval = setInterval(sendConnectionRequest, 5000);

exports.addressGenrator = addressGenrator;