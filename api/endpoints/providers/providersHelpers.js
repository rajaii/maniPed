const db = require('../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('providers').select('id', 'username', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'address', 'zipcode', 'profile_img_url', 'header', 'work_image_url_1','work_image_url_2','work_image_url_3','work_image_url_4','work_image_url_5','work_image_url_6','work_image_url_7','work_image_url_8', 'activated');
}

function findBy(filter) {
  return db('providers').where(filter).select('id', 'username', 'first_name', 'last_name', 'username','password', 'email', 'phone_number', 'address', 'zipcode', 'profile_img_url', 'header', 'work_image_url_1','work_image_url_2','work_image_url_3','work_image_url_4','work_image_url_5','work_image_url_6','work_image_url_7','work_image_url_8', 'activated');
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
    .select('id', 'username', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'zipcode', 'profile_img_url', 'header','work_image_url_1','work_image_url_2','work_image_url_3','work_image_url_4','work_image_url_5','work_image_url_6','work_image_url_7','work_image_url_8', 'activated')
    .first();
}