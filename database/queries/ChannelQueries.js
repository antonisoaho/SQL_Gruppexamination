const database = require('../db');
const db = database.initDatabase();

const create_Channel = async (name, description, userId) => {
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

const getAll_Channels = async () => {
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

const update_Channel = async (name, description, channelId) => {
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

const delete_Channel = async (channelId) => {
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
module.exports = {
  create_Channel,
  getAll_Channels,
  update_Channel,
  delete_Channel,
};
