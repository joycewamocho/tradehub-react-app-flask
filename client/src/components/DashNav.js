import { Link } from "react-router-dom";
import "./NavBar.css"; // Add custom CSS styles
import Logout from "./Logout";

function DashNav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-3" to="/products">
                    <span className="text-warning">Trade</span>Hub
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        
                        <li className="nav-item">
                            <Logout/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default DashNav;
