const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('manigods').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('manigods').where(filter);
}

function add(manigod) {
  
  return db('manigods').insert(manigod, ['id', 'first_name', 'last_name', 'username', 'role', 'email', 'password', 'zipcode'])
    
 }

function update(id, info) {
  return db('manigods').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('manigods')
    .where({ id })
    .first();
}