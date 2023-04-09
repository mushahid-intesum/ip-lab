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
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        setThemeSettings(false);
    }

    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
        setThemeSettings(false);
    }


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
                setScreenSize,
                currentColor,
                currentMode,
                themeSettings, setThemeSettings,
                setMode, setColor,
            }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);