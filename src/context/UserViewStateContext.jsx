// import React, { createContext, useContext, useEffect, useState } from 'react';

// const UserViewStateContext = createContext();

// export const useUserViewState = () => {
//     return useContext(UserViewStateContext);
// };

// export const UserViewStateProvider = ({ children }) => {
//     const initGroupBy = localStorage.getItem('userViewState')?.groupBy || 'status';
//     const initOrderBy = localStorage.getItem('userViewState')?.orderBy || 'priority';

//     const [userViewState, setUserViewState] = useState({
//         groupBy: initGroupBy,
//         orderBy: initOrderBy,
//     });

//     const updateUserViewState = (newGroupBy, newOrderBy) => {
//         setUserViewState({ groupBy: newGroupBy, orderBy: newOrderBy });
//         localStorage.setItem('userViewState',JSON.stringify({ groupBy: newGroupBy, orderBy: newOrderBy }));
//     };

//     useEffect(() => {
//         const savedUserViewState = localStorage.getItem('userViewState');
//         if (savedUserViewState) {
//             const parsedUserViewState = JSON.parse(savedUserViewState);
//             setUserViewState(parsedUserViewState);
//         }
//     }, []);

//     return (
//         <UserViewStateContext.Provider value={{ userViewState, updateUserViewState }}>
//             {children}
//         </UserViewStateContext.Provider>
//     );
// };
import { createContext } from 'react';

export const UserViewStateContext = createContext("");