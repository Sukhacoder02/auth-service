module.exports = {
  development: {
    username: 'postgres',
    password: 'example',
    database: 'postgres',
    host: 'dbauth',
    dialect: 'postgres'
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