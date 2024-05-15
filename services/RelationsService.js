const database = require('../database/db');
const db = database.initDatabase();

const addUsersChannelsTable = (userId, channelId) => {
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

const addMessagesChannels = (messageId, channelId) => {
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

module.exports = {
  addUsersChannelsTable,
  addMessagesChannels,
};
