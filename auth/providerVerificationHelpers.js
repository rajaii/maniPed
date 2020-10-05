const db = require('../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('provider_verification').select('id','hash','provider_id');
}

function findBy(filter) {
  return db('provider_verification').where(filter);
}

function add(user) {
  
 return db('provider_verification').insert(user, ['id','hash','provider_id'])
   
}

function update(id, info) {
  return db('provider_verification').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('provider_verification')
    .where({ id })
    .select('id','hash','provider_id')
    .first();
}