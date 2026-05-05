"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Bell, 
  Search, 
  Moon, 
  Sun, 
  Menu, 
  Clock, 
  Calendar, 
  BatteryWarning, 
  AlertTriangle, 
  CheckCircle2, 
  X,
  ChevronRight
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

// Mock Notifications Data
const NOTIFICATIONS = [
  {
    id: 1,
    title: "Critical Battery Level",
    message: "Vehicle V-402 is at 8% charge in Sector 4.",
    time: "2 min ago",
    type: "critical",
    read: false,
  },
  {
    id: 2,
    title: "Maintenance Required",
    message: "Scheduled service due for Fleet Group Alpha.",
    time: "1 hour ago",
    type: "warning",
    read: false,
  },
  {
    id: 3,
    title: "Charging Complete",
    message: "Vehicle V-109 is fully charged and ready.",
    time: "2 hours ago",
    type: "success",
    read: true,
  },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const notificationRef = useRef<HTMLDivElement>(null);
  
  const isDark = theme === "dark";

  // Handle click outside to close notifications
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live Clock Timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Date/Time
  const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-16 border-b transition-all duration-300",
        isDark
          ? "bg-[#0f1115]/80 border-gray-800 backdrop-blur-md"
          : "bg-white/80 border-gray-200 backdrop-blur-md"
      )}
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-6 gap-4">
        
        {/* LEFT: Mobile Menu & Search */}
        <div className="flex items-center flex-1 gap-4">
          <button className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Menu className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-md hidden md:block group">
            <div className={cn(
              "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors",
              isDark ? "text-gray-500 group-focus-within:text-volt-500" : "text-gray-400 group-focus-within:text-volt-600"
            )}>
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search fleet, drivers, or alerts..."
              className={cn(
                "w-full pl-10 pr-12 py-2 rounded-lg text-sm transition-all duration-200 outline-none border",
                isDark
                  ? "bg-gray-900/50 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-volt-500/50 focus:bg-gray-900"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-volt-500 focus:bg-white"
              )}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className={cn(
                "hidden lg:inline-flex h-5 items-center gap-1 rounded border px-1.5 font-sans text-[10px] font-medium",
                isDark ? "border-gray-700 bg-gray-800 text-gray-400" : "border-gray-200 bg-gray-100 text-gray-500"
              )}>
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        {/* RIGHT: Actions & Widgets */}
        <div className="flex items-center gap-3 lg:gap-4">
          
          {/* Widget: System Status */}
          <div className={cn(
            "hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium",
            isDark ? "bg-gray-900/50 border-gray-800 text-green-400" : "bg-green-50 border-green-200 text-green-700"
          )}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Operational
          </div>

          {/* Widget: Clock */}
          <div className="hidden xl:flex flex-col items-end mr-2">
            <span className={cn("text-sm font-bold font-mono leading-none", isDark ? "text-gray-200" : "text-gray-900")}>
              {formattedTime}
            </span>
            <span className={cn("text-[10px] font-medium uppercase tracking-wider leading-none mt-1", isDark ? "text-gray-500" : "text-gray-500")}>
              {formattedDate}
            </span>
          </div>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 hidden lg:block"></div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isDark ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            )}
          >
            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {/* Notification Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={cn(
                "relative p-2 rounded-lg transition-colors",
                isNotificationsOpen 
                  ? (isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900")
                  : (isDark ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-600 hover:text-gray-900")
              )}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white dark:border-[#0f1115]"></span>
            </button>

            {/* The Dropdown Panel */}
            {isNotificationsOpen && (
              <div className={cn(
                "absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-black/5",
                isDark ? "bg-[#15171e] border-gray-800" : "bg-white border-gray-200"
              )}>
                <div className={cn("flex items-center justify-between px-4 py-3 border-b", isDark ? "border-gray-800" : "border-gray-100")}>
                  <h3 className={cn("font-semibold text-sm", isDark ? "text-white" : "text-gray-900")}>Notifications</h3>
                  <button className="text-xs text-blue-500 hover:text-blue-400 font-medium">Mark all read</button>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
                  {NOTIFICATIONS.map((notif) => (
                    <div 
                      key={notif.id}
                      className={cn(
                        "flex gap-3 px-4 py-3 border-b last:border-0 hover:bg-opacity-50 transition-colors cursor-pointer",
                        isDark 
                          ? "border-gray-800 hover:bg-gray-800/50" 
                          : "border-gray-50 hover:bg-gray-50",
                        !notif.read && (isDark ? "bg-gray-800/20" : "bg-blue-50/30")
                      )}
                    >
                      {/* Icon based on type */}
                      <div className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5",
                        notif.type === 'critical' && "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
                        notif.type === 'warning' && "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
                        notif.type === 'success' && "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
                      )}>
                        {notif.type === 'critical' && <BatteryWarning className="w-4 h-4" />}
                        {notif.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                        {notif.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className={cn("text-sm font-medium", isDark ? "text-gray-200" : "text-gray-900")}>
                            {notif.title}
                          </p>
                          <span className={cn("text-[10px]", isDark ? "text-gray-500" : "text-gray-400")}>
                            {notif.time}
                          </span>
                        </div>
                        <p className={cn("text-xs leading-relaxed", isDark ? "text-gray-400" : "text-gray-500")}>
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={cn("p-2 border-t", isDark ? "border-gray-800 bg-gray-900/50" : "border-gray-100 bg-gray-50")}>
                  <button className={cn(
                    "w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-colors",
                    isDark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                  )}>
                    View All Activity <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </header>
  );
}