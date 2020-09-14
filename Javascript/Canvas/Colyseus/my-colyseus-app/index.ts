import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import path from 'path';
// import socialRoutes from "@colyseus/social/express"

import { MyRoom } from "./MyRoom";

const port = Number(process.env.PORT || 2567);
const app = express()

app.use(cors());
app.use(express.json())
//app.use('/public',express.static("./client")); //todo

app.use('/',express.static(path.join(__dirname,'client')));

const server = http.createServer(app);
const gameServer = new Server({
  server:server,
  express:app,
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
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`);

// const serverHttp = http.createServer(app);
// const portHttp = Number(process.env.PORT || 8000);

// serverHttp.listen(portHttp, function(){
//   console.log("listening on *:", portHttp);
// });

import {main} from './server';
main();
