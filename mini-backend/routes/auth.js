const express = require("express");

const router = express.Router();

const authRouteController = require("../controllers/auth");

const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation");

router.post("/register", registerValidation, authRouteController.register);

router.post("/login", loginValidation, authRouteController.login);

router.post("/change-password", authRouteController.changePassword);

module.exports = router;
