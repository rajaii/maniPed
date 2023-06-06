const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  findByProviderId,
  update,
  remove
};

function find() {
  return db('future_bookings').select('id', 'booking_date', 'booking_time', 'services_and_pricing', 'service_address', 'provider_name', 'provider_id', 'user_name', 'user_id', 'booked_at', 'confirmed', 'completed');
}

function findBy(filter) {
  return db('future_bookings').where(filter);
}

function add(booking) {
  
 return db('future_bookings').insert(booking, ['id', 'booking_date', 'booking_time', 'services_and_pricing', 'service_address', 'provider_name', 'provider_id', 'user_name', 'user_id', 'booked_at', 'confirmed', 'completed'])
   
}


function update(id, info) {
  return db('future_bookings').where('id', Number(id))
  .update(info, ['id', 'booking_date', 'booking_time', 'services_and_pricing', 'service_address', 'provider_name', 'provider_id', 'user_name', 'user_id', 'booked_at', 'confirmed', 'completed']);
}

function findById(id) {
  return db('future_bookings')
    .where({id})
    .first();
}

function findByUserId(id) {
  return db('future_bookings')
    .where({user_id: id })
}

function findByProviderId(id) {
  return db('future_bookings')
    .where({provider_id: id })
}

function remove(id) {
  return db('future_bookings')
  .where({id})
  .del();
}