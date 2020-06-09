
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
      users.increments();
      users.string('firstName')
        .notNullable();
      users.string('lastName')
        .notNullable();
      users.string('username')
        .notNullable()
        .unique();
      users.string('email')
        .notNullable()
        .unique();
      users.string('password')
        .notNullable()
      users.timestamp('created_at').defaultTo(knex.fn.now());
      
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};


