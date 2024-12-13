const express = require('express');
const router = express.Router();
const todoController = require('../controllers/controller-todos');
const { isAuthenticated } = require('../middleware/middleware-auth');


router.get('/', isAuthenticated, todoController.getTodos); 
router.post('/add', isAuthenticated, todoController.addTodos); 
router.post('/edit/:id', isAuthenticated, todoController.editTodos);
router.delete('/delete/:id', isAuthenticated, todoController.deleteTodos);

module.exports = router;
