const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const env = process.env.NODE_ENV || 'development'

if(env == 'development'){
	require('dotenv').config()
}

let position = []

let i = 0
io.on('connection', function(socket){
	console.log('a user connected')
	i += 10
	socket.on('addPlayer', data => {
		data.position.y = i
		position.push(data)
		io.emit('position', position)
	})
	socket.emit('position', position)
	socket.on('move', data => {
		position.x += data
		io.emit('position', position)
	})
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});



http.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))

