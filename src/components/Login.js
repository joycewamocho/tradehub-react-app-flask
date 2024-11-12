import React from "react";

function Login(){
    

    
    const handleLogin = (e) => {
        e.preventDefault();
    
        
      };
    return(
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card p-4" style={{ width: "400px", height:"400px", color:"black"}}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    );
}

export default Login;