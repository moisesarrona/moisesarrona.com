import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const RouteContext = createContext();

export const useRoute = () => {
    return useContext(RouteContext)
} 

export const RouteProvider = ({children}) => {
    const location = useLocation()
    const [path, setPath] = useState();

    /**
     * Get path name without /
     */
    useEffect(() => {
        setPath(location.pathname.replace('/', ''))
    }, [location])

    return (
        <RouteContext.Provider value={path}>
            {children}
        </RouteContext.Provider>
    )
}