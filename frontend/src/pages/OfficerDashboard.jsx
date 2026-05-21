import { useEffect, useState } from "react";

import API from "../api/axios";

function OfficerDashboard() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {

        fetchComplaints();

    }, []);

    const fetchComplaints = async () => {

        try {

            const response = await API.get(
                "/complaints/department"
            );

            setComplaints(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const updateStatus = async (
        complaintId,
        status
    ) => {

        try {

            await API.patch(
                `/complaints/${complaintId}/status`,
                {
                    status,
                }
            );

            fetchComplaints();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="page-container">

            <h1 className="dashboard-title">
                Officer Dashboard
            </h1>

            <div className="card">

                <h2 className="section-title">
                    Department Complaints
                </h2>

                {
                    complaints.length === 0 ? (

                        <p className="empty-text">
                            No complaints found.
                        </p>

                    ) : (

                        <div className="table-container">

                            <table className="complaints-table">

                                <thead>

                                    <tr>

                                        <th>Complaint</th>

                                        <th>Priority</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        complaints.map((complaint) => (

                                            <tr key={complaint.id}>

                                                <td>

                                                    <div className="table-title">
                                                        {complaint.title}
                                                    </div>

                                                    <div className="table-description">
                                                        {complaint.description}
                                                    </div>

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${complaint.priority === "LOW"
                                                                ? "badge-low"
                                                                : complaint.priority === "MEDIUM"
                                                                    ? "badge-medium"
                                                                    : "badge-high"
                                                            }`}
                                                    >
                                                        {complaint.priority}
                                                    </span>

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${complaint.status === "OPEN"
                                                                ? "badge-open"
                                                                : complaint.status === "IN_PROGRESS"
                                                                    ? "badge-progress"
                                                                    : "badge-resolved"
                                                            }`}
                                                    >
                                                        {complaint.status}
                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="action-buttons">

                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    complaint.id,
                                                                    "IN_PROGRESS"
                                                                )
                                                            }
                                                            className="in-progress-btn"
                                                        >
                                                            In Progress
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    complaint.id,
                                                                    "RESOLVED"
                                                                )
                                                            }
                                                            className="resolve-btn"
                                                        >
                                                            Resolve
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        ))
                                    }

                                </tbody>

                            </table>

                        </div>

                    )
                }

            </div>

        </div>
    );
}

export default OfficerDashboard;