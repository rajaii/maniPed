const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('pre_admin').select('first_name', 'last_name', 'role');
}

function findBy(filter) {
  return db('pre_admin').where(filter);
}

async function add(preAdmin) {
  
  db('pre_admin').insert(preAdmin)
  .then(ids => {
    return findById(ids[0])
  });
  
  
}

function update(id, info) {
    return db('pre_admin').where('id', Number(id))
    .update(info);
  }
  
  function findById(id) {
    return db('pre_admin')
      .where({ id })
      .first();
  }