import { useReducer, createContext, useEffect, useState } from "react"
import { applicationReducer, initialState } from "../reducers/applicationReducer"
import { ACTION_TYPES } from "../action-types/actionTypes"


export const ApplicationContext = createContext()

export function ApplicationProvider({ children }) {
    const [state, dispatch] = useReducer(applicationReducer, initialState)
    const { applications} = state

    const [showSuccess, setShowSuccess] = useState(false)
    
    useEffect(() => {
            if(applications && applications.length > 0){
                localStorage.setItem('applications', JSON.stringify(applications))
            }
        }, [applications])
    
        useEffect(() => {
            try {
                const savedApplications = localStorage.getItem('applications')
                if (savedApplications && savedApplications !== "undefined" && savedApplications !== "null") {
                    dispatch({type: ACTION_TYPES.LOAD_APPLICATIONS, data: JSON.parse(savedApplications) })
                } else {
                    dispatch({type: ACTION_TYPES.LOAD_APPLICATIONS, data: [] })
                }
            } catch (error) {
                console.error("Error loading application from local storage")
                dispatch({type: ACTION_TYPES.LOAD_APPLICATIONS, data: [] })
            }
        }, [])

    return (
        <ApplicationContext.Provider value={{ state, dispatch, showSuccess, setShowSuccess}}>
            {children}
        </ApplicationContext.Provider>
    )
}