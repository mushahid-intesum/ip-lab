const express = require("express");

const kanbanController = require("../controllers/kanbanController");

const router = express.Router();

router.post("/create_new_kanban", kanbanController.createKanban);
router.post("/get_kanban", kanbanController.getKanban);
router.post("/delete_kanban", kanbanController.deleteKanban);
router.post("/update_kanban", kanbanController.editKanban);
module.exports = router;