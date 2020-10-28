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
  return db('massage_services').select('id', 'service', 'provider_id');
}

function findBy(filter) {
  return db('massage_services').where(filter);
}

function add(service) {
  
 return db('massage_services').insert(service, ['id', 'service', 'provider_id'])
   
}

function update(id, info) {
  return db('massage_services').where('id', Number(id))
  .update(info, ['id', 'service', 'provider_id']);
}


function findById(id) {
  return db('massage_services')
    .where({id})
}


function remove(id) {
  return db('massage_services')
  .where({id})
  .del();
}