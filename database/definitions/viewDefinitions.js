const viewDefinitions = {
  subscribersView:
    'CREATE VIEW IF NOT EXISTS SubscribersView AS SELECT u.Id AS User_Id, u.Name AS User_Name, u.Email AS User_Email FROM users AS u JOIN usersChannels AS uc ON u.Id = uc.User_Id WHERE uc.Channel_Id = ?;',
  messagesFromUser:
    'CREATE VIEW IF NOT EXISTS MessagesFromUser AS SELECT * FROM messages WHERE User_Id = ?;',
  messagesForChannel:
    'CREATE VIEW IF NOT EXISTS MessagesForChannel AS SELECT m.* FROM messages AS m JOIN messagesChannels AS mc ON m.Id = mc.Message_Id WHERE mc.Channel_Id = ?;',
  channelOwnedByUser:
    'CREATE VIEW IF NOT EXISTS ChannelsOwnedByUser AS SELECT * FROM channels WHERE Owner_Id = ?;',
};

module.exports = viewDefinitions;
