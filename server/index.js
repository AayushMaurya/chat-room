const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname + "/../public");
const app = express();

let server = http.createServer(app);

app.use(express.static(publicPath));

// express.static will get all the required file of static website from the path given 
// no need to mention every file again
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

// app.get("/javascript", (req, res) => {
//     res.sendFile(__dirname + "/../public/js/index.js");
// });

const {generateMessage} = require("./utils/message");

let io = socketio(server);

io.on("connection", (con)=>{
    console.log("A user connected");

    con.emit("message", generateMessage('Admin', "Greetings from the server"));

    con.broadcast.emit("message", generateMessage('Admin', 'A new user joined'));

    con.on('disconnect', () => {
        console.log("A user disconnected");
    });

    con.on("broadcastMessage", (message, callBack) => {
        console.log(message);

        // this will send broadcast message to everyone including itself
        io.emit('message', generateMessage(message.from, message.text));

        // this will send broadcast message to everyone except itslef
        // con.broadcast.emit('message', {
        //     from: message.from,
        //     type: "broadcast",
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        callBack('The message is broadcast');       // this call bcak function will be called at the client who asked for broadcast message
    });

    con.on("createMessage", (message, callBack) => {
        console.log(message);
        con.broadcast.emit('message', generateMessage(message.from, message.text));

        callBack("The message is sent to everyone");
    });

});

server.listen(port, ()=>console.log("server listening to port ", port));

