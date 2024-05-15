const { createChannel } = require('../services/ChannelsService');
const { createUser } = require('../services/UsersService');
const database = require('./db');

const generateUsers = (userCount) => {
  const users = [];

  for (let i = 1; i <= userCount; i++) {
    const user = {
      Name: `User${i}`,
      Email: `User${i}@seeding.info`,
    };

    users.push(user);
  }

  return users;
};

const generateChannels = (channelCount) => {
  const channels = [];

  for (let i = 1; i <= channelCount; i++) {
    const channel = {
      Name: `Channel${i}`,
      Description: 'This is a seeded channel.',
      Owner_Id: i,
    };

    channels.push(channel);
  }

  return channels;
};

const generateMessages = (messageCount) => {
  const messages = [];

  for (let i = 1; i <= messageCount; i++) {
    const message = {
      Message: `Message${i} generated by seeding.`,
      CreatedAt: new Date(),
      User_Id: Math.ceil(i / 10),
    };

    messages.push(message);
  }

  return messages;
};

const initSeed = async () => {
  const db = database.initDatabase();
  const messages = generateMessages(100);
  const channels = generateChannels(10);
  const users = generateUsers(15);
  try {
    await db.run('BEGIN TRANSACTION;');

    for (const user of users) {
      await createUser(user);
    }

    for (const channel of channels) {
      await createChannel(channel.Name, channel.Description, channel.Owner_Id);
    }

    await db.run('COMMIT;');

    console.log('Data seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    await db.run('ROLLBACK;');
  }
};

initSeed();
