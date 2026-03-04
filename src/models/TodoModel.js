const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'todo title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  isDone: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);