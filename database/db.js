const sqlite3 = require("sqlite3").verbose();

const initDatabase = () => {
  const db = new sqlite3.Database("./database/database.db", (error) => {
    if (error) console.error(error);

    return db;
  });

  const usersTable =
    "CREATE TABLE IF NOT EXISTS users (Id INTEGER PRIMARY KEY, Name TEXT, Email TEXT);";

  const channelsTable =
    "CREATE TABLE IF NOT EXISTS channels (Id INTEGER PRIMARY KEY, Name TEXT, Description TEXT, Owner_Id INTEGER, FOREIGN KEY (Owner_Id) REFERENCES users(Id));";

  const messagesTable =
    "CREATE TABLE IF NOT EXISTS messages(Id INTEGER PRIMARY KEY, Message TEXT, Created_At DATETIME, User_Id INTEGER, FOREIGN KEY (User_Id) REFERENCES users(Id));";

  const messagesChannelsTable =
    "CREATE TABLE IF NOT EXISTS messagesChannels(Message_Id INTEGER, Channel_Id INTEGER, FOREIGN KEY (Message_Id) REFERENCES messages(Id), FOREIGN KEY (Channel_Id) REFERENCES channels(Id))";

  db.serialize(() => {
    db.run(usersTable)
      .run(channelsTable)
      .run(messagesTable)
      .run(messagesChannelsTable, (error) => {
        if (error) console.error(error);
      });
  });

  return db;
};

module.exports = {
  initDatabase,
};
