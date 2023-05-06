const express = require("express");

const workHourController = require("../controllers/workHourController");

const router = express.Router();

router.post("/create_work_hour", workHourController.createWorkHour);
router.post("/update_work_hour", workHourController.updateWorkHour);
router.post("/get_work_hour_user", workHourController.getWorkHourListForUser);
router.post("/get_work_hour_project", workHourController.getWorkHourListForProject);
router.post("/delete_work_hour", workHourController.deleteWorkHour);

module.exports = router;