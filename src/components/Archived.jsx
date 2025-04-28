import { useEffect, useContext, useState } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { ACTION_TYPES } from "../action-types/actionTypes";


export default function Archive() {
    const { state, dispatch, showSuccess, setShowSuccess } = useContext(ApplicationContext)
    const { applications } = state

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        const savedApplications = localStorage.getItem("applications");
        if (savedApplications && applications.length === 0) {
            dispatch({
                type: ACTION_TYPES.LOAD_APPLICATIONS,
                data: JSON.parse(savedApplications),
            });
        }
    }, [dispatch]);

    useEffect(() => {
        if (applications.length > 0) {
            localStorage.setItem("applications", JSON.stringify(applications));
        }
    }, [applications]);




    const handleDelete = (id) => {
        dispatch({ type: ACTION_TYPES.OPEN_DELETE_MODAL, id })
        // setShowSuccess(true)
        // setTimeout(() => setShowSuccess(false), 3000 )
    }

    const handleConfirmDelete = () => {
        dispatch({ type: ACTION_TYPES.DELETE_APPLICATION })
    }

    const handleCloseModal = () => {
        dispatch({ type: ACTION_TYPES.CLOSE_DELETE_MODAL })
    }

    const handleUnarchive = (id) => {
        dispatch({ type: ACTION_TYPES.UNARCHIVE_APPLICATION, id })
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const tableHead = [
        "Company Name",
        "Position",
        "Date",
        "Status",
        "Note",
        "Action"
    ]

    const archivedApplications = applications.filter((app) => app.isArchive)

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Archived Applications</h2>
            {archivedApplications.length === 0 ? (
                <p>No archived applications yet.</p>
            ) : (
                <div className="overflow-y-auto h-100" >
                    <table className="w-full overflow-y-auto">
                        <thead className="bg-green-300 sticky top-0 z-10">
                            <tr>
                                {tableHead.map((head, index) => (
                                    <th key={index} className="px-4 py-2 text-left">{head}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {archivedApplications
                            .reverse()
                            .map((app, index) => (
                                <tr key={app.id} className="odd:bg-green-50 odd:hover:bg-green-200 even:bg-green-100 even:hover:bg-green-200">
                                    <td className="px-4 py-2">{index+1}. {toTitleCase(app.company)}</td>
                                    <td className="px-4 py-2">{toTitleCase(app.position)}</td>
                                    <td className="px-4 py-2">{app.date}</td>
                                    <td className="px-4 py-2">{app.status}</td>
                                    <td className="px-4 py-2">{app.note}</td>
                                    <td className="px-4 py-2">
                                        <button className="deleteButton" onClick={() => handleDelete(app.id)}>delete</button>
                                        <button className="unarchivedButton" onClick={() => handleUnarchive(app.id)}>unarchive</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        showSuccess && (
                            <div className="success-message animate-fade-in-out">
                                Unarchived application successfully!
                            </div>
                        )}
                    {state.isDeleteModalOpen && (
                        <div className="modal-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}> 
                            <div className="modal-box">
                                <p className="modal-message">Are you sure you want to delete this application?</p>
                                <div className="modal-actions">
                                    <button onClick={handleConfirmDelete} className="btn-danger">
                                        Yes, Delete
                                    </button>
                                    <button onClick={handleCloseModal} className="btn-secondary">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
