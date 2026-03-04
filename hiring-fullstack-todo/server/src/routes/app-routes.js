import express from 'express';
import { getAllTodos, createTodo, updateTodo, updateTodoIsDone, deleteTodo } from '../controllers/todo-controller.js';

const router = express.Router();

// system routes 
router.use('/apisystem-health',   async (req, res) => res.status(200).json({'status': 'ok'}));

// todo routes 
router.get('/todos', getAllTodos);
router.post('/todos', createTodo);
router.put('/todos/:id', updateTodo);
router.patch('/todos/:id/done', updateTodoIsDone);
router.delete('/todos/:id', deleteTodo);

export default router; 