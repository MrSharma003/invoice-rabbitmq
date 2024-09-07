import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './Model/invoice.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
    ClientsModule.register([
      {
        name: 'Invoice_Summary',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitmqUrl],
          queue: 'summary_queue',
        },
      },
    ]),
  ],
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
