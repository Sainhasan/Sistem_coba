import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({ password, setPassword }) {
  const [type, setType] = useState("password");

  // Toggle show/hide password
  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  // Cek kekuatan password
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isLongEnough = password.length >= 8 && password.length <= 20;

  return (
    <div className="mb-3">
      <label className="form-label">Password</label>
      <div className="position-relative">
        <input
          type={type}
          className="form-control pe-5 rounded-4"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
        <span
          className="position-absolute top-50 end-0 translate-middle-y me-3"
          onClick={handleToggle}
          style={{ cursor: "pointer" }}
        >
          {type === "password" ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </span>
      </div>

      {password && (
        <ul className="mt-2 small">
          <li style={{ color: hasUpper ? "green" : "red" }}>
            Huruf besar (A–Z)
          </li>
          <li style={{ color: hasLower ? "green" : "red" }}>
            Huruf kecil (a–z)
          </li>
          <li style={{ color: hasNumber ? "green" : "red" }}>Angka (0–9)</li>
          <li style={{ color: isLongEnough ? "green" : "red" }}>
            Panjang 8–20 karakter
          </li>
        </ul>
      )}
    </div>
  );
}
