var mouse = {x: 0, y: 0};
var game = new Game();
var isMyTurn = false;
resize();
game.show(context, mouse);

var pseudo = prompt('Pseudo:');
var host = String(document.location);
// http://localhost:8080/
host = host.replace("http", "ws");
var socket = io(host, {transports: ['websocket']});
var ready = false;
socket.emit('nouveau_client', pseudo);
document.title = pseudo + ' - ' + document.title;

$('#clients').html('Waiting for the other player to connect.');

// Quand on reçoit un message, on l'insère dans la page
socket.on('message', function(data) {
    insereMessage(data.pseudo, data.message)
})

// Quand un nouveau client se connecte, on affiche l'information
socket.on('nouveau_client', function(data) {
    $('#zone_chat').prepend('<p><em>' + data.pseudo + ' joined the chat !</em></p>');
})

socket.on('joue', function(choice) {
  game.play(parseInt(choice));
  isMyTurn = true;
})

socket.on('erreur', function(error) {
  alert(error);
})

socket.on("clients" , function(clients) {
  ready = parseInt(clients)==2;
  $('#clients').html(`<p> Players connected:<strong>${clients}</strong> </p>`);
  if (ready) {
    alert(`Let the party begin!`);
  } else {
    alert('Waiting for the other player to join.');
  }
})

socket.on("turn", function(turn) {
  isMyTurn = parseInt(turn)==1;
})

socket.on("restart", function(_) {
  game.restart();
})

// Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
$('#formulaire_chat').submit(function () {
    var message = $('#message').val();
    socket.emit('message', message); // Transmet le message aux autres
    insereMessage(pseudo, message); // Affiche le message aussi sur notre page
    $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
    return false; // Permet de bloquer l'envoi "classique" du formulaire
});

// Ajoute un message dans la page
function insereMessage(pseudo, message) {
    $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
}

window.addEventListener("resize",resize);

window.addEventListener("mousemove",
  function(event) {
    mouse.x=event.x;
    mouse.y=event.y;
    game.show(context, mouse);
  }
)

function onClick() {
    if (!ready) {
        alert("Waiting for the other player to join.");
    } else {
        var choice = Math.floor(mouse.x*game.width/context.width);
        if (game.over) {
            if (confirm("Game over! Do you want to restart?")) {
                socket.emit('restart', "");
                game.restart();
            }
        } else {
            if (isMyTurn) {
                if (game.play(choice)) {
                    socket.emit('joue', String(choice));
                    game.show(context, mouse);
                    isMyTurn = false;
                }
            } else {
                alert("It is not your turn!");
            }
        }
    }
}

canvas.addEventListener("click", onClick);

