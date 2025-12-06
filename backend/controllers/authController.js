const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Inscription
exports.register = async (req, res) => {
  try {
    const { nom, login, motdepasse, role } = req.body;

    // validation simple
    if (!nom || !login || !motdepasse) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const exist = await User.findOne({ login });
    if (exist) return res.status(400).json({ message: "Login déjà utilisé" });

    const hashed = await bcrypt.hash(motdepasse, 10);

    const user = await User.create({
      nom,
      login,
      motdepasse: hashed,
      role: role === "manager" ? "manager" : "user"
    });

    // Ne pas renvoyer le mot de passe dans la réponse
    const userSafe = {
      id: user._id,
      nom: user.nom,
      login: user.login,
      role: user.role,
      createdAt: user.createdAt
    };

    res.status(201).json({ message: "Utilisateur créé", user: userSafe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { login, motdepasse } = req.body;

    if (!login || !motdepasse) {
      return res.status(400).json({ message: "Login et mot de passe requis" });
    }

    const user = await User.findOne({ login });
    if (!user) return res.status(400).json({ message: "Login incorrect" });

    const match = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!match) return res.status(400).json({ message: "Mot de passe incorrect" });

    const payload = { id: user._id, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    });

    res.json({
      message: "Authentification réussie",
      token,
      user: { id: user._id, nom: user.nom, login: user.login, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
