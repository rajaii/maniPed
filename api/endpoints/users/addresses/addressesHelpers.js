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
  return db('addresses').select('id', 'address', 'user_id', 'future_bookings_id', 'completed_services_id');
}

function findBy(filter) {
  return db('addresses').where(filter);
}

function add(service) {
  
 return db('addresses').insert(service, ['id', 'privacy', 'sms', 'user_id'])
   
}

function update(user_id, info) {
  return db('addresses').where('user_id', Number(user_id))
  .update(info, ['id', 'privacy', 'sms', 'user_id']);
}

function findByUserId(user_id) {
  return db('addresses')
    .where({user_id})
    .first();
}

// function findByUserId(user_id) {
//   return db('addresses')
//     .where({user_id})
// }


function remove(user_id) {
  return db('addresses')
  .where({user_id})
  .del();
}