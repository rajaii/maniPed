
exports.up = function(knex) {
  //'users' will contain customer users information for their account and ratings
  return knex.schema.createTable('users', users => {
    //!!!!!!!!!!!!!!!!!!!still have to figure out how to add images for the provider  ratings
    //possibly add credit card later but for pci compliance will need to be encrypted behind a firewall if we implement this ourselves
      users.increments('id');
      users.string('first_name')
        .notNullable();
      users.string('last_name')
        .notNullable();
      users.string('username')
        .notNullable()
        .unique();
      //validate from FE via yup to make sure is email
      users.string('email')
        .notNullable()
        .unique();
      //validate from FE make so enter at least 1 upper 1 lower and special chars and min length of 10
      users.string('password')
        .notNullable();
      //validate from FE make in a way that they can either enter format 00000-0000 or 00000
      users.string('zipcode', [10])
        .notNullable()
      users.timestamp('created_at').defaultTo(knex.fn.now());   
  })
  //information on cosmetic provider users for their profiles and accounts
  .createTable('providers', providers => {
     //!!!!!!!!!!!!!!!!!!!still have to figure out how to add images for the provider ratings
      providers.increments('id');
      providers.string('first_name')
        .notNullable();
      providers.string('last_name')
        .notNullable();
      providers.string('username')
        .notNullable()
        .unique();
      //validate from FE via yup to make sure is email
      providers.string('email')
        .notNullable()
        .unique();
      //validate from FE make so enter at least 1 upper 1 lower and special chars and min length of 10
      providers.string('password')
        .notNullable();
      //validate from FE make in a way that they can either enter format 00000-0000 or 00000
      providers.string('zipcode', [10])
        .notNullable();
      providers.string('header');
      //set from preselected list and enter from input type radio on FE and add to db string from there
      providers.string('availability')
        .notNullable();
      //entered from radio select inputs, 1 for service, 1 for pricing of that service through frontend and posted as a string separated by |
      //so can separate the service from the price if needbe for gets
      providers.string('services_and_pricing_1');
      providers.string('services_and_pricing_2');
      providers.string('services_and_pricing_3');
      providers.string('services_and_pricing_4');
      providers.string('services_and_pricing_5');
      providers.timestamp('created_at').defaultTo(knex.fn.now());   
      
  })
  //ratings will be many to many each custy will have rating from provider vice versa so own table for this but 2 ways rating user ratings ie ratings the users were 
  //given by customers in this table and vice versa in next table

  .createTable('user_ratings', ratings => {
    ratings.increments('id');
    ratings.decimal('rating', [3], [2]);
    ratings.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
    ratings.integer('provider_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('providers');
})
.createTable('provider_ratings',  ratings => {
  ratings.increments('id');
  ratings.decimal('rating', [3], [2]);
    ratings.integer('provider_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('providers');
    ratings.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
})
.createTable('pre_admin', preAdmin => {
  preAdmin.increments('id');
  preAdmin.string('first_name')
    .notNullable();
  preAdmin.string('last_name')
    .notNullable();
  preAdmin.string('role')
    .notNullable();
})
.createTable('admin', admin => {
  admin.increments('id');
  admin.string('first_name')
    .notNullable();
  admin.string('last_name')
    .notNullable();
  //V will be programmatically added to the profile via the pre-admin table after the check to see if they are there ie req.body.role = 'CEO';
  admin.string('role')
    .notNullable();
  //validate from FE via yup to make sure is email
  admin.string('email')
    .notNullable()
    .unique();
  //validate from FE make so enter at least 1 upper 1 lower and special chars and min length of 10
  admin.string('password')
    .notNullable();
  //validate from FE make in a way that they can either enter format 00000-0000 or 00000
  admin.string('zipcode', [10])
    .notNullable();
})
.createTable('maniGods', manigods => {
  //for upper management, maniGods can add to pre-admin so employees can register on the admin application.  This will be pre populated via 
  //seeds on setup, and only manigods can add to this or admin. A separate FE app (login, then register for manigods or pre-admin posts or access 
  //with privs to other stuff) for just reg will be created for this reg (because role is 
  //entered manually) only accessible to manigods to personally add others to the team when hired, they will just enter a default pw for the
  //new team member then the teammember can change it, unelss in person they can setup together.  
  manigods.increments('id');
  manigods.string('first_name')
    .notNullable();
  manigods.string('last_name')
    .notNullable();
  //V will be programmatically added to the profile via the p;
  manigods.string('role')
    .notNullable();
  //validate from FE via yup to make sure is email
  manigods.string('email')
    .notNullable()
    .unique();
  //validate from FE make so enter at least 1 upper 1 lower and special chars and min length of 10
  manigods.string('password')
    .notNullable();
  //validate from FE make in a way that they can either enter format 00000-0000 or 00000
  manigods.string('zipcode', [10])
    .notNullable();
})
};

//Reviews,  ratings, location, availability, pricing, gallery to display work

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('manigods')
  .dropTableIfExists('admin')
  .dropTableIfExists('pre-admin')
  .dropTableIfExists('provider-ratings')
  .dropTableIfExists('user_ratings')
  .dropTableIfExists('providrs')
  .dropTableIfExists('users');
};


