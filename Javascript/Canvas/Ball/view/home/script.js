var host = String(document.location);
host = host.replace("http", "ws");
var socket = io(host, {transports: ['websocket']});

var playBtn = document.getElementById('play-button');

playBtn.addEventListener('click', () => {
    let name = document.getElementById('name').value;
    console.log("play as "+name);
    socket.emit('play-button', name);
});
