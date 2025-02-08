export class Client {
    port: number;

    constructor(port: number = 3000) {
        this.port = port;
    }

    connectToServer() {
        console.log(`Connecting to server on port ${this.port}`);
    }
}