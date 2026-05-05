"use client";

import {
  Car,
  Battery,
  Zap,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Filter,
  Download,
  Eye,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

const fleetData = [
  {
    id: "EV-1247",
    model: "Tesla Model 3",
    status: "in-transit",
    battery: 87,
    location: "Downtown District",
    driver: "John Smith",
    nextService: "500 mi",
    efficiency: "4.5 mi/kWh",
  },
  {
    id: "EV-0934",
    model: "Nissan Leaf",
    status: "charging",
    battery: 45,
    location: "Station A-12",
    driver: "Sarah Johnson",
    nextService: "1200 mi",
    efficiency: "4.2 mi/kWh",
  },
  {
    id: "EV-2156",
    model: "Tesla Model Y",
    status: "idle",
    battery: 100,
    location: "Depot North",
    driver: "Mike Davis",
    nextService: "2000 mi",
    efficiency: "3.8 mi/kWh",
  },
  {
    id: "EV-3421",
    model: "Chevy Bolt",
    status: "in-transit",
    battery: 62,
    location: "Midtown Avenue",
    driver: "Emma Wilson",
    nextService: "800 mi",
    efficiency: "4.1 mi/kWh",
  },
  {
    id: "EV-5089",
    model: "Tesla Model 3",
    status: "charging",
    battery: 20,
    location: "Station B-07",
    driver: "David Brown",
    nextService: "1500 mi",
    efficiency: "4.3 mi/kWh",
  },
  {
    id: "EV-6234",
    model: "Volkswagen ID.4",
    status: "idle",
    battery: 95,
    location: "Depot South",
    driver: "Lisa Anderson",
    nextService: "3000 mi",
    efficiency: "4.0 mi/kWh",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "in-transit":
      return { bg: "from-volt-900/20 to-volt-800/20", border: "border-volt-500/50", text: "text-volt-400", badge: "bg-volt-900/40" };
    case "charging":
      return { bg: "from-cyber-900/20 to-cyber-800/20", border: "border-cyber-500/50", text: "text-cyber-400", badge: "bg-cyber-900/40" };
    case "idle":
      return { bg: "from-gray-900/20 to-gray-800/20", border: "border-gray-500/50", text: "text-gray-400", badge: "bg-gray-900/40" };
    default:
      return { bg: "from-gray-900/20 to-gray-800/20", border: "border-gray-500/50", text: "text-gray-400", badge: "bg-gray-900/40" };
  }
};

export default function FleetPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);

  const getBatteryColor = (level: number) => {
    if (level >= 80) return "text-volt-500";
    if (level >= 50) return "text-cyber-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-volt-400 to-cyber-400 bg-clip-text text-transparent">
            Fleet Overview
          </h1>
          <p className={cn("mt-1", isDark ? "text-gray-400" : "text-gray-600")}>
            Manage and monitor {fleetData.length} vehicles in your fleet
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
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Vehicles", value: "247", icon: Car },
          { label: "Active", value: "198", icon: TrendingUp },
          { label: "Avg Battery", value: "76%", icon: Battery },
          { label: "Alerts", value: "12", icon: AlertTriangle },
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
                <Icon
                  className={cn(
                    "h-8 w-8",
                    idx === 0 ? "text-volt-500" : idx === 1 ? "text-cyber-500" : "text-gray-500"
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Fleet Table */}
      <div
        className={cn(
          "rounded-xl border overflow-hidden",
          isDark
            ? "bg-dark-900 border-volt-900/20"
            : "bg-white border-gray-200"
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={cn(
                  "border-b",
                  isDark ? "bg-dark-800 border-volt-900/20" : "bg-gray-50 border-gray-200"
                )}
              >
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVehicles(fleetData.map((v) => v.id));
                      } else {
                        setSelectedVehicles([]);
                      }
                    }}
                  />
                </th>
                <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                  Vehicle ID
                </th>
                <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                  Model
                </th>
                <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                  Status
                </th>
                <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                  Battery
                </th>
                <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                  Driver
                </th>
                <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                  Location
                </th>
                <th className={cn("px-6 py-4 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {fleetData.map((vehicle) => {
                const statusColor = getStatusColor(vehicle.status);
                return (
                  <tr
                    key={vehicle.id}
                    className={cn(
                      "border-b transition-colors",
                      isDark
                        ? "border-volt-900/20 hover:bg-dark-800"
                        : "border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedVehicles.includes(vehicle.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedVehicles([...selectedVehicles, vehicle.id]);
                          } else {
                            setSelectedVehicles(
                              selectedVehicles.filter((id) => id !== vehicle.id)
                            );
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className={cn("px-6 py-4 text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>
                      {vehicle.id}
                    </td>
                    <td className={cn("px-6 py-4 text-sm", isDark ? "text-gray-300" : "text-gray-700")}>
                      {vehicle.model}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "text-xs font-medium px-3 py-1 rounded-full",
                          isDark ? statusColor.badge : statusColor.badge,
                          statusColor.text
                        )}
                      >
                        {vehicle.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full transition-all",
                              vehicle.battery >= 80
                                ? "bg-volt-500"
                                : vehicle.battery >= 50
                                ? "bg-cyber-500"
                                : "bg-red-500"
                            )}
                            style={{ width: `${vehicle.battery}%` }}
                          ></div>
                        </div>
                        <span className={cn("text-sm font-medium", getBatteryColor(vehicle.battery))}>
                          {vehicle.battery}%
                        </span>
                      </div>
                    </td>
                    <td className={cn("px-6 py-4 text-sm", isDark ? "text-gray-300" : "text-gray-700")}>
                      {vehicle.driver}
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn("flex items-center gap-1 text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                        <MapPin className="h-4 w-4" />
                        {vehicle.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          isDark
                            ? "hover:bg-dark-700 text-gray-400 hover:text-volt-500"
                            : "hover:bg-gray-100 text-gray-500 hover:text-volt-500"
                        )}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className={cn("flex items-center justify-between p-4 rounded-lg border", isDark ? "bg-dark-800 border-volt-900/20" : "bg-gray-50 border-gray-200")}>
        <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
          Showing 1 to {fleetData.length} of {fleetData.length} vehicles
        </p>
        <div className="flex gap-2">
          <button
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isDark
                ? "bg-dark-700 text-gray-400 hover:bg-dark-600"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            )}
          >
            Previous
          </button>
          <button
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isDark
                ? "bg-volt-900/20 text-volt-400 border border-volt-500/50"
                : "bg-volt-100 text-volt-600 border border-volt-300"
            )}
          >
            1
          </button>
          <button
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isDark
                ? "bg-dark-700 text-gray-400 hover:bg-dark-600"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            )}
          >
            2
          </button>
          <button
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isDark
                ? "bg-dark-700 text-gray-400 hover:bg-dark-600"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}