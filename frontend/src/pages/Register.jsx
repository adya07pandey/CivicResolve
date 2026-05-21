import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "citizen",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/auth/register", formData);
            alert("Registration successful");
            navigate("/login");


        } catch (error) {

            console.log(error);

            const errorMessage =
                error.response?.data?.detail
                || "Login failed";

            alert(errorMessage);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1 className="auth-title">
                    Create Account
                </h1>

                <p className="auth-subtitle">
                    Register to continue
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="auth-form"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        className="auth-input"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="auth-input"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="auth-input"
                    />

                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Register
                    </button>
                    <p>Already have an account? <span onClick={() => { navigate("/login") }}><u>Login</u></span></p>

                </form>

            </div>

        </div>
    );
}

export default Register;