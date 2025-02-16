import { Server as ServerBase, Socket } from 'socket.io';
import type { DNSServerRecord } from '../types';
import { NodeType } from '../constantes/enum';
import { logger } from '..';

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
        logger.info(`Server started on port ${this.port}`);
        this.io.on('connection', (socket) => {
            const { type, hostname, ip, port } = socket.handshake.query;

            // TODO: Create functions to handle the different client types
            if (type === NodeType.NODE) {
                logger.info(`Node connected: ${hostname} (${ip}:${port})`);
                this.dnsRecords.push({ ip: ip as string, port: port as string, hostname: hostname as string });
                socket.join('nodes');
                // TODO: Mettre à jour les tables DNS et envoyer les nouvelles tables aux clients
                logger.info(`Node connected: ${socket.id} joining nodes room`);
                this.broadcastDNSRecords();
            } else if (type === NodeType.CLIENT) {
                socket.join('clients');
                logger.info(`Client connected: ${socket.id} joining clients room`);
            }


            this.clients.set(socket.id, socket);

            socket.on('disconnect', () => {
                logger.debug(`Client disconnected: ${socket.id}`);
                this.clients.delete(socket.id);
            });

            socket.on('test', (data) => {
                logger.debug(`Test message received: ${data}`);
                this.io?.emit('test', 'Hello from the server');
            });
        });
        return this;
    }

    broadcastDNSRecords() {
        if (!this.io) {
            return;
        }
        logger.debug('Broadcasting DNS records to all nodes');
        this.io.to('nodes').emit('dns', this.dnsRecords);
    }
}