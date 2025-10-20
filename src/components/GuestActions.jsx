import { Link } from "react-router-dom";

export default function GuestActions() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3">
      <Link to="/Login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/Regis" className="btn btn-success">
        Daftar
      </Link>
    </div>
  );
}
