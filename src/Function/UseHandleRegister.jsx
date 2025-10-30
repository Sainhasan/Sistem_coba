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

      toast.success("Registrasi berhasil!");
      setTimeout(() => navigate("/"), 1000);
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
        case "auth/password-does-not-meet-requirements":
          msg = "Password tidak memenuhi persyaratan.";
          break;
        default:
          msg = error.message;
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  return { handleRegister, loading };
}
