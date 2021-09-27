import React, { useState } from 'react'
import "./todoSection.css";
import Todo from '../../atom/Todo/Todo';
import AddTodo from '../../atom/AddTodo/AddTodo';

const TodoSection = ({ name, todos, dragStart, dragEnd, drop }) => {
    const [showAddTodo, setShowAddTodo] = useState(false);

    const toggleShowAddTodo = () => setShowAddTodo(prev => !prev);

    const onDrop = () => drop(name);

    const onDragOver = (e) => {
        e.preventDefault();
    }

    return (
        <div className="todo-section-container" onDrop={onDrop} onDragOver={onDragOver}>
            <div className="flex-space-between">
                <p className="todo-name">{name}</p>
                <p className="todo-button">{todos.length}</p>
            </div>
            <button className="todo-button width-100" onClick={toggleShowAddTodo}>+</button>
            {
                showAddTodo && <AddTodo status={name} closeAddTodo={toggleShowAddTodo} />
            }
            {
                todos.map((todo, index) => (
                    <Todo
                        key={index}
                        todo={todo}
                        dragStart={dragStart}
                        dragEnd={dragEnd}
                    />)
                )
            }
        </div>
    )
}

TodoSection.defaultProps = {
    todos: [],
    name: "Name",
}

export default TodoSection
