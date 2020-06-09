const db = require('../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  ///////////////////////////////////
  /* const [ id ] = await*/ 
  db('users').insert(user)
  .then(ids => {
    // ({ id: ids[0] })
    return findById(ids[0])
  });
  
  
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}