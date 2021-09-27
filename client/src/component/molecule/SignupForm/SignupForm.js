import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { MdErrorOutline } from "react-icons/md";

import Input from '../../atom/Input/Input';
import Checkbox from '../../atom/checkbox/checkbox';
import { userSignUp } from '../../../reducer/user/user.action';

const SignupForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        rememberMe: false,
        disableButton: false,
        email: "",
        fullname: "",
        password: "",
        errors: {},
    })

    const onChange = (e) => {
        const newErrors = { ...state.errors };
        delete newErrors[e.target.name];
        setState(prev => ({ ...prev, [e.target.name]: e.target.value, errors: newErrors }));
    }

    const toggleRememberMe = () => setState(prev => ({ ...prev, rememberMe: !state.rememberMe }));

    const signUp = async () => {
        setState(prev => ({ ...prev, disableButton: true }));
        const data = await dispatch(userSignUp(state.fullname, state.email, state.password));
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
        <div className="login-part" style={{ marginBottom: 3 }}>
            <Input type="text" value={state.fullname} name="fullname" placeholder="Full Name" onChange={onChange} error={state.errors.fullname} />
            <Input type="text" value={state.email} name="email" placeholder="Email" onChange={onChange} error={state.errors.email} />
            <Input type="password" value={state.password} name="password" placeholder="Password" showPasswordIcon={true} onChange={onChange} error={state.errors.password} />
            <div>
                <button disabled={state.disableButton} className="button button-lg" onClick={signUp}>Sign up</button>
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

export default SignupForm
