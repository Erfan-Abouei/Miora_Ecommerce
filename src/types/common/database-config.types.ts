export interface DatabaseConfig {
  development: DatabaseConfigItem;
  production: DatabaseConfigItem;
  test: DatabaseConfigItem;
}

export interface DatabaseConfigItem {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: string;
}

