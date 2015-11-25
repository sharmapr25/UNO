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

var flag = true;

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
			  	
			  	//say UNO
			  	var iDiv = document.createElement('button');
			  	iDiv.id = 'say_UNO';
			  	document.body.appendChild(iDiv);
			  	document.getElementById('say_UNO').innerHTML = 'say UNO';

			  	//catch UNO
			  	var iDiv = document.createElement('button');
			  	iDiv.id = 'catch_UNO';
			  	document.body.appendChild(iDiv);
			  	document.getElementById('catch_UNO').innerHTML = 'catch UNO';

			  	//draw
			  	var iDiv = document.createElement('button');
			  	iDiv.id = 'draw';
			  	document.body.appendChild(iDiv);
			  	document.getElementById('draw').innerHTML = 'DRAW';

			  	//Submit
				var iDiv = document.createElement('button');
			  	iDiv.id = 'submit';
			  	document.body.appendChild(iDiv);
			  	document.getElementById('submit').innerHTML = 'Submit'
	        	
	        	flag = false;
	        };

	        
		  	document.getElementById('all_user_cards_info').innerHTML = generateTable(comments.allUsersCardsLength);
	        
	        var cardRef = '<img src="/public/images/allCards/close_face.png">';
	        cardRef += '<img src="'+addressGenrator(comments.cardOnTable)+'">';

		  	document.getElementById('All_pile').innerHTML = cardRef
		  	
		  	document.getElementById('User_Cards_Name').innerHTML = '<h3>'+'Players Cards :'+'</h3>'

	    	var imgRef = '';
	    	for(var i=0; i<comments.userCards.length; i++){
	    		imgRef += '<img src="'+addressGenrator(comments.userCards[i])+'">';
	    	};
			
		  	document.getElementById('my_cards').innerHTML = imgRef;
	    };
	};
	req.open('GET', 'all_information_on_table', true);
	req.send();
};

var interval = setInterval(sendConnectionRequest, 5000);

exports.addressGenrator = addressGenrator;