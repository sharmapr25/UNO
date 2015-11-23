var http = require('http');
var fs = require('fs');

var handle_get_request = function(request, response){
	console.log('requested files', request.url);
	var filePath = '.'+request.url;
	if(request.url == '/')
		filePath = './htmlFiles/login.html';
	fs.readFile(filePath, function(err, data){
		if(data){
			response.statusCode = 200;
			console.log(response.statusCode);
			response.end(data);
		}else if(err){
			console.log('file not found..!',request.url);
		};
	});
};

var requestHandler = function(request, response){
	console.log(request.method, request.url);
	if(request.method == 'GET')
		handle_get_request(request, response);
};

var server = http.createServer(requestHandler);
server.listen(3000);