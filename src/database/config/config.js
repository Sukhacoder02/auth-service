module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  },
  test: {
    username: 'postgres',
    password: 'example',
    database: 'postgres',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: 'example',
    database: 'postgres',
    host: 'dbauth',
    dialect: 'postgres'
  }
};