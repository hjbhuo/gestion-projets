const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { nom, login, motdepasse } = req.body;

        // Vérifier si login existe déjà
        const exist = await User.findOne({ login });
        if (exist) return res.status(400).json({ message: "Login déjà utilisé" });

        // Cryptage
        const hashed = await bcrypt.hash(motdepasse, 10);

        // Enregistrer user
        const user = await User.create({
            nom,
            login,
            motdepasse: hashed
        });

        res.json({ message: "Utilisateur créé", user });
    } catch (e) {
        res.status(500).json(e);
    }
};

exports.login = async (req, res) => {
    try {
        const { login, motdepasse } = req.body;

        const user = await User.findOne({ login });
        if (!user) return res.status(400).json({ message: "Login incorrect" });

        const match = await bcrypt.compare(motdepasse, user.motdepasse);
        if (!match) return res.status(400).json({ message: "Mot de passe incorrect" });

        // JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ message: "Connecté", token, user });
    } catch (e) {
        res.status(500).json(e);
    }
};
