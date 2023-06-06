
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pre_admin').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('pre_admin').insert([
        {id: 1, 'first_name': 'ali1', 'last_name': 'rajaii', 'role': 'CLERK'},
        {id: 2, 'first_name': 'ali2', 'last_name': 'rajaii', 'role': 'CLERK'},
        {id: 3, 'first_name': 'ali3', 'last_name': 'rajaii', 'role': 'CLERK'},
        {id: 4, 'first_name': 'ali4', 'last_name': 'rajaii', 'role': 'CLERK'},
        {id: 5, 'first_name': 'ali5', 'last_name': 'rajaii', 'role': 'CLERK'},
        {id: 6, 'first_name': 'joseph1', 'last_name': 'kalish', 'role': 'CLERK'},
        {id: 7, 'first_name': 'joseph2', 'last_name': 'kalish', 'role': 'CLERK'},
        {id: 8, 'first_name': 'joseph3', 'last_name': 'kalish', 'role': 'CLERK'},
        {id: 9, 'first_name': 'joseph4', 'last_name': 'kalish', 'role': 'CLERK'},
        {id: 10, 'first_name': 'joseph5', 'last_name': 'kalish', 'role': 'CLERK'},
      ]);
    });
};
