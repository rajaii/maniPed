require('dotenv').config();
module.exports = {

  development: {
    client: "pg", // pg is the database library for postgreSQL on knexjs
    connection: {
      host: "127.0.0.1", // IP
      user: "rosin", // postgres user name
      password: process.env.PGPASSWORD, // postgres user password
      database: "maniped", // database name
      // port: 5432,
    },
    seeds: {
      directory: './seeds'
  },
},
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    }
  },
//for later use; configure in staging and production
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

