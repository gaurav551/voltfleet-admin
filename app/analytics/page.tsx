'use client'
import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  Zap, 
  AlertTriangle,
  Leaf,
  Info,
  Moon,
  Sun
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '@/components/theme-provider';

const monthlyCostData = [
  { month: 'Jan', electricity: 3800, diesel: 11200, savings: 7400 },
  { month: 'Feb', electricity: 4100, diesel: 12100, savings: 8000 },
  { month: 'Mar', electricity: 3900, diesel: 11800, savings: 7900 },
  { month: 'Apr', electricity: 4200, diesel: 12800, savings: 8600 },
  { month: 'May', electricity: 4000, diesel: 12200, savings: 8200 },
  { month: 'Jun', electricity: 4300, diesel: 13100, savings: 8800 },
];

const peakLoadData = [
  { hour: '12AM', usage: 45, tariff: 'off-peak', cost: 18 },
  { hour: '3AM', usage: 120, tariff: 'off-peak', cost: 48 },
  { hour: '6AM', usage: 280, tariff: 'shoulder', cost: 140 },
  { hour: '9AM', usage: 180, tariff: 'shoulder', cost: 90 },
  { hour: '12PM', usage: 95, tariff: 'shoulder', cost: 48 },
  { hour: '3PM', usage: 140, tariff: 'shoulder', cost: 70 },
  { hour: '6PM', usage: 320, tariff: 'peak', cost: 256 },
  { hour: '9PM', usage: 185, tariff: 'peak', cost: 148 },
];

const CustomTooltip = ({ active, payload, label, isDark }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-3 shadow-xl`}>
        <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};



export default function AnalyticsPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [timeRange, setTimeRange] = useState('6M');

  const currentElectricity = 4200;
  const equivalentDiesel = 12800;
  const netSavings = equivalentDiesel - currentElectricity;
  const savingsPercent = Math.round((netSavings / equivalentDiesel) * 100);

  const totalSavingsYTD = monthlyCostData.reduce((acc, m) => acc + m.savings, 0);
  const carbonOffset = 45.2;
  const treesEquivalent = Math.round(carbonOffset * 50);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} p-6 relative`}>
      {/* Theme Toggle */}
      

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Cost Analytics
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          Track savings, optimize charging schedules, and prove ROI
        </p>
      </div>

      {/* Cost Comparison Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Electric Cost */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>THIS MONTH</span>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Cost of Electricity</p>
          <p className="text-4xl font-black text-green-400">${currentElectricity.toLocaleString()}</p>
        </div>

        {/* Diesel Equivalent */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-red-400" />
            </div>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>EQUIVALENT</span>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 relative z-10`}>Estimated Diesel Cost</p>
          <p className="text-4xl font-black text-red-400 relative z-10 line-through opacity-75">
            ${equivalentDiesel.toLocaleString()}
          </p>
        </div>

        {/* Net Savings */}
        <div className={`${isDark ? 'from-green-900/40 to-blue-900/40' : 'from-green-50 to-blue-50'} bg-gradient-to-br border-2 border-green-500/50 rounded-xl p-6 relative overflow-hidden shadow-lg shadow-green-500/20`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-xs text-green-400 font-bold px-2 py-1 bg-green-500/20 rounded">SAVED</span>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 relative z-10`}>Net Savings</p>
          <div className="relative z-10">
            <p className="text-5xl font-black text-green-400">${netSavings.toLocaleString()}</p>
            <p className="text-lg text-green-400 font-bold mt-1">{savingsPercent}% Reduction</p>
          </div>
        </div>
      </div>

      {/* Monthly Trends Chart */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-8`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>Cost Comparison Trends</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Electric vs. Diesel equivalent over 6 months</p>
          </div>
          <div className="flex gap-2">
            {['1M', '3M', '6M', '1Y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-green-500 text-white'
                    : isDark 
                      ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyCostData}>
            <defs>
              <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDiesel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="month" stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
            <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="diesel" stroke="#ef4444" fillOpacity={1} fill="url(#colorDiesel)" name="Diesel Cost" />
            <Area type="monotone" dataKey="electricity" stroke="#22c55e" fillOpacity={1} fill="url(#colorElectricity)" name="Electricity Cost" />
          </AreaChart>
        </ResponsiveContainer>

        <div className={`mt-6 p-4 ${isDark ? 'bg-green-900/20 border-green-500/30' : 'bg-green-50 border-green-200'} border rounded-lg`}>
          <div className="flex items-start gap-3">
            <TrendingDown className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-green-400 mb-1">Year-to-Date Savings</p>
              <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Total savings of <span className="font-bold text-green-400">${totalSavingsYTD.toLocaleString()}</span> compared to diesel operations. 
                On track to save <span className="font-bold">${Math.round(totalSavingsYTD * 2).toLocaleString()}</span> annually.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Peak Load Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className={`lg:col-span-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>Peak Load Analysis</h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Energy usage by time of day and tariff rate</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Off-Peak</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Shoulder</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Peak</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={peakLoadData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="hour" stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '11px' }} />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '11px' }} />
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
              <Bar dataKey="usage" radius={[4, 4, 0, 0]}>
                {peakLoadData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.tariff === 'peak' ? '#ef4444' : entry.tariff === 'shoulder' ? '#3b82f6' : '#22c55e'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className={`mt-6 p-4 ${isDark ? 'bg-yellow-900/20 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'} border rounded-lg`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-yellow-400 mb-1">Optimization Opportunity</p>
                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="font-bold">15%</span> of charging occurred during Peak Hours (6 PM - 9 PM). 
                  Shifting to off-peak could save an additional <span className="font-bold text-yellow-400">$1,200/month</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carbon Footprint Widget */}
        <div className={`${isDark ? 'from-green-900/40 to-emerald-900/40 border-green-500/30' : 'from-green-50 to-emerald-50 border-green-300'} bg-gradient-to-br border rounded-xl p-6 relative overflow-hidden`}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-400" />
              </div>
              <Info className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Carbon Impact</h3>

            <div className="mb-6">
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>CO₂ Offset This Year</p>
              <p className="text-5xl font-black text-green-400 mb-1">{carbonOffset}</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>metric tons</p>
            </div>

            <div className={`p-4 ${isDark ? 'bg-gray-800/50 border-green-500/20' : 'bg-white/70 border-green-300'} rounded-lg border`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">🌳</div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{treesEquivalent}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>trees planted equivalent</p>
                </div>
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                Your fleet's emissions reduction is equivalent to planting {treesEquivalent} trees or removing {Math.round(carbonOffset / 4.6)} cars from the road for a year.
              </p>
            </div>

            <div className={`mt-6 p-3 ${isDark ? 'bg-green-500/10 border-green-500/30' : 'bg-green-100 border-green-300'} rounded-lg border`}>
              <p className="text-xs text-green-400 font-medium">
                ✓ ESG Report Ready
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                Export sustainability metrics for corporate reporting
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Avg. Cost per kWh</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>$0.18</p>
          <p className="text-xs text-green-400 mt-1">↓ 12% vs. last month</p>
        </div>
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Total Energy Used</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>23.3 MWh</p>
          <p className="text-xs text-blue-400 mt-1">Current month</p>
        </div>
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Peak Demand</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>320 kW</p>
          <p className="text-xs text-yellow-400 mt-1">At 6:00 PM</p>
        </div>
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Cost Efficiency</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>92%</p>
          <p className="text-xs text-green-400 mt-1">Industry benchmark: 85%</p>
        </div>
      </div>
    </div>
  );
}