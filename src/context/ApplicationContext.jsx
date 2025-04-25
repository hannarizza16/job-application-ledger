import { useReducer, createContext, useEffect } from "react"
import { applicationReducer, initialState } from "../reducers/applicationReducer"


export const ApplicationContext = createContext()

export function ApplicationProvider({ children }) {
    const [state, dispatch] = useReducer(applicationReducer, initialState)
    
    return (
        <ApplicationContext.Provider value={{ state, dispatch}}>
            {children}
        </ApplicationContext.Provider>
    )
}