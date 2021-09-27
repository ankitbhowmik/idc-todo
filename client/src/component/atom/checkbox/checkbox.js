import React from 'react'
import { BiSquareRounded } from "react-icons/bi";
import { IoMdCheckbox } from "react-icons/io";
import "./checkbox.css";

const Checkbox = ({ checked, title, onClick, titleStyle = {} }) => {
    return (
        <div onClick={onClick} className="checkbox">
            {checked ? <IoMdCheckbox className="checkbox-check" /> : <BiSquareRounded className="checkbox-check" />}
            <label style={titleStyle}>{title}</label>
        </div>
    )
}

export default Checkbox
