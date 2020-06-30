const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  findByProviderId,
  update,
  remove
};

function find() {
  return db('competed_services').select('id', 'type_of_service', 'booking_id', 'provider_id', 'user_id', 'user_rating_id', 'provider_rating_id', 'created_at');
}

function findBy(filter) {
  return db('competed_services').where(filter);
}

function add(service) {
  
 return db('competed_services').insert(service, ['id', 'type_of_service', 'booking_id', 'provider_id', 'user_id', 'user_rating_id', 'provider_rating_id', 'created_at'])
   
}

function update(id, info) {
  return db('competed_services').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('competed_services')
    .where({id})
    .first();
}

function findByUserId(id) {
  return db('competed_services')
    .where({user_id: id })
}

function findByProviderId(id) {
  return db('competed_services')
    .where({provider_id: id })
}

function remove(id) {
  return db('competed_services')
  .where({id})
  .del();
}