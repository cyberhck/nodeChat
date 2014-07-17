var http = require("http")
var express = require("express");
app = express();
server = http.createServer(app);
app.use(express.static(__dirname + '/public'));
server.listen(3000);
app.get("/", function(req, res) {
	res.sendfile('views/index.html');
});
app.get("/chat/:nick", function(req, res) {
	nick = req.params.nick;
	res.sendfile('views/chat.html');
});
app.get("/chat", function(req, res) {

});

io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
	console.log("a user is connected!")
	socket.on('chat', function(data) {
		console.log(data);
		//io.socket.emit('chat',data);
		socket.broadcast.emit('chat', data);
	});
});