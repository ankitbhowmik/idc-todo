import React from 'react'

import "./avatar.css"

const Avatar = ({ imageSrc, title, small, rightTitle }) => {
    const avatarClassNames = "avatar-image " + (small ? "avatar-small" : "");
    return (
        <div className="avatar">
            {title && <span className="avatar-title">{title}</span>}
            <img src={imageSrc} alt="avatar " className={avatarClassNames} />
            {rightTitle && <span className="avatar-title">{rightTitle}</span>}

        </div>
    )
}

export default Avatar
