import type { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: ['http://localhost:8000', 'https://miora.karaflow.com'], //['https://miora.karaflow.com', 'http://localhost:5173'] for production,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};
