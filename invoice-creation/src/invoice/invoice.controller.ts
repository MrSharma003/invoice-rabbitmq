import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './Model/invoice.schema';
import { Response } from 'express';

@Controller('/invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async createInvoice(@Body() invoiceData: Invoice, @Res() response: Response) {
    try {
      const invoice = await this.invoiceService.createInvoice(invoiceData);
      return response.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'Invoice created successfully',
        data: invoice,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'Failed',
        message: 'Check data format',
        error: error.message,
      });
    }
  }

  @Get()
  async getAllInvoices(@Res() response: Response) {
    const invoiceList = await this.invoiceService.getAllInvoices();
    return response.status(HttpStatus.OK).json({
      status: 'Success',
      message: 'Fetched inoice list successfully',
      data: invoiceList,
    });
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: string) {
    const invoice = await this.invoiceService.getInvoiceById(id);
    return invoice;
  }
}
