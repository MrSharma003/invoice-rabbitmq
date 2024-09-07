import { Injectable } from '@nestjs/common';

interface Item {
  sku: string;
  qt: number;
}

export interface Invoice {
  customer: string;
  amount: string;
  reference: string;
  date: Date;
  item: Item[];
}

@Injectable()
export class AppService {
  handleInvoiceSummary(invoice: any) {
    const emailBody = `Invoice Summary: ${JSON.stringify(invoice)}`;
    this.emailService('recipient@example.com', 'Invoice Summary', emailBody);
  }

  emailService(to: string, subject: string, body: string): Promise<void> {
    console.log(`Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    return Promise.resolve();
  }
}
