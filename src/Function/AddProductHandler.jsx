import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function AddProductHandler() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  // State untuk input form
  const [Nama_Product, setNama_Product] = useState("");
  const [Jenis_Laptop, setJenis_Laptop] = useState("");
  const [Deskripsi_Singkat, setDeskripsi_Singkat] = useState("");
  const [CPU, setCPU] = useState("");
  const [RAM, setRAM] = useState("");
  const [GPU, setGPU] = useState("");
  const [STORAGE, setSTORAGE] = useState("");
  const [Harga, setHarga] = useState("");

  // 🔹 Ambil data produk dari Firestore
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const list = [];
      querySnapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setProducts(list);
    } catch (err) {
      setError("Belum ada produk tersedia");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Fungsi Menambah Produk
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !Nama_Product ||
      !Jenis_Laptop ||
      !Deskripsi_Singkat ||
      !CPU ||
      !RAM ||
      !GPU ||
      !STORAGE ||
      !Harga
    ) {
      setError("Semua field wajib diisi");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        Nama_Product,
        Jenis_Laptop,
        Deskripsi_Singkat,
        CPU,
        RAM,
        GPU,
        STORAGE,
        Harga,
        createdAt: new Date(),
      });

      setStatus("Produk berhasil ditambahkan");

      setNama_Product("");
      setJenis_Laptop("");
      setDeskripsi_Singkat("");
      setCPU("");
      setRAM("");
      setGPU("");
      setSTORAGE("");
      setHarga("");

      fetchProducts();
    } catch (err) {
      setError("Gagal menambahkan produk");
    }
  };

  // 🔹 Fungsi Menghapus Produk (SweetAlert2)
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Yakin mau hapus produk ini?",
      text: "Data akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      cancelButtonColor: "#5bc0de",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "products", id));
          fetchProducts();
          Swal.fire({
            icon: "success",
            title: "Dihapus!",
            text: "Produk berhasil dihapus.",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Terjadi kesalahan saat menghapus.",
          });
        }
      }
    });
  };

  // 🔹 Auto reset pesan
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
  };
}
