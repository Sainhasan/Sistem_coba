import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

import useAuthProfile from "../Function/UseAuthProfile";
import Refresh from "../components/Refresh";

export default function Profile() {
  const { user, profile, loading } = useAuthProfile();
  if (loading) return <Refresh />;

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="d-flex justify-content-center m-3">
      <div className="card p-4 shadow-lg position-relative rounded-4 h-75 w-75">
        <h3 className=" text-center m-1">Profile Page</h3>
        <form className="d-flex flex-column">
          <div>
            <label>User Profile Information</label>
          </div>
          <div className="d-flex justify-content-between mt-1">
            {user && profile ? (
              <div className="d-flex align-items-center">
                {profile.role === "admin" && (
                  <Link to="/manage">
                    <button className="btn btn-sm btn-success">
                      Manajemen User
                    </button>
                  </Link>
                )}
              </div>
            ) : null}
            <div className="d-flex">
              <Link to="/">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={handleLogout}
                >
                  LogOut
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
