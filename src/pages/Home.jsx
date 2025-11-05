import AddProductHandler from "../Function/AddProductHandler";
import { Link } from "react-router-dom";

export default function Home() {
  const { products, loading } = AddProductHandler();

  return (
    <>
      {loading
        ? null
        : products.map((p) => (
            <div className="bg-light shadow-sm rounded-bottom-3 py-3 HsA">
              <div className="d-flex justify-content-end prfl container">
                <Link
                  to="/profile"
                  className="btn btn-sm btn-light shadow-sm rounded-3 mt-2"
                  style={{ marginRight: "2rem" }}
                >
                  Profile
                </Link>
              </div>
              <div
                key={p.id}
                className="d-flex justify-content-between align-items-center px-4 HsAItem"
              >
                {/* kiri: info produk */}
                <div className="p-4 rounded-4 bg-light">
                  <h3 className="text-uppercase fs-2">{p.Nama_Product}</h3>
                  <span className="text-muted">{p.Jenis_Laptop}</span>
                  <p>{p.Deskripsi_Singkat}</p>

                  <div className="d-flex flex-wrap gap-2 mb-2">
                    <span className="btn btn-sm btn-dark shadow-sm">
                      {p.CPU}
                    </span>
                    <span className="btn btn-sm btn-dark shadow-sm">
                      {p.RAM}
                    </span>
                    <span className="btn btn-sm btn-dark shadow-sm">
                      {p.STORAGE}
                    </span>
                  </div>

                  <div className="d-flex gap-2">
                    <span className="btn btn-sm btn-light shadow-sm w-50">
                      Detail Spek
                    </span>
                    <span className="btn btn-sm btn-secondary shadow-sm w-50">
                      Skip
                    </span>
                  </div>
                </div>

                {/* kanan: gambar & harga */}
                <div className="shadow-lg rounded-4 d-flex justify-content-center position-relative mb-1">
                  <img
                    src="src/assets/Prd1.png"
                    alt="Laptop"
                    className="prd1 img-fluid px-5"
                  />
                  <span className="btn btn-light btn-sm shadow-sm position-absolute top-100 start-0 translate-middle rounded-3 spntag">
                    Rp {parseInt(p.Harga).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          ))}
    </>
  );
}
