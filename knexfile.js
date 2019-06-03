// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/roless.db3',
    },
    useNullAsDefault: true,
  },
};
