let ws = io();

let btnBroadcast = document.getElementById("btnBroadcast");

ws.on('connect', function(){
    console.log("connected to server")
});

ws.on('disconnect', function(){
    console.log("Disconnected from server");
});

ws.on("message", (message) => {
    // console.log(message);
    
    let li = document.createElement('li');
    li.innerText = `${message.from}: ${message.text}`;

    document.querySelector('body').appendChild(li);
});

ws.on('locationMessage', (message) => {
    console.log(message);
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.target = "_blank";
    a.href = message.url;

    a.innerText ='My current location.';
    li.appendChild(a);

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

document.querySelector('#send-location').addEventListener('click', function(e){
    console.log("this will send geo location to every user");

    if(!navigator.geolocation){
        return alert("Geolocation is not supporte by your browser.");
    }

    // this will grab the current user location
    navigator.geolocation.getCurrentPosition(function (position){
        // console.log(position);
        ws.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function(){
        alert("Unable to fetch location");
    });
});