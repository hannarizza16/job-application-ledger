export default function Status({applications}) {

    const statusCounts = applications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
    }, {});

    const statuses = [
        "Applied",
        "HR Interview",
        "Technical Interview",
        "Final Interview",
        "Reject",
        "Preparing",
        "Waiting"
    ];

    return(
        <>
        <div className="w-full h-full bg-white flex flex-col">
            <div className="flex justify-center ">
                <p>Status</p>
            </div>
            <div className="p-5 ">
                {statuses.map((status) => (
                    <div key={status}>
                        {statusCounts[status] || 0} {status}
                    </div>
                ))}
            
            </div>
        </div>
        
        </>
    )
}