// import { Client } from "./objects/client";
// import { Node } from "./objects/node";
// import { Server } from "./objects/server";

import { LogLevel } from "./constantes/enum";
import { Logger } from "./utils/logger";

// const server = new Server().start();

// const node = new Node('localhost', 3500, 'Node 1');

// node.connectToServer(server);

// const client = new Client();

// client.connectToServer(server);


// setTimeout(() => {
//     node.sendTestMessage();
// }, 2000);

const logger = new Logger();
logger.setLogLevel(LogLevel.INFO);

logger.info('This is an info message', 'test');
logger.debug('This is a debug message');
logger.warn('This is a warning message');
logger.error('This is an error message');