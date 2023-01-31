import { createContext, useState } from "react";

export const GameControlsContext = createContext();

export const GameControlsProvider = ({children}) => {
    const [controls, setControls] = useState({button: '', speedModifier: 0});
    return <GameControlsContext.Provider value={{controls, setControls}}>
        {children}
    </GameControlsContext.Provider>
};

