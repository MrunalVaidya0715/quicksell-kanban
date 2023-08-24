import React, { useEffect, useState } from 'react';
import './Content.css';
import TicketCard from '../../components/TicketCard/TicketCard';
import Label from '../../components/Label/Label';
import { useUserViewState } from '../../context/UserViewStateContext';
import { CgBorderStyleDashed } from 'react-icons/cg';
import { BsFillExclamationSquareFill } from 'react-icons/bs'
import { MdSignalCellularAlt, MdSignalCellularAlt2Bar, MdSignalCellularAlt1Bar, MdCancel } from 'react-icons/md'
import { PiSpinnerLight, PiClockCountdownBold, PiCircle, PiCheckCircleFill, } from 'react-icons/pi';
import { IoPersonCircle } from 'react-icons/io5'
import UserImg from '../../components/UserImg/UserImg';
const Content = () => {

    const { userViewState } = useUserViewState();
    const { groupBy, orderBy } = userViewState;
    const [ticketsData, setTicketsData] = useState([]);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then((response) => response.json())
            .then((data) => {
                setTicketsData(data.tickets);
                setUsersData(data.users);
            })
            .catch((error) => console.error(error));
    }, []);


    const groupSortTickets = () => {

        const groupedTickets = {};
        const ticketCounts = {};
        ticketsData.forEach(ticket => {
            const groupKey = groupBy === 'user' ? ticket.userId : groupBy === 'priority' ? ticket.priority : ticket.status;
            if (!groupedTickets[groupKey]) {
                groupedTickets[groupKey] = [];
                ticketCounts[groupKey] = 0;
            }
            groupedTickets[groupKey].push(ticket);
            ticketCounts[groupKey]++;
        });

        for (const key in groupedTickets) {
            groupedTickets[key].sort((a, b) => {
                if (orderBy === 'priority') {
                    return b.priority - a.priority;
                } else {
                    return a.title.localeCompare(b.title);
                }
            });
        }

        return { groupedTickets, ticketCounts };
    };

    const groupedAndSorted = groupSortTickets();

    const groupLabel = (groupKey) => {
        if (groupBy === 'priority') {
            const priorityLabels = {
                4: { label: 'Urgent', icon: <BsFillExclamationSquareFill  style={{color:'red'}} /> },
                3: { label: 'High', icon: <MdSignalCellularAlt  style={{color:'darkslategrey'}}/> },
                2: { label: 'Medium', icon: <MdSignalCellularAlt2Bar style={{color:'darkslategrey'}} /> },
                1: { label: 'Low', icon: <MdSignalCellularAlt1Bar style={{color:'darkslategrey'}} /> },
                0: { label: 'No priority', icon: <CgBorderStyleDashed style={{color:'darkslategrey'}} /> },
            }
            return priorityLabels[groupKey];
        } else if (groupBy === 'status') {
            const statusLabels = {
                'Todo': { label: 'To Do', icon: <PiCircle style={{color:'gray'}} /> },
                'In progress': { label: 'In Progress', icon: <PiClockCountdownBold style={{color:'#FFCC4D'}} /> },
                'Backlog': { label: 'Backlog', icon: <PiSpinnerLight style={{color:'gray'}} /> },
                'Completed': { label: 'Completed', icon: <PiCheckCircleFill style={{color:'blue'}} /> },
                'Cancelled': { label: 'Cancelled', icon: <MdCancel style={{color:'gray'}} /> },
            };
            return statusLabels[groupKey];
        } else if (groupBy === 'user') {
            const user = usersData.find(user => user.id === groupKey);
            return user ? { label: user.name, icon: <UserImg name={user.name} /> } : { label: '', icon: <IoPersonCircle size={24} style={{color: 'darkslategray'}} /> };
        }
    }
    return (
        <div className='content'>
            <div className='grids'>
                {Object.keys(groupedAndSorted.groupedTickets).map(groupKey => (
                    <div key={groupKey}>
                        <Label labelText={groupLabel(groupKey).label} ticketCount={groupedAndSorted.ticketCounts[groupKey]}>
                            {groupLabel(groupKey).icon}
                        </Label>
                        {groupedAndSorted.groupedTickets[groupKey].map(ticket => (
                            <TicketCard key={ticket.id} {...ticket} />
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Content;
