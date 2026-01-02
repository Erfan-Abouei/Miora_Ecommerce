import app from '@/app';
import { ENV } from '@/config';
import { startDatabaseConnection } from './database/connection/database-connection.config';

const PORT = ENV.PORT || process.env.PORT;
await startDatabaseConnection();

app.listen(PORT);
