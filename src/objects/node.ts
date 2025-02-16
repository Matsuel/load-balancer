import { io, Socket } from "socket.io-client";
import type { Server } from "./server";
import { NodeType } from "../constantes/enum";
import { logger } from "..";
import type { DNSServerRecord } from "../types";

export class Node {
    ip: string;
    port: number;
    hostname: string;
    socketServer: Socket | null = null;

    constructor(ip: string, port: number, hostname: string) {
        this.ip = ip;
        this.port = port;
        this.hostname = hostname;
        logger.info(`Node created: ${this}`);
    }

    toString() {
        return `${this.hostname} (${this.ip}:${this.port})`;
    }

    connectToServer(server: Server) {
        // Initialize the socket server connection
        this.socketServer = io(`http://${server.address}:${server.port}`, { query: { type: NodeType.NODE, hostname: this.hostname, ip: this.ip, port: this.port } });
        this.socketServer.on('dns', (data: DNSServerRecord[]) => {
            logger.debug("New DNS records received");
        });
        logger.info(`Connecting to server on port ${server.port}`);
    }

    sendTestMessage() {
        // Send a test message to the server if the connection is established
        if (!this.socketServer) {
            logger.error('No server connection established');
            return;
        }
        this.socketServer.emit('test', `Hello from ${this.hostname}`);
        this.socketServer.on('test', (data) => {
            logger.debug(`Test message received: ${data}`);
        });
    }
}