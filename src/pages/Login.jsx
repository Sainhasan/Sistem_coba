import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

export default function Login() {
  // State untuk menampung input user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fungsi untuk handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      // Panggil Firebase untuk login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        console.log("User berhasil login:", user);
        setLoading(false);
        navigate("/");
      } else {
        setError("Gagal login. Coba lagi.");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);

      // Handling pesan error agar lebih mudah dipahami user
      if (err.code === "auth/user-not-found") {
        setError("Email tidak terdaftar.");
      } else if (err.code === "auth/wrong-password") {
        setError("Password salah.");
      } else if (err.code === "auth/invalid-email") {
        setError("Format email tidak valid.");
      } else {
        setError("Terjadi kesalahan, coba lagi.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm w-25">
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
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-flex align-items-center justify-content-center gap-2">
            <button
              type="submit"
              className="btn btn-success w-75"
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
