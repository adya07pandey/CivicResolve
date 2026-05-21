import { useEffect, useState } from "react";

import API from "../api/axios";

function AdminDashboard() {

    const [departments, setDepartments] = useState([]);

    const [officers, setOfficers] = useState([]);

    const [departmentName, setDepartmentName] = useState("");

    const [officerForm, setOfficerForm] = useState({ name: "", email: "", password: "", });

    useEffect(() => {

        fetchDepartments();
        fetchOfficers();

    }, []);

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

    const fetchOfficers = async () => {

        try {

            const response = await API.get(
                "/users/officers"
            );

            setOfficers(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const createDepartment = async () => {

        try {

            await API.post(
                "/departments",
                {
                    name: departmentName,
                }
            );

            setDepartmentName("");

            fetchDepartments();

        } catch (error) {

            console.log(error);
        }
    };

    const createOfficer = async () => {

        try {

            await API.post(
                "/users/create-officer",
                officerForm
            );

            setOfficerForm({
                name: "",
                email: "",
                password: "",
            });

            fetchOfficers();

        } catch (error) {

            console.log(error);
        }
    };

    const assignDepartment = async (
        officerId,
        departmentId
    ) => {

        try {

            await API.patch(
                `/users/${officerId}/assign-department?department_id=${departmentId}`
            );

            fetchOfficers();

        } catch (error) {

            console.log(error);
        }
    };

    const unassignedOfficers =
        officers.filter(
            (officer) =>
                !officer.department_id
        );

    return (

        <div className="page-container">

            <h1 className="dashboard-title">
                Admin Dashboard
            </h1>

            {/* TOP FORMS */}

            <div className="admin-grid">

                {/* CREATE DEPARTMENT */}

                <div className="card">

                    <h2 className="section-title">
                        Create Department
                    </h2>

                    <div className="admin-form">

                        <input
                            type="text"
                            placeholder="Department Name"
                            value={departmentName}
                            onChange={(e) =>
                                setDepartmentName(
                                    e.target.value
                                )
                            }
                            className="dashboard-input"
                        />

                        <button
                            onClick={createDepartment}
                            className="admin-button"
                        >
                            Create Department
                        </button>

                    </div>

                </div>

                {/* CREATE OFFICER */}

                <div className="card">

                    <h2 className="section-title">
                        Create Officer
                    </h2>

                    <div className="admin-form">

                        <input
                            type="text"
                            placeholder="Officer Name"
                            value={officerForm.name}
                            onChange={(e) =>
                                setOfficerForm({
                                    ...officerForm,
                                    name: e.target.value,
                                })
                            }
                            className="dashboard-input"
                        />

                        <input
                            type="email"
                            placeholder="Officer Email"
                            value={officerForm.email}
                            onChange={(e) =>
                                setOfficerForm({
                                    ...officerForm,
                                    email: e.target.value,
                                })
                            }
                            className="dashboard-input"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={officerForm.password}
                            onChange={(e) =>
                                setOfficerForm({
                                    ...officerForm,
                                    password: e.target.value,
                                })
                            }
                            className="dashboard-input"
                        />

                        <button
                            onClick={createOfficer}
                            className="admin-button"
                        >
                            Create Officer
                        </button>

                    </div>

                </div>

            </div>
            {/* UNASSIGNED OFFICERS */}

            <div className="card">

                <h2 className="section-title">
                    Unassigned Officers
                </h2>

                {
                    unassignedOfficers.length === 0
                        ? (
                            <p className="empty-text">
                                All officers assigned
                            </p>
                        )
                        : (
                            <div className="unassigned-list">

                                {
                                    unassignedOfficers.map(
                                        (officer) => (

                                            <div
                                                key={officer.id}
                                                className="unassigned-card"
                                            >

                                                <div className="unassigned-info">

                                                    <h3>
                                                        {officer.name}
                                                    </h3>

                                                    <p className="officer-email">
                                                        {officer.email}
                                                    </p>

                                                </div>

                                                <select
                                                    defaultValue=""
                                                    onChange={(e) =>
                                                        assignDepartment(
                                                            officer.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="dashboard-select assign-select"
                                                >

                                                    <option value="">
                                                        Assign Department
                                                    </option>

                                                    {
                                                        departments.map(
                                                            (department) => (

                                                                <option
                                                                    key={department.id}
                                                                    value={department.id}
                                                                >
                                                                    {department.name}
                                                                </option>
                                                            )
                                                        )
                                                    }

                                                </select>

                                            </div>
                                        )
                                    )
                                }

                            </div>
                        )
                }

            </div>
            
            {/* DEPARTMENTS */}

            <div className="card" style={{ marginBottom: "30px" }}>

                <h2 className="section-title">
                    Departments
                </h2>

                <div className="departments-grid">

                    {
                        departments.map((department) => {

                            const departmentOfficers =
                                officers.filter(
                                    (officer) =>
                                        officer.department_id ===
                                        department.id
                                );

                            return (

                                <div
                                    key={department.id}
                                    className="department-card"
                                >

                                    <h3 className="department-name">
                                        {department.name}
                                    </h3>

                                    {
                                        departmentOfficers.length === 0
                                            ? (
                                                <p className="empty-text">
                                                    No officers assigned
                                                </p>
                                            )
                                            : (
                                                <div className="officer-list">

                                                    {
                                                        departmentOfficers.map(
                                                            (officer) => (

                                                                <div
                                                                    key={officer.id}
                                                                    className="officer-item"
                                                                >

                                                                    <div className="officer-name">
                                                                        {officer.name}
                                                                    </div>

                                                                    <div className="officer-email">
                                                                        {officer.email}
                                                                    </div>

                                                                </div>
                                                            )
                                                        )
                                                    }

                                                </div>
                                            )
                                    }

                                </div>
                            );
                        })
                    }

                </div>

            </div>

            

        </div>
    );
}

export default AdminDashboard;