import React, { useEffect, useState } from 'react'
import { MdErrorOutline } from "react-icons/md";

import Input from '../../atom/Input/Input';
import Checkbox from '../../atom/checkbox/checkbox';
import { userLogin } from '../../../reducer/user/user.action';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        rememberMe: false,
        disableButton: false,
        email: "",
        password: "",
        errors: {},
    })

    useEffect(() => {
        let rememberMe = localStorage.getItem("rememberMe") === "true" ? true : false;
        if (rememberMe) {
            setState(prev => ({ ...prev, email: localStorage.email, password: localStorage.password || "", rememberMe }))
        }
    }, [])


    const onChange = (e) => {
        const newErrors = { ...state.errors };
        delete newErrors[e.target.name];
        setState(prev => ({ ...prev, [e.target.name]: e.target.value, errors: newErrors }));
    }

    const toggleRememberMe = () => setState(prev => ({ ...prev, rememberMe: !state.rememberMe }));

    const loginIn = async () => {
        setState(prev => ({ ...prev, disableButton: true }));
        const data = await dispatch(userLogin(state.email, state.password));
        setState(prev => ({ ...prev, disableButton: false }));
        if (data.success) {
            if (state.rememberMe) {
                localStorage.rememberMe = state.rememberMe.toString();
                localStorage.email = state.email;
                localStorage.password = state.password;
            } else if (localStorage.rememberMe && !state.rememberMe) {
                localStorage.clear();
            }
            history.push("/main/projects");
        } else {
            setState(prev => ({ ...prev, errors: data.errors }));
        }
    }

    return (
        <div className="login-part">
            <div>
                <p className="blue-text" style={{ fontSize: 24, margin: 0 }}>To Continue</p>
                <p style={{ fontSize: 12, margin: 0, color: "gray" }}>We need your Email &amp; Password</p>
            </div>
            <Input type="text" value={state.email} onChange={onChange} name="email" placeholder="Email" error={state.errors.email} />
            <Input type="password" value={state.password} onChange={onChange} name="password" placeholder="Password" showPasswordIcon={true} error={state.errors.password} />
            <div>
                <button className="button button-lg" onClick={loginIn} disabled={state.disableButton}>Login</button>
            </div>
            {
                Object.keys(state.errors).length ? (
                    <p className="danger-text center-text small-text">
                        <MdErrorOutline /> {Object.values(state.errors)[0]}
                    </p>
                ) : null
            }
            <Checkbox checked={state.rememberMe} title="Remember Me" onClick={toggleRememberMe} titleStyle={{ fontSize: 12 }} />
        </div>
    )
}

export default LoginForm
