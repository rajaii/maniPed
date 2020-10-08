const db = require('../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('users').select('id', 'first_name', 'last_name', 'username', 'email', 'address', 'zipcode', 'phone_number', 'profile_img_url', 'stripe_custyid', 'activated');
}

function findBy(filter) {
  return db('users').where(filter).select('id', 'first_name', 'last_name', 'username', 'email', 'address', 'zipcode', 'phone_number', 'profile_img_url', 'stripe_custyid', 'activated');
}

function add(user) {
  
 return db('users').insert(user, ['id', 'first_name', 'last_name', 'username', 'email', 'address', 'zipcode', 'phone_number'])
   
}

function update(id, info) {
  return db('users').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('users')
    .where({ id })
    .select('id', 'first_name', 'last_name', 'username', 'email', 'address', 'zipcode', 'phone_number', 'profile_img_url','stripe_custyid', 'activated')
    .first();
}