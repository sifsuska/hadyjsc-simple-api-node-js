// if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
// }
module.exports = {
  "development": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PASSWORD,
    "database": `${process.env.DATABASE}`,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT || 5432,
    "dialect": "postgres",
    "dialectOptions": process.env.PG_SSL_ENABLED && {
      ssl: {
        "require": true
      }
    }
  },
  "test": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PASSWORD,
    "database": `${process.env.DATABASE}`,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT || 5432,
    "dialect": "postgres",
    "dialectOptions": process.env.PG_SSL_ENABLED && {
      ssl: {
        "require": true
      }
    }
  },
  "production": {
    "username": process.env.PROD_PG_USERNAME,
    "password": process.env.PROD_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.PROD_PG_HOST,
    "port": process.env.PROD_PG_PORT || 5432,
    "dialect": "postgres",
    "dialectOptions": process.env.PROD_PG_SSL_ENABLED && {
      ssl: {
        "require": true
      }
    }
  }
}

