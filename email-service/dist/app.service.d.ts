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
export declare class AppService {
    handleInvoiceSummary(invoice: any): void;
    emailService(to: string, subject: string, body: string): Promise<void>;
}
export {};
