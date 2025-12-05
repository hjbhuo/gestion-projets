const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API Gestion Projets Fonctionne ✔");
});

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
    console.log("Serveur en marche sur le port " + process.env.PORT);
});

