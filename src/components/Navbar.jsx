import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <span>+</span> MediQueue
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/register">
          Register Patient
        </Link>

        <Link to="/queue">
          Current Queue
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;