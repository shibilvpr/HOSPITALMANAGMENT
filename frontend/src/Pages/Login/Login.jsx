import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Input from "../../compenents/Input/Input";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `${API}/login`,
                form
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            // Set global Axios header for subsequent requests
            axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

            const role = res.data.user.role;

            if (role === "admin") {
                navigate("/dashboard");

            } else if (role === "doctor") {
                navigate("/appointments");

            } else if (role === "receptionist") {
                navigate("/appointments");

            } else {
                navigate("/");
            }

        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                {/* LEFT SIDE */}

                <div className="login-left">

                    <img
                        src="/Receptions.jpg"
                        alt="login"
                    />

                </div>

                {/* RIGHT SIDE */}

                <div className="login-right">

                    <h1 className="login-title">
                        Welcome to <span>CareWell</span>
                    </h1>

                    <p className="login-subtitle">
                        Login to manage appointments,
                        doctors and patients.
                    </p>



                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

                        <label>Email</label>

                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />

                        <label>Password</label>

                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                        />



                        <button
                            type="submit"
                            className="login-btn"
                        >
                            Login
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default Login;