const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", userController.login);
router.post("/get_project_users", userController.getProjectUsers);
router.post("/get_user_with_role", userController.getUsersWithRole);
router.post("/get_user", userController.getUser);
router.post("/get_all_users", userController.getAllUsers);
router.post("/delete_user", userController.deleteUser);
router.post("/update_user", userController.updateUser);
router.post("/create_new_user", userController.createNewUser);
router.post("/add_users_to_project", userController.addUsersToProject);
router.post("/update_project_user", userController.updateProjectUser);
router.post("/remove_project_user", userController.removeUserFromProject);
router.post("/get_users_not_in_project", userController.getUsersNotInProject);

module.exports = router;