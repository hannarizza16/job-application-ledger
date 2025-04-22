import { useEffect, useState } from "react";

export default function Lists() {
    const [applications, setApplications] = useState([]);

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

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Job Applications</h2>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <div>
                    <table className="w-full">
                        <thead className="bg-green-200">
                            <tr>
                                {tableHead.map((head, index) => (
                                    <th key={index} className="px-4 py-2 text-left">{head}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id} className="odd:bg-green-50 even:bg-green-100">
                                    <td className="px-4 py-2">{app.company}</td>
                                    <td className="px-4 py-2">{app.position}</td>
                                    <td className="px-4 py-2">{app.date}</td>
                                    <td className="px-4 py-2">{app.status}</td>
                                    <td className="px-4 py-2">{app.note}</td>
                                    <button onClick={() => handleDelete(app.id)}>delete</button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
