let editTodo = document.querySelector('.edit-todo')
let todoModal = document.querySelector('#todo-modal')
let editModal = document.querySelector('#edit-modal')
let addModal = document.querySelector('.add-modal')
let newButton = document.querySelector('.new-todo')
let task = document.querySelector('.task')
let description = document.querySelector('.description')
let addButton = document.querySelector('.add')
let todoId = document.querySelector('.todo-id')
let deleteButton = document.querySelector('.delete-todo')
let saveEdit = document.querySelector('.save-edit')
let toDos = document.querySelector('.to-dos')
saveEdit.onclick = function(e){
  e.preventDefault()
  let id = document.querySelector('.input-id').value
  let task = document.querySelector('#task').value
  let description = document.querySelector('#description').value
  modifyTodo(id,task,description)
  editModal.style.display = 'none'
  toDos.innerHTML = ''
  getTodos(data=>{
    for(item of data){
      displayTodos(item)
    }
  })
}
deleteButton.onclick = function(){
  let id = document.querySelector('.todo-id').innerText
  deleteTodo(id)
  todoModal.style.display = 'none'
  toDos.innerHTML = ''
  getTodos(data=>{
    for(item of data){
      displayTodos(item)
    }
  })
}
addButton.onclick = function(e){
  e.preventDefault()
  let task = document.querySelector('#task-add').value
  let description = document.querySelector('#description-add').value
  if(task!=='' && description!==''){
    addTodo(task,description)
    addModal.style.display = 'none'
    toDos.innerHTML = ''
    getTodos(data=>{
      for(item of data){
        displayTodos(item)
      }
    })
  }else{
    alert('veuiller remplir les champs')
  }
}
newButton.addEventListener('click',function(){
  showAdd()
})
editTodo.addEventListener('click',function(){
  showEdit()
})
function checkTodo(checkButton){
  checkButton.parentElement.classList.toggle('completed')
}
function infoModal(data){
  let closeModal = document.querySelector('.close')
  todoModal.style.display = "block"
  todoId.innerText = data._id
  task.innerText = data.task
  description.innerText = data.description
  closeModal.onclick = function() {
    todoModal.style.display = "none"
  }
  window.onclick = function(event) {
    if (event.target == todoModal) {
      todoModal.style.display = "none"
    }
  }
}
function showEdit(){
  let cancel = document.querySelector('.cancel')
  let inputId = document.querySelector('.input-id')
  let taskInput = document.querySelector('#task')
  let descriptionInput = document.querySelector('#description')
  inputId.value = todoId.innerText
  taskInput.value = task.innerText
  descriptionInput.value = description.innerText
  todoModal.style.display = "none"
  editModal.style.display = "block"
  cancel.onclick = function() {
    editModal.style.display = "none"
  }
  window.onclick = function(event) {
    if (event.target == editModal) {
      editModal.style.display = "none"
    }
  }
}
function showAdd(){
  let cancelAdd = document.querySelector('.cancel-add')
  addModal.style.display = 'block'
  cancelAdd.onclick = function() {
  addModal.style.display = "none"
  }
  window.onclick = function(event) {
    if (event.target == addModal) {
      addModal.style.display = "none"
    }
  }
}
function displayTodos(data){
  let todoContainer = document.createElement('div')
  let checkButton = document.createElement('button')
  checkButton.innerHTML = '<i class="fa fa-check"></i>'
  let toDo = document.createElement('li')
  let infoButton = document.createElement('button')
  infoButton.innerHTML = '<i class="fa fa-info"></i>'
  todoContainer.classList.add('todo-container')
  if(data.done && data.done!==undefined){
    todoContainer.classList.add('completed')
  }
  checkButton.classList.add('check-button')
  toDo.classList.add('to-do')
  toDo.innerText = data.task
  infoButton.classList.add('info-button')
  todoContainer.appendChild(checkButton)
  todoContainer.appendChild(toDo)
  todoContainer.appendChild(infoButton)
  toDos.appendChild(todoContainer)
  checkButton.addEventListener('click',function(){
    if(data.done){
      setUndone(data._id)
    }
    else{
      setDone(data._id)
    }
    checkTodo(this)}
  )
  infoButton.addEventListener('click',function(){
    infoModal(data)
  })
}
//Ajax requests
function getTodos(cb){
  $.ajax({
    url:'/',
    type:'GET',
    success:function(data){
      cb(data)
    }
  })
}
getTodos(data=>{
  let listUl = document.querySelector('.to-dos')
  for(item of data){
    displayTodos(item)
  }
})
function addTodo(task,description){
  $.ajax({
    url:'/',
    type:'POST',
    data:{task,description}
  })
}
function deleteTodo(id){
  $.ajax({
    url:'/'+id,
    type:'DELETE',
  })
}
function modifyTodo(id,task,description){
  $.ajax({
    url:'/'+id,
    type:'PUT',
    data:{task,description}
  })
}
function setDone(id){
  $.ajax({
    url:'/done/'+id,
    type:'PUT',
    data:{
      done:true
    }
  })
}
function setUndone(id){
  $.ajax({
    url:'/done/'+id,
    type:'PUT',
    data:{
      done:false
    }
  })
}