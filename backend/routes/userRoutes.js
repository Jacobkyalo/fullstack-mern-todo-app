const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const authorize = require("../middleware/auth");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/profile", authorize, getUserProfile);

module.exports = router;
