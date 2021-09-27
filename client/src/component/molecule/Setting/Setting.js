import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FiEdit } from 'react-icons/fi';
import Input from '../../atom/Input/Input';
import { userUpdateUserInfo } from '../../../reducer/user/user.action';

import "./setting.style.css"

const Setting = () => {
    const dispatch = useDispatch();

    const [imagePreview, setImagePreview] = useState("");
    let { fullname, email, image } = useSelector(state => state.user);
    const [state, setState] = useState({
        fullname: "",
        email: "",
        image: {},
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
            alert("data suuccessfully updated")
        } else {
            alert("oops something went wrong")
        }
    }

    const uploadImage = (e) => {
        const file = e.target.files[0];
        if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl)
            setState(prev => ({ ...prev, image: file }));
        } else {
            alert("oops only jpeg, jpg and png format are allowed");
        }
    }

    return (
        <div className="flex flex-center animate-route">
            <div className="card">
                <div className="card-image">
                    <img src={imagePreview || image || "/user.jpg"} alt="John" style={{ width: "100%" }} />
                    <div className="edit-icon">
                        <label htmlFor="image-upload">
                            <FiEdit />
                        </label>
                        <input id="file-input" type="file" id="image-upload" style={{ display: "none", visibility: "none" }} onChange={uploadImage} />
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
