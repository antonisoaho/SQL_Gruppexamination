const express = require('express');
const router = express.Router();
const MessagesService = require('../services/MessagesService');

router
  .get('/', async (req, res) => {
    try {
      const { id, order } = req.query;
      const users = await MessagesService.getMessages(id, order);

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const updatedMessage = await MessagesService.updateMessage(id, message);

      res.json(updatedMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .post('/', async (req, res) => {
    try {
      const message = req.body;
      const postedMessage = await MessagesService.postMessage(message);
      res.status(201).json(postedMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await MessagesService.deleteMessage(id);

      res.json({ message: 'Message removed.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get('/fault', async (req, res) => {
    try {
      const messages = await MessagesService.getFaultyMessages();
      res.json(messages);
    } catch (error) {
      res.sendStatus(500);
    }
  });

module.exports = router;
