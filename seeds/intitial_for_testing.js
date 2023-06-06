
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, 'first_name': 'Ali', 'last_name': 'Rajamhal', 'username': 'adady','email': 'assfsdf@yahoo.com', 'password': 'password', 'zipcode': '01126', 'activated': 1},
        {id: 2, 'first_name': 'Joe', 'last_name': 'Kahid', 'username': 'yousefo','email': 'bbbbb@yahoo.com', 'password': 'password', 'zipcode': '22222', 'activated': 1},
        {id: 3, 'first_name': 'Sam', 'last_name': 'Stevens', 'username': 'sammybull','email': 'wwwwww@yahoo.com', 'password': 'password', 'zipcode': '11111', 'activated': 1},
        {id: 4, 'first_name': 'Blow', 'last_name': 'marija', 'username': 'drug','email': 'aaaaaa@yahoo.com', 'password': 'password', 'zipcode': '11111', 'activated': 1},
        {id: 5, 'first_name': 'Steven', 'last_name': 'segal', 'username': 'saint','email': 'nnnnn@yahoo.com', 'password': 'password', 'zipcode': '11111', 'activated': 1}
      ]);
    });
};

      
