import { Server } from "colyseus";
import {createServer} from "http"
import express from "express";
import { RaceRoom } from "./rooms/RaceRoom";
const port = Number(process.env.port) || 5000


const app = express()
app.use(express.json())

const gameServer = new Server({
    server: createServer(app)
})

gameServer.define("race", RaceRoom)


gameServer.listen(port, "localhost", 4, async () => {

    console.log("Server connected successfully! port: ", port)
    console.log("ws://localhost:"+port)
})