const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  update,
  remove
};

function find() {
  return db('user_avatars').select('id', 'avatar', 'user_id');
}

function findBy(filter) {
  return db('user_avatars').where(filter);
}

function add(rating) {
  
 return db('user_avatars').insert(rating, ['id', 'avatar', 'user_id'])
   
}

function update(id, info) {
  return db('user_avatars').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('user_avatars')
    .where({id})
    .first();
}

function findByUserId(id) {
  return db('user_avatars')
    .where({user_id: id })
}


function remove(id) {
  return db('user_avatars')
  .where({id})
  .del();
}