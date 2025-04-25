import { useEffect, useContext, useState } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { ACTION_TYPES } from "../action-types/actionTypes";


export default function Archive() {
    // const [applications, setApplications] = useState([]);
    const { state, dispatch } = useContext(ApplicationContext)
    const {applications} = state

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
        console.log(id)
        dispatch({ type: ACTION_TYPES.DELETE_APPLICATION, id})
    }

    const tableHead = [
        "Company Name",
        "Position",
        "Date",
        "Status",
        "Note",
        "Action"
    ]

    const archivedApplications = applications.filter((app) => app.isArchive )

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Archived</h2>
            {archivedApplications.length === 0 ? (
                <p>No archived applications yet.</p>
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
                            {archivedApplications.map((app) => (
                                <tr key={app.id} className="odd:bg-green-50 odd:hover:bg-green-200 even:bg-green-100 even:hover:bg-green-200">
                                    <td className="px-4 py-2">{toTitleCase(app.company)}</td>
                                    <td className="px-4 py-2">{toTitleCase(app.position)}</td>
                                    <td className="px-4 py-2">{app.date}</td>
                                    <td className="px-4 py-2">{app.status}</td>
                                    <td className="px-4 py-2">{app.note}</td>
                                    <td className="px-4 py-2">
                                        <button onClick={() => handleDelete(app.id)}>delete</button>
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
