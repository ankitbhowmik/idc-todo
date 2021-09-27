import React from 'react';
import LoginRightSection from '../../organism/LoginRightSection/LoginRightSection';
import "./login.css"

const Login = () => {
    return (
        <div className="login-page container">
            <div className="login-hero-image">
                <img src="/todo.png" width={400} height={400} alt="initial login todo" />
            </div>
            <div>
                <LoginRightSection />
            </div>
        </div>
    )
}

export default Login
