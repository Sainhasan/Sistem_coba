import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

export default function Profile() {
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
          <div className="d-flex m-1 justify-content-end">
            <Link to={"/"}>
              <button className="btn btn-danger" onClick={handleLogout}>
                LogOut
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
