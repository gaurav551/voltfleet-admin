"use client";

import {
  Zap,
  Car,
  Battery,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Activity,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

const stats = [
  {
    name: "Total Fleet",
    value: "247",
    change: "+12%",
    changeType: "positive",
    icon: Car,
    color: "volt",
  },
  {
    name: "Active Charging",
    value: "43",
    change: "+8%",
    changeType: "positive",
    icon: Zap,
    color: "cyber",
  },
  {
    name: "Avg Battery Health",
    value: "94.2%",
    change: "-2%",
    changeType: "negative",
    icon: Battery,
    color: "volt",
  },
  {
    name: "Energy Efficiency",
    value: "4.2 mi/kWh",
    change: "+5%",
    changeType: "positive",
    icon: TrendingUp,
    color: "cyber",
  },
];

const alerts = [
  {
    id: 1,
    type: "warning",
    vehicle: "EV-1247",
    message: "Battery health below 85%",
    time: "5 min ago",
  },
  {
    id: 2,
    type: "critical",
    vehicle: "EV-0934",
    message: "Charging station offline",
    time: "12 min ago",
  },
  {
    id: 3,
    type: "info",
    vehicle: "EV-2156",
    message: "Maintenance due in 500 miles",
    time: "1 hour ago",
  },
];

const recentActivity = [
  {
    id: 1,
    vehicle: "EV-1247",
    action: "Charging completed",
    location: "Station A-12",
    time: "10 min ago",
  },
  {
    id: 2,
    vehicle: "EV-0934",
    action: "Route completed",
    location: "Depot North",
    time: "25 min ago",
  },
  {
    id: 3,
    vehicle: "EV-2156",
    action: "Charging started",
    location: "Station B-07",
    time: "45 min ago",
  },
];

export default function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-volt-400 to-cyber-400 bg-clip-text text-transparent">
          Fleet Command Center
        </h1>
        <p className={cn("mt-1", isDark ? "text-gray-400" : "text-gray-600")}>
          Real-time monitoring and control of your EV fleet operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className={cn(
                "relative group overflow-hidden rounded-xl p-6",
                "transition-all duration-300",
                isDark
                  ? "bg-dark-900 border border-volt-900/20 hover:border-volt-500/50 hover:shadow-glow-md"
                  : "bg-white border border-gray-200 hover:border-volt-500/50 hover:shadow-lg"
              )}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-volt-500/0 to-cyber-500/0 group-hover:from-volt-500/5 group-hover:to-cyber-500/5 transition-all duration-300"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      stat.color === "volt"
                        ? isDark
                          ? "bg-volt-900/30"
                          : "bg-volt-100"
                        : isDark
                        ? "bg-cyber-900/30"
                        : "bg-cyber-100"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6",
                        stat.color === "volt"
                          ? "text-volt-500"
                          : "text-cyber-500"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium px-2 py-1 rounded",
                      stat.changeType === "positive"
                        ? isDark
                          ? "text-volt-400 bg-volt-900/30"
                          : "text-volt-600 bg-volt-100"
                        : isDark
                        ? "text-red-400 bg-red-900/30"
                        : "text-red-600 bg-red-100"
                    )}
                  >
                    {stat.change}
                  </span>
                </div>

                <div>
                  <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                    {stat.name}
                  </p>
                  <p className={cn("text-3xl font-bold mt-1", isDark ? "text-white" : "text-gray-900")}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Alerts */}
        <div
          className={cn(
            "lg:col-span-2 rounded-xl p-6",
            isDark
              ? "bg-dark-900 border border-volt-900/20"
              : "bg-white border border-gray-200"
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={cn("text-xl font-bold flex items-center", isDark ? "text-white" : "text-gray-900")}>
              <AlertTriangle className="h-5 w-5 text-volt-500 mr-2" />
              Active Alerts
            </h2>
            <button className="text-sm text-volt-500 hover:text-volt-400">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200",
                  "hover:border-volt-500/50 cursor-pointer group",
                  alert.type === "critical"
                    ? isDark
                      ? "bg-red-900/10 border-red-900/30"
                      : "bg-red-50 border-red-200"
                    : alert.type === "warning"
                    ? isDark
                      ? "bg-yellow-900/10 border-yellow-900/30"
                      : "bg-yellow-50 border-yellow-200"
                    : isDark
                    ? "bg-blue-900/10 border-blue-900/30"
                    : "bg-blue-50 border-blue-200"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded",
                          alert.type === "critical"
                            ? isDark
                              ? "bg-red-900/30 text-red-400"
                              : "bg-red-100 text-red-700"
                            : alert.type === "warning"
                            ? isDark
                              ? "bg-yellow-900/30 text-yellow-400"
                              : "bg-yellow-100 text-yellow-700"
                            : isDark
                            ? "bg-blue-900/30 text-blue-400"
                            : "bg-blue-100 text-blue-700"
                        )}
                      >
                        {alert.vehicle}
                      </span>
                      <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-500")}>
                        {alert.time}
                      </span>
                    </div>
                    <p className={cn("text-sm", isDark ? "text-gray-300" : "text-gray-700")}>
                      {alert.message}
                    </p>
                  </div>
                  <button className={cn("ml-4", isDark ? "text-gray-400 hover:text-volt-500" : "text-gray-400 hover:text-volt-500")}>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className={cn(
            "rounded-xl p-6",
            isDark
              ? "bg-dark-900 border border-volt-900/20"
              : "bg-white border border-gray-200"
          )}
        >
          <h2 className={cn("text-xl font-bold mb-6", isDark ? "text-white" : "text-gray-900")}>
            Quick Actions
          </h2>

          <div className="space-y-3">
            <button
              className={cn(
                "w-full p-4 rounded-lg transition-all duration-200 group",
                isDark
                  ? "bg-gradient-to-r from-volt-900/30 to-volt-800/30 border border-volt-700/30 hover:border-volt-500"
                  : "bg-gradient-to-r from-volt-100 to-volt-50 border border-volt-300 hover:border-volt-500"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      isDark ? "bg-volt-900/50" : "bg-volt-100"
                    )}
                  >
                    <Zap className="h-5 w-5 text-volt-500" />
                  </div>
                  <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>
                    Start Charging
                  </span>
                </div>
                <svg
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isDark
                      ? "text-gray-400 group-hover:text-volt-500"
                      : "text-gray-500 group-hover:text-volt-500"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>

            <button
              className={cn(
                "w-full p-4 rounded-lg transition-all duration-200 group",
                isDark
                  ? "bg-gradient-to-r from-cyber-900/30 to-cyber-800/30 border border-cyber-700/30 hover:border-cyber-500"
                  : "bg-gradient-to-r from-cyber-100 to-cyber-50 border border-cyber-300 hover:border-cyber-500"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      isDark ? "bg-cyber-900/50" : "bg-cyber-100"
                    )}
                  >
                    <MapPin className="h-5 w-5 text-cyber-500" />
                  </div>
                  <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>
                    Track Fleet
                  </span>
                </div>
                <svg
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isDark
                      ? "text-gray-400 group-hover:text-cyber-500"
                      : "text-gray-500 group-hover:text-cyber-500"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>

            <button
              className={cn(
                "w-full p-4 rounded-lg transition-all duration-200 group",
                isDark
                  ? "bg-gradient-to-r from-dark-800 to-dark-700 border border-volt-900/30 hover:border-volt-500"
                  : "bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-300 hover:border-volt-500"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      isDark ? "bg-dark-700" : "bg-gray-200"
                    )}
                  >
                    <Activity className="h-5 w-5 text-volt-500" />
                  </div>
                  <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>
                    View Reports
                  </span>
                </div>
                <svg
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isDark
                      ? "text-gray-400 group-hover:text-volt-500"
                      : "text-gray-500 group-hover:text-volt-500"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className={cn(
          "rounded-xl p-6",
          isDark
            ? "bg-dark-900 border border-volt-900/20"
            : "bg-white border border-gray-200"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn("text-xl font-bold flex items-center", isDark ? "text-white" : "text-gray-900")}>
            <Activity className="h-5 w-5 text-volt-500 mr-2" />
            Recent Activity
          </h2>
          <button className="text-sm text-volt-500 hover:text-volt-400">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg",
                "transition-all duration-200 cursor-pointer group",
                isDark
                  ? "bg-dark-800 border border-volt-900/20 hover:border-volt-500/50"
                  : "bg-gray-50 border border-gray-200 hover:border-volt-500/50"
              )}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isDark
                      ? "bg-volt-900/30 group-hover:bg-volt-900/50"
                      : "bg-volt-100 group-hover:bg-volt-200"
                  )}
                >
                  <Car className="h-5 w-5 text-volt-500" />
                </div>
                <div>
                  <p className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>
                    {activity.vehicle} - {activity.action}
                  </p>
                  <p className={cn("text-xs mt-0.5", isDark ? "text-gray-400" : "text-gray-500")}>
                    {activity.location}
                  </p>
                </div>
              </div>
              <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-500")}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}