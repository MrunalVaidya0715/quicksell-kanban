import React from 'react';
import './TicketCard.css';
import { PiCheckCircleFill, PiCircle, PiClockCountdownBold, PiSpinnerLight } from 'react-icons/pi';
import { BsFillExclamationSquareFill } from 'react-icons/bs'
import { MdSignalCellularAlt, MdSignalCellularAlt2Bar, MdSignalCellularAlt1Bar, MdCancel } from 'react-icons/md'
import { CgBorderStyleDashed } from 'react-icons/cg';
import UserImg from '../UserImg/UserImg';
import { useUserViewState } from '../../context/UserViewStateContext';

const TicketCard = ({ id, title, userImg, tag, status, priority }) => {
    const { userViewState } = useUserViewState();
    const { groupBy, orderBy } = userViewState;

    return (
        <div className='ticketCard'>
            {/* Info */}
            <div className='info'>
                <div className='idTitle'>
                    <div className='idInfo'>
                        <p>{id}</p>
                    </div>
                    <div className='title'>
                        {
                            !(groupBy === "status") && (
                                <div>
                                    {
                                        status === "Backlog" ? <PiSpinnerLight style={{ color: 'gray' }} /> :
                                            status === "In progress" ? <PiClockCountdownBold style={{ color: '#FFCC4D' }} /> :
                                                status === "Completed" ? <PiCheckCircleFill style={{ color: 'blue' }} /> :
                                                    status === "Cancelled" ? <MdCancel style={{ color: 'gray' }} /> : <PiCircle style={{ color: 'gray' }} />
                                    }
                                </div>
                            )
                        }
                        <p>{title}</p>
                    </div>
                </div>
                <div className='tags'>
                    {
                        !(groupBy === "priority") && (
                            <div className='status'>
                                {
                                    priority === 4 ? <BsFillExclamationSquareFill style={{ color: 'red' }} /> :
                                        priority === 3 ? <MdSignalCellularAlt style={{ color: 'darkslategrey' }} /> :
                                            priority === 2 ? <MdSignalCellularAlt2Bar style={{ color: 'darkslategrey' }} /> :
                                                priority === 1 ? <MdSignalCellularAlt1Bar /> : <CgBorderStyleDashed style={{ color: 'darkslategrey' }} />
                                }
                            </div>
                        )
                    }
                    <div className=' tag'>
                        <div className='circle' />
                        {
                            <p>{tag[0]}</p>
                        }
                    </div>
                </div>
            </div>
            {/* UserImg */}
            {
                !(groupBy === "user") && <UserImg />
            }
        </div>
    )
}

export default TicketCard