import React from 'react'
import './UserImg.css'
const UserImg = ({name, isAvail}) => {
    return (
        <div className='userImg'>
            <img src="/assets/userPic.png" alt={name} />
            <div className={`available ${isAvail? "active":""}`} />
        </div>
    )
}

export default UserImg