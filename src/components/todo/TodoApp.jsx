import TodoData from "./TodoData.jsx";
import TodoNew from "./TodoNew.jsx";
import ToDoImage from "../../assets/react.svg";
import { useState } from "react";

const TodoApp = () => {

    // useState hook
    const [todoList, setTodoList] = useState([])

    // Add new todo
    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 1000000),
            name: name
        }
        setTodoList([...todoList, newTodo])
    }

    // Delete todo
    const deleteTodo = (id) => {
        const newTodo = todoList.filter(item => item.id !== id)
        setTodoList(newTodo)
    }

    // Random id
    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return (
        <div className="todo_container">
            <div className="todo_title">Todo List</div>

            <TodoNew addNewTodo={addNewTodo} />

            {todoList.length > 0 ? (
                <TodoData todoList={todoList} deleteTodo={deleteTodo} />
            ) : (
                <div className="todo_img">
                    <img src={ToDoImage} className="logo" />
                </div>
            )}
        </div>
    );
}

export default TodoApp;