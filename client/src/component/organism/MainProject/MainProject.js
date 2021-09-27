import React, { useEffect, useRef } from "react";
import { IoOptions } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { todoGetTodos, todoOnDropItem } from "../../../reducer/todo/todo.action";
import TodoSection from "../../molecule/TodoSection/TodoSection";

const MainProject = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todoGetTodos());
    }, [dispatch])

    const { todos } = useSelector(state => state.todo);

    // drag logic
    const dragItemId = useRef("");  // storing dragged todo id dragged todo 
    const dragStart = (id) => dragItemId.current = id
    const dragEnd = () => dragItemId.current = "" // resetting drag value on drag end
    const drop = (todoSectionName) => dispatch(todoOnDropItem(dragItemId.current, todoSectionName))

    return (
        <div className="animate-route">
            <br />
            <div className="flex-space-between">
                <h4>Projects</h4>
                <div style={{ cursor: "pointer" }}>
                    <IoOptions color="gray" size={15} className="mr-15" />
                    <span className="gray-text">Filter</span>
                </div>
            </div>
            <br />
            <div className="flex-space-between flex-gap-25" style={{ alignItems: "flex-start" }}>
                <TodoSection
                    name="To do"
                    dragStart={dragStart}
                    dragEnd={dragEnd}
                    drop={drop}
                    todos={todos.filter(todo => todo.status === "To do")}
                />
                <TodoSection
                    name="In Progress"
                    dragStart={dragStart}
                    dragEnd={dragEnd}
                    drop={drop}
                    todos={todos.filter(todo => todo.status === "In Progress")}
                />
                <TodoSection
                    name="Completed"
                    dragStart={dragStart}
                    dragEnd={dragEnd}
                    drop={drop}
                    todos={todos.filter(todo => todo.status === "Completed")}
                />
            </div>
        </div>
    )
}

export default MainProject
