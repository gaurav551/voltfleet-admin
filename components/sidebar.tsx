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
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";

const navGroups = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Fleet Overview", href: "/fleet", icon: Car },
      { name: "Live Tracking", href: "/tracking", icon: MapPin },
    ],
  },
  {
    title: "Operations",
    items: [
      { name: "Charging Stations", href: "/charging", icon: Zap },
      { name: "Drivers", href: "/drivers", icon: Users },
      { name: "Battery Health", href: "/battery", icon: Battery },
    ],
  },
  {
    title: "Insights",
    items: [
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
      { name: "Performance", href: "/performance", icon: TrendingUp },
      { name: "Alerts", href: "/alerts", icon: AlertTriangle, badge: 3 },
    ],
  },
  {
    title: "System",
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Support", href: "/support", icon: HelpCircle },
    ],
  },
];

export function Sidebar() {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const [searchFocused, setSearchFocused] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/login");
  };

  // On mobile the sidebar always shows in expanded (full-width) style
  const showExpanded = !collapsed || mobileOpen;

  return (
    <>
      {/* ========== MOBILE HAMBURGER BUTTON ========== */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className={cn(
            "fixed top-4 left-4 z-50 p-2.5 rounded-lg shadow-lg lg:hidden",
            isDark
              ? "bg-gray-900 text-gray-300 hover:text-white border border-gray-700"
              : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 shadow-md"
          )}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* ========== MOBILE BACKDROP ========== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ========== SIDEBAR ========== */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 ease-in-out shadow-xl",
          isDark
            ? "bg-[#0f1115] border-r border-gray-800"
            : "bg-white border-r border-gray-200",

          // MOBILE (below lg): off-screen by default, slides in as overlay
          "w-72 -translate-x-full invisible",
          mobileOpen && "translate-x-0 !visible z-50",

          // DESKTOP (lg+): always visible, supports collapse
          "lg:visible lg:translate-x-0 lg:z-40",
          collapsed ? "lg:w-20" : "lg:w-72"
        )}
      >
        {/* --- HEADER --- */}
        <div
          className={cn(
            "flex h-16 items-center justify-between px-4 shrink-0",
            isDark ? "border-b border-gray-800" : "border-b border-gray-100"
          )}
        >
          {showExpanded && (
            <Link href="/" className="flex items-center space-x-3 group overflow-hidden">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-volt-600 to-volt-400 shrink-0">
                <Zap className="h-5 w-5 text-white fill-current" />
                <div className="absolute inset-0 bg-volt-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
              <span
                className={cn(
                  "text-lg font-bold tracking-tight whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r",
                  isDark ? "from-white to-gray-400" : "from-gray-900 to-gray-600"
                )}
              >
                VoltFleet
              </span>
            </Link>
          )}

          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileOpen(false);
              } else {
                setCollapsed((prev: boolean) => !prev);
              }
            }}
            className={cn(
              "p-1.5 rounded-md transition-all duration-200",
              isDark
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-900",
              !showExpanded && "mx-auto"
            )}
            title={collapsed ? "Expand (Cmd+B)" : "Collapse (Cmd+B)"}
          >
            <span className="lg:hidden">
              <X size={18} />
            </span>
            <span className="hidden lg:inline-flex">
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </span>
          </button>
        </div>

        {/* --- SEARCH --- */}
        {showExpanded && (
          <div className="px-4 py-4 shrink-0">
            <div
              className={cn(
                "relative flex items-center px-3 py-2 rounded-lg border transition-all duration-200",
                searchFocused
                  ? isDark
                    ? "bg-gray-800 border-volt-500/50 shadow-[0_0_0_1px_rgba(34,197,94,0.2)]"
                    : "bg-white border-volt-500 shadow-sm"
                  : isDark
                    ? "bg-gray-900/50 border-gray-800"
                    : "bg-gray-50 border-gray-200"
              )}
            >
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
              <kbd
                className={cn(
                  "hidden lg:inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium",
                  isDark
                    ? "bg-gray-800 border-gray-700 text-gray-400"
                    : "bg-white border-gray-200 text-gray-500"
                )}
              >
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        )}

        {/* --- NAVIGATION --- */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent px-3 py-2 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              {showExpanded && (
                <h3
                  className={cn(
                    "px-2 mb-2 text-xs font-semibold uppercase tracking-wider",
                    isDark ? "text-gray-500" : "text-gray-400"
                  )}
                >
                  {group.title}
                </h3>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link key={item.name} href={item.href} className="block relative group/item">
                      <div
                        className={cn(
                          "flex items-center px-2 py-2.5 rounded-lg transition-all duration-200 relative",
                          isActive
                            ? isDark
                              ? "bg-volt-500/10 text-volt-400"
                              : "bg-volt-50 text-volt-700"
                            : isDark
                              ? "text-gray-400 hover:bg-gray-800/50 hover:text-gray-100"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                          !showExpanded && "justify-center px-0"
                        )}
                      >
                        {isActive && (
                          <div
                            className={cn(
                              "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full",
                              isDark
                                ? "bg-volt-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                                : "bg-volt-600",
                              showExpanded ? "h-6" : "h-2"
                            )}
                          />
                        )}

                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0 transition-colors",
                            isActive ? (isDark ? "text-volt-500" : "text-volt-600") : "",
                            showExpanded && "mr-3"
                          )}
                        />

                        {showExpanded && (
                          <div className="flex flex-1 items-center justify-between">
                            <span className="text-sm font-medium">{item.name}</span>
                            {item.badge && (
                              <span
                                className={cn(
                                  "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                                  isDark
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                    : "bg-red-100 text-red-600"
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Tooltip — desktop collapsed only */}
                      {!showExpanded && (
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
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
        <div
          className={cn(
            "shrink-0 border-t p-4",
            isDark ? "border-gray-800 bg-[#0f1115]" : "border-gray-200 bg-gray-50"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              showExpanded ? "justify-between" : "flex-col justify-center gap-4"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-3 overflow-hidden",
                showExpanded ? "flex-1" : "w-8"
              )}
            >
              <div className="relative shrink-0 cursor-pointer">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  AD
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-gray-900" />
              </div>

              {showExpanded && (
                <div className="flex flex-col min-w-0">
                  <span
                    className={cn(
                      "text-sm font-semibold truncate",
                      isDark ? "text-gray-100" : "text-gray-900"
                    )}
                  >
                    Admin User
                  </span>
                  <span className={cn("text-xs truncate", isDark ? "text-gray-500" : "text-gray-500")}>
                    admin@voltfleet.com
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center justify-center rounded-lg transition-colors p-2",
                isDark
                  ? "text-gray-400 hover:text-red-400 hover:bg-red-900/10"
                  : "text-gray-500 hover:text-red-600 hover:bg-red-50",
                !showExpanded && "w-full aspect-square"
              )}
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}