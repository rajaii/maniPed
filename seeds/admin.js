
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admin').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {id: 1, 'first_name': 'Ali', 'last_name': 'Rajaii', 'role': 'CEO', 'username': 'ali','email': '1111111@gmail.com', 'password': 'password', 'zipcode': '11111'},
        {id: 2, 'first_name': 'Joseph', 'last_name': 'Kalish', 'role': 'CEO', 'username': 'joey','email': '2@gmail.com', 'password': 'password', 'zipcode': '22222'},
        {id: 3, 'first_name': 'Dina', 'last_name': 'Kalish', 'role': 'CFO', 'username': 'deens','email': '3@gmail.com', 'password': 'password', 'zipcode': '22222'}
      ]);
    });
};
