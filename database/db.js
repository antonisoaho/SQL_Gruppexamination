const tableDefinitions = require('./definitions/tableDefinitions');

const sqlite3 = require('sqlite3').verbose();

const initDatabase = () => {
  const db = new sqlite3.Database('./database/database.db', (error) => {
    if (error) console.error(error);

    return db;
  });

  const {
    usersTable,
    channelsTable,
    messagesTable,
    messagesChannelsTable,
    usersChannelsTable,
  } = tableDefinitions;

  const createTables = () => {
    db.run(usersTable)
      .run(channelsTable)
      .run(messagesTable)
      .run(messagesChannelsTable)
      .run(usersChannelsTable, (error) => {
        if (error) console.error(error);
      });
  };

  db.serialize(() => {
    createTables();
  });

  return db;
};

module.exports = { initDatabase };
