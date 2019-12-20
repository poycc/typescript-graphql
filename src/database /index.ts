import { createConnection } from 'typeorm';
import dbConfig from './dbConfig';

const { NODE_ENV } = process.env;

const conf: any = NODE_ENV ? dbConfig[NODE_ENV] : null;

const postgresDB = () => {
  return createConnection({ ...conf })
    .then(() => {
      console.warn('Database connection established');
    })
    .catch((error) => console.error(error));
};

export default postgresDB;
