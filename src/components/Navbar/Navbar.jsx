import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { VscSettings } from 'react-icons/vsc';
import { FiChevronDown } from 'react-icons/fi';
const Navbar = () => {
    const [isOption, setIsOpen] = useState(false);
    const handleOption = () => {
        setIsOpen(prev => !prev);
    }

    const [groupBy, setGroupBy] = useState(localStorage.getItem('userViewState')?.groupBy || "status");
    const [orderBy, setOrderBy] = useState(localStorage.getItem('userViewState')?.orderBy || "priority")
   
    const handleGroupBy = (e) => {
        const newGroupBy = e.target.value;
        setGroupBy(newGroupBy);
        localStorage.setItem('userViewState', JSON.stringify({ groupBy: newGroupBy, orderBy: orderBy }));
    }
    
    const handleOrderBy = (e) => {
        const newOrderBy = e.target.value;
        setOrderBy(newOrderBy);
        localStorage.setItem('userViewState', JSON.stringify({ groupBy: groupBy, orderBy: newOrderBy }));
    }

    

    useEffect(() => {
        const savedUserViewState = localStorage.getItem('userViewState');
        if (savedUserViewState) {
            const parsedUserViewState = JSON.parse(savedUserViewState);
            setGroupBy(parsedUserViewState.groupBy);
            setOrderBy(parsedUserViewState.orderBy);
        }
    }, []);
    return (
        <nav className='kn__container'>
            <div className='kn__navbar'>
                <button onClick={handleOption}>
                    <VscSettings style={{ transform: "rotate(90deg)" }} />
                    <p style={{ color: 'black' }}>Display</p>
                    <FiChevronDown />

                </button>
                {
                    isOption && (
                        <div className='option'>
                            <div className='options'>
                                <p style={{ fontWeight: "500", color: "var(--font-sec)" }}>Grouping</p>
                                <select onChange={handleGroupBy}>
                                    <option value="status">Status</option>
                                    <option value="user">User</option>
                                    <option value="priority">Priority</option>
                                </select>

                            </div>
                            <div className='options'>
                                <p style={{ fontWeight: "500", color: "var(--font-sec)" }}>Ordering</p>
                                <select onChange={handleOrderBy}>
                                    <option value="priority">Priority</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                        </div>
                    )
                }

            </div>

        </nav>
    )
}

export default Navbar