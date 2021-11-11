
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
// load all eventlisteners 
loadEventListeners();

function loadEventListeners(){
  // load dom events (' loading local storage')
  document.addEventListener('DOMContentLoaded', getTask);
  // add a task event 
 form.addEventListener('submit',addTask);
  // remove a task event 
 taskList.addEventListener('click',removeTask);
  // clear all task event 
 clearBtn.addEventListener('click',removeAll);
 // search for task event 
 filter.addEventListener('keyup',filterEvent);
}
// load tasks 
function getTask(){
  let tasks;
 if(localStorage.getItem('tasks') === null){
 tasks = [];
 } else{
   tasks = JSON.parse(localStorage.getItem('tasks'))
 }
 
 tasks.forEach(function(task){
    // create new li element 
    const li = document.createElement('li');
    // adding class to the new element
     li.className = 'collection-item';
    //appenf text to li element
     li.appendChild(document.createTextNode(task));
    // creat a link  
     const link = document.createElement('a');
    // give calss name to link element  
     link.className = 'delete-item secondary-content';
    // append icon to link element 
     link.innerHTML ='<i class="fa fa-remove"></i>';
    // append link to li element
     li.appendChild(link);
    // append li to ul element 
     taskList.appendChild(li);
 })
}

//add task
 function addTask(e){
   if(taskInput.value ===''){
    alert('Add a task');
   }
   else {
   // create new li element 
   const li = document.createElement('li');
   // adding class to the new element
    li.className = 'collection-item';

    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML ='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    // store task in local storage
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
    }
   e.preventDefault();
 }

 // add tasks to local storage 
function storeTaskInLocalStorage(task){
 let tasks;
 if(localStorage.getItem('tasks') === null){
 tasks = [];
 } else{
   tasks = JSON.parse(localStorage.getItem('tasks'))
 }
 tasks.push(task);

 localStorage.setItem('tasks',JSON.stringify(tasks));

}

 // remove task
 function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
  
   if(confirm('Are you sure?')){ e.target.parentElement.parentElement.remove();

  // remove from local storage 
  removeFromLocalStorage(e.target.parentElement.parentElement);
     }
   }
 }
 // remove from local storage function
 function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
  tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
 
  tasks.forEach(function(task , index){
if(taskItem.textContent === task){
 tasks.splice(index,1);
   }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
 }
 
 
 // remove all task or clear btn
 function removeAll(e){
   if(confirm('Do you want to remove all tasks?'))
   while(taskList.firstChild){
   taskList.removeChild(taskList.firstChild);
   e.preventDefault();
   removeTaskFromLocalStorage();
    }
 }

 //clear all tasks from local storage 
function removeTaskFromLocalStorage(){
localStorage.clear();
}

 // search for task or filter throug our tasks 
 function filterEvent(e){
   const text = e.target.value.toLowerCase();
  
   document.querySelectorAll('.collection-item').forEach
   ( function(task) {
       const item = task.firstChild.textContent;
             if(item.toLowerCase().indexOf(text) != -1){
         task.style.display = 'block';
             }
             else{
         task.style.display = 'none';      
         }
     });
 }
 