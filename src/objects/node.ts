import { io, Socket } from "socket.io-client";
import type { Server } from "./server";

export class Node {
    ip: string;
    port: number;
    hostname: string;
    socketServer: Socket | null = null;

    constructor(ip: string, port: number, hostname: string) {
        this.ip = ip;
        this.port = port;
        this.hostname = hostname;
        console.log(`Node created: ${this}`);
    }

    toString() {
        return `${this.hostname} (${this.ip}:${this.port})`;
    }

    connectToServer(server: Server) {
        // Initialize the socket server connection
        this.socketServer = io(`http://${server.address}:${server.port}`);
        console.log(`Connecting to server on port ${server.port}`);
    }

    sendTestMessage() {
        if (!this.socketServer) {
            return;
        }
        this.socketServer.emit('test', 'Hello from Node');
    }
}