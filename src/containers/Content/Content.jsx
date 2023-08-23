import React, { useEffect, useState } from 'react';
import './Content.css';
import TicketCard from '../../components/TicketCard/TicketCard';

const Content = () => {

    const userViewState = JSON.parse(localStorage.getItem("userViewState"));
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


    return (
        <div className='content'>
            <div className='grids'>
                {ticketsData.map((ticket) => (
                    <TicketCard key={ticket.id} {...ticket} />
                ))}
            </div>
        </div>
    );
}

export default Content;
