const express = require("express");

const dashboardApi = require("./database");
const userApi = require("./user");
const projectApi = require("./project");
const taskApi = require("./task");
const kanbanApi = require("./kanban");
const workHourApi = require("./workHour");
const gitApi = require("./git");

const router = express.Router();

router.use(dashboardApi);
router.use(userApi);
router.use(projectApi);
router.use(kanbanApi);
router.use(taskApi);
router.use(workHourApi);
router.use(gitApi);

module.exports = router;
