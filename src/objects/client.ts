import { io, Socket } from "socket.io-client";
import type { Server } from "./server";
import { NodeType } from "../constantes/enum";
import { logger } from "..";

export class Client {
    port: number;
    socketServer: Socket | null = null;

    constructor(port: number = 3000) {
        this.port = port;
    }

    connectToServer(server: Server) {
        // Initialize the socket server connection
        this.socketServer = io(`http://${server.address}:${server.port}`, { query: { type: NodeType.CLIENT } });
        logger.info(`Connecting to server on port ${server.port}`);
    }
}