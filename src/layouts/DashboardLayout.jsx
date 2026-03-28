import { useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">

      {/* Sidebar (Desktop) */}
      <div className="hidden lg:flex w-64 h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-zinc-900 transition-transform lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar closeSidebar={toggleSidebar} />
      </div>

      {/* Main Section */}
      <div className="flex flex-col flex-1 h-full">

        {/* Navbar */}
        <div className="shrink-0">
          <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Scrollable Main */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;