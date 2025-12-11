import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: '*', //['https://miora.karaflow.com', 'http://localhost:5173'] for production,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};
