var http = require('http');
var controller = require('../lib/controller.js');
var server = http.createServer(controller).listen(3000); 