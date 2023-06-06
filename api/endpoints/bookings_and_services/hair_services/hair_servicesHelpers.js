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
  return db('hair_services').select('id', 'service', 'price', 'provider_id');
}

function findBy(filter) {
  return db('hair_services').where(filter);
}

function add(service) {
  
 return db('hair_services').insert(service, ['id', 'service', 'price', 'provider_id'])
   
}

function update(id, info) {
  return db('hair_services').where('id', Number(id))
  .update(info, ['id', 'service', 'price', 'provider_id']);
}


function findById(id) {
  return db('hair_services')
    .where({id})
}


function remove(id) {
  return db('hair_services')
  .where({id})
  .del();
}