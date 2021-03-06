const express = require('express')
const todoRoute = require('./routes/todo')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Successfully conected to the database'))
.catch(error=>console.log(error))
app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/assets',express.static(__dirname+'/node_modules/jquery/dist/'))
app.use('/',express.static('public'))
app.use('/',todoRoute)

module.exports = app