const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error("Erreur MongoDB :", err));

// Import des routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes"); // ✅ AJOUT

// Utilisation des routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes); // ✅ AJOUT

// Route test
app.get("/", (req, res) => res.send("API Gestion Projets ✔"));

// Lancer le serveur
app.listen(process.env.PORT || 5000, () =>
  console.log("Serveur démarré sur le port " + (process.env.PORT || 5000))
);
