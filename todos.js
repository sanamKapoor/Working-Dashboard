//        Todo List

let todoInput = document.getElementById('todo');
let todoBtn = document.getElementById('add-todo-btn');
let todoSection = document.getElementById('custom-todos');

//      Init fun

function init(){
  let initTodos = JSON.parse(localStorage.getItem('todos'));

  if(initTodos){
    makeTodo();
  }
}

init();

todoBtn.addEventListener('click', addTodo);

function addTodo(){
  let todo = todoInput.value;
  let todos = [];

  if(todo.trim() === undefined || todo.trim() === ''){
    return;
  }

  if(localStorage.getItem('todos') === null)
  {
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  } 

  makeTodo();

  todoInput.value = '';
}

function makeTodo(){
  todoSection.innerHTML = '';
  let completeTodos = JSON.parse(localStorage.getItem('completeTodos')) ? JSON.parse(localStorage.getItem('completeTodos')) : [];

  let allTodos = JSON.parse(localStorage.getItem('todos'));

  allTodos.forEach(todo => {

  let todoRow = document.createElement('div');
  let todoCol_1 = document.createElement('div');
  let todoCol_2 = document.createElement('div');

  todoRow.className = 'todo row shadow p-2 no-gutters my-2';
  todoCol_1.className = 'col-10 d-flex justify-content-start align-items-center';
  todoCol_2.className = 'col-2 text-center align-self-center';

  let checkBtn = document.createElement('i');
  let deleteBtn = document.createElement('i');

  checkBtn.className = 'far fa-circle mx-3 mx-sm-4';
  deleteBtn.className = 'far fa-trash-alt';

  if(completeTodos){
    completeTodos.forEach(t => {
      if(t === todo){
        checkBtn.className = 'far fa-check-circle mx-3 mx-sm-4';
        todoRow.style.backgroundColor = 'lightslategray';
      }
    })
  }

  let todoText = document.createElement('h5');
  todoText.className = 'align-self-center text-break';
  todoText.innerHTML = `${todo}`;

  todoCol_1.append(checkBtn);
  todoCol_1.append(todoText);
  todoCol_2.append(deleteBtn);

  todoRow.append(todoCol_1);
  todoRow.append(todoCol_2);

  todoSection.append(todoRow);

  //      Complete Todo

  checkBtn.addEventListener('click', e => {
    let c = e.target.className;
    
    if(c === 'far fa-circle mx-3 mx-sm-4'){ 
      if(localStorage.getItem('completeTodos') === null)
        {
          completeTodos.push(todo);
          localStorage.setItem('completeTodos', JSON.stringify(completeTodos));

        } else {
          completeTodos = JSON.parse(localStorage.getItem('completeTodos'));
          completeTodos.push(todo);
          localStorage.setItem('completeTodos', JSON.stringify(completeTodos));
        } 

      e.target.className = 'far fa-check-circle mx-3 mx-sm-4';
      todoRow.style.backgroundColor = 'lightslategray';
    } 
    else {
      completeTodos = completeTodos.filter(t => {
        if(t !== todo){
          return t;
        }
      });

      localStorage.setItem('completeTodos', JSON.stringify(completeTodos));

      e.target.className = 'far fa-circle mx-3 mx-sm-4';
      todoRow.style.backgroundColor = 'lightcoral';
    }
  })

  //      Delete Todo

    deleteBtn.addEventListener('click', e => {
      let remainTodos = allTodos.filter(t => {
        if(t !== todo){
          return t;
        }
      });

      let remainCpltTodos = completeTodos.filter(t => {
        if(t !== todo){
          return t;
        }
      })

    localStorage.setItem('todos', JSON.stringify(remainTodos));
    localStorage.setItem('completeTodos', JSON.stringify(remainCpltTodos));
    makeTodo();

    });

  });

}