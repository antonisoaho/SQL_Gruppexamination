const express = require("express");
const router = express.Router();
const UserService = require("../services/UsersService");

// Hämta alla användare
router.get("/", async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hämta en specifik användare baserat på ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Användaren hittades inte" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Skapa en ny användare
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const createdUser = await UserService.createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Uppdatera en befintlig användare
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await UserService.deleteUser(userId);
    res.json({ message: "Användaren har tagits bort" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
