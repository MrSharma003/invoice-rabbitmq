import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from './Model/invoice.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
    @Inject('Invoice_Summary') private rabbitmqClient: ClientProxy,
  ) {}

  async createInvoice(invoiceDto: Invoice) {
    // const invoiceModel = new this.invoiceModel(invoiceDto);
    const invoice = await this.invoiceModel.create(invoiceDto);
    return invoice;
  }

  async getAllInvoices(): Promise<Invoice[]> {
    const invoiceList = await this.invoiceModel.find();
    return invoiceList;
  }

  async getInvoiceById(id: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(id);
    return invoice;
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async cronJobForSalesReport() {
    console.log('Daily Sales Report: ');

    const startOfDay = DateTime.utc().startOf('day').toJSDate();

    const endOfDay = DateTime.utc().endOf('day').toJSDate();

    const invoices = await this.invoiceModel
      .find({
        date: { $gte: startOfDay, $lt: endOfDay },
      })
      .exec();
    const total_sales = invoices.reduce(
      (acc, invoice) => invoice.amount + acc,
      0,
    );
    const item_summary = invoices
      .flatMap((invoice) => invoice.item)
      .reduce<{ [sku: string]: number }>(
        (summary, item) => {
          if (!summary[item.sku]) {
            summary[item.sku] = item.qt;
          } else {
            summary[item.sku] += item.qt;
          }
          return summary;
        },
        {} as { [sku: string]: number },
      );

    this.rabbitmqClient
      .emit('Summary Pushed: ', { total_sales, item_summary })
      .toPromise()
      .then(() => console.log('Message sent to RabbitMQ'))
      .catch((error) =>
        console.error('Error sending message to RabbitMQ', error),
      );
    console.log(total_sales, item_summary);
    // console.log(invoices.length, 'total_sales: ', total_sales, item_summary);
  }
}
