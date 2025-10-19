import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [user, setUser] = useState(null); // 🔹 state user auth
  const [profile, setProfile] = useState(null); // 🔹 state data Firestore
  const [members, setMembers] = useState([]); // 🔹 state list member
  const [loading, setLoading] = useState(true); // 🔹 state loading data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // 🔹 Ambil data profil user dari Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfile(userData);

          // 🔹 Kalau admin, ambil list user
          if (userData.role === "admin") {
            const querySnapshot = await getDocs(collection(db, "users"));
            const list = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.role === "user") {
                // 🔹 filter hanya user
                list.push({ id: doc.id, ...data });
              }
            });
            setMembers(list);
            console.log("Members fetched:", list); // 🔹 debug
          }
        }
      } else {
        setUser(null);
        setProfile(null);
        setMembers([]);
      }
      setLoading(false); // 🔹 selesai fetch
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h3>INI RUMAH</h3>

      <div className="d-flex flex-column align-items-center justify-content-center gap-3">
        {user && profile ? (
          <>
            <p className="mb-0">
              Selamat datang, <b>{profile.name}</b> ({profile.role})
            </p>
            {profile.role === "admin" && (
              <Link to="/manage" className="btn btn-warning">
                Manajemen User
              </Link>
            )}
            <button onClick={handleLogout} className="btn btn-danger">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/Login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/Regis" className="btn btn-success">
              Daftar
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
