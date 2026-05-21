import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { fetchCurrentUser } = useAuth();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

            await API.post(
                "/auth/login",
                formData
            );

            await fetchCurrentUser();
            try {
                const me = await API.get("/auth/me");
                const role = me.data.role;

                if (role === "citizen") {
                    navigate("/citizen");
                }

                else if (role === "officer") {
                    navigate("/officer");
                }

                else if (role === "admin") {
                    navigate("/admin");
                }
            }
            catch (err) {
                console.log(err);
            }



        } catch (error) {

            console.log(error);

            let errorMessage = "Something went wrong";

            if (Array.isArray(error.response?.data?.detail)) {

                errorMessage =
                    error.response.data.detail[0].msg;

            } else if (
                error.response?.data?.detail
            ) {

                errorMessage =
                    error.response.data.detail;
            }

            alert(errorMessage);
        }
    };


    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1 className="auth-title">
                    Welcome Back
                </h1>

                <p className="auth-subtitle">
                    Login to continue
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="auth-form"
                >

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
                        Login
                    </button>
                    <p>Don't have an account? <span onClick={() => { navigate("/Register") }}><u>Register</u></span></p>
                </form>

            </div>

        </div>
    );
}

export default Login;