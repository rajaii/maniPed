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

async function add(provider) {
  
  db('providers').insert(provider)
  .then(ids => {
    return findById(ids[0])
  });
  
  
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