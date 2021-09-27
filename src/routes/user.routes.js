const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { signupValidation, loginValidation } = require("../middleware/user.middleware");

router.post("/signup", signupValidation, userController.signup);
router.post("/login", loginValidation, userController.login);
router.get("/logout", userController.logout);
router.get("/verify-token", userController.verifyToken);
router.put("/update-info", userController.updateInfo);
router.get("/all-user", userController.allUser);

module.exports = router;