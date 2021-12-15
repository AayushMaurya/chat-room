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

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/isRealString");
const { Users } = require("./utils/users");
const { param } = require('express/lib/request');

let io = socketio(server);

let users = new Users();        // creating object of Users class

io.on("connection", (con) => {
    console.log("A user connected");

    con.on("join", (params, callBack) => {
        if (!isRealString(params.displayName) || !isRealString(params.roomName))
            callBack("Input fields are not valid");
        else {

            con.join(params.roomName);          // this will join the connection to room mentioned
            // it will create one if it does not exist

            // if user already exist remvove it and then add again
            users.removeUser(con.id);

            users.addUser(con.id, params.displayName, params.roomName);

            con.emit("message", generateMessage('Admin', `Welcom to ${params.roomName}`));

            // broadcast new users list to all the user of particular room
            io.to(params.roomName).emit('updateUsersList', users.getUserList(params.roomName));

            callBack();
        }
    });

    con.on('disconnect', () => {
        let user = users.removeUser(con.id);

        if(user){
            console.log(`${user.name} get disconnected`);

            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('message', generateMessage('Admin', `${user.name} left`));
        }
    });

    con.on("createMessage", (message, callBack) => {
        // console.log(message);
        con.broadcast.emit('message', generateMessage(message.from, message.text));

        callBack("The message is sent to everyone");
    });

    con.on("createLocationMessage", (coords) => {
        con.broadcast.emit("locationMessage", generateLocationMessage('Admin', coords.lat, coords.lng));
    });

});

server.listen(port, () => console.log("server listening to port ", port));
