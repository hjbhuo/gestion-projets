[11:51, 06/12/2025] Haifa: import Project from "../models/Project.js";

// ➤ Créer un projet
export const createProject = async (req, res) => {
  try {
    const { nom, description, statut } = req.body;

    const project = await Project.create({
      nom,
      description,
      statut,
      owner: req.user.id, // récupéré depuis JWT
    });

    res.status(201).json({
      message: "Projet créé",
      project,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Voir ses propres projets
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Voir tous les projets (manager uniquement)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("owner", "nom login");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Modifier un projet
export const updateProject = async (req, res) => {
  try {
    const { nom, description, statut } = req.body;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { nom, description, statut },
      { new: true }
    );

    res.json({ message: "Projet mis à jour", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Supprimer un projet
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Projet supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
[11:51, 06/12/2025] Haifa: git add backend/controllers/projectController.js
git commit -m "Ajout du contrôleur Project : création, affichage, mise à jour, suppression"
[11:55, 06/12/2025] Haifa: backend/routes/projectRoutes.js
[12:01, 06/12/2025] Haifa: import express from "express";
import {
  createProject,
  getMyProjects,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import auth from "../middlewares/auth.js";
import isManager from "../middlewares/isManager.js";
import isOwnerProject from "../middlewares/isOwnerProject.js";

const router = express.Router();

// ➤ Créer un projet
router.post("/", auth, createProject);

// ➤ Voir ses projets
router.get("/", auth, getMyProjects);

// ➤ Manager → Voir tous les projets
router.get("/all", auth, isManager, getAllProjects);

// ➤ Modifier un projet (owner only)
router.put("/:id", auth, isOwnerProject, updateProject);

// ➤ Supprimer un projet (owner only)
router.delete("/:id", auth, isOwnerProject, deleteProject);

export default router;
[12:02, 06/12/2025] Haifa: import express from "express";
import {
  createProject,
  getMyProjects,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import auth from "../middlewares/auth.js";
import isManager from "../middlewares/isManager.js";
import isOwnerProject from "../middlewares/isOwnerProject.js";

const router = express.Router();

// ➤ Créer un projet
router.post("/", auth, createProject);

// ➤ Voir ses projets
router.get("/", auth, getMyProjects);

// ➤ Manager → Voir tous les projets
router.get("/all", auth, isManager, getAllProjects);

// ➤ Modifier un projet (owner only)
router.put("/:id", auth, isOwnerProject, updateProject);

// ➤ Supprimer un projet (owner only)
router.delete("/:id", auth, isOwnerProject, deleteProject);

export default router;