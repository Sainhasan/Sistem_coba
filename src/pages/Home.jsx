import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import useAuthProfile from "../Function/UseAuthProfile";
import Loader from "../components/Loader";
import UserInfo from "../components/UserInfo";
import GuestActions from "../components/GuestActions";

export default function Home() {
  const { user, profile, loading } = useAuthProfile();

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <Loader />;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h3>INI RUMAH</h3>
      {user && profile ? (
        <UserInfo profile={profile} onLogout={handleLogout} />
      ) : (
        <GuestActions />
      )}
    </div>
  );
}
