import { useState } from "react";

const TodoNew = (props) => {
    const { addNewTodo } = props

    // useState hook
    const [valueInput, setValueInput] = useState("NHKBUILD")

    const handleOnChange = (name) => {
        setValueInput(name)
    }

    const handleClick = () => {
        addNewTodo(valueInput)
        setValueInput("")
    }
    console.log(">>>check")
    return (
        <div className="todo_new">
            <input type="text"
                placeholder="Enter your task"
                value={valueInput}
                onChange={(event) => handleOnChange(event.target.value)} />
            <button onClick={handleClick} style={{ cursor: "pointer" }} >Add</button>
            <div>Say my name : {valueInput}</div>
        </div>
    )
}

export default TodoNew;