import dotenv from 'dotenv';
import app from '@/app.js';
import { ENV } from '@/config/index.js';

dotenv.config();

const PORT = ENV.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
