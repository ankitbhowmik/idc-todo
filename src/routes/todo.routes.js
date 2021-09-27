const express = require("express");
const router = express.Router();

const todoController = require("../controller/todo.controller");

router.get("/index", todoController.index);
router.post("/create", todoController.create);
router.put("/update/:todo_id", todoController.update);
router.delete("/delete/:todo_id", todoController.delete);
router.get("/search/:search_text?", todoController.search);

module.exports = router;