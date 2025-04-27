import { useReducer, createContext, useEffect, useState } from "react"
import { applicationReducer, initialState } from "../reducers/applicationReducer"


export const ApplicationContext = createContext()

export function ApplicationProvider({ children }) {
    const [state, dispatch] = useReducer(applicationReducer, initialState)
    const [showSuccess, setShowSuccess] = useState(false)
    
    return (
        <ApplicationContext.Provider value={{ state, dispatch, showSuccess, setShowSuccess}}>
            {children}
        </ApplicationContext.Provider>
    )
}