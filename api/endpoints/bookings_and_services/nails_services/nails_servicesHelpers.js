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
  return db('nails_services').select('id', 'service', 'price', 'provider_id');
}

function findBy(filter) {
  return db('nails_services').where(filter);
}

function add(service) { 
 return db('nails_services').insert(service, ['id', 'service', 'price', 'provider_id']); 
}

function update(id, info) {
  return db('nails_services').where('id', Number(id))
  .update(info, ['id', 'service', 'price', 'provider_id']);
}


function findById(id) {
  return db('nails_services')
    .where({id})
}


function remove(id) {
  return db('nails_services')
  .where({id})
  .del();
}