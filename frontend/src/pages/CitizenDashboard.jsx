import { useEffect, useState } from "react";
import API from "../api/axios";
import "../App.css";
function CitizenDashboard() {

    const [complaints, setComplaints] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "LOW",
        department_id: "",
    });

    const [departments, setDepartments] = useState([]);

    useEffect(() => {

        fetchComplaints();

        fetchDepartments();

    }, []);

    const fetchComplaints = async () => {

        try {

            const response = await API.get(
                "/complaints/my"
            );

            setComplaints(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchDepartments = async () => {

        try {

            const response = await API.get(
                "/departments"
            );

            setDepartments(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/complaints", formData);

            alert("Complaint submitted");

            fetchComplaints();

        } catch (error) {

            console.log(error);
            alert("Failed");
        }
    };

    return (

        <div className="page-container">

            <h1 className="dashboard-title">
                Citizen Dashboard
            </h1>

            <div className="dashboard-grid">

                {/* LEFT SIDE */}

                <div className="card">

                    <h2 className="section-title">
                        Create Complaint
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="dashboard-form"
                    >

                        <div className="form-group">

                            <label className="form-label">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Enter complaint title"
                                onChange={handleChange}
                                className="dashboard-input"
                            />

                        </div>

                        <div className="form-group">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Describe your issue..."
                                onChange={handleChange}
                                className="dashboard-textarea"
                            />

                        </div>

                        <div className="form-group">

                            <label className="form-label">
                                Priority
                            </label>

                            <select
                                name="priority"
                                onChange={handleChange}
                                className="dashboard-select"
                            >

                                <option value="LOW">
                                    LOW
                                </option>

                                <option value="MEDIUM">
                                    MEDIUM
                                </option>

                                <option value="HIGH">
                                    HIGH
                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label className="form-label">
                                Department
                            </label>

                            <select
                                name="department_id"
                                onChange={handleChange}
                                className="dashboard-select"
                            >

                                <option value="">
                                    Select Department
                                </option>

                                {
                                    departments.map((dept) => (

                                        <option
                                            key={dept.id}
                                            value={dept.id}
                                        >
                                            {dept.name}
                                        </option>
                                    ))
                                }

                            </select>

                        </div>

                        <button
                            type="submit"
                            className="dashboard-button"
                        >
                            Submit Complaint
                        </button>

                    </form>

                </div>

                {/* RIGHT SIDE */}

                <div className="card">

                    <h2 className="section-title">
                        My Complaints
                    </h2>

                    {
                        complaints.length === 0 ? (

                            <p className="empty-text">
                                No complaints submitted yet.
                            </p>

                        ) : (

                            <div className="complaints-list">

                                {
                                    complaints.map((complaint) => (

                                        <div
                                            key={complaint.id}
                                            className="complaint-card"
                                        >

                                            <div className="complaint-top">

                                                <h3 className="complaint-title">
                                                    {complaint.title}
                                                </h3>

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

                                            </div>

                                            <p className="complaint-description">
                                                {complaint.description}
                                            </p>

                                            <div className="complaint-footer">

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

                                            </div>

                                        </div>
                                    ))
                                }

                            </div>

                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default CitizenDashboard;