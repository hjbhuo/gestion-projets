exports.getTasks = async (req, res) => {
    try {
      let filter = {};
      if (req.user.role !== "manager") {
        filter = { utilisateur: req.user.id };
      }
  
      // Filtrage par statut
      if (req.query.statut) filter.statut = req.query.statut;
  
      // Recherche par titre ou description
      if (req.query.q) {
        filter.$or = [
          { titre: { $regex: req.query.q, $options: "i" } },
          { description: { $regex: req.query.q, $options: "i" } }
        ];
      }
  
      // Tri par query sort (ex: ?sort=deadline ou ?sort=createdAt)
      let sort = {};
      if (req.query.sort) {
        const direction = req.query.order === "desc" ? -1 : 1;
        sort[req.query.sort] = direction;
      }
  
      const tasks = await Task.find(filter)
        .populate("projet utilisateur", "-motdepasse")
        .sort(sort);
  
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  };

  