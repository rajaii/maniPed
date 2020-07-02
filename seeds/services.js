
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('completed_services').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('completed_services').insert([
        {id: 1, 'type_of_service': 'nails', 'amount_billed': '45', 'booking_id': 6, 'user_id': 4, 'provider_id': 3, 'user_rating_id': 1, 'provider_rating_id':  1},
        {id: 2, 'type_of_service': 'nails', 'amount_billed': '45', 'booking_id': 7, 'user_id': 5, 'provider_id': 4, 'user_rating_id': 2, 'provider_rating_id':  2},
        {id: 3, 'type_of_service': 'nails', 'amount_billed': '45', 'booking_id': 8, 'user_id': 4, 'provider_id': 5, 'user_rating_id': 3, 'provider_rating_id':  3},
        {id: 4, 'type_of_service': 'nails', 'amount_billed': '45', 'booking_id': 9, 'user_id': 5, 'provider_id': 5, 'user_rating_id': 4, 'provider_rating_id':  4},
        {id: 5, 'type_of_service': 'nails', 'amount_billed': '45', 'booking_id': 10, 'user_id': 5, 'provider_id': 5, 'user_rating_id': 5, 'provider_rating_id': 5},
        {id: 6, 'type_of_service': 'nails', 'amount_billed': '45', 'booking_id': 11, 'user_id': 4, 'provider_id': 4, 'user_rating_id': 6, 'provider_rating_id': 6}
      ]);
    });
};
  