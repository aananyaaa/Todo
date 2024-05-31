import {React, Fragment} from "react";
import './styles/global.css';
import './styles/app.css'
import Todo from './components/Todo'
import Todolist from './components/TodoList'
const App = () => {
  return (
    <div class="todo-wrap">
        <Todo/>
        <Todolist/>
    </div>
  );
};
export default App;