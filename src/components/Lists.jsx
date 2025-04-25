import { useEffect, useState, useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { ACTION_TYPES } from "../action-types/actionTypes";

export default function Lists() {
    const {state, dispatch} = useContext(ApplicationContext)
    const { applications } = state

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        // Ensure the applications are loaded from localStorage
        const savedApplications = localStorage.getItem("applications");
        if (savedApplications && applications.length === 0) {
            dispatch({
                type: ACTION_TYPES.LOAD_APPLICATIONS,
                data: JSON.parse(savedApplications),
            });
        }
    }, [dispatch]);

    const handleArchive = (id) => {
        dispatch ({ type: ACTION_TYPES.ARCHIVE_APPLICATION, id})
    }

    const tableHead = [
        "Company Name",
        "Position",
        "Date",
        "Status",
        "Note",
        "Action"
    ]

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Archived Applications</h2>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <div>
                    <table className="w-full">
                        <thead className="bg-green-300">
                            <tr>
                                {tableHead.map((head, index) => (
                                    <th key={index} className="px-4 py-2 text-left">{head}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {applications
                            .filter((app) => !app.isArchive)
                            .map((app) => ( 
                                <tr key={app.id} className="odd:bg-green-50 odd:hover:bg-green-200 even:bg-green-100 even:hover:bg-green-200">
                                    <td className="px-4 py-2">{toTitleCase(app.company)}</td>
                                    <td className="px-4 py-2">{toTitleCase(app.position)}</td>
                                    <td className="px-4 py-2">{app.date}</td>
                                    <td className="px-4 py-2">{app.status}</td>
                                    <td className="px-4 py-2">{app.note}</td>
                                    <td className="px-4 py-2">
                                        <button onClick={() => handleArchive(app.id)}>archive</button>
                                        {/* <button>update</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
