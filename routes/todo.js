const express = require('express')
const todoCtrl = require('../controllers/todo')
const router = express.Router()
router.get('/',todoCtrl.getAllTodos)
router.post('/',todoCtrl.createTodo)
router.delete('/:id',todoCtrl.deleteTodo)
router.put('/:id',todoCtrl.updateTodo)
router.put('/done/:id',todoCtrl.setDone)
module.exports = router