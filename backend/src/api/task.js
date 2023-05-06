const express = require("express");

const taskController = require("../controllers/taskController");

const router = express.Router();

router.post("/create_task", taskController.createNewTask);
router.post("/get_all_tasks", taskController.getAllTasks);
router.post("/get_task", taskController.getTask);
router.post("/delete_task", taskController.deleteTask);
router.post("/update_task", taskController.updateTask);

module.exports = router;