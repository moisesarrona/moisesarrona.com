import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const RoutePathContext = createContext();

export const useRoutePath = () => {
    return useContext(RoutePathContext)
} 

export const RoutePathProvider = ({children}) => {
    const location = useLocation()
    const [path, setPath] = useState();

    /**
     * Get path name without /
     */
    useEffect(() => {
        setPath(location.pathname.replace('/', ''))
    }, [location])

    return (
        <RoutePathContext.Provider value={path}>
            {children}
        </RoutePathContext.Provider>
    )
}