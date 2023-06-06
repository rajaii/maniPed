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
  return db('available_services').select('id', 'type');
}

function findBy(filter) {
  return db('available_services').where(filter);
}

function add(service) {
  
 return db('available_services').insert(service, ['id', 'type'])
   
}

function update(id, info) {
  return db('available_services').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('available_services')
    .where({id})
    .first();
}

function findByUserId(id) {
  return db('available_services')
    .where({user_id: id })
}

function findByProviderId(id) {
  return db('available_services')
    .where({provider_id: id })
}

function remove(id) {
  return db('available_services')
  .where({id})
  .del();
}