import app from '@/app';
import { ENV } from '@/config';
import { startDatabaseConnection } from './database/connection/database-connection.config';

const PORT = ENV.PORT || process.env.PORT || 3000;
await startDatabaseConnection();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
