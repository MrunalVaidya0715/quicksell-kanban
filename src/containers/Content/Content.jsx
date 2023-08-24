import React, { useEffect, useState } from 'react';
import './Content.css';
import TicketCard from '../../components/TicketCard/TicketCard';
import Label from '../../components/Label/Label';
import { useUserViewState } from '../../context/UserViewStateContext';

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


    const groupedAndSortedTickets = () => {

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

    const groupedAndSorted = groupedAndSortedTickets();

    const getLabelForGroupKey = (groupKey) => {
        if (groupBy === 'priority') {
            const priorityLabels = {
                4: 'Urgent',
                3: 'High',
                2: 'Medium',
                1: 'Low',
                0: 'No priority'
            };
            return priorityLabels[groupKey];
        } else if (groupBy === 'status') {
            const statusLabels = {
                'Todo': 'To Do',
                'In progress': 'In Progress',
                'Backlog': 'Backlog',
                'Completed': 'Completed',
                'Cancelled': 'Cancelled'
            };
            return statusLabels[groupKey];
        } else if (groupBy === 'user') {
            const user = usersData.find(user => user.id === groupKey);
            return user ? user.name : '';
        }
    };
    return (
        <div className='content'>
            <div className='grids'>
                {Object.keys(groupedAndSorted.groupedTickets).map(groupKey => (
                    <div key={groupKey}>
                        <Label labelText={getLabelForGroupKey(groupKey)} ticketCount={groupedAndSorted.ticketCounts[groupKey]} />
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
