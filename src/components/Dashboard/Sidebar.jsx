import { Link, useLocation, useNavigate } from "react-router"
import {
  LayoutDashboard,
  User,
  Dumbbell,
  Layers,
  CreditCard,
  LogOut,
  X,
  ShoppingBag,
  Images,
  Toolbox,
  MessagesSquare,
  User2,
  School,
  School2,
  Layers2,
  Home
} from "lucide-react"
import useAuthContext from "../../hooks/useAuthContext"


export default function DashboardSidebar({ sidebarOpen, closeSidebar }) {
  const location = useLocation();
  const pathname = location.pathname;
  const {user, logoutUser} = useAuthContext();
  const nagigate = useNavigate();

  const handleLogoutUser = () => {
    nagigate("/login");
    logoutUser();
  }

  const userLinks = [
    { label: "Home", to: "/", icon: Home },
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Profile", to: "/dashboard/profile", icon: User },
    { label: "My Classes", to: "/dashboard/my-booking", icon: School },
    { label: "My Attendence", to: "/dashboard/my-attendance", icon: School2 },
    { label: "My Plans", to: "/dashboard/my-plan", icon: Dumbbell },
    { label: "Purchase History", to: "/dashboard/payment/history", icon: ShoppingBag },
  ];

  const adminLinks = [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Profile", to: "/dashboard/profile", icon: User },
    { label: "Programs", to: "/dashboard/admin/programs", icon: Layers },
    { label: "Attendance", to: "/dashboard/admin/attendance", icon: Layers2 },
    { label: "Trainers", to: "/dashboard/admin/trainers", icon: User2 },
    { label: "Memberships", to: "/dashboard/admin/memberships", icon: CreditCard },
    { label: "Gallery", to: "/dashboard/admin/gallery", icon: Images },
    { label: "Services", to: "/dashboard/admin/services", icon: Toolbox },
    { label: "FeedBack", to: "/dashboard/admin/feedback", icon: MessagesSquare },
  ];

  const menuItems = user.is_staff ? adminLinks : userLinks;

  return (
    <>
      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed z-40 flex h-full w-64 flex-col border-r border-zinc-800 bg-zinc-900 transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-red-600" />
            <span className="text-lg font-bold tracking-wide">
              Classic Fitness
            </span>
          </Link>
          <button onClick={closeSidebar} className="lg:hidden">
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.to

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeSidebar}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-red-600/10 text-red-500"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-zinc-800 px-3 py-4">
          <button
            onClick={handleLogoutUser}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
