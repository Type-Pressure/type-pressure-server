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
	if (position.length < 5) {
		console.log(position.length)
		console.log('a user connected')
		i = 40
		socket.on('addPlayer', data => {
			if (position.length === 0) {
				data.position.y = 0
			} else {
				console.log(position[position.length - 1].position.y)
				data.position.y = position[position.length - 1].position.y + i
			}
			position.push(data)
			console.log(position);
			io.emit('position', position)
		})
		if (position.length === 4) {
			socket.emit('position', position)
			socket.on('move', data => {
				position.x += data
				io.emit('position', position)
			})
		}
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	}
	});



http.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))

