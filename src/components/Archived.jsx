import { useEffect, useState } from "react";

export default function Archive() {
    const [applications, setApplications] = useState([]);

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    

    useEffect(() => {
        try {
            const savedApplications = localStorage.getItem("applications");
            if (savedApplications) {
                setApplications(JSON.parse(savedApplications));
            }
        } catch (error) {
            console.error("Failed to load applications:", error);
        }
    }, []);

    const handleDelete = (id) => {
        const updatedApplications = applications.filter((app) => app.id !== id);
        setApplications(updatedApplications);
        localStorage.setItem("applications", JSON.stringify(updatedApplications));
    };

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
            <h2 className="text-xl font-bold mb-4">Job Applications</h2>
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
                            {applications.map((app) => (
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
