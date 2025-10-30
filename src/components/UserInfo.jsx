import { Link } from "react-router-dom";

export default function UserInfo({ profile, onLogout }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3">
      <p className="mb-0">
        Selamat datang, <b>{profile.name}</b> ({profile.role})
      </p>
      {profile.role === "admin" && (
        <Link to="/manage" className="btn btn-warning">
          Manajemen User
        </Link>
      )}
      <button onClick={onLogout} className="btn btn-danger">
        Log Out
      </button>
    </div>
  );
}
