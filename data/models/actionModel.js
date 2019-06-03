const knex = require('knex');
const knexFile = require('../../knexfile')
const db = knex(knexFile.development)

module.exports = {
    getActions,
    getById,
    insert,
  };
  
  function getActions() {
    return db("actions");
  }
  
  function getById(id) {
    return db("actions").where({ id }).first();
  }
  
  function insert(action) {
    return db("actions")
      .insert(action)
      .then(ids => {
        return getById(ids[0]);
      });
  }