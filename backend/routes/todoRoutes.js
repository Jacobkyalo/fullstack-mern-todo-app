const express = require("express");
const router = express.Router();
const { createTodo, getTodos } = require("../controllers/todoController");
const authorize = require("../middleware/auth");

router.post("/", authorize, createTodo);
router.get("/", authorize, getTodos);

module.exports = router;
