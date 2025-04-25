import Status from './Status';
import { ACTION_TYPES } from '../action-types/actionTypes';
import { applicationReducer, initialState } from '../reducers/applicationReducer';
import './Input.css'

import { useEffect, useReducer, useState} from "react"

export default function Input() {

    const [state, dispatch] = useReducer(applicationReducer, initialState)
    const [showSuccess, setShowSuccess] = useState(false)

    const handleInputChange = (field, value) => {
        dispatch({type: ACTION_TYPES.SET_INPUT_FIELD, field, value })
    }

    const handleAddApplication = () => {
        const prevLength = state.applications.length;

        if (state.applications.length === prevLength){
            dispatch({type: ACTION_TYPES.SET_ADD_APPLICATIONS})
        }

        dispatch({type: ACTION_TYPES.RESET_FORM})
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    }

    useEffect(() => {
        if(state.applications.length > 0){
            localStorage.setItem('applications', JSON.stringify(state.applications))
        }
    }, [state.applications])

    useEffect(() => {
        try {
            const savedApplications = localStorage.getItem('applications')
                dispatch({type: ACTION_TYPES.LOAD_APPLICATIONS, data: JSON.parse(savedApplications) })
        } catch (error) {
            console.error("Error loading application from local storage")
        }
    }, [])
    

    const statusOptions = [
        "Applied",
        "HR Interview",
        "Technical Interview",
        "Final Interview",
        "Preparing",
        "Reject"
    ]


    return (
        <>
            <div className="flex w-full h-full gap-5" >
                <div className='flex w-1/3 justify-start shadow-md'>
                    <Status applications={state.applications}  />
                </div>
                <div className='flex w-full h-full '>
                    <form className="formContainer " onSubmit={(e) => e.preventDefault()}  >
                        <label className="text-[10px]"> Company Name</label>
                        <input type="text" placeholder="Company Name" value={state.formData.company} onChange={(e) => handleInputChange("company", e.target.value)} />
                        <input type="text" placeholder="Position" value={state.formData.position} onChange={(e) => handleInputChange("position", e.target.value)} />
                        <input type="date" value={state.formData.date} onChange={(e) => handleInputChange("date", e.target.value)} />

                        <select value={state.formData.status} onChange={(e) => handleInputChange("status", e.target.value)} className='border border-black mb-4 p-1 round-lg'>
                            <option hidden>Status</option>
                            {statusOptions.map((status) => (
                                <option key={status} value={status}> {status} </option>
                            ))}
                        </select>

                        <textarea placeholder="Note" value={state.formData.note} onChange={(e) => handleInputChange("note", e.target.value)} />
                        <button type="button" onClick={handleAddApplication} className={`bg-green-100 hover:bg-green-200`}>
                            Add Application
                        </button>
                        {
                            showSuccess && (
                                <div className="success-message animate-fade-in-out">
                                    ✅ New application added successfully!
                                </div>
                            )}
                    </form>
                </div>
            </div>

        </>
    )
}