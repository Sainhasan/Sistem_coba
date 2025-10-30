import { Link } from "react-router-dom";
import UseManageUser from "../Function/UseManageUser";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ManageUser() {
  const {
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
  } = UseManageUser();

  useEffect(() => {
    if (error) toast.error(error);
    if (status) toast.success(status);
  }, [error, status]);

  return (
    <div className="d-flex flex-column align-items-center vh-100 bg-light p-3">
      <form
        className="card p-3 mb-3 w-50 position-relative shadow"
        onSubmit={handleAddUser}
      >
        <h5 className="text-center">Add User</h5>

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

        <button className="btn btn-success w-100">Tambah User</button>

        <div className="d-flex mt-2 justify-content-between gap-1 align-items-center">
          <Link to="/" className="btn btn-secondary w-100">
            Back
          </Link>
        </div>
      </form>

      {/* 🔹 Tabel user */}
      <div className="table-responsive w-50 rounded-3 bg-white p-1">
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <table className="table table-borderless table-sm">
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
                      onClick={() => handleDelete(member.id)}
                      disabled={member.role === "admin"}
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
