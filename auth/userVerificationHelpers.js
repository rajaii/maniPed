const db = require('../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('user_verification').select('id','hash','user_id');
}

function findBy(filter) {
  return db('user_verification').where(filter).select('id','hash','user_id');
}

function add(user) {
  
 return db('user_verification').insert(user, ['id','hash','user_id'])
   
}

function update(id, info) {
  return db('user_verification').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('user_verification')
    .where({ id })
    .select('id','hash','user_id')
    .first();
}