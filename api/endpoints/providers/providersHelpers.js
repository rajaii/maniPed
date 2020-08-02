const db = require('../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('providers').select('id', 'username', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'address', 'zipcode', 'header', 'availability', 'nails_services_and_pricing', 'hair_services_and_pricing', 'massage_services_and_pricing');
}

function findBy(filter) {
  return db('providers').where(filter);
}

function add(provider) {
  
  return db('providers').insert(provider, ['id', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'address', 'zipcode'])
    
 }

function update(id, info) {
  return db('providers').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('providers')
    .where({ id })
    .select('id', 'username', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'zipcode', 'header', 'availability',  'nails_services_and_pricing', 'hair_services_and_pricing', 'massage_services_and_pricing', 'activated')
    .first();
}