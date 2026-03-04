import Todo from '../models/todo-model.js';
import { STATUS } from '../constants/constants.js';

/**
 * Get all todos
 * route - GET /apitodos
 */
export const getTodos = async (req, res, next) => {
    try {
        // get todos form db 
        const todos = await Todo.find();
        res.status(STATUS.SUCCESS).json(todos);
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new todo item
 * route - POST /api/todos
 */
export const createTodo = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        // validate todo title and description 
        if (!title) {
            res.status(STATUS.BAD_REQUEST);
            throw new Error('Please add a title');
        }

        const todo = new Todo({
            title: title,
            description: description || '',
        });

        // create new todo 
        const savedTodo = await todo.save();

        res.status(STATUS.CREATED).json(savedTodo);

    } catch (error) {
        next(error);
    }
};

/**
 * Update todo item
 * route - PUT /api/todos/:id
 */
export const updateTodo = async (req, res, next) => {
  try {
    // get todo by todo id
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404);
      throw new Error('Task not found');
    }

    //update todo
    todo.title = req.body.title || todo.title;
    todo.description = req.body.description || todo.description;

    const updatedTodo = await todo.save();
    res.status(STATUS.SUCCESS).json(updatedTodo);

  } catch (error) {
    next(error);
  }
};