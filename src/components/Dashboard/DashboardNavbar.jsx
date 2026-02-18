import { Menu, User } from "lucide-react"
import useAuthContext from "../../hooks/useAuthContext"
import { useEffect, useState } from "react";
import authApiClient from "../../services/auth_api_client";

export default function DashboardNavbar({ toggleSidebar }) {
  const { user } = useAuthContext();
    const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await authApiClient.get("/accounts/me");
        setUserData(response.data || null);
      } catch (err) {
        console.error(err);
      } 
    };

    fetchUsersData();
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-6">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="lg:hidden">
          <Menu />
        </button>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        {userData?.profile_image ? (
          <img
            src={`https://res.cloudinary.com/mdarafathossen/${userData.profile_image}`}
            alt={user?.first_name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <User className="h-9 w-9 text-zinc-500" />
        )}
        <span className="text-sm text-zinc-300">
          {user?.first_name || "Member"}
        </span>
      </div>
    </header>
  )
}
