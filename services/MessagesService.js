const database = require('../database/db');
const RelationsService = require('./RelationsService');
const db = database.initDatabase();

// Hämta meddelanden
const getMessages = async (id, order) => {
  let query = 'SELECT * FROM messages';

  if (id) query += ` WHERE Id = ${id}`;
  if (order && (order === 'ASC' || order === 'DESC'))
    query += ` ORDER BY Created_At ${order}`;

  return new Promise((resolve, reject) => {
    db.all(query, (error, rows) => {
      if (error) reject(error);

      resolve(rows);
    });
  });
};

//Skapa meddelande - Se till att den hamnar i many-many tabell och att man är subscribad till kanalen man vill posta i
const postMessage = async (message) => {
  const placeholders = message.channels.map(() => '?').join(',');
  const query = `
    INSERT INTO messages (Message, Created_At, User_Id)
    SELECT ?, datetime('now', 'localtime'), ?
    FROM channels
    Where Id IN (${placeholders})
    AND EXISTS (
      SELECT 1
      FROM usersChannels
      WHERE User_Id = ?
      AND Channel_Id = channels.Id
    );`;

  const countQuery =
    'SELECT COUNT(*) AS messages FROM messages WHERE User_Id = ?';

  try {
    const channelCount = await new Promise((resolve, reject) => {
      const checkQuery = `
      SELECT COUNT(*) AS count
      FROM channels
      WHERE Id IN (${placeholders})
      AND EXISTS (
        SELECT 1
        FROM usersChannels
        WHERE User_Id = ?
        AND Channel_Id = channels.Id
      );`;

      db.get(checkQuery, [...message.channels, message.user_id], (err, row) => {
        if (err) reject(err);
        resolve(row.count);
      });
    });

    if (channelCount !== message.channels.length)
      throw new Error('Cant put messages in channels you do not subscribe to');

    const count = await new Promise((resolve, reject) => {
      db.get(countQuery, [message.user_id], (err, row) => {
        if (err) reject(err);
        resolve(row.messages);
      });
    });

    const messageId = await new Promise((resolve, reject) => {
      db.run(
        query,
        [
          message.message,
          message.user_id,
          ...message.channels,
          message.user_id,
        ],
        function (error) {
          if (error) reject(error);
          resolve(this.lastID);
        }
      );
    });

    const newCount = await new Promise((resolve, reject) => {
      db.get(countQuery, [message.user_id], (err, row) => {
        if (err) reject(err);
        resolve(row.messages);
      });
    });

    if (newCount > count) {
      db.run('BEGIN TRANSACTION;');
      message.channels.forEach((channel) => {
        RelationsService.addMessagesChannels(messageId, channel);
      });

      db.run('COMMIT');

      selectQuery = 'SELECT * FROM messages WHERE Id = ?';

      const insertedMessage = await new Promise((resolve, reject) => {
        db.get(selectQuery, [messageId], (error, row) => {
          if (error) reject(error);
          resolve(row);
        });
      });

      return insertedMessage;
    } else {
      throw new Error('No message created');
    }
  } catch (error) {
    throw error;
  }
};
// Funktion för att uppdatera meddelande
const updateMessage = async (id, message) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE messages SET Message = ? WHERE Id = ?';
    db.run(query, [message, id], (error) => {
      if (error) reject(error);

      const selectQuery = 'SELECT * FROM messages WHERE Id = ?';
      db.get(selectQuery, [id], (error, row) => {
        if (error) reject(error);

        resolve(row);
      });
    });
  });
};
// Funktion för att ta bort meddelande
const deleteMessage = async (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM messages WHERE Id = ?';

    db.run(query, [id], (error) => {
      if (error) reject(error);

      const relationQuery = 'DELETE FROM messagesChannels WHERE Message_Id = ?';
      db.run(relationQuery, [id], (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  });
};

// Funktion för att ta bort felaktiga meddelanden
const getFaultyMessages = async (userId, channelId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT m.Id, mc.Message_Id, mc.Channel_Id
      FROM messages m
      LEFT JOIN messagesChannels mc ON m.Id = mc.Message_Id
      WHERE mc.Message_Id IS NULL OR mc.Channel_Id IS NULL`;

    db.all(query, (err, rows) => {
      console.log('err', err);
      if (err) reject(err);

      resolve(rows);
    });
  });
};

module.exports = {
  getMessages,
  postMessage,
  updateMessage,
  deleteMessage,
  getFaultyMessages,
};
