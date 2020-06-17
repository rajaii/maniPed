const db = require('../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('admin').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('admin').where(filter);
}

async function add(admin) {
  
  db('admin').insert(admin)
  .then(ids => {
    return findById(ids[0])
  });
  
  
}

function update(id, info) {
  return db('admin').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('admin')
    .where({ id })
    .first();
}