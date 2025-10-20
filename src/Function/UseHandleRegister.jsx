// src/Function/UseHandleRegister.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

export default function UseHandleRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (name, email, password, role) => {
    setLoading(true);
    try {
      // Buat user baru
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Simpan data user di Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });
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

      // Tampilkan toast error langsung
      toast.error(msg);

      setLoading(false);
    }
  };

  return { handleRegister, loading };
}

