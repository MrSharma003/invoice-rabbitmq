"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const dotenv = require("dotenv");
dotenv.config();
const rabbitmqUrl = 'amqp://rabbitmq:5672';
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [rabbitmqUrl],
            queue: 'summary_queue',
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map