
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      PORT = process.env.PORT || 8080;

//App Setup
    const app = express();
    const server = app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    });

// Middleware 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// This could be a database, but I will just be using an array in this project
let messageList = [];


// Using our IO socket variable to now listen for connections

io = require("socket.io")(server),

io.on('connection', (socket) => {
  console.log(`new connection: ${socket.id}`)
  // This is where socket is listening 'on' the 'start' keyword from the client
  socket.on('start', () => {
    io.emit('receiveNewMessage', messageList)
  })

  // This is where our socket is listening for 'sendNewMessage' from the client. It is then taking
  //  the data being sent to it and pushing it to our messageList array and sending that back
  socket.on('sendNewMessage', (msg)=>{
    messageList.push(msg)
    io.emit('receiveNewMessage', messageList)
  })

  socket.on('disconnect', () => console.log(`Client disconnected: ${socket.id}`))
})