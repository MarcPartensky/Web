/* NodeJS server script only made to disable cors policy cause browsers suck. */
import http from 'http'
import express from 'express'
console.log(http.createServer)
//const http = require('http')
//const express = require('express')
const app = express();
const server = http.createServer(app);
const io = socket.listen(server);


server.listen(8000)

app.use('/libs', express.static('libs'));
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
