import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from './Model/invoice.schema';
import { ClientProxy } from '@nestjs/microservices';
import { DateTime } from 'luxon';
import { create } from 'domain';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let model: Model<InvoiceDocument>;
  let clientProxy: ClientProxy;

  const mockModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  const mockClientProxy = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: getModelToken(Invoice.name),
          useValue: mockModel,
        },
        {
          provide: 'Invoice_Summary',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    model = module.get<Model<InvoiceDocument>>(getModelToken(Invoice.name));
    clientProxy = module.get<ClientProxy>('Invoice_Summary');
  });

  describe('createInvoice', () => {
    it('should create and save a new invoice', async () => {
      const invoiceDto = {
        customer: 'John Doe',
        amount: 150,
        reference: 'INV-12345',
        date: new Date(),
        item: [{ sku: 'ABC123', qt: 10 }],
      };

      mockModel.create.mockResolvedValue(invoiceDto);

      const result = await service.createInvoice(invoiceDto);
      const { id, ...resultWithoutId } = result;

      expect(resultWithoutId).toEqual(invoiceDto);
    });
  });

  describe('getAllInvoices', () => {
    it('should return a list of invoices', async () => {
      const mockInvoices = [
        {
          customer: 'John Doe',
          amount: 150,
          reference: 'INV-12345',
          date: new Date(),
          item: [{ sku: 'ABC123', qt: 10 }],
        },
      ];
      mockModel.find.mockResolvedValue(mockInvoices);
      mockModel.exec.mockResolvedValue(mockInvoices);

      const result = await service.getAllInvoices();

      expect(result).toEqual(mockInvoices);
      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  describe('getInvoiceById', () => {
    it('should return an invoice by id', async () => {
      const mockInvoice = {
        customer: 'John Doe',
        amount: 150,
        reference: 'INV-12345',
        date: new Date(),
        item: [{ sku: 'ABC123', qt: 10 }],
      };
      mockModel.findById.mockResolvedValue(mockInvoice);

      const result = await service.getInvoiceById('someId');

      expect(result).toEqual(mockInvoice);
      expect(mockModel.findById).toHaveBeenCalledWith('someId');
    });
  });
});
