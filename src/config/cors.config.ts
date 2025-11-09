import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: ['miora.karaflow.com', 'localhost:3000', 'localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

export { corsOptions };
