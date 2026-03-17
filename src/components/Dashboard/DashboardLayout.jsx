import { useState } from "react"
import { Outlet } from "react-router"
import Sidebar from "./Sidebar"
import DashboardNavbar from "../Dashboard/DashboardNavbar"
import { Helmet } from "react-helmet";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 w-fit overflow-hidden mx-auto">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <DashboardNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  )
}
