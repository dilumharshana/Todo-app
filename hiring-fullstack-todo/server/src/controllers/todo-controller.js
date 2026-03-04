import Todo from '../models/todo-model.js';
import { STATUS } from '../constants/constants.js';

/**
 * Get all todos
 * route - GET /apitodos
 */
export const getAllTodos = async (req, res, next) => {
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
      res.status(STATUS.NOT_FOUND);
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

/**
 * Toggle task completion status
 * route - PATCH /api/todos/:id/done
 */
export const updateTodoIsDone = async (req, res, next) => {
  try {
    // get todo by todo id
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(STATUS.NOT_FOUND);
      throw new Error('Task not found.');
    }

    // if todos isDone status is true -> false, false -> true
    todo.isDone = !todo.isDone;
    
    //update todo status
    const updatedTodo = await todo.save();
    
    res.status(STATUS.SUCCESS).json(updatedTodo);
  } catch (error) {
    next(error); 
  }
};


/**
 * Remove a task from the database
 * route - DELETE /api/todos/:id
 */
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(STATUS.NOT_FOUND);
      throw new Error('Task not found.');
    }

    // delete todo
    await todo.deleteOne();

    res.status(STATUS.SUCCESS).json({ 
      id: req.params.id,
      message: 'Task successfully removed' 
    });
  } catch (error) {
    next(error);
  }
};