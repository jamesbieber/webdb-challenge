const knex = require('knex');
const knexFile = require('../../knexfile')
const db = knex(knexFile.development)

module.exports = {
    getProjects,
    getById,
    getActions,
    insert
}

function insert(project) {
    return db('projects').insert(project).then(id => {
        return getById(id[0])
    })
}

function getProjects() {
    return db('projects');
}

function getById(id) {
    return db('projects').where({id}).first();
}

function getActions(id) {
    return db("actions")
      .join("projects", "projects.id", "actions.project_id")
      .select("actions.id", "actions.description", "actions.notes", "actions.completed")
      .where({ project_id: id });
  }