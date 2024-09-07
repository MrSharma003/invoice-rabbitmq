import { Document } from 'mongoose';
export type InvoiceDocument = Invoice & Document;
declare class Item {
    sku: string;
    qt: number;
}
export declare class Invoice {
    customer: string;
    amount: number;
    reference: string;
    date: Date;
    item: Item[];
}
export declare const InvoiceSchema: import("mongoose").Schema<Invoice, import("mongoose").Model<Invoice, any, any, any, Document<unknown, any, Invoice> & Invoice & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Invoice, Document<unknown, {}, import("mongoose").FlatRecord<Invoice>> & import("mongoose").FlatRecord<Invoice> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export {};
