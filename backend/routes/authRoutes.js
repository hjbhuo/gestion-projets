const express = require("express");
const router = express.Router();

// Route test Auth
router.get("/", (req, res) => {
    res.send("Route Auth OK ✔");
});

module.exports = router;
