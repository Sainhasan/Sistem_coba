import { Link } from "react-router-dom";
import UseHandleLogin from "../Function/UseHandleLogin";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  } = UseHandleLogin();

  const [type, setType] = useState("password");

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-login">
      <div className="bg-white bg-opacity-10 p-2 rounded-4 small-card">
        <div className="card p-4 shadow-lg position-relative rounded-4">
          <h3 className="text-center">Login</h3>
          <form className="my-3" onSubmit={handleLogin}>
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control pe-4 rounded-4"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="my-3">
              <label className="form-label">Password</label>
              <div className="position-relative">
                <input
                  type={type}
                  className="form-control pe-5 rounded-4"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  onClick={handleToggle}
                >
                  {type === "password" ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3 btn-group-responsive">
              <button
                type="submit"
                className="btn w-50 btn-primary rounded-4"
                disabled={loading}
              >
                <div
                  className="d-flex justify-content-center"
                  style={{ height: "100%" }}
                >
                  {loading ? <Loader /> : "Login"}
                </div>
              </button>

              <Link
                to="/regis"
                className="btn btn-secondary rounded-4 w-50 small-btn"
              >
                Regis
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
