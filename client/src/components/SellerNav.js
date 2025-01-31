import { Link } from "react-router-dom";
import Logout from "./Logout";
import "./NavBar.css"; // Add custom CSS styles

function SellerNavbar() {
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
                            <Link className="nav-link" to="/dash">
                                Dashboard
                            </Link>
                    </li>
                    <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                    </li>
    
                        <li className="nav-item">
                            <Logout/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default SellerNavbar;
