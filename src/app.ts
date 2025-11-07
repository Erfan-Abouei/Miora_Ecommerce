import cors from 'cors';
import morgan from 'morgan';
import express, { Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const data = [
  {
    id: 123,
    product_name: 'محصول تستلی',
    product_description: '',
    product_images: ['/image.png', '/image.png', '/image.png'],
    category: {},
    product_price: 2345235,
    has_product_offer: false,
    product_offer: 0,
  },
  {
    id: 123,
    product_name: 'محصول تستلی',
    product_description: '',
    product_images: [],
    category: {},
    product_price: 2345235,
    has_product_offer: false,
    product_offer: 0,
  },
  {
    id: 123,
    product_name: 'محصول تستلی',
    product_description: '',
    product_images: [],
    category: {},
    product_price: 2345235,
    has_product_offer: false,
    product_offer: 0,
  },
];
app.get('/api/v1/', (req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
    success: true,
    data: null,
    message: "عملیات با موفقیت انجام شد."
  })
});

export default app;
