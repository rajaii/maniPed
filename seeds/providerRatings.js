
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('provider_ratings').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('provider_ratings').insert([
        {id: 1, 'rating': 5, 'user_id': 4, 'provider_id': 3},
        {id: 2, 'rating': 5, 'user_id': 5, 'provider_id': 4},
        {id: 3, 'rating': 5, 'user_id': 4, 'provider_id': 5},
        {id: 4, 'rating': 5, 'user_id': 5, 'provider_id': 5},
        {id: 5, 'rating': 3, 'user_id': 5, 'provider_id': 5},
        {id: 6, 'rating': 1, 'user_id': 4, 'provider_id': 4}
      ]);
    });
};
