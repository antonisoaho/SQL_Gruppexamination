const tableDefinitions = require('./definitions/tableDefinitions');
const viewDefinitions = require('./definitions/viewDefinitions');

const sqlite3 = require('sqlite3').verbose();

const initDatabase = () => {
  const db = new sqlite3.Database("./database/database.db", (error) => {
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

  const {
    subscribersView,
    messagesFromUser,
    messagesForChannel,
    channelOwnedByUser,
  } = viewDefinitions;

  const createTables = () => {
    db.run(usersTable)
      .run(channelsTable)
      .run(messagesTable)
      .run(messagesChannelsTable)
      .run(usersChannelsTable, (error) => {
        if (error) console.error(error);
      });
  });

  return db;
};

module.exports = initDatabase;
