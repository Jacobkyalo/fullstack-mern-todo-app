const handler = require("express-async-handler");
const Todo = require("../models/todo");
// const User = require("../models/user");

const createTodo = handler(async (req, res) => {
  const { text } = req.body;

  const todo = await Todo.create({
    text: text,
    user: req.user.userId,
  });
  res.status(200).json(todo);
});

const getTodos = handler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.userId });
  res.status(200).json(todos);
});

module.exports = {
  createTodo,
  getTodos,
};
