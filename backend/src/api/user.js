const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", userController.login);
router.post("/get_all_users", userController.getAllUsers);
router.post("/get_user_with_role", userController.getUsersWithRole);
router.post("/get_user", userController.getUser);
router.post("/delete_user", userController.deleteUser);
router.post("/update_user", userController.updateUser);
router.post("/create_user", userController.createNewUser);

module.exports = router;