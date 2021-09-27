import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./setting.style.css"
import { FiEdit } from 'react-icons/fi';
import Input from '../../atom/Input/Input';
import { userUpdateUserInfo } from '../../../reducer/user/user.action';

const Setting = () => {
    const dispatch = useDispatch();

    let { fullname, email, image } = useSelector(state => state.user);
    const [state, setState] = useState({
        fullname: "",
        email: "",
        image: "",
        disableFullname: true,
        disableEmail: true,
    })

    useEffect(() => {
        setState(prev => ({ ...prev, fullname, email, image }));
    }, [fullname, email, image])

    const toggleDisableEmail = () => setState(prev => ({ ...prev, disableEmail: !state.disableEmail, email }));
    const toggleDisableFullname = () => setState(prev => ({ ...prev, disableFullname: !state.disableFullname, fullname }));
    const changeState = (e) => setState(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = async () => {
        const data = await dispatch(userUpdateUserInfo(state.fullname, state.email, state.image));
        if (data.success) {
        }
    }

    return (
        <div className="flex flex-center animate-route">
            <div className="card">
                <div className="card-image">
                    <img src={image || "/user.jpg"} alt="John" style={{ width: "100%" }} />
                    <div className="edit-icon">
                        <FiEdit />
                    </div>
                </div>
                <div>
                    <div className="flex align-items-center">
                        <p>Full Name</p>
                        &nbsp;
                        <FiEdit onClick={toggleDisableFullname} />
                    </div>
                    <Input name="fullname" value={state.fullname} onChange={changeState} disabled={state.disableFullname} />
                </div>
                <div>
                    <div className="flex align-items-center">
                        <p>Email</p>
                        &nbsp;
                        <FiEdit onClick={toggleDisableEmail} />
                    </div>
                    <Input name="email" value={state.email} onChange={changeState} disabled={state.disableEmail} />
                </div>
                <p>
                    <button
                        className="button todo-button"
                        onClick={onSubmit}
                    >
                        Save
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Setting
