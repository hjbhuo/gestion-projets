const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middlewares/auth");
const isManager = require("../middlewares/isManager");

// Route pour obtenir tous les users — manager uniquement
router.get("/", auth, isManager, async (req, res) => {
  try {
    const users = await User.find().select("-motdepasse");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
