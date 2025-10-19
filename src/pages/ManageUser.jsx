// ManageUser.jsx
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { Link } from "react-router-dom";

export default function ManageUser() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("");

  // 🔹 Ambil semua user dari Firestore
  const fetchMembers = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "users"));
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setMembers(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const showStatus = (message) => {
    setStatus(message);
    setTimeout(() => setStatus(""), 3000); // 🔹 hilangkan status setelah 3 detik
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!name || !email) return showStatus("Nama dan email wajib diisi");
    if (role === "admin") return showStatus("Tidak boleh menambahkan admin");

    try {
      const newUserRef = doc(db, "users", email);
      await setDoc(newUserRef, {
        name,
        email,
        role,
        createdAt: new Date(),
      });
      showStatus("User berhasil ditambahkan"); // 🔹 pakai helper
      setName("");
      setEmail("");
      setRole("user");
      fetchMembers();
    } catch (error) {
      showStatus("Gagal menambahkan user: " + error.message);
    }
  };

  // Hapus user
  const handleDelete = async (id, userRole) => {
    if (userRole === "admin") return showStatus("Tidak boleh menghapus admin");
    if (!confirm("Yakin mau hapus user ini?")) return;
    try {
      await deleteDoc(doc(db, "users", id));
      showStatus("User berhasil dihapus");
      fetchMembers();
    } catch (error) {
      showStatus("Gagal hapus user: " + error.message);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center vh-100 bg-light p-3">
      <h3>Manajemen User</h3>

      <form className="card p-3 mb-3 w-50" onSubmit={handleAddUser}>
        <h5>Tambah User Manual</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="form-select mb-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-success ">Tambah User</button>
        <div className="d-flex mt-1 justify-content-between gap-1 align-items-center">
          <Link to="/" className="btn btn-secondary w-25">
            Kembali ke Home
          </Link>
          {status && (
            <div
              className=" btn btn-danger w-75  text-center"
              style={{ opacity: 0.5 }}
            >
              {status}
            </div>
          )}
        </div>
      </form>

      <div className="table-responsive w-75">
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <table className="table table-primary">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(member.id, member.role)}
                      disabled={member.role === "admin"} // 🔹 tombol disable kalau admin
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
