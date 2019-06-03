
exports.up = async function(knex, Promise) {
    await knex.schema.table('actions', tbl => {
        tbl.boolean('completed');
    });

    await knex.schema.table('projects', tbl => {
        tbl.boolean('completed');
    });
};

exports.down = async function(knex, Promise) {
  await knex.schema.table('projects', tbl => {
      tbl.dropColumn('completed')
  });
  await knex.schema.table('actions', tbl => {
      tbl.dropColumn('completed')
  })
};
