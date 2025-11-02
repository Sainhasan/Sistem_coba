import { useState } from "react";
import { Link } from "react-router-dom";
import UseHandleRegister from "../Function/UseHandleRegister";
import PasswordInput from "../components/PasswordInput";
import Loader from "../components/Loader";

export default function Regis() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const { handleRegister, loading } = UseHandleRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(name, email, password, role);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light bg-login">
      <div className="bg-white bg-opacity-10 p-2 rounded-4 small-card w-50">
        <div
          className="card p-4 shadow-lg position-relative rounded-4"
        >
          <h3 className="text-center mb-3">Registrasi</h3>

          <form onSubmit={handleSubmit} className="sf">
            <div className="mb-3">
              <label className="form-label">Nama</label>
              <input
                type="text"
                className="form-control rounded-4"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control rounded-4"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <PasswordInput password={password} setPassword={setPassword} />

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select rounded-4"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-4"
              disabled={loading}
            >
              {loading ? <Loader /> : "Daftar"}
            </button>
          </form>
          <p className="text-center mt-2">
            Sudah punya akun? <Link to="/login">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
