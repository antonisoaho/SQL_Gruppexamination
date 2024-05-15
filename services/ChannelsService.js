const channelQueries = require('../database/queries/ChannelQueries');

const createChannel = async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    await channelQueries.create_Channel(name, description, userId);
    res.send('Channel successfully created');
  } catch (error) {
    console.log(error);
    res.status(404).send('Internal server error');
  }
};

const getAllChannels = async (req, res) => {
  try {
    const channels = await channelQueries.getAll_Channels();
    console.log(channels);
    res.json(channels);
  } catch (error) {
    console.log(error);
    res.status(404).send('Internal server error');
  }
};

const updateChannel = async (req, res) => {
  const { name, description, channelId } = req.body;

  try {
    await channelQueries.update_Channel(name, description, channelId);
    res.send('Channel successfully updated');
  } catch (error) {
    console.log(error);
    res.status(404).send('Internal server error');
  }
};

const deleteChannel = async (req, res) => {
  const { channelId } = req.body;

  try {
    await channelQueries.delete_Channel(channelId);
    res.send('Channel successfully deleted');
  } catch (error) {
    console.log(error);
    res.status(404).send('Internal server error');
  }
};

const getAllChannelMessages = async (req, res) => {
  const { id: channelId } = req.params;

  try {
    const messages = await channelQueries.getAll_ChannelMessages(channelId);
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(404).send('Internal server error');
  }
};

module.exports = {
  createChannel,
  deleteChannel,
  updateChannel,
  getAllChannels,
  getAllChannelMessages,
};
