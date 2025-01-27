import React from "react";
import LoginNavbar from "./LoginNavbar";
import { Link, useNavigate } from "react-router-dom";


function Login(){
   const[password,setPassword]=React.useState("")
   const[userName,setUserName]=React.useState("")
   const navigate=useNavigate();

    
    const handleLogin = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/users")
        .then((res)=>res.json())
        .then((users)=>{
          const user =users.find((user)=>user.name === userName && user.password ===password)

          if(user){
            alert("login suscessful")
            localStorage.setItem("user",JSON.stringify(user));

            //navigate based on role
            if(user.role.toLowerCase()=== "buyer"){
              navigate("/buyer-dashboard")
            }else if(user.role.toLowerCase()=== "seller"){
              navigate("/seller-dashboard")
            }else{
              alert("uknown role")
            }
           }
           else{
            alert("invalid password or username")}
        })
    
        
      };
    return(
        <>
        <header>
          <LoginNavbar/>
        </header>
        <main>
  <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <div className="card p-4 shadow-lg rounded" style={{ width: "100%", maxWidth: "400px" }}>
      {/* Login Header */}
      <h2 className="text-center mb-4 text-primary">Login</h2>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        
        {/* Username Input */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-bold">Username</label>
          <input
            type="text"
            id="username"
            value={userName}
            className="form-control form-control-lg"
            placeholder="Enter your username"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            className="form-control form-control-lg"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100 btn-lg">Login</button>
      </form>

      {/* Sign Up Link */}
      <p className="text-center mt-3 mb-0">
        Don't have an account? <Link to="/signup" className="text-decoration-none text-primary fw-bold">Sign Up</Link>
      </p>
    </div>
  </div>
</main>

      </>
    );
}

export default Login;