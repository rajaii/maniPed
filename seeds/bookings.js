
exports.seed = function(knex) {
  
  return knex('future_bookings').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('future_bookings').insert([
        {id: 1, 'booking_date': '2021-12-30','booking_time': '09:10:00', 'services_and_pricing': 'massage, 100.00', 'provider_id': 1, 'user_id': 1, 'confirmed': 1, 'completed': 0},
        {id: 2, 'booking_date': '2021-12-25','booking_time': '12:10:00', 'services_and_pricing': 'massage, 100.00', 'provider_id': 1, 'user_id': 1, 'confirmed': 1, 'completed': 0},
        {id: 3, 'booking_date': '2021-12-12','booking_time': '12:10:00', 'services_and_pricing': 'massage, 100.00', 'provider_id': 2, 'user_id': 2, 'confirmed': 1, 'completed': 0},
        {id: 4, 'booking_date': '2021-12-02','booking_time': '10:10:00', 'services_and_pricing': 'massage, 100.00', 'provider_id': 2, 'user_id': 2, 'confirmed': 1, 'completed': 0},
        {id: 5, 'booking_date': '2021-11-30','booking_time': '01:30:00', 'services_and_pricing': 'nails, 45.00', 'provider_id': 3, 'user_id': 3, 'confirmed': 1, 'completed': 0},
        {id: 6, 'booking_date': '2021-11-03','booking_time': '04:30:00', 'services_and_pricing': 'nails, 45.00', 'provider_id': 3, 'user_id': 4, 'confirmed': 1, 'completed': 1},
        {id: 7, 'booking_date': '2021-11-04','booking_time': '05:00:00', 'services_and_pricing': 'nails, 45.00', 'provider_id': 4, 'user_id': 5, 'confirmed': 1, 'completed': 1},
        {id: 8, 'booking_date': '2021-10-30','booking_time': '09:30:00', 'services_and_pricing': 'nails, 45.00', 'provider_id': 5, 'user_id': 4, 'confirmed': 1, 'completed': 1},
        {id: 9, 'booking_date': '2021-11-30','booking_time': '08:10:00', 'services_and_pricing': 'nails, 45.00', 'provider_id': 5, 'user_id': 5, 'confirmed': 1, 'completed': 1},
        {id: 10, 'booking_date': '2021-09-30','booking_time': '01:10:00', 'services_and_pricing': 'nails, 45.00', 'provider_id': 5, 'user_id': 5, 'confirmed': 1, 'completed': 1},
        {id: 11, 'booking_date': '2021-09-28','booking_time': '09:10:00', 'services_and_pricing': 'nails, 45.00', 'provider_id': 4, 'user_id': 4, 'confirmed': 1, 'completed': 1},
        {id: 12, 'booking_date': '2021-09-02','booking_time': '08:00:00', 'services_and_pricing': 'hair, 90', 'provider_id': 3, 'user_id': 3, 'confirmed': 0, 'completed': 0},
        {id: 13, 'booking_date': '2021-09-01','booking_time': '07:00:00', 'services_and_pricing': 'hair, 90', 'provider_id': 2, 'user_id': 2, 'confirmed': 0, 'completed': 0},
        {id: 14, 'booking_date': '2021-09-17','booking_time': '05:10:00', 'services_and_pricing': 'hair, 90', 'provider_id': 2, 'user_id': 2, 'confirmed': 0, 'completed': 0},
        {id: 15, 'booking_date': '2021-09-12','booking_time': '20:00:00', 'services_and_pricing': 'hair, 90', 'provider_id': 1, 'user_id': 1, 'confirmed': 0, 'completed': 0},
        {id: 16, 'booking_date': '2021-09-30','booking_time': '16:00:00', 'services_and_pricing': 'hair, 90', 'provider_id': 1, 'user_id': 1, 'confirmed': 0, 'completed': 0}
      ]);
    });


    
};


