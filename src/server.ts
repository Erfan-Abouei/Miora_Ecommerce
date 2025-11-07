import { ENV } from '@/config/index.js';
import app from '@/app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = ENV.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
