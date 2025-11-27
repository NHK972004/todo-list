import { Button, Col, Input, Row } from "antd";
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

    return (
        <div className="todo_new">
            <Row gutter={[8, 8]} align="middle">
                <Col xs={24} sm={18}>
                    <Input
                        size="large"
                        placeholder="Enter your task"
                        value={valueInput}
                        onChange={(event) => handleOnChange(event.target.value)}
                    />
                </Col>
                <Col xs={24} sm={6}>
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={handleClick}
                    >
                        Add
                    </Button>
                </Col>

                <Col span={24}>
                    <span>Say my name : {valueInput || "..."}</span>
                </Col>
            </Row>
        </div>
    )
}

export default TodoNew;