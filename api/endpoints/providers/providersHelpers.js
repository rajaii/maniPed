const db = require('../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('providers').select('id', 'username', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'zipcode', 'header', 'availability', 'services_and_pricing_1', 'services_and_pricing_2', 'services_and_pricing_3', 'services_and_pricing_4', 'services_and_pricing_5');
}

function findBy(filter) {
  return db('providers').where(filter);
}

function add(provider) {
  
  return db('providers').insert(provider, ['id', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'zipcode'])
    
 }

function update(id, info) {
  return db('providers').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('providers')
    .where({ id })
    .select('id', 'username', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'zipcode', 'header', 'availability', 'services_and_pricing_1', 'services_and_pricing_2', 'services_and_pricing_3', 'services_and_pricing_4', 'services_and_pricing_5', 'activated')
    .first();
}