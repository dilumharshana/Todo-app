import Todo from '../models/todo-model.js';
import { STATUS } from '../constants/constants.js';

/**
 * Get all todos
 * route - GET /apitodos
 */
export const getTodos = async (req, res) => {
    try {
        // get todos form db 
        const todos = await Todo.find();
        res.status(STATUS.SUCCESS).json(todos);
    } catch (err) {
        console.log(`Error in fetching todos : ${err}`);
        res.status(STATUS.SERVER_ERROR).json({ message: 'Server error' });
    }
};

/**
 * Create a new todo item
 * route - POST /api/todos
 */
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        // validate todo title and description 
        if (!title || title === '') {
            return res.status(STATUS.BAD_REQUEST).json({
                message: 'A title is required to create a task.'
            });
        }

        const todo = new Todo({
            title: title,
            description: description || '',
        });

        // create new todo 
        const savedTodo = await todo.save();

        res.status(STATUS.CREATED).json(savedTodo);

    } catch (error) {
        console.error(`Error in create todo: ${error}`);
        res.status(STATUS.SERVER_ERROR).json({
            message: 'Something went wrong while saving the task.'
        });
    }
};