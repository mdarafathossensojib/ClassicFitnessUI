import { useState } from "react"
import { Outlet } from "react-router"
import Sidebar from "./Sidebar"
import DashboardNavbar from "../Dashboard/DashboardNavbar"

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <DashboardNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
