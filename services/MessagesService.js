const database = require('../database/db');
const RelationsService = require('./RelationsService');
const db = database.initDatabase();

const getMessages = async (id, order) => {
  const query = 'SELECT * FROM messages';
  if (id != undefined) query = query & ` WHERE Id = ${id}`;
  if (order != undefined && (order == 'ASC' || order == 'DESC'))
    query = query & ` ORDER BY ${order}`;

  return new Promise((resolve, reject) => {
    db.all(query, (error, rows) => {
      if (error) reject(error);

      resolve(rows);
    });
  });
};

const postMessage = async (message) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO messages (Message, Created_At, User_Id) VALUES (?, datetime('now', 'localtime'), ?)`;

    db.run(query, [message.message, message.user_id], function (error) {
      if (error) reject(error);

      const messageId = this.lastID;

      db.run('BEGIN TRANSACTION;');

      message.channels.forEach((channel) => {
        RelationsService.addMessagesChannels(messageId, channel);
      });

      db.run('COMMIT');

      const selectQuery = 'SELECT * FROM messages WHERE Id = ?';

      db.get(selectQuery, [messageId], (error, row) => {
        if (error) reject(error);

        resolve(row);
      });
    });
  });
};

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

module.exports = { getMessages, postMessage, updateMessage, deleteMessage };
