import express from 'express';
import { getTodos } from '../controllers/todo-controller.js';

const router = express.Router();

// system routes 
app.use('/api/v1/system-health',   async (req, res) => res.status(200).json({'status': 'ok'}));

// todo routes 
router.get('/todos', getTodos);

export default router; 