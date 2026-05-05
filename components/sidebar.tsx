"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "./theme-provider";
import {
  LayoutDashboard,
  Zap,
  Car,
  MapPin,
  BarChart3,
  Settings,
  Users,
  Battery,
  AlertTriangle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Search,
  Bell,
  MoreVertical,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// Organized navigation into logical groups
const navGroups = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Fleet Overview", href: "/fleet", icon: Car },
      { name: "Live Tracking", href: "/tracking", icon: MapPin },
    ]
  },
  {
    title: "Operations",
    items: [
      { name: "Charging Stations", href: "/charging", icon: Zap },
      { name: "Drivers", href: "/drivers", icon: Users },
      { name: "Battery Health", href: "/battery", icon: Battery },
    ]
  },
  {
    title: "Insights",
    items: [
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
      { name: "Performance", href: "/performance", icon: TrendingUp },
      { name: "Alerts", href: "/alerts", icon: AlertTriangle, badge: 3 }, // Added Badge
    ]
  },
  {
    title: "System",
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Support", href: "/support", icon: HelpCircle },
    ]
  }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  
  const isDark = theme === "dark";

  // Handle Keyboard Shortcut (Ctrl/Cmd + B) to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setCollapsed(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    // Perform any cleanup logic here (e.g., clearing tokens)
    console.log("Logging out...");
    router.push('/login');
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out shadow-xl",
        isDark
          ? "bg-[#0f1115] border-r border-gray-800" // refined dark hex
          : "bg-white border-r border-gray-200",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* --- HEADER --- */}
      <div className={cn(
        "flex h-16 items-center justify-between px-4 shrink-0",
        isDark ? "border-b border-gray-800" : "border-b border-gray-100"
      )}>
        {!collapsed && (
          <Link href="/" className="flex items-center space-x-3 group overflow-hidden">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-volt-600 to-volt-400 shrink-0">
              <Zap className="h-5 w-5 text-white fill-current" />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-volt-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            </div>
            <span className={cn(
              "text-lg font-bold tracking-tight whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r",
              isDark ? "from-white to-gray-400" : "from-gray-900 to-gray-600"
            )}>
              VoltFleet
            </span>
          </Link>
        )}
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-md transition-all duration-200 group relative",
            isDark 
              ? "hover:bg-gray-800 text-gray-400 hover:text-white" 
              : "hover:bg-gray-100 text-gray-500 hover:text-gray-900",
            collapsed ? "mx-auto" : "ml-auto"
          )}
          title={collapsed ? "Expand (Cmd+B)" : "Collapse (Cmd+B)"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* --- SEARCH --- */}
      {!collapsed && (
        <div className="px-4 py-4 shrink-0">
          <div className={cn(
            "relative flex items-center px-3 py-2 rounded-lg border transition-all duration-200",
            searchFocused 
              ? (isDark ? "bg-gray-800 border-volt-500/50 shadow-[0_0_0_1px_rgba(34,197,94,0.2)]" : "bg-white border-volt-500 shadow-sm")
              : (isDark ? "bg-gray-900/50 border-gray-800" : "bg-gray-50 border-gray-200")
          )}>
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Quick search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={cn(
                "w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-500",
                isDark ? "text-white" : "text-gray-900"
              )}
            />
            <div className="flex items-center gap-0.5 ml-2">
              <kbd className={cn("hidden lg:inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100", 
                isDark ? "bg-gray-800 border-gray-700 text-gray-400" : "bg-white border-gray-200 text-gray-500"
              )}>
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>
      )}

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent px-3 py-2 space-y-6">
        {navGroups.map((group, groupIndex) => (
          <div key={group.title}>
            {/* Section Header */}
            {!collapsed && (
              <h3 className={cn(
                "px-2 mb-2 text-xs font-semibold uppercase tracking-wider",
                isDark ? "text-gray-500" : "text-gray-400"
              )}>
                {group.title}
              </h3>
            )}

            {/* Links */}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block relative group/item" // Group for tooltip
                  >
                    <div className={cn(
                      "flex items-center px-2 py-2.5 rounded-lg transition-all duration-200 relative group",
                      isActive
                        ? isDark 
                          ? "bg-volt-500/10 text-volt-400" 
                          : "bg-volt-50 text-volt-700"
                        : isDark
                          ? "text-gray-400 hover:bg-gray-800/50 hover:text-gray-100"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                      collapsed && "justify-center px-0"
                    )}>
                      {/* Active Indicator Line */}
                      {isActive && (
                        <div className={cn(
                          "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300",
                          isDark ? "bg-volt-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]" : "bg-volt-600",
                          collapsed ? "h-2" : "h-6"
                        )} />
                      )}

                      <Icon className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        isActive ? (isDark ? "text-volt-500" : "text-volt-600") : "",
                        !collapsed && "mr-3"
                      )} />

                      {!collapsed && (
                        <div className="flex flex-1 items-center justify-between">
                          <span className="text-sm font-medium">{item.name}</span>
                          {/* Badge Logic */}
                          {item.badge && (
                            <span className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                              isDark ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-red-100 text-red-600"
                            )}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Collapsed Tooltip (Custom CSS-in-JS logic) */}
                    {collapsed && (
                      <div className={cn(
                        "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg",
                        !isDark && "bg-gray-800"
                      )}>
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* --- FOOTER / PROFILE --- */}
      <div className={cn(
        "shrink-0 border-t p-4 transition-all",
        isDark ? "border-gray-800 bg-[#0f1115]" : "border-gray-200 bg-gray-50"
      )}>
        <div className={cn(
          "flex items-center gap-3",
          collapsed ? "flex-col justify-center gap-4" : "justify-between"
        )}>
          {/* User Info */}
          <div className={cn(
            "flex items-center gap-3 overflow-hidden transition-all",
            collapsed ? "w-8" : "flex-1"
          )}>
            <div className="relative shrink-0 cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                AD
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-gray-900"></span>
            </div>
            
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className={cn("text-sm font-semibold truncate", isDark ? "text-gray-100" : "text-gray-900")}>
                  Admin User
                </span>
                <span className={cn("text-xs truncate", isDark ? "text-gray-500" : "text-gray-500")}>
                  admin@voltfleet.com
                </span>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center justify-center rounded-lg transition-colors p-2",
              isDark 
                ? "text-gray-400 hover:text-red-400 hover:bg-red-900/10" 
                : "text-gray-500 hover:text-red-600 hover:bg-red-50",
              collapsed && "w-full aspect-square"
            )}
            title="Sign Out"
          >
            <LogOut size={18} />
            {/* Optional: Add text if you want explicit logout text when expanded, but icon only is cleaner */}
          </button>
        </div>
      </div>
    </aside>
  );
}