import { Server as ServerBase, Socket } from 'socket.io';
import type { DNSServerRecord } from '../types';

export class Server {
    address: string;
    port: number;
    io: ServerBase | null = null;
    dnsRecords: DNSServerRecord[] = [];
    clients: Map<string, Socket> = new Map();

    constructor(port: number = 3000, address: string = 'localhost') {
        this.port = port;
        this.address = address;
    }

    start(): Server {
        this.io = new ServerBase(this.port);
        console.log(`Server started on port ${this.port}`);
        this.io.on('connection', (socket) => {
            console.log(`Client connected: ${socket.id}`);
            this.clients.set(socket.id, socket);

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
                this.clients.delete(socket.id);
            });

            socket.on('test', (data) => {
                console.log(`Test message received: ${data}`);
            });
        });
        return this;
    }

    broadcastDNSRecords() {
        if (!this.io) {
            return;
        }
        this.io.emit('dns-records', this.dnsRecords);
    }
}