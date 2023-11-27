import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const useLoader = () => {
    return useContext(LoaderContext);
}

export const LoaderProvider = ({children}) => {
    const [loaderFinished, setLoaderFinished] = useState(false);

    const markLoaderFinished =() =>{
        setLoaderFinished(true)
    }

    return  (
        <LoaderContext.Provider value={{loaderFinished, markLoaderFinished }}>
            {children}
        </LoaderContext.Provider>
    )
}