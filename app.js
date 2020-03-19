const http = require('./http')
const io = require('socket.io')(http)

let position = []

let i = 0
io.on('connection', function(socket){
	if (position.length < 5) {
		console.log('a user connected')
		i = 40
		socket.on('addPlayer', data => {
			// Untuk memberi jarak antar mobil
				if (position.length === 0) {
					data.position.y = 180
					data.id = socket.id
				} else {
					console.log(position[position.length - 1].position.y)
					data.position.y = position[position.length - 1].position.y + i
					data.id = socket.id
				}
				position.push(data)
			// }
			io.emit('position', position)
		})

		// Untuk mengecek jumlah minimal pemain sebelum mulai
		socket.emit('position', position)

		// Cek perpindahan pemain pada sumbu x
		socket.on('move', data => {
			data.position.forEach(el => {
				if(el.position.x >= 580) {
					el.position.x = 580
				} else {
					if (el.id === socket.id) {
						el.position.x += 52
					}
				}
			})
			position = data.position;
			io.emit('position', position)
		})
		socket.on('finish', winner => {
			io.emit('finish', winner)
		})
		socket.on('disconnect', function(){
			position.forEach((el, i) => {
				if (el.id === socket.id) {
					position.splice(i, 1)
				}
			})
			io.emit('position', position)
			console.log('user disconnected');
		});
	}
	});

