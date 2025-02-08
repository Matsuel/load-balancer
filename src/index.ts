import { Node } from "./objects/node";
import { Server } from "./objects/server";

const server = new Server().start();

const node = new Node('localhost', 3500, 'Node 1');

node.connectToServer(server);
node.sendTestMessage();