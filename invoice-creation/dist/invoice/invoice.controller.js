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
exports.InvoiceController = void 0;
const common_1 = require("@nestjs/common");
const invoice_service_1 = require("./invoice.service");
const invoice_schema_1 = require("./Model/invoice.schema");
let InvoiceController = class InvoiceController {
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    async createInvoice(invoiceData, response) {
        try {
            const invoice = await this.invoiceService.createInvoice(invoiceData);
            return response.status(common_1.HttpStatus.CREATED).json({
                status: 'success',
                message: 'Invoice created successfully',
                data: invoice,
            });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: 'Failed',
                message: 'Check data format',
                error: error.message,
            });
        }
    }
    async getAllInvoices(response) {
        const invoiceList = await this.invoiceService.getAllInvoices();
        return response.status(common_1.HttpStatus.OK).json({
            status: 'Success',
            message: 'Fetched inoice list successfully',
            data: invoiceList,
        });
    }
    async getInvoiceById(id) {
        const invoice = await this.invoiceService.getInvoiceById(id);
        return invoice;
    }
};
exports.InvoiceController = InvoiceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invoice_schema_1.Invoice, Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "getAllInvoices", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "getInvoiceById", null);
exports.InvoiceController = InvoiceController = __decorate([
    (0, common_1.Controller)('/invoice'),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService])
], InvoiceController);
//# sourceMappingURL=invoice.controller.js.map