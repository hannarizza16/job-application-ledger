import { useEffect, useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { ACTION_TYPES } from "../action-types/actionTypes";

export default function Lists() {
    const {state, dispatch, showSuccess, setShowSuccess} = useContext(ApplicationContext)
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

    const handleArchive = (id) => {
        dispatch ({ type: ACTION_TYPES.ARCHIVE_APPLICATION, id})
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
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
                <div className="overflow-y-auto h-100">
                    <table className=" w-full">
                        <thead className="bg-green-300 sticky top-0 z-10">
                            <tr>
                                {tableHead.map((head, index) => (
                                    <th key={index} className="px-4 py-2 text-left">{head}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {applications
                            .filter((app) => !app.isArchive)
                            .reverse()
                            .map((app, index) => ( 
                                <tr key={app.id} className="odd:bg-green-50 odd:hover:bg-green-200 even:bg-green-100 even:hover:bg-green-200">
                                    <td className="px-4 py-2">{index+1}. {toTitleCase(app.company)}</td>
                                    <td className="px-4 py-2">{toTitleCase(app.position)}</td>
                                    <td className="px-4 py-2">{app.date}</td>
                                    <td className="px-4 py-2">{app.status}</td>
                                    <td className="px-4 py-2">{app.note}</td>
                                    <td className="px-4 py-2">
                                        <button className="archivedButton" onClick={() => handleArchive(app.id)}>archive</button>
                                        <button onClick={() => handleArchive(app.id)}>edit</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                            showSuccess && (
                                <div className="success-message animate-fade-in-out">
                                    Archived application successfully!
                                </div>
                            )}
                </div>
            )}
        </div>
    );
}
