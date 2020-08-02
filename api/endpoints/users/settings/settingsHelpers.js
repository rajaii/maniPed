const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findByUserId,
  update,
  remove
};

function find() {
  return db('user_settings').select('id', 'privacy', 'sms', 'user_id');
}

function findBy(filter) {
  return db('user_settings').where(filter);
}

function add(service) {
  
 return db('user_settings').insert(service, ['id', 'privacy', 'sms', 'user_id'])
   
}

function update(user_id, info) {
  return db('user_settings').where('user_id', Number(user_id))
  .update(info, ['id', 'privacy', 'sms', 'user_id']);
}

function findByUserId(user_id) {
  return db('user_settings')
    .where({user_id})
    .first();
}

// function findByUserId(user_id) {
//   return db('user_settings')
//     .where({user_id})
// }


function remove(user_id) {
  return db('user_settings')
  .where({user_id})
  .del();
}