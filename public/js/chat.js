let ws = io();

function scrollToBottom(){
    let message = document.getElementById('message-box').lastElementChild;

    message.scrollIntoView();
}

ws.on('connect', function(){
    console.log("connected to server");

    let substr = window.location.search.substring(1);
    let paras = JSON.parse('{"' + decodeURI(substr).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

    // join in a predefined method
    ws.emit("join", paras, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }
        else{
            console.log("sucessfully logged in");
        }
    });
});

ws.on('disconnect', function(){
    console.log("Disconnected from server");
});

ws.on("message", (message) => {
    // console.log(message);
    
    let li = document.createElement('li');
    li.innerText = `${message.from}: ${message.text}`;

    document.querySelector('#message-box').appendChild(li);

    scrollToBottom();       // to scroll to bottom of the message box
});

ws.on('locationMessage', (message) => {
    console.log(message);
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.target = "_blank";
    a.href = message.url;

    a.innerText ='My current location.';
    li.appendChild(a);

    document.querySelector('#message-box').appendChild(li);
});

ws.on('updateUsersList', (ulist) => {
    console.log("Updated list = ", ulist);

    
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