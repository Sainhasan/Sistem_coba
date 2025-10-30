import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function useAuthProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfile(userData);

          if (userData.role === "admin") {
            const querySnapshot = await getDocs(collection(db, "users"));
            const list = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.role === "user") list.push({ id: doc.id, ...data });
            });
            setMembers(list);
          }
        }
      } else {
        setUser(null);
        setProfile(null);
        setMembers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, profile, members, loading };
}
