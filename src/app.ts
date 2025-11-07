import cors from 'cors';
import morgan from 'morgan';
import express, { Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/v1/', (req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
    success: true,
    data: null,
    message: "عملیات با موفقیت انجام شد."
  })
});

export default app;
