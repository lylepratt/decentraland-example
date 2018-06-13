import { createServer } from "http";
import { Server as WebSocketServer } from "ws";
import { Request, Response } from 'express';

import { connectedClients } from "./ConnectedClients";
import { WebSocketTransport } from "metaverse-api";
import RemoteScene from "./RemoteScene";
import { setBlockState } from "./State";

interface INameToValueMap
{
	[key: string]: any;
}

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws, req) {
  const client = new RemoteScene(WebSocketTransport(ws));

  client.on("error", (err: Error) => {
    console.error(err);
    ws.close();
  });

  connectedClients.add(client);

  ws.on("close", () => connectedClients.delete(client));
});

server.listen(8087, function listening() {
	setBlockState({
  	"1,1,1": {
    	"color": "red"
  	}
  });
  console.log(`Listening on 8087`);
});

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

app.get('/block/set', function (req: Request, res: Response) {
		var color = req.query.color;
		if(color == "random") {
			color = "#"+((1<<24)*Math.random()|0).toString(16);
		}
		var coord = req.query.coord;
		if(coord == "random") {
			coord = getRandomInt(1,20)+","+getRandomInt(1,20)+","+getRandomInt(1,20);
		}
		const state: INameToValueMap = {};
		if ("coord" in req.query) {
			state[coord] = {
				"color": color
			};
		}
		
		setBlockState(state)
		res.send(`Set: ${coord} to ${color}`);
});
