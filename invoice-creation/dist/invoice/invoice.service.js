"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const invoice_schema_1 = require("./Model/invoice.schema");
const schedule_1 = require("@nestjs/schedule");
const luxon_1 = require("luxon");
const microservices_1 = require("@nestjs/microservices");
let InvoiceService = class InvoiceService {
    constructor(invoiceModel, rabbitmqClient) {
        this.invoiceModel = invoiceModel;
        this.rabbitmqClient = rabbitmqClient;
    }
    async createInvoice(invoiceDto) {
        const invoice = await this.invoiceModel.create(invoiceDto);
        return invoice;
    }
    async getAllInvoices() {
        const invoiceList = await this.invoiceModel.find();
        return invoiceList;
    }
    async getInvoiceById(id) {
        const invoice = await this.invoiceModel.findById(id);
        return invoice;
    }
    async cronJobForSalesReport() {
        console.log('Daily Sales Report: ');
        const startOfDay = luxon_1.DateTime.utc().startOf('day').toJSDate();
        const endOfDay = luxon_1.DateTime.utc().endOf('day').toJSDate();
        const invoices = await this.invoiceModel
            .find({
            date: { $gte: startOfDay, $lt: endOfDay },
        })
            .exec();
        const total_sales = invoices.reduce((acc, invoice) => invoice.amount + acc, 0);
        const item_summary = invoices
            .flatMap((invoice) => invoice.item)
            .reduce((summary, item) => {
            if (!summary[item.sku]) {
                summary[item.sku] = item.qt;
            }
            else {
                summary[item.sku] += item.qt;
            }
            return summary;
        }, {});
        this.rabbitmqClient.emit('Summary Pushed: ', { total_sales, item_summary });
        console.log(total_sales, item_summary);
    }
};
exports.InvoiceService = InvoiceService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoiceService.prototype, "cronJobForSalesReport", null);
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __param(1, (0, common_1.Inject)('Invoice_Summary')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        microservices_1.ClientProxy])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map