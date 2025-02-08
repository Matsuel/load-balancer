import { Server as ServerBase } from 'socket.io';

export class Server {
    port: number;
    io: ServerBase | null;

    constructor(port: number = 3000) {
        this.port = port;
        this.io = null;
    }

    start() {
        this.io = new ServerBase(this.port);
        console.log(`Server started on port ${this.port}`);
    }
}