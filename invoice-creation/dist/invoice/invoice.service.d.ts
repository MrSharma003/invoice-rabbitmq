import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from './Model/invoice.schema';
import { ClientProxy } from '@nestjs/microservices';
export declare class InvoiceService {
    private invoiceModel;
    private rabbitmqClient;
    constructor(invoiceModel: Model<InvoiceDocument>, rabbitmqClient: ClientProxy);
    createInvoice(invoiceDto: Invoice): Promise<import("mongoose").Document<unknown, {}, InvoiceDocument> & Invoice & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    getAllInvoices(): Promise<Invoice[]>;
    getInvoiceById(id: string): Promise<Invoice>;
    cronJobForSalesReport(): Promise<void>;
}
