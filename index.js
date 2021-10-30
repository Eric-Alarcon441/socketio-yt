const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

//settings
app.use(express.static(path.join(__dirname, 'public')));

//websockets

io.on('connection', (socket) => {
	socket.on('chat message', (data) => {
		io.emit('chat message', data);
	});
	socket.on('chat typing', (data) => {
		socket.broadcast.emit('chat typing', data);
	});
});

//start server
server.listen(3000, () => {
	console.log(`server on http://localhost:3000`);
});
