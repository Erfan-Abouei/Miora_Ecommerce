interface DatabaseConfig {
  development: DatabaseConfigItem;
  production: DatabaseConfigItem;
  test: DatabaseConfigItem;
}

interface DatabaseConfigItem {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: string;
}

export { DatabaseConfig, DatabaseConfigItem };
