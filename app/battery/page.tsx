"use client";

import React, { useState } from 'react';
import {
  Battery,
  TrendingDown,
  AlertTriangle,
  Zap,
  Clock,
  Gauge,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from "@/lib/utils";
import { useTheme } from '@/components/theme-provider';

const degradationData = [
  { mileage: 0, soh: 100, forecast: 100 },
  { mileage: 5000, soh: 98.5, forecast: 98.5 },
  { mileage: 15000, soh: 96.2, forecast: 96.2 },
  { mileage: 25000, soh: 93.8, forecast: 93.8 },
  { mileage: 35000, soh: 91.4, forecast: 91.4 },
  { mileage: 45000, soh: 88.9, forecast: 88.9 },
  { mileage: 55000, soh: 86.1, forecast: 86.1 },
  { mileage: 65000, soh: 83.5, forecast: 83.5 },
  { mileage: 75000, soh: 80.2, forecast: 80.2 },
  { mileage: 85000, soh: 78.5, forecast: null },
  { mileage: 95000, soh: null, forecast: 75.8 },
  { mileage: 105000, soh: null, forecast: 72.5 },
];

const chargingHabitsData = [
  { vehicle: 'EV-1247', 'AC Charging': 20, 'DC Fast': 80 },
  { vehicle: 'EV-0934', 'AC Charging': 60, 'DC Fast': 40 },
  { vehicle: 'EV-2156', 'AC Charging': 45, 'DC Fast': 55 },
  { vehicle: 'EV-3421', 'AC Charging': 75, 'DC Fast': 25 },
  { vehicle: 'EV-5089', 'AC Charging': 35, 'DC Fast': 65 },
];

const criticalWatchlist = [
  { id: 'EV-1247', currentSoH: 78.5, eol: '2025-09-15', avgDischargDepth: 92, status: 'critical' },
  { id: 'EV-5089', currentSoH: 81.2, eol: '2025-08-20', avgDischargDepth: 88, status: 'critical' },
  { id: 'EV-3421', currentSoH: 83.5, eol: '2025-11-10', avgDischargDepth: 85, status: 'warning' },
  { id: 'EV-0934', currentSoH: 86.1, eol: '2025-12-25', avgDischargDepth: 78, status: 'warning' },
  { id: 'EV-2156', currentSoH: 89.4, eol: '2026-02-14', avgDischargDepth: 72, status: 'good' },
];

const cellBalanceData = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  health: Math.random() > 0.95 ? (Math.random() > 0.5 ? 30 : 60) : 100,
}));

