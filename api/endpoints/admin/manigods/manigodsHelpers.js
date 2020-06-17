const db = require('../../../../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
};

function find() {
  return db('manigods').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('manigods').where(filter);
}

async function add(manigod) {
  
  db('manigods').insert(manigod)
  .then(ids => {
    return findById(ids[0])
  });
  
  
}

function update(id, info) {
  return db('manigods').where('id', Number(id))
  .update(info);
}

function findById(id) {
  return db('manigods')
    .where({ id })
    .first();
}