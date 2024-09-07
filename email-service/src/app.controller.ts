import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('Summary Pushed: ')
  handleInvoiceSummary(@Payload() invoice: any) {
    this.appService.handleInvoiceSummary(invoice);
  }
}
