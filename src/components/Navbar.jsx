import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import useAuthProfile from "../Function/UseAuthProfile";
import Refresh from "./Refresh";

export default function Navbar() {
  const { user, profile, loading } = useAuthProfile();

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <Refresh/>;

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/Logo.png" alt="Logo" width="30" height="24" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className=" offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <img
              src="/Logo.png"
              alt="Logo"
              width="30"
              height="24"
              id="offcanvasDarkNavbarLabel"
            />
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                {user && profile ? (
                  <>
                    <div className="FlexNone">
                      {profile.role === "admin" && (
                        <Link
                          to="/manage"
                          className="nav-link"
                        >
                          Manajemen User
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="FlexNone nav-link"
                      >
                        Log Out
                      </button>
                    </div>
                  </>
                ) : (
                  <Link to="/login" className="FlexNone nav-link ">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
