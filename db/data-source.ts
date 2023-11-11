import { DataSourceOptions, DataSource } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'db4free.net',
  port: 3306,
  username: 'tiennld',
  password: '12345678',
  database: 'bakery_tiennld',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};

export const dataSourceLocalOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 33061,
  username: 'root',
  password: 'root',
  database: 'bakery-mysql',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};

// const typeDB: string = 'local';
const typeDB: string = 'production';

export const dbOptions = () => {
  if (typeDB === 'local') {
    return dataSourceLocalOptions;
  }
  return dataSourceOptions;
};

const dataSource = new DataSource(dbOptions());

export default dataSource;
