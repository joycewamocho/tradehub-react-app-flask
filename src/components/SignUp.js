import { Link } from "react-router-dom"
import React from "react"
import LoginNavbar from "./LoginNavbar"
function SignUp(){
    const[name,setName]=React.useState("")
    const[email,setEmail]=React.useState("")
    const[password,setPassword]=React.useState("")
    const[role,setRole]=React.useState("Buyer")


    function handleChange(event){
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

    function handleSubmit(event){
        const newUser = {
            name: name,
            email: email,
            password: password,
            role: role,
          };
        event.preventDefault();
        fetch("http://localhost:3001/users",{
            method:"POST",
            headers:{
                "Content-Type":"Application/JSON",
            },
            body:JSON.stringify(newUser)
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log((data))
            alert("registered successfully")
            setEmail("")
            setName("")
            setPassword("")
            setRole("")
        })
    }
    return(
      <>
      <header>
        <LoginNavbar/>
      </header>
      <main>
  <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
    <div className="col-md-6 col-lg-5 shadow-lg p-4 rounded">
      
      {/* Sign Up Header */}
      <h2 className="text-center mb-4 text-primary">Sign Up</h2>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit}>
        
        {/* Name Input */}
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

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Role Selection */}
        <div className="mb-3">
          <select
            className="form-select form-select-lg"
            onChange={handleChange}
            value={role}
            name="role"
            required
          >
            <option value="" disabled>Select your role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="btn btn-primary btn-lg w-100">
          Sign Up
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center mt-3">
        Already have an account? <Link to="/" className="text-decoration-none text-primary fw-bold">Login here</Link>
      </p>
    </div>
  </div>
</main>

    </>
    
    )
}
export default SignUp