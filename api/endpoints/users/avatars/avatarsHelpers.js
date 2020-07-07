const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  update,
  remove
};

function find() {
  return db('user_ratings').select('id', 'rating', 'user_id', 'provider_id');
}

function findBy(filter) {
  return db('user_ratings').where(filter);
}

function add(rating) {
  
 return db('user_ratings').insert(rating, ['id', 'rating', 'user_id', 'provider_id'])
   
}

function update(id, info) {
  return db('user_ratings').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('user_ratings')
    .where({id})
    .first();
}

function findByUserId(id) {
  return db('user_ratings')
    .where({user_id: id })
}


function remove(id) {
  return db('user_ratings')
  .where({id})
  .del();
}