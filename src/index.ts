import { Client } from "./objects/client";
import { Node } from "./objects/node";
import { Server } from "./objects/server";
import { Logger } from "./utils/logger";

export const logger = new Logger();

const server = new Server().start();

const node = new Node('localhost', 3500, 'Node 1');

node.connectToServer(server);

const client = new Client();

client.connectToServer(server);


setTimeout(() => {
    node.sendTestMessage();
}, 2000);