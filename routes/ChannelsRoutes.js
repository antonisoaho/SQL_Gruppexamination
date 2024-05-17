const express = require('express');
const router = express.Router();
const channelsService = require('../services/ChannelsService');
const { postMessage } = require('../services/MessagesService');

// Endpoint to get all channels
router.get('/', async (req, res) => {
  try {
    const channels = await channelsService.getAllChannels();
    res.json(channels);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Endpoint to get specific channel
router.get('/:id', async (req, res) => {
  const { id: channelId } = req.params;

  try {
    const channel = await channelsService.getSpecificChannelById(channelId);
    res.json(channel);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Endpoint to update channel
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  const { id: channelId } = req.params;

  try {
    const updatedChannel = await channelsService.updateChannel(
      name,
      description,
      channelId
    );
    res.send(updatedChannel);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Endpoint to create a channel
router.post('/', async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    const newChannel = await channelsService.createChannel(
      name,
      description,
      userId
    );
    res.json(newChannel);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Endpoint to delete a channel
router.delete('/:id', async (req, res) => {
  const { id: channelId } = req.params;

  try {
    await channelsService.deleteChannel(channelId);
    res.send('Channel successfully deleted');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Endpoint to subscribe to a channel
router.post('/:id/subscribe', async (req, res) => {
  const { userId } = req.body;
  const { id: channelId } = req.params;

  try {
    await channelsService.subscribeToChannel(userId, channelId);
    res.send('Successfully subscribed to the channel');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Endpoint to get all users in a channel
router.get('/:id/subscribers', async (req, res) => {
  const { id: channelId } = req.params;

  try {
    const channelUsers = await channelsService.getAllChannelUsers(channelId);
    res.json(channelUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Endpoint to get all messages in a channel
router.get('/:id/messages', async (req, res) => {
  const { id: channelId } = req.params;

  try {
    const messages = await channelsService.getAllChannelMessages(channelId);
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Endpoint to post a message in a channel
router.post('/:id/messages', async (req, res) => {
  const { id } = req.params;
  const message = req.body;

  const messageWithChannelId = {
    ...message,
    channels: [id],
  };

  try {
    const createdMessage = await postMessage(messageWithChannelId);

    res.json(createdMessage);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
