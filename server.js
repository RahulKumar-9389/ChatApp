const express = require('express')
const app = express()
const http = require('http').createServer(app)
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

const users = {};

io.on('connection', (socket) => {
    
    socket.on("new-user-joined", name=>{
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    })

    socket.on("send", message=>{
        socket.broadcast.emit("recive", {message: message, name:users[socket.id]});
    });

})