const database = require('../database/db');
const db = database.initDatabase();

// Function to create channel
const createChannel = async (name, description, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO channels (Name, Description, Owner_id) VALUES (?,?,?)`,
      [name, description, userId],
      function (error) {
        if (error) {
          reject(error);
        } else {
          const channelId = this.lastID;
          db.get(
            `Select * FROM channels WHERE Id = ?`,
            [channelId],
            function (error, row) {
              if (error) {
                reject(error);
              } else {
                resolve(row);
              }
            }
          );
        }
      }
    );
  });
};
// Function get all channels
const getAllChannels = async () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM channels`, [], (error, channels) => {
      if (error) {
        reject(error);
      } else {
        resolve(channels);
      }
    });
  });
};
// Function get a specific channel
const getSpecificChannelById = async (channelId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM channels WHERE Id = ?`,
      [channelId],
      function (error, channel) {
        if (error) {
          reject(error);
        } else {
          resolve(channel);
        }
      }
    );
  });
};
// Function to update channel
const updateChannel = async (name, description, channelId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE channels SET Name = ?, Description = ? WHERE Id = ?`,
      [name, description, channelId],
      function (error) {
        if (error) {
          reject(error);
        } else {
          db.get(
            `Select * FROM channels WHERE Id = ?`,
            [channelId],
            function (error, row) {
              if (error) {
                reject(error);
              } else {
                resolve(row);
              }
            }
          );
        }
      }
    );
  });
};
// Function to delete channel
const deleteChannel = async (channelId) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM channels WHERE Id = ?`, [channelId], (error) => {
      if (error) reject(error);

      const messageChannel =
        'DELETE FROM messagesChannels WHERE Channel_Id = ?';
      const userChannel = 'DELETE FROM usersChannels WHERE Channel_Id = ?';

      db.serialize(() => {
        db.run(messageChannel, [channelId], (error) => {
          if (error) reject(error);
        });
        db.run(userChannel, [channelId], (error) => {
          if (error) reject(error);
        });

        resolve();
      });
    });
  });
};
// Function to get all channel messages
const getAllChannelMessages = async (channelId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT messages.* FROM messages JOIN messagesChannels ON messages.Id = messagesChannels.Message_Id WHERE messagesChannels.Channel_Id = ?`,
      [channelId],
      function (error, rows) {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      }
    );
  });
};
// Function to get all users of a channel
const getAllChannelUsers = async (channelId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT users. * FROM users JOIN usersChannels ON users.Id = usersChannels.User_Id WHERE usersChannels.Channel_Id = ?`,
      [channelId],
      function (error, rows) {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      }
    );
  });
};
// Function to subscribe to channel
const subscribeToChannel = async (userId, channelId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO usersChannels (User_Id, Channel_Id) VALUES (?,?)`,
      [userId, channelId],
      function (error) {
        if (error) {
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
  getSpecificChannelById,
};
