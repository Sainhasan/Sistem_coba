import { useState } from "react";
import { Link } from "react-router-dom";
import UseHandleRegister from "../Function/UseHandleRegister";
import PasswordInput from "../components/PasswordInput";

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
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm position-relative"
        style={{ width: "20rem" }}
      >
        <h3 className="text-center mb-3">Registrasi</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <input
              type="text"
              className="form-control"
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
              className="form-control"
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
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>
        <p className="text-center mt-2">
          Sudah punya akun? <Link to="/Login">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
