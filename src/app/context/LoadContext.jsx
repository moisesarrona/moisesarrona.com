import { createContext, useContext, useState } from "react";

const PreloaderContext = createContext();

export const usePreloader = () => {
    return useContext(PreloaderContext);
}

export const PreloaderProvider = ({children}) => {
    const [preloaderFinished, setPreloaderFinished] = useState(false);

    const markPreloaderFinished =() =>{
        setPreloaderFinished(true)
    }

    return  (
        <PreloaderContext.Provider value={{preloaderFinished, markPreloaderFinished }}>
            {children}
        </PreloaderContext.Provider>
    )
}