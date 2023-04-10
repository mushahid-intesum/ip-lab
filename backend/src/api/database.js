const express = require("express");

const databaseController = require("../controllers/databaseController");

const router = express.Router();

router.post("/database_commit", databaseController.databaseCommit);

module.exports = router;
