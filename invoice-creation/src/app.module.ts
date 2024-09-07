import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceModule } from './invoice/invoice.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://prashant:KzQttrqrnCAN1h10@invoice.ewrmw.mongodb.net/?retryWrites=true&w=majority&appName=Invoice',
    ),
    ScheduleModule.forRoot(),
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
