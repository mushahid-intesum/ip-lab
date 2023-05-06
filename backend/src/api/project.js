const express = require("express");

const projectController = require("../controllers/projectController");

const router = express.Router();

router.post("/create_new_project", projectController.createNewProject);
router.post("/get_all_projects", projectController.getAllProjects);
router.post("/get_project", projectController.getProject);
router.post("/delete_project", projectController.deleteProject);
router.post("/update_project", projectController.updateProject);
// router.post("/get_project_tasks", projectController.getProjectTasks);
// router.post("/get_project_kanbans", projectController.getProjectKanbanBoards);

module.exports = router;