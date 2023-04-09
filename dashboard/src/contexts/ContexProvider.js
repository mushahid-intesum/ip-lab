import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    userProfile: false,
    notification: false,
}

export const ContextProver = ({ children }) => {
    
    const [activeMenu, setActiveMenue] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    
    const [screenSize, setScreenSize] = useState(undefined);

    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true});
    }
    
    return (
        <StateContext.Provider 
            value={{
                activeMenu, 
                setActiveMenue, 
                isClicked, 
                setIsClicked, 
                handleClick, 
                screenSize, 
                setScreenSize
            }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);