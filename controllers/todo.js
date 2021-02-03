const Todo = require('../models/Todo')
exports.getAllTodos = (req,res)=>{
    if(req.xhr){
        Todo.find()
        .then(todos=>res.status(200).json(todos))
        .catch(error=>res.status(404).json(error))
    }
    else{
        res.render('index')
    }
}
exports.createTodo = (req,res)=>{
    const todo = new Todo({
        ...req.body
    })
    todo.save().then(()=>res.status(200).json(todo))
    .catch(error=>res.status(403).json(error))
}
exports.updateTodo = (req,res)=>{
    Todo.updateOne({_id:req.params.id},{...req.body,_id:req.params.id})
    .then(()=>res.status(200).json({message:'modified'}))
    .catch(error=>res.status(403).json(error))
}
exports.deleteTodo = (req,res)=>{
    Todo.deleteOne({_id:req.params.id})
    .then(()=>console.log('ok'))
    .catch(error=>console.log(error))
}
exports.setDone = (req,res)=>{
    Todo.updateOne({_id:req.params.id},{done:req.body.done,_id:req.params.id})
    .then(()=>console.log('Ok'))
    .catch(error=>res.json(error))
}