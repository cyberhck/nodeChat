var http = require("http")
var express = require("express");
var Ddos = require('ddos')
var ddos = new Ddos({maxexpiry : 1});

app = express();
server = http.createServer(app);
app.use(ddos.express)
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
		data=data.replace("<","&lt;");
		data=data.replace(">","&gt;");
		data=data.replace(":)","<img src='/emoticons/Glad.png' height='18' width='18' />");
		data=data.replace(":D","<img src='/emoticons/Happy.png' height='18' width='18' />");
		data=data.replace(":@","<img src='/emoticons/Angry.png' height='18' width='18' />");
		data=data.replace(":'(","<img src='/emoticons/Cry.png' height='18' width='18' />");
		data=data.replace(";)","<img src='/emoticons/Ok.png' height='18' width='18' />");
		data=data.replace(":))","<img src='/emoticons/Blush.png' height='18' width='18' />");
		data=data.replace(":(","<img src='/emoticons/Sad.png' height='18' width='18' />");


		socket.broadcast.emit('chat', data);
	});
});
