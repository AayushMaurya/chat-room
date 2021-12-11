let ws = io();

let btnBroadcast = document.getElementById("btnBroadcast");

ws.on('connect', function(){
    console.log("connected to server")
});

ws.on('disconnect', function(){
    console.log("Disconnected from server");
});

ws.on("message", (message) => {
    console.log(message);
    
    let li = document.createElement('li');
    li.innerText = `${message.from}: ${message.text}`;

    document.querySelector('body').appendChild(li);
});

btnBroadcast.addEventListener('click', function() {
    ws.emit("broadcastMessage", {
    from: "aayush",
    text: "this is a broadcast message fro aayush"
   }, function(m){
       console.log("got it ", m);
   });
});

document.querySelector('#submit-btn').addEventListener('click', function(e){
    e.preventDefault();     // prevent from refreshing the page on submitting

    ws.emit("createMessage", {
        from: "User",
        text: document.querySelector('input[name="message"]').value
    }, function(m){
        console.log(m);
    });
});