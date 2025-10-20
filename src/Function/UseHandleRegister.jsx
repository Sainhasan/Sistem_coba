// src/Function/UseHandleRegister.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function UseHandleRegister() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  const handleRegister = async (name, email, password, role) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      setMessage("Registrasi berhasil!");
      setMessageType("success");
      navigate("/");
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
          msg = error.message;
      }
      setMessage(msg);
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, message, messageType };
}
