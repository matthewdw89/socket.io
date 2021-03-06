# socket.io

This repository is an example of how to implement socket.io along with a react.js front-end and an express back-end to build a simple instant chat app.

### Learnings to be covered in this repo - 

1. What a WebSocket is
2. How to Use Socket.io and Node.js alongside React
3. Basic concepts of Socket.io

### What is a web socket?

Websockets are an internet communication protocol that provides the ability to transmit data in two directions simultaneously eg. between a web browser (or other client application) and a server.

With web sockets connected, our browser/app and a server will be able to talk to each other in real time, kind of like they were involved in a telephone call: once connected, a client will be able to receive data from the server without any need to continuously refresh the web page. On the other hand, the server will also be able to receive data in real time from the client inside the same connection.

## Socket.io Setup
### Server-Side: Node.js + Express.js
 To get started we will need to install the *express* package using npm and create a quick express server.

```javascript
    const express = require('express');
    const PORT = process.env.PORT || 8080;

    //App Setup
    const app = express();
    const server = app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    });
```
The only difference in a normal express boilerplate and our above express boilerplate with socket.io is we need to either save our ```app.listen( )``` to a variable called 'server', or require in the built-in Node.js module called HTTP, link on the ```createServer()``` method and save that to a variable called 'server'.
In this instance I will be using the first of the two options: saving the ```app.listen( )``` into a variable


The next thing we need to do is connect socket.io to our express server
    
```javascript
const express = require('express');
const PORT = process.env.PORT || 8080;

//App Setup
    const app = express();
    const server = app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    });

//Socket Setup
io = require("socket.io")(server);
```
- First, we install socket.io using npm:
    ```npm install socket.io --save```
    - Then require socket.io into our server file from the socket.io library and save this into a variable called **io**
    - This library is a function that we can chain onto the end of the require and pass it our app.listen() variable to have the sockets constantly listening on our server.

For now, we are going to swap over to the client-side to set it up there before we start coding more on sockets

### Client-Side: React.js
First, we need to import the socket.io library. 
-   Where our package.json lives for create-react-app we will need to add socket.io-client.
- ```npm install socket.io-client```

```javascript
    import ioClient from 'socket.io-client';
    const socket = ioClient('http://localhost:8080');
```
- In the component, we want to use sockets import in the socket.io library. For this tutorial, we will import it into a component named **Chat**. 
- To establish our connection, we will invoke our ioClient function and pass in our server endpoint.
    - Save this to a variable called socket so we can use later to listen or send messages.
    
Now that we have Socket.io set up on both the server-side and the client-side we can start to use it.

## Socket.io Usage
The first, and one of the most important, methods that we will be looking at within socket.io is **on()**

```javascript
//Socket Setup
io = require("socket.io")(server);

io.on('connection', (socket) => {
 /*
    - All socket connection functionality goes within this function. 
    - The socket parameter in the callback function is the individual connection for the specific client that hit our server.  
 */
});
``` 
 The **on()** method takes two arguments: 
 - The first being the name/keyword of the event we are listening for, taken in as a string.
    - **Note:** This keyword directly correlates to another keyword on the sending side. We will get into that shortly.
 - The second argument is a callback function which will be executed every time our keyword is heard. This function will have a parameter that represents the data being passed from the emit message. Within this function we can handle our data is any way necessary ie. push to an array or store it in our database


 The next method provided by the socket.io library we will be looking at is **emit()**.

 ```javascript
io.on('connection', (socket) => {
    socket.emit('receiveNewMessage', [...messages])
});
```

Like the **on()** method, This **emit()** method takes two arguments.
   
- The first is the keyword that our socket is listening for on the opposite end, eg. within our **on()** method.
- The second parameter is the data we want to send with our message.
- **Note:** We emit messages when an action occurs from the user. We can use component lifecycle methods or functions to know when an action has occurred from the user.
