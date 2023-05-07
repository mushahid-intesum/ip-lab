const express = require("express");

const gitController = require("../controllers/gitController");

const router = express.Router();

router.post("/add_new_repo", gitController.addNewGitRepo);
router.post("/delete_repo", gitController.deleteGitRepo);
// router.post("/get_git_commits", gitController.getGitCommits);
router.post("/get_commit_report", gitController.getReport);
router.post("/get_all_repo", gitController.getAllRepo);
router.post("/update_repo", gitController.update_repo);

module.exports = router;