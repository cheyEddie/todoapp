const mongoose = require('mongoose')
const todoSchema = mongoose.Schema({
    task:{type:String,required:true},
    description:{type:String,required:true},
    done:{type:Boolean,default:0}
})
module.exports = mongoose.model('Todo',todoSchema)