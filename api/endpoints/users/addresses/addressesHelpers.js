const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db('addresses').select('id', 'address', 'user_id');
}

function findBy(filter) {
  return db('addresses').where(filter);
}

function add(address) {
  
 return db('addresses').insert(address, ['id', 'address', 'user_id'])
   
}

function update(user_id, info) {
  return db('addresses').where('user_id', Number(user_id))
  .update(info, ['id', 'address', 'user_id']);
}



function findById(user_id) {
  return db('addresses')
    .where({user_id})
}


function remove(id) {
  return db('addresses')
  .where({id})
  .del();
}