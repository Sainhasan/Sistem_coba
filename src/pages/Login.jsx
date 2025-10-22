import { Link } from "react-router-dom";
import UseHandleLogin from "../Function/UseHandleLogin";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  }= UseHandleLogin();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm position-relative"
        style={{ width: "20rem" }}
      >
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="d-flex align-items-center justify-content-center gap-2">
            <button
              type="submit"
              className="btn w-75 btn-primary"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
            <Link to="/regis" className="btn btn-secondary w-25">
              Regis
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
