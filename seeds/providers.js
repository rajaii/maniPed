
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('providers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('providers').insert([
        {id: 1, 'first_name': 'sam', 'last_name': 'bullwise', 'username': 'bullz420','email': '1111111@gmail.com', 'password': 'password', 'zipcode': '11111'},
        {id: 2, 'first_name': 'sal', 'last_name': 'strothers', 'username': 'stothman','email': 'lllllhhhh@gmail.com', 'password': 'password', 'zipcode': '11111'},
        {id: 3, 'first_name': 'hen', 'last_name': 'thehammer', 'username': 'hennynhe','email': 'pppppppp@gmail.com', 'password': 'password', 'zipcode': '11111'},
        {id: 4, 'first_name': 'jake', 'last_name': 'mackler', 'username': 'jakethesnaeke','email': '88888888@gmail.com', 'password': 'password', 'zipcode': '11111'},
        {id: 5, 'first_name': 'robert', 'last_name': 'struthers', 'username': 'robby','email': '---------@gmail.com', 'password': 'password', 'zipcode': '11111'},
      ]);
    });
};

    