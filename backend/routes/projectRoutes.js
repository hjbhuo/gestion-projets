import express from "express";
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