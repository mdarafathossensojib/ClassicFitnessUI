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
      
      <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden">
        
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          closeSidebar={() => setSidebarOpen(false)} 
        />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0 h-full">
          
          <DashboardNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 custom-scrollbar">
            <div className="max-w-7xl mx-auto w-full">
               <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
