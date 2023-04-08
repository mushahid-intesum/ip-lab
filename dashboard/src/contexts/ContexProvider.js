import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    userProfile: false,
    notification: false,
}

export const ContextProver = ({ children }) => {
    
    const [activeMenu, setActiveMenue] = useState(true);
    
    return (
        <StateContext.Provider value={{activeMenu, setActiveMenue,}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);