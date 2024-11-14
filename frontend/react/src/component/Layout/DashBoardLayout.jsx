// DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from "./Header/Header.jsx";
import {useState} from "react";
import Sidebar from "./SideBar/SideBar.jsx";

export const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden"> {/* Changed: Added h-screen and overflow-hidden */}
            {/* Sidebar - Now fixed */}
            <aside className="flex-shrink-0 w-64"> {/* Added flex-shrink-0 to prevent shrinking */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </aside>

            {/* Main Content - Scrollable */}
            <div className="flex-1 flex flex-col overflow-hidden"> {/* Added overflow-hidden */}
                {/* Header - Fixed */}
                <Header onMenuClick={() => setSidebarOpen(true)} />

                {/* Main Content - Scrollable */}
                <main className="flex-1 overflow-y-auto"> {/* Changed: only overflow-y-auto here */}
                    <div className="p-6">
                        <div className="max-w-7xl mx-auto space-y-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};