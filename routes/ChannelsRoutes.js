const express = require('express');
const router = express.Router();
const channelsService = require('../services/ChannelsService');
const { postMessage } = require('../services/MessagesService');

router.get('/', async (req, res) => {
  try {
    const channels = await channelsService.getAllChannels();
    console.log(channels);
    res.json(channels);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

router.put('/', async (req, res) => {
  const { name, description, channelId } = req.body;

  try {
    await channelsService.updateChannel(name, description, channelId);
    res.send('Channel successfully updated');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/', async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    await channelsService.createChannel(name, description, userId);
    res.send('Channel successfully created');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

router.delete('/', async (req, res) => {
  const { channelId } = req.body;

  try {
    await channelsService.deleteChannel(channelId);
    res.send('Channel successfully deleted');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/:id/subcribe', async (req, res) => {
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
