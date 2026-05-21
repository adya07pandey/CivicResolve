import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Navbar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (

    <nav className="navbar">

      <div className="nav-left">

        <Link
          to="/"
          className="logo"
        >
          CivicResolve
        </Link>

        

      </div>
        <div className="nav-links">

          {!user && (
            <>
              <Link
                to="/login"
                className="nav-link"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="nav-link"
              >
                Register
              </Link>
            </>
          )}

        </div>
      {
        user && (
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        )
      }

    </nav>
  );
}

export default Navbar;