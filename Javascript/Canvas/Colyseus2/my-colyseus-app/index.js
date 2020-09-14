// const http = require('http');
// const express = require('express');
// const cors = require('cors');
// const colyseus = require('colyseus');
// const monitor = require("@colyseus/monitor").monitor;
// const socialRoutes = require("@colyseus/social/express").default;

import express from 'express';
//import serveIndex from 'serve-index';
import path from 'path';
import cors from 'cors';
import http from 'http';

import { createServer } from 'http';
//import { Server, LobbyRoom, RelayRoom } from 'colyseus';
import pkg from 'colyseus';
const { Server, LobbyRoom, RelayRoom } = pkg;
//import { monitor } from '@colyseus/monitor';
import pkg2 from '@colyseus/monitor';
const { monitor } = pkg2;

const port = process.env.PORT || 2567;
const app = express()

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, "client")));

const server = http.createServer(app);
const gameServer = new Server({
  server: server,
  express: app,
});

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

// register your room handlers
gameServer.define('my_room', MyRoom);

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/authentication/)
 * - also uncomment the require statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`)

import GameServer from './server/models/gameserverbis.js';
import Game from './server/models/game.js';

const game = Game.random();
const gameServerNoob = new GameServer(game);
//gameServer.setUp();
//gameServer.main();

