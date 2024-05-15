const database = require('../database/db');
const db = database.initDatabase();

const createChannel = async (name, description, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO channels (Name, Description, Owner_id) VALUES (?,?,?)`,
      [name, description, userId],
      function (error) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(`Created channel ${name} successfully`);
          resolve();
        }
      }
    );
  });
};

const getAllChannels = async () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM channels`, [], (error, channels) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(channels);
      }
    });
  });
};

const updateChannel = async (name, description, channelId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE channels SET Name = ?, Description = ? WHERE Id = ?`,
      [name, description, channelId],
      function (error) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log(`Channel successfully updated`);
          resolve();
        }
      }
    );
  });
};

const deleteChannel = async (channelId) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM channels WHERE Id = ?`, [channelId], function (error) {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log(`Channel deleted`);
        resolve();
      }
    });
  });
};

const getAllChannelMessages = async (channelId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT messages.* FROM messages JOIN messagesChannels ON messages.Id = messagesChannels.Message_Id WHERE messagesChannels.Channel_Id = ?`,
      [channelId],
      function (error, rows) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

const getAllChannelUsers = async (channelId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT users. * FROM users JOIN usersChannels ON users.Id = usersChannels.User_Id WHERE usersChannels.Channel_Id = ?`,
      [channelId],
      function (error, rows) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

const subscribeToChannel = async (userId, channelId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO usersChannels (User_Id, Channel_Id) VALUES (?,?)`,
      [userId, channelId],
      function (error) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports = {
  createChannel,
  getAllChannels,
  updateChannel,
  deleteChannel,
  getAllChannelMessages,
  getAllChannelUsers,
  subscribeToChannel,
};
