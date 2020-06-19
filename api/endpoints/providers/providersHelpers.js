const db = require('../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('providers').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('providers').where(filter);
}

function add(provider) {
  
  return db('providers').insert(provider, ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'zipcode'])
    
 }

function update(id, info) {
  return db('providers').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('providers')
    .where({ id })
    .first();
}