const getCellColor = (health: number) => {
  if (health === 100) return 'bg-volt-500';
  if (health >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
};

export default function BatteryHealthPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedCell, setSelectedCell] = useState<{ id: number; health: number } | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
 <h1 className="text-3xl font-bold bg-gradient-to-r from-volt-400 to-cyber-400 bg-clip-text text-transparent">
                   Battery Health Analytics
        </h1>
        <p className={cn("mt-1", isDark ? "text-gray-400" : "text-gray-600")}>
          Monitor State of Health (SoH) and predict battery degradation across your fleet
        </p>
      </div>

      {/* Top-Level Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={cn(
          "p-6 rounded-xl border hover:border-volt-500/50 transition-all duration-200",
          isDark
            ? "bg-dark-800 border-volt-900/20"
            : "bg-white border-gray-200"
        )}>
          <div className="flex items-center justify-between mb-2">
            <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Fleet Avg SoH</p>
            <Battery className="h-5 w-5 text-volt-500" />
          </div>
          <p className={cn("text-4xl font-bold", isDark ? "text-white" : "text-gray-900")}>94%</p>
          <p className={cn("text-xs mt-2", isDark ? "text-gray-400" : "text-gray-600")}>State of Health</p>
        </div>

        <div className={cn(
          "p-6 rounded-xl border hover:border-volt-500/50 transition-all duration-200",
          isDark
            ? "bg-dark-800 border-volt-900/20"
            : "bg-white border-gray-200"
        )}>
          <div className="flex items-center justify-between mb-2">
            <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Projected Cost</p>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>
          <p className={cn("text-4xl font-bold", isDark ? "text-white" : "text-gray-900")}>$12.5K</p>
          <p className={cn("text-xs mt-2", isDark ? "text-gray-400" : "text-gray-600")}>Replacement Budget</p>
        </div>

        <div className={cn(
          "p-6 rounded-xl border hover:border-volt-500/50 transition-all duration-200",
          isDark
            ? "bg-dark-800 border-volt-900/20"
            : "bg-white border-gray-200"
        )}>
          <div className="flex items-center justify-between mb-2">
            <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Energy Consumed</p>
            <Zap className="h-5 w-5 text-cyber-500" />
          </div>
          <p className={cn("text-4xl font-bold", isDark ? "text-white" : "text-gray-900")}>450</p>
          <p className={cn("text-xs mt-2", isDark ? "text-gray-400" : "text-gray-600")}>MWh (+12% vs last month)</p>
        </div>

        <div className={cn(
          "p-6 rounded-xl border hover:border-volt-500/50 transition-all duration-200",
          isDark
            ? "bg-dark-800 border-volt-900/20"
            : "bg-white border-gray-200"
        )}>
          <div className="flex items-center justify-between mb-2">
            <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Avg Charge Time</p>
            <Clock className="h-5 w-5 text-cyber-500" />
          </div>
          <p className={cn("text-4xl font-bold", isDark ? "text-white" : "text-gray-900")}>2.3h</p>
          <p className={cn("text-xs mt-2", isDark ? "text-gray-400" : "text-gray-600")}>0% to 80%</p>
        </div>
      </div>

      {/* Cell Balance Heatmap */}
      <div className={cn(
        "p-6 rounded-xl border",
        isDark
          ? "bg-dark-800 border-volt-900/20"
          : "bg-white border-gray-200"
      )}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn("text-xl font-bold flex items-center gap-2", isDark ? "text-white" : "text-gray-900")}>
            <Battery className="h-5 w-5 text-volt-500" />
            Battery Cell Balance Heatmap
          </h2>
          <span className={cn(
            "text-xs px-3 py-1 rounded-full font-medium",
            isDark
              ? "bg-volt-900/30 text-volt-400"
              : "bg-volt-100 text-volt-600"
          )}>
            ⚡ Live Monitoring
          </span>
        </div>

        <div className="grid grid-cols-12 gap-2 mb-4">
          {cellBalanceData.map((cell) => (
            <div
              key={cell.id}
              onClick={() => setSelectedCell(cell)}
              className={cn(
                "aspect-square rounded-lg cursor-pointer transition-all duration-200 hover:scale-110 border",
                isDark ? "border-dark-700" : "border-gray-300",
                getCellColor(cell.health)
              )}
              title={`Cell ${cell.id}: ${cell.health}% health`}
            />
          ))}
        </div>

        {selectedCell && (
          <div className={cn(
            "p-4 rounded-lg border",
            isDark
              ? "bg-dark-700 border-volt-900/30"
              : "bg-gray-50 border-gray-300"
          )}>
            <p className="text-sm text-volt-400 font-medium">
              Module {Math.floor(selectedCell.id / 6) + 1}, Cell {(selectedCell.id % 6) + 1}
            </p>
            <p className={cn("text-xs mt-1", isDark ? "text-gray-400" : "text-gray-600")}>
              {selectedCell.health === 100
                ? 'Healthy - No issues detected'
                : selectedCell.health >= 60
                ? 'Voltage deviation detected - Monitor closely'
                : 'Critical - Schedule replacement'}
            </p>
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SoH vs Mileage */}
        <div className={cn(
          "p-6 rounded-xl border",
          isDark
            ? "bg-dark-800 border-volt-900/20"
            : "bg-white border-gray-200"
        )}>
          <h2 className={cn("text-xl font-bold mb-6 flex items-center gap-2", isDark ? "text-white" : "text-gray-900")}>
            <Gauge className="h-5 w-5 text-volt-500" />
            Battery Degradation
            <span className={cn(
              "text-xs px-2 py-1 ml-auto rounded font-medium",
              isDark
                ? "bg-violet-900/30 text-violet-400"
                : "bg-violet-100 text-violet-600"
            )}>
              ⭐ AI Forecast
            </span>
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={degradationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f4f5f" />
              <XAxis
                dataKey="mileage"
                stroke="#9ca3af"
                label={{ value: 'Odometer (Miles)', position: 'insideBottomRight', offset: -5, fill: '#9ca3af' }}
              />
              <YAxis
                stroke="#9ca3af"
                label={{ value: 'Battery Capacity %', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a2332', border: '1px solid #3f4f5f', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="soh"
                stroke="#06b6d4"
                name="Current SoH"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#a78bfa"
                name="AI Forecast"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Charging Habits */}
        <div className={cn(
          "p-6 rounded-xl border",
          isDark
            ? "bg-dark-800 border-volt-900/20"
            : "bg-white border-gray-200"
        )}>
          <h2 className={cn("text-xl font-bold mb-6 flex items-center gap-2", isDark ? "text-white" : "text-gray-900")}>
            <Zap className="h-5 w-5 text-cyber-500" />
            Charging Habits Analysis
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chargingHabitsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f4f5f" />
              <XAxis dataKey="vehicle" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" label={{ value: '% Usage', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a2332', border: '1px solid #3f4f5f', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="AC Charging" fill="#06b6d4" />
              <Bar dataKey="DC Fast" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
          <p className={cn("text-xs mt-4", isDark ? "text-gray-400" : "text-gray-600")}>
            ⚠️ Vehicles using DC Fast Charging &gt;75% of the time experience 40% faster degradation
          </p>
        </div>
      </div>

      {/* Critical Watchlist */}
      <div className={cn(
        "p-6 rounded-xl border",
        isDark
          ? "bg-dark-800 border-volt-900/20"
          : "bg-white border-gray-200"
      )}>
        <h2 className={cn("text-xl font-bold mb-6 flex items-center gap-2", isDark ? "text-white" : "text-gray-900")}>
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Critical Watchlist - Batteries Requiring Attention
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={cn("border-b", isDark ? "border-volt-900/20" : "border-gray-200")}>
                <th className={cn("px-4 py-3 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>Vehicle ID</th>
                <th className={cn("px-4 py-3 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>Current SoH</th>
                <th className={cn("px-4 py-3 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>Est. End of Life</th>
                <th className={cn("px-4 py-3 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>Avg Discharge Depth</th>
                <th className={cn("px-4 py-3 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>Status</th>
                <th className={cn("px-4 py-3 text-left text-sm font-semibold", isDark ? "text-gray-300" : "text-gray-700")}>Action</th>
              </tr>
            </thead>
            <tbody>
              {criticalWatchlist.map((vehicle) => (
                <tr key={vehicle.id} className={cn(
                  "border-b transition-colors",
                  isDark
                    ? "border-volt-900/20 hover:bg-dark-700"
                    : "border-gray-200 hover:bg-gray-50"
                )}>
                  <td className={cn("px-4 py-3 text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>{vehicle.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-16 h-2 rounded-full overflow-hidden", isDark ? "bg-dark-700" : "bg-gray-200")}>
                        <div
                          className={cn(
                            'h-full',
                            vehicle.currentSoH >= 85 ? 'bg-volt-500' : vehicle.currentSoH >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: `${vehicle.currentSoH}%` }}
                        ></div>
                      </div>
                      <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>{vehicle.currentSoH}%</span>
                    </div>
                  </td>
                  <td className={cn("px-4 py-3 text-sm", isDark ? "text-gray-300" : "text-gray-700")}>{vehicle.eol}</td>
                  <td className={cn("px-4 py-3 text-sm", isDark ? "text-gray-300" : "text-gray-700")}>{vehicle.avgDischargDepth}%</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full',
                        vehicle.status === 'critical'
                          ? isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                          : vehicle.status === 'warning'
                          ? isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                          : isDark ? 'bg-volt-900/30 text-volt-400' : 'bg-volt-100 text-volt-600'
                      )}
                    >
                      {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className={cn("text-sm font-medium transition-colors", isDark ? "text-volt-400 hover:text-volt-300" : "text-volt-600 hover:text-volt-700")}>
                      Schedule →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights Card */}
      <div className={cn(
        "p-6 rounded-xl border",
        isDark
          ? "bg-gradient-to-r from-violet-900/20 to-volt-900/20 border-violet-500/30"
          : "bg-gradient-to-r from-violet-50 to-volt-50 border-violet-200"
      )}>
        <h3 className={cn("text-lg font-bold flex items-center gap-2 mb-3", isDark ? "text-white" : "text-gray-900")}>
          ⭐ AI-Powered Insights
        </h3>
        <p className={cn("text-sm", isDark ? "text-gray-300" : "text-gray-700")}>
          Based on current degradation patterns, {criticalWatchlist[0].id} will reach end-of-life on {criticalWatchlist[0].eol}. 
          We recommend scheduling a battery replacement 30 days prior. Budget allocation: $2,800 per unit.
        </p>
      </div>
    </div>
  );
}