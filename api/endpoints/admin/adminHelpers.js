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


function add(admin) {
  
  return db('admin').insert(admin, ['id', 'first_name', 'last_name', 'username', 'role', 'email', 'password', 'zipcode'])
    
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