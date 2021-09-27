import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai"

import Avatar from "../../atom/Avatar/Avatar";
import { useDispatch } from 'react-redux';
import { todoDeleteTodo } from '../../../reducer/todo/todo.action';

const style = {
    titleStyle: {
        opacity: 0.6,
        width: 150
    },
    textStyle: {
        opacity: 0.8,
    }
}

const EditTodo = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const { todo: { _id, title, description, userId } } = location.state;

    const deleteTodo = async () => {
        const confirm = window.confirm("are you sure you want to delte this todo")
        if (confirm) {
            const response = await dispatch(todoDeleteTodo(_id))
            if (response) history.push("/main/projects");
            else alert("something went wrong")
        }

    }

    return (
        <div>
            <br />
            <div className="flex-space-between">
                <h4>{title}</h4>
                <AiFillDelete size={32} color="gray" className="cursor-pointer" onClick={deleteTodo} />
            </div>
            <div className="flex align-items-center">
                <span style={style.titleStyle}>Created By</span> <Avatar small imageSrc={userId.image || "/user.jpg"} rightTitle={userId.fullname} />
            </div>
            <div className="flex align-items-center">
                <span style={style.titleStyle}>Description</span>
                <p style={style.textStyle}>{description} </p>
            </div>

        </div>
    )
}

export default EditTodo
