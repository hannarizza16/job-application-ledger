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
    applications: []
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
            // const requiredFields = ['company', 'position', 'status', 'date', 'note'];
            // const hasEmptyField = requiredFields.some(field => !state.formData[field]);

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
                applications: action.data
            }
        case 'DELETE_APPLICATION':
            return {
                ...state,
                applications: state.applications.filter((app) => app.id !== action.id)
            }
        case 'ARCHIVE_APPLICATION':
            return {
                ...state,
                applications: state.applications.map((app) =>
                    app.id === action.id ? { ...app, isArchive: true } : app
                )
            }
        default:
            return state
    }

}