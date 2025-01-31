import { Link } from "react-router-dom";
import React from "react";
import LoginNavbar from "./LoginNavbar";

function SignUp() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("Buyer");

    function handleChange(event) {
        const { name, value } = event.target;

        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "role") {
            setRole(value);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // Fetch role_id from the backend
            const response = await fetch(`http://localhost:4000/roles?name=${role}`);

            const roleData = await response.json();

            if (!roleData.id) {
                alert("Invalid role selection.");
                return;
            }

            const newUser = {
                username: name,
                email: email,
                password: password,
                role_id: roleData.id, // Send role_id instead of role name
            };

            // Send user registration request
            const userResponse = await fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (userResponse.ok) {
                alert("Registered successfully!");
                setEmail("");
                setName("");
                setPassword("");
                setRole("Buyer");
            } else {
                const errorData = await userResponse.json();
                alert(errorData.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <>
            <header>
                <LoginNavbar />
            </header>
            <main>
                <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                    <div className="col-md-6 col-lg-5 shadow-lg p-4 rounded">
                        <h2 className="text-center mb-4 text-primary">Sign Up</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Create a password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <select className="form-select form-select-lg" onChange={handleChange} value={role} name="role" required>
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-100">
                                Sign Up
                            </button>
                        </form>

                        <p className="text-center mt-3">
                            Already have an account?{" "}
                            <Link to="/login" className="text-decoration-none text-primary fw-bold">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default SignUp;
