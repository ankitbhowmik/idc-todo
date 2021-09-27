import React from 'react'

const GroupAvatar = ({ avatars }) => {
    return (
        <div className="group-avatar">
            {
                avatars.map((imgSrc, index) => {
                    if (index < 4) {
                        return <img key={index} className="avatar-image avatar-small" src={imgSrc} style={{ transform: `translateX(${((index + 1) * -15) + "px"})` }} alt="group avatar" />
                    } else if (index === 4) {
                        return <div key={index} className="avatar-image avatar-remaing-count">+{avatars.length - 4}</div>
                    }
                    return null
                })
            }
        </div>
    )
}

export default GroupAvatar
