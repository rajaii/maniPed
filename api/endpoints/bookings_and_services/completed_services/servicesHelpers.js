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
  return db('completed_services').select('id', 'type_of_service', 'amount_billed', 'booking_id', 'provider_name', 'provider_id', 'user_name', 'user_id', 'user_rating_id', 'provider_rating_id', 'created_at');
}

function findBy(filter) {
  return db('completed_services').where(filter);
}

function add(service) {
  
 return db('completed_services').insert(service, ['id', 'type_of_service','amount_billed', 'booking_id', 'provider_name', 'provider_id', 'user_name', 'user_id', 'user_rating_id', 'provider_rating_id', 'created_at'])
   
}

function update(id, info) {
  return db('completed_services').where('id', Number(id))
  .update(info, ['id', 'type_of_service','amount_billed', 'booking_id', 'provider_name', 'provider_id', 'user_name', 'user_id', 'user_rating_id', 'provider_rating_id', 'created_at']);
}

function findById(id) {
  return db('completed_services')
    .where({id})
    .first();
}

function findByUserId(id) {
  return db('completed_services')
    .where({user_id: id })
}

function findByProviderId(id) {
  return db('completed_services')
    .where({provider_id: id })
}

function remove(id) {
  return db('completed_services')
  .where({id})
  .del();
}