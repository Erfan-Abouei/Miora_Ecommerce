import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: ['https://miora.karaflow.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
