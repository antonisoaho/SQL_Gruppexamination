const tableDefinitions = {
  usersTable:
    'CREATE TABLE IF NOT EXISTS users (Id INTEGER PRIMARY KEY, Name TEXT, Email TEXT);',

  channelsTable:
    'CREATE TABLE IF NOT EXISTS channels (Id INTEGER PRIMARY KEY, Name TEXT, Description TEXT, Owner_Id INTEGER, FOREIGN KEY (Owner_Id) REFERENCES users(Id));',

  messagesTable:
    'CREATE TABLE IF NOT EXISTS messages(Id INTEGER PRIMARY KEY, Message TEXT, Created_At DATETIME, User_Id INTEGER, FOREIGN KEY (User_Id) REFERENCES users(Id));',

  messagesChannelsTable: `CREATE TABLE IF NOT EXISTS messagesChannels (
    Message_Id INTEGER,
    Channel_Id INTEGER,
    PRIMARY KEY (Message_Id, Channel_Id),
    FOREIGN KEY (Message_Id) REFERENCES messages(Id),
    FOREIGN KEY (Channel_Id) REFERENCES channels(Id)
  );`,

  usersChannelsTable: `CREATE TABLE IF NOT EXISTS usersChannels (
    User_Id INTEGER,
    Channel_Id INTEGER,
    PRIMARY KEY (User_Id, Channel_Id),
    FOREIGN KEY (User_Id) REFERENCES users(Id),
    FOREIGN KEY (Channel_Id) REFERENCES channels(Id)
  );`,
};

module.exports = tableDefinitions;
