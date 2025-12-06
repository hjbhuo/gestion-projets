
import Project from "../models/Project.js";

const isOwnerProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    // Vérifie si l'utilisateur connecté est le propriétaire
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé : pas propriétaire du projet" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default isOwnerProject;