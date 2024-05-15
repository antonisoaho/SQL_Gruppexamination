const express = require('express');
const router = express.Router();
const UserService = require('../services/UsersService');

// Hämta alla användare
router.get('/', async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hämta en specifik användare baserat på ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Användaren hittades inte' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Skapa en ny användare
router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    const createdUser = await UserService.createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Uppdatera en befintlig användare
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await UserService.updateUser(userId, userData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ta bort en användare
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await UserService.deleteUser(userId);
    res.json({ message: 'Användaren har tagits bort' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Se vilka kanaler en användare äger
router.get('/:id/channels', async (req, res) => {
  try {
    const userId = req.params.id;
    const channels = await UserService.getChannelAuthorById(userId);
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Se vilka kanaler en prenumererar på
router.get('/:id/subscriptions', async (req, res) => {
  try {
    const userId = req.params.id;
    const subscriptions = await UserService.getSubscriptions(userId);
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// se alla meddelanden gjorda av användaren, asc och desc
router.get('/:id/messages', async (req, res) => {
  try {
    const userId = req.params.id;
    let order = req.query.order;
    let messages = await UserService.getMessagesFromUser(userId, order);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
