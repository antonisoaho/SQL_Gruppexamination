const database = require("../database/db");
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

// ---------------------

const createChannel = async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    await create_Channel(name, description, userId);
    res.send("Channel successfully created");
  } catch (error) {
    console.log(error);
    res.status(404).send("Internal server error");
  }
};

const getAllChannels = async (req, res) => {
  try {
    const channels = await getAll_Channels();
    console.log(channels);
    res.json(channels);
  } catch (error) {
    console.log(error);
    res.status(404).send("Internal server error");
  }
};

const updateChannel = async (req, res) => {
  const { name, description, channelId } = req.body;

  try {
    await update_Channel(name, description, channelId);
    res.send("Channel successfully updated");
  } catch (error) {
    console.log(error);
    res.status(404).send("Internal server error");
  }
};

const deleteChannel = async (req, res) => {
  const { channelId } = req.body;

  try {
    await delete_Channel(channelId);
    res.send("Channel successfully deleted");
  } catch (error) {
    console.log(error);
    res.status(404).send("Internal server error");
  }
};

module.exports = {
  createChannel,
  deleteChannel,
  updateChannel,
  getAllChannels,
};
