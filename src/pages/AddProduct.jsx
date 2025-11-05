import { Link } from "react-router-dom";
import AddProductHandler from "../Function/AddProductHandler";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function AddProduct() {
  const {
    products,
    loading,
    error,
    status,

    Nama_Product,
    setNama_Product,
    Jenis_Laptop,
    setJenis_Laptop,
    Deskripsi_Singkat,
    setDeskripsi_Singkat,
    CPU,
    setCPU,
    RAM,
    setRAM,
    GPU,
    setGPU,
    STORAGE,
    setSTORAGE,
    Harga,
    setHarga,

    handleAddProduct,
    handleDelete,
  } = AddProductHandler();

  useEffect(() => {
    if (error) toast.error(error);
    if (status) toast.success(status);
  }, [error, status]);

  return (
    <div
      className="d-flex flex-column align-items-center bg-light p-3"
      style={{ minHeight: "100vh" }}
    >
      <form
        className="card p-3 mb-3 w-75 position-relative shadow border-0"
        onSubmit={handleAddProduct}
      >
        <h5 className="text-center mb-3">Add New Laptop Product</h5>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nama Produk"
          value={Nama_Product}
          onChange={(e) => setNama_Product(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Jenis Laptop"
          value={Jenis_Laptop}
          onChange={(e) => setJenis_Laptop(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Deskripsi Singkat"
          value={Deskripsi_Singkat}
          onChange={(e) => setDeskripsi_Singkat(e.target.value)}
        ></textarea>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="CPU (misal: Intel i5 12450H)"
          value={CPU}
          onChange={(e) => setCPU(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="RAM (misal: 16GB DDR4)"
          value={RAM}
          onChange={(e) => setRAM(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="GPU (misal: RTX 3050)"
          value={GPU}
          onChange={(e) => setGPU(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Storage (misal: 512GB SSD NVMe)"
          value={STORAGE}
          onChange={(e) => setSTORAGE(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Harga (misal: 11500000)"
          value={Harga}
          onChange={(e) => setHarga(e.target.value)}
        />

        <button className="btn btn-success w-100">Tambah Produk</button>

        <div className="d-flex mt-2 justify-content-between gap-1 align-items-center">
          <Link to="/" className="btn btn-secondary w-100">
            Back
          </Link>
        </div>
      </form>

      {/* 🔹 Tabel Produk */}
      <div className="table-responsive w-75 rounded-3 shadow-sm bg-white p-2">
        {loading ? (
          <p className="text-center m-2">Memuat data...</p>
        ) : (
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nama</th>
                <th>Jenis</th>
                <th>CPU</th>
                <th>RAM</th>
                <th>GPU</th>
                <th>Storage</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.Nama_Product}</td>
                  <td>{p.Jenis_Laptop}</td>
                  <td>{p.CPU}</td>
                  <td>{p.RAM}</td>
                  <td>{p.GPU}</td>
                  <td>{p.STORAGE}</td>
                  <td>Rp {parseInt(p.Harga).toLocaleString("id-ID")}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p.id)}
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
