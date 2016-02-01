var resetCookie = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		window.location = req.responseText;
	};
	req.open('GET','reset_cookie',true);
	req.send();	
};

var showList = function(){
	document.getElementById('list').style.display = 'block';
	document.getElementById('winner').style.display = 'none';
};
