
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
      tbl.boolean('activated')
        .defaultTo(1)
      tbl.timestamp('created_at').defaultTo(knex.fn.now());   
  })

  // .createTable('user_avatars', tbl => {
  //   tbl.increments('id');
  //   tbl.binary('avatar')
  //     .unique();
  //   tbl.integer('user_id')
  //     .unsigned()
  //     .notNullable()
  //     .references('id')
  //     .inTable('users')
  //     .onUpdate('CASCADE')
  //     .onDelete('CASCADE');
    
  // })

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
      tbl.string('availability');
      //entered from radio select inputs, 1 for service, 1 for pricing of that service through frontend and posted as a string separated by |
      //so can separate the service from the price if needbe for gets
      tbl.string('services_and_pricing_1');
      tbl.string('services_and_pricing_2');
      tbl.string('services_and_pricing_3');
      tbl.string('services_and_pricing_4');
      tbl.string('services_and_pricing_5');
      tbl.boolean('activated')
        .defaultTo(0)
      tbl.timestamp('created_at').defaultTo(knex.fn.now());   
      
  })

  // //WORK IMAGES may need tweaking upon integration, will test w fe
  // .createTable('provider_showcase', tbl => {
  //   tbl.increments('id');
  //   tbl.binary('avatar')
  //     .notNullable()
  //     .unique();
  //   tbl.binary('image_1')
  //     .unique();
  //   tbl.binary('image_2')
  //     .unique();
  //   tbl.binary('image_3')
  //     .unique();
  //   tbl.binary('image_4')
  //     .unique();
  //   tbl.binary('image_5')
  //     .unique();
  //   tbl.binary('image_6')
  //     .unique();
  //   tbl.binary('image_7')
  //     .unique();
  //   tbl.binary('image_8')
  //     .unique();
  //   tbl.integer('provider_id')
  //     .unsigned()
  //     .notNullable()
  //     .references('id')
  //     .inTable('providers')
  //     .onUpdate('CASCADE')
  //     .onDelete('CASCADE');
  // })

  .createTable('future_bookings', tbl =>{
    tbl.increments('id');
    tbl.date('booking_date')
      .notNullable();
    tbl.time('booking_time')
      .notNullable();
    tbl.string('services_and_pricing')
      .notNullable();
    tbl.integer('provider_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('providers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.boolean('confirmed')
      .defaultTo(0);
    tbl.boolean('completed')
      .defaultTo(0);
    tbl.timestamp('booked_at').defaultTo(knex.fn.now());  
  })



  //ratings will be many to many each custy will have rating from provider vice versa so own table for this but 2 ways rating user ratings ie ratings the users were 
  //given by users (customers) to providers in this table for service
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

//given by providers to customers
.createTable('provider_ratings', tbl => {
  tbl.increments('id');
  tbl.decimal('rating', [3], [2]);
  tbl.integer('provider_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('providers')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  tbl.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
})

  //can be prepopulated radio inputs for services that send strings up to post from front-end or drop down, or
// even limited text manually entered by the provider or a combo ie. deal with the exact post mech in FE
.createTable('completed_services', tbl => {
  tbl.increments('id');
  tbl.string('type_of_service')
    .notNullable()
  tbl.string('amount_billed')
    .notNullable()
  tbl.integer('booking_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('future_bookings')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
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
  tbl.integer('user_rating_id')
    .unsigned()
    .references('id')
    .inTable('user_ratings')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  tbl.integer('provider_rating_id')
    .unsigned()
    .references('id')
    .inTable('provider_ratings')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');   
  tbl.timestamp('created_at').defaultTo(knex.fn.now());  
})




.createTable('pre_admin', tbl => {
  tbl.increments('id');
  tbl.string('first_name')
    .notNullable();
  tbl.string('last_name')
    .notNullable();
  tbl.string('role')
    .notNullable()
  tbl.timestamp('created_at').defaultTo(knex.fn.now());   
})

.createTable('admin', tbl => {
  tbl.increments('id');
  tbl.string('first_name')
    .notNullable();
  tbl.string('last_name')
    .notNullable();
  tbl.string('username')
    .notNullable()
    .unique();
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
    .notNullable()
  tbl.timestamp('created_at').defaultTo(knex.fn.now());   
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
  tbl.string('username')
    .notNullable()
    .unique();
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
    .notNullable()
  tbl.timestamp('created_at').defaultTo(knex.fn.now());   
})

};


exports.down = function(knex) {
  return knex.schema.dropTableIfExists('manigods')
  .dropTableIfExists('admin')
  .dropTableIfExists('pre_admin')
  .dropTableIfExists('completed_services')
  .dropTableIfExists('provider_ratings')
  .dropTableIfExists('user_ratings')
  .dropTableIfExists('future_bookings')
  // .dropTableIfExists('provider_showcase')
  .dropTableIfExists('providers')
  // .dropTableIfExists('user_avatars')
  .dropTableIfExists('users');
  //if won't drop
  // knex.raw('DROP TABLE manigods')
  // .raw('DROP TABLE admin')
  // .raw('DROP TABLE pre-admin')
  // .raw('DROP TABLE provider_ratings')
  // .raw('DROP TABLE user_ratings ')
  // .raw('DROP TABLE providers CASCADE')
  // .raw('DROP TABLE users CASCADE')
};


