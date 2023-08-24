import React, {useState } from 'react';
import './Navbar.css';
import { VscSettings } from 'react-icons/vsc';
import { FiChevronDown } from 'react-icons/fi';
import { useUserViewState } from '../../context/UserViewStateContext';
const Navbar = () => {
    const [isOption, setIsOpen] = useState(false);
    const handleOption = () => {
        setIsOpen(prev => !prev);
    }

    const { userViewState, updateUserViewState } = useUserViewState();
    const {groupBy, orderBy} = userViewState;
    console.log(groupBy, "--", orderBy)

    const handleGroupBy = (e) => {
        const newGroupBy = e.target.value;
        updateUserViewState(newGroupBy, userViewState.orderBy);
        setIsOpen(false);
    };

    const handleOrderBy = (e) => {
        const newOrderBy = e.target.value;
        updateUserViewState(userViewState.groupBy, newOrderBy);
        setIsOpen(false);
    };
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
                                <select onChange={handleGroupBy} value={groupBy}>
                                    <option value="status">Status</option>
                                    <option value="user">User</option>
                                    <option value="priority">Priority</option>
                                </select>

                            </div>
                            <div className='options'>
                                <p style={{ fontWeight: "500", color: "var(--font-sec)" }}>Ordering</p>
                                <select onChange={handleOrderBy} value={orderBy}>
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