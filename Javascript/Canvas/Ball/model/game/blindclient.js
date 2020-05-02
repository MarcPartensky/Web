var host = String(document.location);

var name = prompt("name");
var socket = io.connect(host, {query: "name="+name});

