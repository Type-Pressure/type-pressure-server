const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const env = process.env.NODE_ENV || 'development'

if(env == 'development'){
	require('dotenv').config()
}


http.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))

