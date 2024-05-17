const database = require('../database/db');
const db = database.initDatabase();
// Funktion för att hämta alla användare från databasen
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';
    db.all(query, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

// Funktion för att hämta en användare baserat på ID från databasen
const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE Id = ?';
    db.get(query, [userId], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
};

// Funktion för att skapa en ny användare i databasen
const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (Name, Email) VALUES (?, ?)';
    db.run(query, [userData.Name, userData.Email], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve({ Id: this.lastID, ...userData });
      }
    });
  });
};

// Funktion för att uppdatera en befintlig användare i databasen
const updateUser = (userId, userData) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET Name = ?, Email = ? WHERE Id = ?';
    db.run(query, [userData.Name, userData.Email, userId], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve({ Id: userId, ...userData });
      }
    });
  });
};

// Funktion för att ta bort en användare från databasen baserat på ID
const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM users WHERE Id = ?';
    db.run(query, [userId], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Funktion för att hitta kanaler ägda av användare
const getChannelAuthorById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM channels WHERE Owner_Id = ?';
    db.all(query, [userId], (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

// Funktion för att hitta subbade kanaler på användare
const getSubscriptions = (userId) => {
  return new Promise((resolve, reject) => {
    const query =
      'SELECT * FROM channels INNER JOIN usersChannels ON usersChannels.Channel_Id = channels.Id WHERE usersChannels.User_Id = ?';
    db.all(query, [userId], (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

// Funktion för att hitta alla meddelanden på användare
const getMessagesFromUser = (userId, order) => {
  let query =
    'SELECT * FROM users INNER JOIN messages ON users.id = messages.User_Id WHERE users.Id = ?';

  if (order && (order == 'ASC' || order == 'DESC'))
    query += ` ORDER BY messages.Created_At ${order}`;

  return new Promise((resolve, reject) => {
    db.all(query, [userId], (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getChannelAuthorById,
  getSubscriptions,
  getMessagesFromUser,
};
