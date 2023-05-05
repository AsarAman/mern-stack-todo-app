const Todos = require("../models/Todos");
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require('../errors/notFoundError')
const httpStatusCodes = require("http-status-codes");

const createTodo = async (req, res) => {
  const { name, completed } = req.body;

  if (!name) {
    throw new BadRequestError("Please provide name");
  }
  const todo = await Todos.create({
    name,
    completed,
    createdBy: req.user.userId,
  });
  res.status(httpStatusCodes.CREATED).json({ todo });
};

const getTodos = async (req, res) => {
  const todos = await Todos.find({ createdBy: req.user.userId });
  res.status(httpStatusCodes.OK).json({ todos, amount: todos.length });
};

const updateTodo = async (req, res) => {
  const {id} = req.params
  
  const {name} = req.body
  if(!name){
    throw new BadRequestError('Please provide todo')
  }
  const task = await Todos.findOneAndUpdate({_id:id, createdBy:req.user.userId}, req.body,{new:true, runValidators:true})
  if (!task) {
    
    return res
      .status(httpStatusCodes.NOT_FOUND)
      .json({ msg: `no item with id ${id}`, success: false });
  }
  res.status(httpStatusCodes.OK).json({task, msg:"success"});
};

const deleteTodo = async (req, res) => {
  const {id} = req.params
  
  const task = await Todos.findOneAndDelete({_id:id, createdBy:req.user.userId})
  if(!task){
    return res.status(httpStatusCodes.NOT_FOUND).json({message:`no task found with id ${id}`})
  }
  res.status(httpStatusCodes.OK).json({task, success:true});
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
