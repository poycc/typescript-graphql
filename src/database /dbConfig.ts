const dbConfig = {
  dev: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'news2019',
    database: 'cat_living',
    entities: ['src/models/*.ts'],
    logging: ['query', 'error'],
    synchronize: true,
  },
  production: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'news2019',
    database: 'cat_living',
    entities: ['src/models/*.ts'],
    logging: ['query', 'error'],
    synchronize: true,
  },
};

export default dbConfig;
