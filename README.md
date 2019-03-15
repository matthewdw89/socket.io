# socket.io

This repository is an example of how to implement socket.io along with a react.js front-end and an express back-end to build a simple instant chat app.

### Learnings to be covered in this repo - 

1. What a WebSocket is
2. How to Use Socket.io and Node.js alongside of React
3. Basic concepts of Socket.io

### What is a web socket?

Websockets are an internet communication protocol that provides the ability to transmit data in two directions simultaneously eg. between a web browser (or other client application) and a server.

With web sockets connected, our browser/app and a server will be able to talk to each other in real time, kind of like they were involved in a telephone call: once connected, a client will be able to receive data from the server without any need to continuously refresh the web page. On the other hand the server will also be able to receive data in real time from the client inside the same connection.

## Socket.io Setup
### Server-Side: Node.js + Express.js
 To get started we will need to install the *express* package using npm and create a quick express server.
 The only difference in a normal express boilerplate and our express boilerplate with socket.io is we need to either save our ```app.listen( )``` to a variable called 'server', or require in the built-in Node.js module called HTTP, link on the ```createServer()``` method and save that to a variable called 'server'.
In this instance I will be useing the first of the two options: saving the ```app.listen( )``` into a variable

```javascript
    const express = require('express');
    const PORT = process.env.PORT || 8080;

    //App Setup
    const app = express();
    const server = app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    });

    //Middleware
    app.use(express.static('public'));
    ```
