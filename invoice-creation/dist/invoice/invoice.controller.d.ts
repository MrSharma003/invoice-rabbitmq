import { InvoiceService } from './invoice.service';
import { Invoice } from './Model/invoice.schema';
import { Response } from 'express';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    createInvoice(invoiceData: Invoice, response: Response): Promise<Response<any, Record<string, any>>>;
    getAllInvoices(response: Response): Promise<Response<any, Record<string, any>>>;
    getInvoiceById(id: string): Promise<Invoice>;
}
