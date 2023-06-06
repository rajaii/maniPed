const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByProviderId,
  update,
  remove
};

function find() {
  return db('provider_showcase').select('id', 'avatar', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5', 'image_6', 'image_7', 'image_8', 'provider_id');
}

function findBy(filter) {
  return db('provider_showcase').where(filter);
}

function add(rating) {
  
 return db('provider_showcase').insert(rating, ['id', 'avatar', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5', 'image_6', 'image_7', 'image_8', 'provider_id'])
   
}

function update(id, info) {
  return db('provider_showcase').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('provider_showcase')
    .where({id})
    .first();
}


function findByProviderId(id) {
  return db('provider_showcase')
    .where({provider_id: id })
}


function remove(id) {
  return db('provider_showcase')
  .where({id})
  .del();
}