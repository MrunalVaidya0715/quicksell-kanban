import React from 'react';
import './TicketCard.css';
import { BsExclamationSquareFill } from 'react-icons/bs'
const TicketCard = ({ id, title, userImg, tag, userId }) => {
    return (
        <div className='ticketCard'>
            {/* Info */}
            <div className='info'>
                <div className='idTitle'>
                    <div className='idInfo'>
                        <p>{id}</p>
                    </div>
                    <div className='title'>
                        <p>{title}</p>
                    </div>
                </div>
                <div className='tags'>
                    <div className='status'>
                        <BsExclamationSquareFill />
                    </div>
                    <div className=' tag'>
                        <div className='circle' />
                        {
                            <p>{tag[0]}</p>
                        }
                    </div>
                </div>
            </div>
            {/* UserImg */}
            <div className='userImg'>
                <img src="/assets/userPic.png" alt={userImg} />
                <div className='available active' />
            </div>
        </div>
    )
}

export default TicketCard