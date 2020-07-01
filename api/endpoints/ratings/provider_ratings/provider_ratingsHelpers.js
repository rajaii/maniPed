const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  findByProviderId,
  findByServiceId,
  update,
  remove
};

function find() {
  return db('provider_ratings').select('id', 'rating', 'provider_id', 'user_id', 'service_id');
}

function findBy(filter) {
  return db('provider_ratings').where(filter);
}

function add(rating) {
  
 return db('provider_ratings').insert(rating, ['id', 'rating', 'provider_id', 'user_id', 'service_id'])
   
}

function update(id, info) {
  return db('provider_ratings').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('provider_ratings')
    .where({id})
    .first();
}

function findByUserId(id) {
  return db('provider_ratings')
    .where({user_id: id })
}

function findByProviderId(id) {
  return db('provider_ratings')
    .where({provider_id: id })
}

function findByServiceId(id) {
    return db('provider_ratings')
      .where({service_id: id })
  }

function remove(id) {
  return db('provider_ratings')
  .where({id})
  .del();
}