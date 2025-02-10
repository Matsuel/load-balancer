import { Server as ServerBase, Socket } from 'socket.io';
import type { DNSServerRecord } from '../types';
import { NodeType } from '../constantes/enum';

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
            const clientType = socket.handshake.query.type;

            // TODO: Create functions to handle the different client types
            if (clientType === NodeType.NODE) {
                socket.join('nodes');
                // TODO: Mettre à jour les tables DNS et envoyer les nouvelles tables aux clients
                console.log(`Node connected: ${socket.id} joining nodes room`);
            } else if (clientType === NodeType.CLIENT) {
                socket.join('clients');
                console.log(`Client connected: ${socket.id} joining clients room`);
            }


            this.clients.set(socket.id, socket);

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
                this.clients.delete(socket.id);
            });

            socket.on('test', (data) => {
                console.log(`Test message received: ${data}`);
                this.io?.emit('test', 'Hello from the server');
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