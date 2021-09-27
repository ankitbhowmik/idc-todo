import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Input from "../Input/Input";
import { todoCreateTodo } from "../../../reducer/todo/todo.action";

const AddTodo = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        title: "",
        description: "",
        error: "",
    })

    const onChange = (e) => setState(prev => ({ ...prev, error: "", [e.target.name]: e.target.value }))

    const addTodo = async () => {
        const data = await dispatch(todoCreateTodo(state.title, state.description, props.status));
        if (data.success) {
            props.closeAddTodo();
        } else {
            alert("something went wrong");
            setState(prev => ({ ...prev, error: data.error }))
        }
    }

    return (
        <div className="todo">
            <span style={{ color: "red", fontSize: 12 }}>{state.error}</span>
            <Input type="text" name="title" value={state.title} onChange={onChange} placeholder="Give your task a title" containerStyle={{ border: "none", padding: 0 }} />
            <textarea name="description" rows={5} value={state.description} onChange={onChange} placeholder="Description...">

            </textarea>
            <button className="todo-button" onClick={addTodo}>Add</button>
        </div>
    )
}

export default AddTodo
