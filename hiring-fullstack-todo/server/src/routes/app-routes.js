import express from 'express';
import { getTodos, createTodo, updateTodo } from '../controllers/todo-controller.js';

const router = express.Router();

// system routes 
router.use('/apisystem-health',   async (req, res) => res.status(200).json({'status': 'ok'}));

// todo routes 
router.get('/todos', getTodos);
router.post('/todos', createTodo);
router.put('/todos/:id', updateTodo);

export default router; 