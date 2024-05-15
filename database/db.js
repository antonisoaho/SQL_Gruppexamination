const tableDefinitions = require('./definitions/tableDefinitions');
const viewDefinitions = require('./definitions/viewDefinitions');

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
  };

  const createViews = () => {
    db.run(subscribersView)
      .run(messagesFromUser)
      .run(messagesForChannel)
      .run(channelOwnedByUser);
  };

  const createRelationMessagesChannelsTable = (messageId, channelId) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO messagesChannels (Message_Id, Channel_Id) VALUES (?, ?)',
        [messageId, channelId],
        (error) => {
          if (error) reject(error);
          resolve();
        }
      );
    });
  };

  const createRelationUsersChannelsTable = (userId, channelId) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO usersChannels (User_Id, Channel_Id) VALUES (?, ?)',
        [userId, channelId],
        (error) => {
          if (error) reject(error);
          resolve();
        }
      );
    });
  };

  db.serialize(() => {
    createTables();
    // createViews();
  });

  return {
    db,
    createRelationUsersChannelsTable,
    createRelationMessagesChannelsTable,
  };
};

module.exports = { initDatabase };
