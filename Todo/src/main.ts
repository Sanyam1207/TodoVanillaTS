import './style.css';

interface Todo {
  title:string,
  isCompleted:boolean, 
  readonly id:string,
}

const todos:Array<Todo> = [];


const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement;
const todoInput = document.getElementsByName('todo')[0] as HTMLInputElement;
const todoForm = document.getElementById('myform') as HTMLFormElement;


todoForm.onsubmit = (e) => {
  e.preventDefault();

  const todo:Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 100)
  }

  todos.push(todo);
  todoInput.value = ""
  renderTodo(todos);

}

const generateTodoItem = (title:string, isCompleted:boolean, id:string) => {
  const todo = document.createElement('div');

  todo.className = 'todo';
  const checkBox = document.createElement('input')
  checkBox.setAttribute('type', 'checkbox');
  checkBox.className = 'isCompleted';
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find(item => {
      if(item.id === id) item.isCompleted = checkBox.checked;
    })
    paragraph.className = checkBox.checked ? 'textCut' : ''
  }


  const paragraph = document.createElement('p');
  paragraph.innerText = title;
  paragraph.className = isCompleted ? 'textCut' : ''

  
  const button = document.createElement('button');
  button.innerText = "X";
  button.className = 'deleteButton';
  button.onclick = () => {
    deleteTodo(id);
    renderTodo(todos)
  }


  todo.append(checkBox, paragraph, button);
  todosContainer.append(todo)
}

const deleteTodo = (id:string) => {
  const idx = todos.findIndex(item => item.id === id);
  todos.splice(idx, 1)
}

const renderTodo = (todo: Todo[]) => {
  todosContainer.innerText = ""
  todo.forEach(item => {
    generateTodoItem(item.title, item.isCompleted, item.id)
  })
}