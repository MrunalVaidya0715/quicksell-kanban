import React, { useEffect, useState } from 'react';
import './Content.css';
import TicketCard from '../../components/TicketCard/TicketCard';

const Content = () => {

    const userViewState = JSON.parse(localStorage.getItem("userViewState"));
    const groupBy = userViewState.groupBy;
    console.log(groupBy);
    const orderBy = userViewState.orderBy;
    console.log(orderBy);
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
        ticketsData.forEach(ticket => {
            const groupKey = groupBy === 'user' ? ticket.userId : groupBy === 'priority'? ticket.priority: ticket.status;
            if (!groupedTickets[groupKey]) {
                groupedTickets[groupKey] = [];
            }
            groupedTickets[groupKey].push(ticket);
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

        return groupedTickets;
    };

    const groupedAndSorted = groupedAndSortedTickets();
    return (
        <div className='content'>
            <div className='grids'>
                {Object.keys(groupedAndSorted).map(groupKey => (
                    <div key={groupKey}>
                        <h2>{groupKey}</h2>
                        {groupedAndSorted[groupKey].map(ticket => (
                            <TicketCard key={ticket.id} {...ticket} />
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Content;
