const express = require("express");
const router = express.Router();

// Route test Users
router.get("/", (req, res) => {
    res.send("Liste des utilisateurs OK ✔");
});

module.exports = router;
