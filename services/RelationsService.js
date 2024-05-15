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

module.exports = {
  createRelationUsersChannelsTable,
  createRelationMessagesChannelsTable,
};
