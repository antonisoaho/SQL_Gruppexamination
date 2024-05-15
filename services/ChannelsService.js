const channelQueryes = require("../database/queryes/ChannelQueryes");

const createChannel = async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    await channelQueryes.create_Channel(name, description, userId);
    res.send("Channel successfully created");
  } catch (error) {
    console.log(error);
    res.status(404).send("Internal server error");
  }
};

const getAllChannels = async (req, res) => {
  try {
    const channels = await channelQueryes.getAll_Channels();
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
    await channelQueryes.update_Channel(name, description, channelId);
    res.send("Channel successfully updated");
  } catch (error) {
    console.log(error);
    res.status(404).send("Internal server error");
  }
};

const deleteChannel = async (req, res) => {
  const { channelId } = req.body;

  try {
    await channelQueryes.delete_Channel(channelId);
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
