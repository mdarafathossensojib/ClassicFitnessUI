import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import { Dumbbell, Menu, X, ChevronDown, User } from "lucide-react"
import useAuthContext from "../hooks/useAuthContext"
import authApiClient from "../services/auth_api_client"

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Programs", to: "/programs" },
  { label: "Trainers", to: "/trainers" },
  { label: "Membership", to: "/membership" },
  { label: "Contact", to: "/contact" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logoutUser } = useAuthContext()
  const navigate = useNavigate()
  const menuRef = useRef(null)

  const handleLogout = () => {
    logoutUser()
    navigate("/login")
  }

  // close user menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, []);

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
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Dumbbell className="h-7 w-7 text-red-600" />
          <span className="text-xl font-bold uppercase tracking-wider text-white">
            Classic Fitness
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="text-sm font-medium uppercase tracking-wide text-zinc-400 hover:text-red-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-zinc-700 px-3 py-1.5 hover:bg-zinc-800"
              >
                {userData?.profile_image ? (
                  <img
                    src={`https://res.cloudinary.com/mdarafathossen/${userData.profile_image}`}
                    alt={user?.first_name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-zinc-500" />
                )}
                <ChevronDown className="h-4 w-4 text-zinc-300" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-md border border-zinc-800 bg-zinc-900 shadow-lg">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-zinc-800 text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm hover:bg-zinc-800 text-white"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-800 text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md border border-zinc-700 px-4 py-2 text-sm uppercase text-zinc-100 hover:bg-zinc-800"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-red-600 px-4 py-2 text-sm uppercase text-white hover:bg-red-700"
              >
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950">
          <ul className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm uppercase text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              >
                {link.label}
              </Link>
            ))}
          </ul>

          {user ? (
            <div className="border-t border-zinc-800 px-6 py-4 space-y-2">
              <Link to="/dashboard" className="block text-sm">
                Dashboard
              </Link>
              <Link to="/dashboard/profile" className="block text-sm">
                Profile
              </Link>
              <button onClick={handleLogout} className="block text-sm text-red-500">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 border-t border-zinc-800 px-6 py-4">
              <Link to="/login" className="flex-1 text-center border px-4 py-2">
                Log In
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center bg-red-600 px-4 py-2"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
