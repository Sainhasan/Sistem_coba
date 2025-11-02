import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function UseManageUser() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 🔹 Ambil data user dari Firestore
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const list = [];
      querySnapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setMembers(list);
    } catch (err) {
      setError("Gagal memuat data user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // 🔹 Fungsi menambah user (default role = "user")
  const handleAddUser = async (e) => {
  e.preventDefault();
  if (!name || !email) {
    setError("Nama dan email wajib diisi");
    return;
  }

  // 🔹 Cek apakah email atau nama sudah ada di daftar members
  const isDuplicate = members.some(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() ||
      user.name.toLowerCase() === name.toLowerCase()
  );

  if (isDuplicate) {
    // Kita set error agar muncul di OverlayMessage
    setError("Nama atau email sudah terdaftar");
    return;
  }

  try {
    const newUserRef = doc(db, "users", email);
    await setDoc(newUserRef, {
      name,
      email,
      role: "user", // default otomatis
      createdAt: new Date(),
    });

    setStatus("User berhasil ditambahkan");
    setName("");
    setEmail("");
    fetchMembers();
  } catch (err) {
    setError("Gagal menambahkan user");
  }
};

 // 🔹 Fungsi menghapus user (dengan SweetAlert2)
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Yakin mau hapus user ini?",
      text: "Data akan dihapus permanen.",
      icon: "danger",
      showCancelButton: true,
      confirmButtonColor: "rgba(204, 85, 85, 1)",
      cancelButtonColor: "#559fe4ff",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "users", id));
          fetchMembers();
          Swal.fire({
            icon: "success",
            title: "Dihapus!",
            text: "User berhasil dihapus.",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Terjadi kesalahan saat menghapus user.",
          });
        }
      }
    });
  };

  // 🔹 Auto reset error & status
  useEffect(() => {
    if (error || status) {
      const timer = setTimeout(() => {
        setError("");
        setStatus("");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [error, status]);

  return {
    members,
    loading,
    error,
    status,
    name,
    setName,
    email,
    setEmail,
    handleAddUser,
    handleDelete,
  };
}
