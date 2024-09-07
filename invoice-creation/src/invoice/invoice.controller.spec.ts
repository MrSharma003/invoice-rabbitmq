import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceModule } from './invoice.module';

describe('InvoiceController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://prashant:KzQttrqrnCAN1h10@invoice.ewrmw.mongodb.net/?retryWrites=true&w=majority&appName=Invoice',
        ),
        InvoiceModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/invoice (POST) should create a new invoice', async () => {
    const invoiceData = {
      customer: 'John Doe',
      amount: 500,
      reference: 'REF12345',
      date: new Date(),
      item: [
        {
          sku: 'ITEM123',
          qt: 2,
        },
      ],
    };

    return request(app.getHttpServer())
      .post('/invoice')
      .send(invoiceData)
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body.status).toBe('success');
        expect(res.body.message).toBe('Invoice created successfully');
      });
  });

  it('/invoice (GET) should return an array of invoices', async () => {
    return request(app.getHttpServer())
      .get('/invoice')
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.status).toBe('Success');
        expect(res.body.data).toBeInstanceOf(Array);
      });
  });

  it('/invoice/:id (GET) should return a single invoice by ID', async () => {
    // First, create an invoice to test the retrieval by ID
    const invoiceData = {
      customer: 'Jane Doe',
      amount: 1000,
      reference: 'REF67890',
      date: new Date(),
      item: [
        {
          sku: 'ITEM456',
          qt: 3,
        },
      ],
    };

    const createResponse = await request(app.getHttpServer())
      .post('/invoice')
      .send(invoiceData)
      .expect(HttpStatus.CREATED);

    const invoiceId = createResponse.body.data._id;

    // Then, retrieve the created invoice by ID
    return request(app.getHttpServer())
      .get(`/invoice/${invoiceId}`)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.customer).toBe(invoiceData.customer);
        expect(res.body.amount).toBe(invoiceData.amount);
        expect(res.body.reference).toBe(invoiceData.reference);
        expect(res.body.item).toBeInstanceOf(Array);
        expect(res.body.item[0].sku).toBe(invoiceData.item[0].sku);
      });
  });
});
