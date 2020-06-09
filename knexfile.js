// Update with your config settings.
require('dotenv').config();
module.exports = {

  development: {
    client: "pg", // pg is the database library for postgreSQL on knexjs
    connection: {
      host: "127.0.0.1", // Your local host IP
      user: "rosin", // Your postgres user name
      password: process.env.PGPASSWORD, // Your postgres user password
      database: "maniped", // Your database name
      // port: 5432???
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};

