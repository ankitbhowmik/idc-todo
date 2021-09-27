import React from 'react';
import { IoChatboxOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Avatar from '../Avatar/Avatar';
import "./todo.css"

const Todo = ({ todo, dragStart, dragEnd }) => {
    const history = useHistory();

    const navigateToEditTodo = () => history.push("/main/edit-todo", { todo });

    return (
        <div draggable="true" className="todo" onClick={navigateToEditTodo} onDragStart={() => dragStart(todo._id)} onDragEnd={dragEnd}>
            <h5 className="todo-title">{todo.title}</h5>
            <p className="todo-description">{todo.description}</p>
            <div className="flex-space-between">
                <Avatar small imageSrc="/user.jpg" />
                <IoChatboxOutline color="gray" />
            </div>
        </div>
    )
}

export default Todo
