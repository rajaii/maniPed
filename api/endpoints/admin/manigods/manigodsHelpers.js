const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('manigods').select('id', 'first_name', 'last_name', 'role', 'username', 'email', 'zipcode');
}

function findBy(filter) {
  return db('manigods').where(filter);
}

function add(manigod) {
  
  return db('manigods').insert(manigod, ['id', 'first_name', 'last_name', 'username', 'role', 'email', 'zipcode'])
    
 }

function update(id, info) {
  return db('manigods').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('manigods')
    .where({ id })
    .select('id', 'first_name', 'last_name', 'role', 'username', 'email', 'zipcode')
    .first();
}