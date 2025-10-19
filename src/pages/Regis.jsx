import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Regis() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // text yang tampil
  const [messageType, setMessageType] = useState("success"); // 'success' atau 'error'

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        role: role,
        createdAt: new Date(),
      });

      setMessage("Registrasi berhasil!");
      setMessageType("success");

      navigate("/"); // optional: bisa delay dulu biar user baca pesan
    } catch (error) {
      let msg = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          msg = "Email ini sudah terdaftar.";
          break;
        case "auth/invalid-email":
          msg = "Format email tidak valid.";
          break;
        case "auth/weak-password":
          msg = "Password terlalu lemah.";
          break;
        default:
          msg = "Terjadi kesalahan, coba lagi.";
      }
      setMessage(msg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow-sm w-25">
        <h3 className="text-center mb-3">Registrasi</h3>
        <form onSubmit={handleRegister}>
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
              required
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
              required
            />
          </div>

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

          {message && (
            <div
              className={`alert ${
                messageType === "error" ? "alert-danger" : "alert-success"
              } mt-2`}
            >
              {message}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-success w-100"
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
