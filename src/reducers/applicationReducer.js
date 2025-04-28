const getTodaysDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]
}

export const initialState = {
    formData: {
        company: "",
        position: "",
        status: "",
        date: getTodaysDate(),
        note: "",
        isArchive: false,
    },
    applications: [],
    isDeleteModalOpen: false,
    deleteTargetId: null,
}

export function applicationReducer(state, action) {
    switch (action.type) {
        case 'SET_INPUT_FIELD':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value
                }
            }
        case 'RESET_FORM':
            return {
                ...state,
                formData: {
                    company: "",
                    position: "",
                    status: "",
                    date: getTodaysDate(),
                    note: "",
                    isArchive: false     
                }
            }
        case 'SET_ADD_APPLICATIONS':
            const {company, position, status, date, note} = state.formData;
            if (!company || !position || !status || !date || !note) {
                alert ("Please fill out all fields")
                return state
            }
            //pag ka add 
            const newApplication = {
                id: Date.now(),
                ...state.formData
            }
            return {
                ...state,
                applications: [...state.applications, newApplication]
            }
        case 'LOAD_APPLICATIONS':
            return {
                ...state,
                applications: action.data || []
            }
        case 'OPEN_DELETE_MODAL':
            return {
                    ...state,
                    isDeleteModalOpen: true,
                    deleteTargetId: action.id
                }
        case 'CLOSE_DELETE_MODAL':
            return{
                ...state,
                isDeleteModalOpen: false,
                deleteTargetId: null,
            }
        case 'DELETE_APPLICATION':
            const updatedApplications = state.applications.filter((app) => app.id !== state.deleteTargetId)
            localStorage.setItem("applications", JSON.stringify(updatedApplications))
            return {
                ...state,
                applications: updatedApplications,
                isDeleteModalOpen: false,
                deleteTargetId: null,
            }
        case 'ARCHIVE_APPLICATION':
            const archiveApplication = state.applications.map((app) => app.id === action.id ? { ...app, isArchive: true } : app )
            localStorage.setItem("applications", JSON.stringify(archiveApplication))
            return {
                ...state,
                applications: archiveApplication
            }
        case 'UNARCHIVE_APPLICATION':
            const unarchiveApplication = state.applications.map((app) => app.id === action.id ? { ...app, isArchive: false } : app )
            localStorage.setItem("applications", JSON.stringify(unarchiveApplication))
            console.log(unarchiveApplication)
            return {
                ...state,
                applications: unarchiveApplication
            }

        default:
            return state
    }

}