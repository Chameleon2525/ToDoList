var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var toggleIcon = document.getElementById('toggleIcon');
    var todosUl = document.querySelector('ul').children;

    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    //gets number of completed todos
    this.todos.forEach(function(todo){
      if(todo.completed===true){
        completedTodos++;
      }
    })

    //toggles all todo items based on number of completed.
      this.todos.forEach(function(todo){
        if (completedTodos === totalTodos) {
          toggleIcon.className = "";
          toggleIcon.className = "fa fa-toggle-off";//changes toggle to off by adding class
          todo.completed = false;
        }
        else{
            toggleIcon.className = "";
            toggleIcon.className = "fa fa-toggle-on";//changes toggle to off by adding class
            todo.completed = true;
        }
      });

    }
  }


  var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    if(addTodoTextInput.value !== ""){
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
    }
    view.displayTodos(); 
  },
  changeTodo: function() {
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {

  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(function(todo, position){

      var todoLi = document.createElement('li');


      todoLi.textContent = todo.todoText;
      todoLi.id = position; //gives each li element a unique id
      debugger;
      var deleteButton = todoLi.appendChild(this.createDeleteButton()); //adds delete button to display function
      todoLi.insertBefore(todoLi.childNodes[1], todoLi.childNodes[0]); //put delete button first

      //Change toDo element
      var toggleButton = todoLi.appendChild(this.createToggleTodoButton());

      todoLi.appendChild(document.createElement("hr")); //add horizontal line
      if(todo.completed === true){
        toggleButton.firstChild.className = 'fa fa-check-circle-o';
        todoLi.style.cssText = "text-decoration: line-through";
     }
    
      todosUl.appendChild(todoLi);
    }, this); //this is now specifying the object for this callback function
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button'); //create a button
    deleteButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>'; //text for element
    deleteButton.className = 'Button--delete'; //class name
    return deleteButton;
  },
  createToggleTodoButton: function(){
    var toggleButton = document.createElement('button'); //create a button
    toggleButton.innerHTML = '<i class="fa fa-circle-o" aria-hidden="true"></i>'; //text for element
    toggleButton.className = 'Button--toggle'; //class name
    return toggleButton;
  },
  setUpEventListeners: function(){
    var todosUl = document.querySelector('ul'); //select html <ul> element 


    //click events
    todosUl.addEventListener('click', function(event){

      // get element clicked on
      var elementClicked = event.target;

      //check if element clicked is delete button
      if(elementClicked.className === 'fa fa-trash-o'){
        handlers.deleteTodo(parseInt(elementClicked.attributes.class.ownerDocument.activeElement.parentElement.id));//deletes specific li element using ID
      }

      //Toggle completed li element
      if(elementClicked.className === 'fa fa-circle-o'){ //toggle on
        elementClicked.parentNode.parentNode.style.cssText = "text-decoration: line-through";
        elementClicked.outerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>';
        todoList.toggleCompleted(elementClicked.attributes.class.ownerDocument.activeElement.parentElement.id); //trying to access li elemnt id clicked to toggle completed
      }
      if(elementClicked.className === 'fa fa-check-circle-o'){//toggle off
        elementClicked.parentNode.parentNode.style.cssText = "text-decoration: none";
        elementClicked.outerHTML = '<i class="fa fa-circle-o" aria-hidden="true"></i>';
        todoList.toggleCompleted(elementClicked.attributes.class.ownerDocument.activeElement.parentElement.id); //trying to access li elemnt id clicked to toggle completed
      }

    });

    //Double Click events
    todosUl.addEventListener('dblclick',function(event){
      var elementClicked = event.target;
      var oritext = elementClicked.childNodes[0].data; //save original text
      elementClicked.childNodes[0].data = ""; //empty text box
      if(elementClicked.children[0].id !== 'changeTodoTextInput'){ //make sure one hasn't been made
        $(elementClicked).prepend("<input id = 'changeTodoTextInput' type='text'>"); //add input text HTML jQuery
        $("#changeTodoTextInput").focus(); //focus cursor


        $(todosUl).on('focusout', 'li > input', function () { //when focus is outside of li input
          var textInputBox = $(this)[0];
          textInputBox.parentElement.prepend(textInputBox.value || oritext); //change li text to new or original text
          todoList.changeTodo(textInputBox.parentElement.id, textInputBox.value || oritext); //update Todos object
          textInputBox.remove(); //remove input box
        });
      }


    });

  }
};

view.setUpEventListeners();

//Add text using enter key
var addTodoTextInput = document.getElementById('addTodoTextInput');//for add todo
//var changeTodoTextInput = document.getElementById('changeTodoTextInput');

addTodoTextInput.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (addTodoTextInput.value != '' && event.keyCode === 13) {
      handlers.addTodo();
  }
});