
exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', tbl => {
      tbl.increments();
      tbl.integer('project_id').references('id').inTable('projects').onDelete('CASCADE').notNullable();
      tbl.string('description', 256).notNullable();
      tbl.string('notes', 256).notNullable();
      tbl.integer('completed');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('actions')
};
