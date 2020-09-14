import * as Colyseus from "colyseus.js";

var client = new Colyseus.Client('ws://localhost:2567');

client.join("room_name").then(room => {
    console.log(room.sessionId, "joined", room.name);
}).catch(e => {
    console.log("JOIN ERROR", e);
});