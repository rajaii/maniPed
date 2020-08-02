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

function add(service) {
  
 return db('addresses').insert(service, ['id', 'address', 'user_id'])
   
}

function update(id, info) {
  return db('addresses').where('user_id', Number(id))
  .update(info, ['id', 'address', 'user_id']);
}

function findById(id) {
  return db('addresses')
    .where({id})
    .first();
}

// function findById(id) {
//   return db('addresses')
//     .where({id})
// }


function remove(id) {
  return db('addresses')
  .where({id})
  .del();
}