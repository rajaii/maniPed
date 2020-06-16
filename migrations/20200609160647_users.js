
exports.up = function(knex) {
  //'users' will contain customer users information for their account and ratings
  return knex.schema.createTable('users', tbl => {
    //!!!!!!!!!!!!!!!!!!!still have to figure out how to add images for the provider  ratings
    //possibly add credit card later but for pci compliance will need to be encrypted behind a firewall if we implement this ourselves
      tbl.increments('id');
      tbl.string('first_name')
        .notNullable();
      tbl.string('last_name')
        .notNullable();
      tbl.string('username')
        .notNullable()
        .unique();
      //validate from FE via yup to make sure is email
      tbl.string('email')
        .notNullable()
        .unique();
      //validate from FE make so enter at least 1 upper 1 lower and special chars and min length of 10
      tbl.string('password')
        .notNullable();
      //validate from FE make in a way that they can either enter format 00000-0000 or 00000
      tbl.string('zipcode', [10])
        .notNullable()
      tbl.timestamp('created_at').defaultTo(knex.fn.now());   
  })
  //information on cosmetic provider users for their profiles and accounts
  .createTable('providers', tbl => {
     //!!!!!!!!!!!!!!!!!!!still have to figure out how to add images for the provider ratings
      tbl.increments('id');
      tbl.string('first_name')
        .notNullable();
      tbl.string('last_name')
        .notNullable();
      tbl.string('username')
        .notNullable()
        .unique();
      //validate from FE via yup to make sure is email
      tbl.string('email')
        .notNullable()
        .unique();
      //validate from FE make so enter at least 1 upper 1 lower and special chars and min length of 10
      tbl.string('password')
        .notNullable();
      //validate from FE make in a way that they can either enter format 00000-0000 or 00000
      tbl.string('zipcode', [10])
        .notNullable();
      tbl.string('header');
      //set from preselected list and enter from input type radio on FE and add to db string from there
      tbl.string('availability')
        .notNullable();
      //entered from radio select inputs, 1 for service, 1 for pricing of that service through frontend and posted as a string separated by |
      //so can separate the service from the price if needbe for gets
      tbl.string('services_and_pricing_1');
      tbl.string('services_and_pricing_2');
      tbl.string('services_and_pricing_3');
      tbl.string('services_and_pricing_4');
      tbl.string('services_and_pricing_5');
      tbl.timestamp('created_at').defaultTo(knex.fn.now());   
      
  })
  //ratings will be many to many each custy will have rating from provider vice versa so own table for this but 2 ways rating user ratings ie ratings the users were 
  //given by customers in this table and vice versa in next table

  .createTable('user_ratings', tbl => {
    tbl.increments('id');
    tbl.decimal('rating', [3], [2]);
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.integer('provider_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('providers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
})


.createTable('pre_admin', tbl => {
  tbl.increments('id');
  tbl.string('first_name')
    .notNullable();
  tbl.string('last_name')
    .notNullable();
  tbl.string('role')
    .notNullable();
})
.createTable('admin', tbl => {
  tbl.increments('id');
  tbl.string('first_name')
    .notNullable();
  tbl.string('last_name')
    .notNullable();
  //V will be programmatically added to the profile via the pre-admin table after the check to see if they are there ie req.body.role = 'CEO';
  tbl.string('role')
    .notNullable();
  //validate from FE via yup to make sure is email
  tbl.string('email')
    .notNullable()
    .unique();
  //validate from FE make so enter at least 1 upper 1 lower and special chars and min length of 10
  tbl.string('password')
    .notNullable();
  //validate from FE make in a way that they can either enter format 00000-0000 or 00000
  tbl.string('zipcode', [10])
    .notNullable();
})
.createTable('manigods', tbl => {
  //for upper management, maniGods can add to pre-admin so employees can register on the admin application.  This will be pre populated via 
  //seeds on setup, and only manigods can add to this or admin. A separate FE app (login, then register for manigods or pre-admin posts or access 
  //with privs to other stuff) for just reg will be created for this reg (because role is 
  //entered manually) only accessible to manigods to personally add others to the team when hired, they will just enter a default pw for the
  //new team member then the teammember can change it, unelss in person they can setup together.  
  tbl.increments('id');
  tbl.string('first_name')
    .notNullable();
  tbl.string('last_name')
    .notNullable();
  //V will be programmatically added to the profile via the p;
  tbl.string('role')
    .notNullable();
  //validate from FE via yup to make sure is email
  tbl.string('email')
    .notNullable()
    .unique();
  //validate from FE make so enter at least 1 upper 1 lower and special chars and min length of 10
  tbl.string('password')
    .notNullable();
  //validate from FE make in a way that they can either enter format 00000-0000 or 00000
  tbl.string('zipcode', [10])
    .notNullable();
})
};


exports.down = function(knex) {
  return knex.schema.dropTableIfExists('manigods')
  .dropTableIfExists('admin')
  .dropTableIfExists('pre_admin')
  .dropTableIfExists('provider_ratings')
  .dropTableIfExists('user_ratings')
  .dropTableIfExists('providers')
  .dropTableIfExists('users')
  //if won't drop
  // knex.raw('DROP TABLE manigods')
  // .raw('DROP TABLE admin')
  // .raw('DROP TABLE pre-admin')
  // .raw('DROP TABLE provider_ratings')
  // .raw('DROP TABLE user_ratings ')
  // .raw('DROP TABLE providers CASCADE')
  // .raw('DROP TABLE users CASCADE')
};


