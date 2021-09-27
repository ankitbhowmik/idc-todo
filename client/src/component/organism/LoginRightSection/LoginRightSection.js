import React, { useState } from 'react';

import "./loginRightSection.css"
import LoginForm from '../../molecule/LoginForm/LoginForm';
import SignupForm from '../../molecule/SignupForm/SignupForm';

const LoginRightSection = () => {
    const [section, setSection] = useState("login");

    return (
        <div className="login-right-section-container">
            <div className="login-switch">
                <p>
                    <span onClick={() => setSection("login")} className={section === "login" ? "active" : ""}>Login</span>
                    <span onClick={() => setSection("signup")} className={section === "signup" ? "active ml-25" : "ml-25"}>Sign up</span>
                </p>
            </div>
            {
                section === "login"
                    ? <LoginForm />
                    : section === "signup"
                        ? <SignupForm />
                        : null
            }

        </div>
    )
}

export default LoginRightSection
