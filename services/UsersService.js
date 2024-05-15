const database = require("../database/db");

// Funktion för att hämta alla användare från databasen
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const db = database();
    const query = "SELECT * FROM users";
    db.all(query, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
    db.close();
  });
};

// Funktion för att hämta en användare baserat på ID från databasen
const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const db = database();
    const query = "SELECT * FROM users WHERE Id = ?";
    db.get(query, [userId], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
    db.close();
  });
};

// Funktion för att skapa en ny användare i databasen
const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const db = database();
    const query = "INSERT INTO users (Name, Email) VALUES (?, ?)";
    db.run(query, [userData.Name, userData.Email], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve({ Id: this.lastID, ...userData });
      }
    });
    db.close();
  });
};

// Funktion för att uppdatera en befintlig användare i databasen
const updateUser = (userId, userData) => {
  return new Promise((resolve, reject) => {
    const db = database();
    const query = "UPDATE users SET Name = ?, Email = ? WHERE Id = ?";
    db.run(query, [userData.Name, userData.Email, userId], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve({ Id: userId, ...userData });
      }
    });
    db.close();
  });
};

// Funktion för att ta bort en användare från databasen baserat på ID
const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    const db = database();
    const query = "DELETE FROM users WHERE Id = ?";
    db.run(query, [userId], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
    db.close();
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
