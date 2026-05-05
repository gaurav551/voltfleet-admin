"use client";

import {
  Zap,
  MapPin,
  Users,
  Activity,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Clock,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

const stations = [
  {
    id: "A-12",
    name: "Downtown Hub",
    location: "123 Main Street",
    type: "DC Fast Charging",
    capacity: 8,
    available: 3,
    utilization: 62,
    avgChargeTime: "28 min",
    status: "operational",
    powerOutput: "150 kW",
  },
  {
    id: "B-07",
    name: "North Depot",
    location: "456 North Avenue",
    type: "Level 2 Charging",
    capacity: 12,
    available: 7,
    utilization: 42,
    avgChargeTime: "4.5 hours",
    status: "operational",
    powerOutput: "7.2 kW",
  },
  {
    id: "C-19",
    name: "Airport Terminal",
    location: "789 Airport Road",
    type: "DC Fast Charging",
    capacity: 10,
    available: 0,
    utilization: 100,
    avgChargeTime: "35 min",
    status: "full",
    powerOutput: "150 kW",
  },
  {
    id: "D-05",
    name: "South Mall",
    location: "321 Commerce Blvd",
    type: "Level 2 Charging",
    capacity: 6,
    available: 4,
    utilization: 33,
    avgChargeTime: "4.5 hours",
    status: "operational",
    powerOutput: "7.2 kW",
  },
  {
    id: "E-14",
    name: "Tech Park",
    location: "654 Innovation Drive",
    type: "DC Fast Charging",
    capacity: 5,
    available: 1,
    utilization: 80,
    avgChargeTime: "28 min",
    status: "operational",
    powerOutput: "150 kW",
  },
  {
    id: "F-08",
    name: "Railway Station",
    location: "987 Transit Way",
    type: "Level 2 Charging",
    capacity: 8,
    available: 2,
    utilization: 75,
    avgChargeTime: "4.5 hours",
    status: "warning",
    powerOutput: "7.2 kW",
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "operational":
      return {
        bg: "from-volt-900/20 to-volt-800/20",
        border: "border-volt-500/50",
        badge: "bg-volt-900/40 text-volt-400",
        dot: "bg-volt-500",
      };
    case "full":
      return {
        bg: "from-yellow-900/20 to-yellow-800/20",
        border: "border-yellow-500/50",
        badge: "bg-yellow-900/40 text-yellow-400",
        dot: "bg-yellow-500",
      };
    case "warning":
      return {
        bg: "from-red-900/20 to-red-800/20",
        border: "border-red-500/50",
        badge: "bg-red-900/40 text-red-400",
        dot: "bg-red-500",
      };
    default:
      return {
        bg: "from-gray-900/20 to-gray-800/20",
        border: "border-gray-500/50",
        badge: "bg-gray-900/40 text-gray-400",
        dot: "bg-gray-500",
      };
  }
};

export default function ChargingPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-volt-400 to-cyber-400 bg-clip-text text-transparent">
            Charging Stations
          </h1>
          <p className={cn("mt-1", isDark ? "text-gray-400" : "text-gray-600")}>
            Manage and monitor {stations.length} charging stations across your network
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
              isDark
                ? "bg-dark-800 border border-volt-900/30 text-gray-300 hover:border-volt-500"
                : "bg-gray-100 border border-gray-300 text-gray-700 hover:border-volt-500"
            )}
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
              isDark
                ? "bg-volt-900/20 border border-volt-500/50 text-volt-400 hover:bg-volt-900/30"
                : "bg-volt-100 border border-volt-300 text-volt-600 hover:bg-volt-200"
            )}
          >
            <Plus className="h-4 w-4" />
            Add Station
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Stations", value: stations.length.toString(), icon: Zap },
          { label: "Available Ports", value: stations.reduce((sum, s) => sum + s.available, 0).toString(), icon: Activity },
          { label: "Avg Utilization", value: Math.round(stations.reduce((sum, s) => sum + s.utilization, 0) / stations.length) + "%", icon: TrendingUp },
          { label: "Active Sessions", value: stations.reduce((sum, s) => sum + (s.capacity - s.available), 0).toString(), icon: Users },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={cn(
                "p-4 rounded-lg border",
                isDark
                  ? "bg-dark-800 border-volt-900/20 hover:border-volt-500/50"
                  : "bg-gray-50 border-gray-200 hover:border-volt-500/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-600")}>
                    {stat.label}
                  </p>
                  <p className={cn("text-2xl font-bold mt-1", isDark ? "text-white" : "text-gray-900")}>
                    {stat.value}
                  </p>
                </div>
                <Icon className="h-8 w-8 text-volt-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and View Toggle */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4", isDark ? "text-gray-400" : "text-gray-500")} />
          <input
            type="text"
            placeholder="Search stations..."
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-lg text-sm",
              "focus:outline-none focus:ring-1 focus:ring-volt-500/50",
              "transition-all duration-200",
              isDark
                ? "bg-dark-800 border border-volt-900/30 text-gray-200 placeholder:text-gray-500 focus:border-volt-500"
                : "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-volt-500"
            )}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "px-4 py-2 rounded-lg transition-all duration-200",
              viewMode === "grid"
                ? isDark
                  ? "bg-volt-900/20 border border-volt-500/50 text-volt-400"
                  : "bg-volt-100 border border-volt-300 text-volt-600"
                : isDark
                ? "bg-dark-800 border border-volt-900/30 text-gray-400 hover:border-volt-500"
                : "bg-gray-100 border border-gray-300 text-gray-600 hover:border-volt-500"
            )}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "px-4 py-2 rounded-lg transition-all duration-200",
              viewMode === "list"
                ? isDark
                  ? "bg-volt-900/20 border border-volt-500/50 text-volt-400"
                  : "bg-volt-100 border border-volt-300 text-volt-600"
                : isDark
                ? "bg-dark-800 border border-volt-900/30 text-gray-400 hover:border-volt-500"
                : "bg-gray-100 border border-gray-300 text-gray-600 hover:border-volt-500"
            )}
          >
            List
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station) => {
            const styles = getStatusStyles(station.status);
            return (
              <div
                key={station.id}
                className={cn(
                  "p-6 rounded-xl border overflow-hidden group",
                  isDark
                    ? `bg-gradient-to-br ${styles.bg} border-volt-900/20 hover:border-volt-500/50`
                    : "bg-white border-gray-200 hover:border-volt-500/50"
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={cn("font-bold text-lg", isDark ? "text-white" : "text-gray-900")}>
                      {station.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm mt-1 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {station.location}
                    </div>
                  </div>
                  <span className={cn("text-xs font-medium px-2 py-1 rounded", styles.badge)}>
                    {station.status}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className={cn("flex items-center gap-2 px-3 py-2 rounded-lg mb-4", isDark ? "bg-dark-800/50" : "bg-gray-50")}>
                  <div className={cn("h-2 w-2 rounded-full", styles.dot)}></div>
                  <span className={cn("text-xs font-medium", isDark ? "text-gray-300" : "text-gray-600")}>
                    {station.available} / {station.capacity} Available
                  </span>
                </div>

                {/* Utilization Bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-600")}>
                      Utilization
                    </span>
                    <span className={cn("text-xs font-bold", isDark ? "text-volt-400" : "text-volt-600")}>
                      {station.utilization}%
                    </span>
                  </div>
                  <div className={cn("h-2 rounded-full overflow-hidden", isDark ? "bg-dark-700" : "bg-gray-200")}>
                    <div
                      className="h-full bg-gradient-to-r from-volt-500 to-cyber-500 transition-all"
                      style={{ width: `${station.utilization}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={cn("p-3 rounded-lg", isDark ? "bg-dark-800/50" : "bg-gray-50")}>
                    <p className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-600")}>
                      Avg Charge
                    </p>
                    <p className={cn("text-sm font-bold mt-1", isDark ? "text-white" : "text-gray-900")}>
                      {station.avgChargeTime}
                    </p>
                  </div>
                  <div className={cn("p-3 rounded-lg", isDark ? "bg-dark-800/50" : "bg-gray-50")}>
                    <p className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-600")}>
                      Power Output
                    </p>
                    <p className={cn("text-sm font-bold mt-1", isDark ? "text-white" : "text-gray-900")}>
                      {station.powerOutput}
                    </p>
                  </div>
                </div>

                {/* Station Type */}
                <div className={cn("p-3 rounded-lg text-center", isDark ? "bg-volt-900/20 border border-volt-900/30" : "bg-volt-50 border border-volt-200")}>
                  <p className={cn("text-xs font-medium", isDark ? "text-volt-400" : "text-volt-600")}>
                    {station.type}
                  </p>
                </div>

                {/* Action Button */}
                <button className={cn("w-full mt-4 py-2 rounded-lg font-medium transition-all duration-200", isDark ? "bg-volt-900/20 text-volt-400 border border-volt-500/50 hover:bg-volt-900/30" : "bg-volt-100 text-volt-600 border border-volt-300 hover:bg-volt-200")}>
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className={cn("rounded-xl border overflow-hidden", isDark ? "bg-dark-900 border-volt-900/20" : "bg-white border-gray-200")}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={cn("border-b", isDark ? "bg-dark-800 border-volt-900/20" : "bg-gray-50 border-gray-200")}>
                  <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                    Station
                  </th>
                  <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                    Type
                  </th>
                  <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                    Available
                  </th>
                  <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                    Utilization
                  </th>
                  <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                    Status
                  </th>
                  <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {stations.map((station) => {
                  const styles = getStatusStyles(station.status);
                  return (
                    <tr
                      key={station.id}
                      className={cn(
                        "border-b transition-colors",
                        isDark
                          ? "border-volt-900/20 hover:bg-dark-800"
                          : "border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <td className={cn("px-6 py-4 text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>
                        <div>
                          <p>{station.name}</p>
                          <p className={cn("text-xs mt-1", isDark ? "text-gray-400" : "text-gray-600")}>
                            {station.id}
                          </p>
                        </div>
                      </td>
                      <td className={cn("px-6 py-4 text-sm", isDark ? "text-gray-300" : "text-gray-700")}>
                        {station.type}
                      </td>
                      <td className={cn("px-6 py-4 text-sm font-medium", isDark ? "text-volt-400" : "text-volt-600")}>
                        {station.available}/{station.capacity}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-16 h-2 rounded-full overflow-hidden", isDark ? "bg-dark-700" : "bg-gray-200")}>
                            <div
                              className="h-full bg-gradient-to-r from-volt-500 to-cyber-500"
                              style={{ width: `${station.utilization}%` }}
                            ></div>
                          </div>
                          <span className={cn("text-xs font-medium", isDark ? "text-gray-400" : "text-gray-600")}>
                            {station.utilization}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("text-xs font-medium px-2 py-1 rounded", styles.badge)}>
                          {station.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className={cn("text-sm font-medium transition-colors", isDark ? "text-volt-400 hover:text-volt-300" : "text-volt-600 hover:text-volt-700")}>
                          View →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}