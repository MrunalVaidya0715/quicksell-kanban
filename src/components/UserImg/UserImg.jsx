import React from 'react'
import './UserImg.css'
const UserImg = ({name}) => {
    return (
        <div className='userImg'>
            <img src="/assets/userPic.png" alt={name} />
            <div className='available active' />
        </div>
    )
}

export default UserImg