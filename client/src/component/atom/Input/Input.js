import React, { useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";

import "./input.css";

const Input = ({ type, showPasswordIcon, error, StartIcon, containerStyle, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(prev => !prev)

    const inputContainerClass = `a-input-container ${error ? "input-error" : ""} ${props.disabled ? "input-disabled" : ""}`

    return (
        <div className={inputContainerClass} style={containerStyle}>
            {StartIcon && <StartIcon style={{ marginRight: 10, color: "gray" }} />}
            <input className="a-input" type={showPasswordIcon ? showPassword ? "text" : "password" : type} {...props} autoComplete="new-password" />
            <div onClick={toggleShowPassword}>
                {showPasswordIcon ? showPassword ? <BsEyeFill color="gray" /> : <BsEyeSlashFill color="gray" /> : null}
            </div>
        </div>
    )
}

Input.defaultProps = {
    type: "text"
}

export default Input
