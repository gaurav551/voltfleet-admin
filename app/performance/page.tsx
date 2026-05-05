'use client'
import React, { useState } from 'react';
import { 
  Trophy, 
  Award,
  CheckCircle,
  Mail,
  Sun,
  Moon
} from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Cell } from 'recharts';

// --- Types & Data ---
interface Driver {
  id: string;
  name: string;
  avatar: string;
  score: number;
  efficiency: number;
  regenScore: number;
  harshBraking: number;
  speeding: number;
  totalTrips: number;
  rank: number;
  badge?: string;
  trend: 'up' | 'down' | 'stable';
}

const drivers: Driver[] = [
  { id: 'D001', name: 'Sarah Johnson', avatar: 'SJ', score: 98, efficiency: 95, regenScore: 92, harshBraking: 2, speeding: 1, totalTrips: 145, rank: 1, badge: 'Eco-Warrior', trend: 'up' },
  { id: 'D002', name: 'Mike Davis', avatar: 'MD', score: 94, efficiency: 91, regenScore: 88, harshBraking: 4, speeding: 2, totalTrips: 138, rank: 2, badge: 'Safety Star', trend: 'up' },
  { id: 'D003', name: 'Emma Wilson', avatar: 'EW', score: 91, efficiency: 89, regenScore: 85, harshBraking: 5, speeding: 3, totalTrips: 152, rank: 3, badge: 'Consistent Pro', trend: 'stable' },
  { id: 'D004', name: 'John Smith', avatar: 'JS', score: 87, efficiency: 84, regenScore: 81, harshBraking: 8, speeding: 6, totalTrips: 141, rank: 4, trend: 'down' },
  { id: 'D005', name: 'David Brown', avatar: 'DB', score: 83, efficiency: 80, regenScore: 76, harshBraking: 12, speeding: 8, totalTrips: 129, rank: 5, trend: 'stable' },
  { id: 'D006', name: 'Lisa Anderson', avatar: 'LA', score: 79, efficiency: 75, regenScore: 71, harshBraking: 15, speeding: 11, totalTrips: 134, rank: 6, trend: 'down' },
  { id: 'D007', name: 'Tom Wilson', avatar: 'TW', score: 75, efficiency: 71, regenScore: 68, harshBraking: 18, speeding: 14, totalTrips: 127, rank: 7, trend: 'down' },
  { id: 'D008', name: 'Rachel Green', avatar: 'RG', score: 71, efficiency: 67, regenScore: 64, harshBraking: 22, speeding: 18, totalTrips: 119, rank: 8, trend: 'up' },
];

const safetyMatrixData = drivers.map(d => ({
  x: d.harshBraking,
  y: d.speeding,
  name: d.name,
  score: d.score,
}));

// --- Sub-Components ---

// Tooltip logic that adapts to theme
const CustomScatterTooltip = ({ active, payload, isDarkMode }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={`
        border rounded-lg p-3 shadow-xl
        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <p className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {data.name}
        </p>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Harsh Braking: {data.x}
        </p>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Speeding: {data.y}
        </p>
        <p className="text-xs text-green-500 mt-1 font-semibold">Score: {data.score}/100</p>
      </div>
    );
  }
  return null;
};

const CoachingModal: React.FC<{ driver: Driver; onClose: () => void }> = ({ driver, onClose }) => {
  const issues = [];
  if (driver.regenScore < 75) issues.push('regenerative braking');
  if (driver.harshBraking > 10) issues.push('harsh braking');
  if (driver.speeding > 10) issues.push('speeding violations');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      {/* Modal Container: Uses dark: prefix for dark mode overrides */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl max-w-2xl w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {driver.avatar}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Coaching Email for {driver.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Performance improvement suggestions</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl leading-none">
            &times;
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
          <div className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Subject:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Performance Improvement Tips</p>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
            <p>Hi {driver.name.split(' ')[0]},</p>
            <p>
              Great work this month with <span className="font-bold text-green-600 dark:text-green-400">{driver.totalTrips} completed trips</span>!
            </p>
            {issues.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/30 rounded p-3">
                <p className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">Areas to Focus On:</p>
                <ul className="space-y-1 text-xs text-gray-800 dark:text-gray-300">
                  {driver.regenScore < 75 && <li>• Increase Regenerative Braking (Current: {driver.regenScore}%)</li>}
                  {driver.harshBraking > 10 && <li>• Reduce Harsh Braking Events (Current: {driver.harshBraking})</li>}
                  {driver.speeding > 10 && <li>• Watch Speed Limits</li>}
                </ul>
              </div>
            )}
            <p className="text-gray-500 dark:text-gray-400 mt-4">Best, Fleet Ops</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> Send Email
          </button>
          <button onClick={onClose} className="px-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function PerformancePage() {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showCoaching, setShowCoaching] = useState(false);
  const [filterView, setFilterView] = useState<'all' | 'top' | 'needsImprovement'>('all');
  
  // DEFAULT: Light Mode (false)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const topDrivers = drivers.slice(0, 3);
  const topDriver = drivers[0];

  const filteredDrivers = filterView === 'top' 
    ? drivers.filter(d => d.score >= 90)
    : filterView === 'needsImprovement'
    ? drivers.filter(d => d.score < 80)
    : drivers;

  const avgScore = Math.round(drivers.reduce((acc, d) => acc + d.score, 0) / drivers.length);
  const avgEfficiency = Math.round(drivers.reduce((acc, d) => acc + d.efficiency, 0) / drivers.length);
  const avgRegenScore = Math.round(drivers.reduce((acc, d) => acc + d.regenScore, 0) / drivers.length);

  // Chart colors update based on state
  const chartColors = {
    grid: isDarkMode ? "#374151" : "#e5e7eb", // gray-700 vs gray-200
    text: isDarkMode ? "#9ca3af" : "#6b7280", // gray-400 vs gray-500
  };

  return (
    // Dynamic Class: If isDarkMode is true, adds 'dark'. If false, no class (standard Light Mode).
    <div className={`${isDarkMode ? 'dark' : ''} transition-colors duration-200`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-colors duration-300">
        
        {/* Header & Toggle */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
              Driver Performance
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Leaderboards, scorecards, and coaching tools</p>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Podium Section */}
        {/* Light Mode: White background with soft border and shadow. Dark Mode: Dark gray bg. */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-8 relative overflow-hidden shadow-sm dark:shadow-none transition-colors duration-300">
          {/* Subtle accent blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 relative z-10 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
            Top Performers This Month
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* 2nd Place */}
            <div className="md:order-1 order-2">
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 text-center transform md:mt-8 hover:scale-105 transition-all shadow-sm">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-white font-bold text-xl border-4 border-white dark:border-gray-600 shadow-sm">
                  {topDrivers[1].avatar}
                </div>
                <div className="w-8 h-8 mx-auto -mt-6 mb-3 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center text-white text-sm font-bold border-2 border-white dark:border-gray-800">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{topDrivers[1].name}</h3>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400 my-1">{topDrivers[1].score}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Efficiency Score</p>
              </div>
            </div>

            {/* 1st Place - Emphasized */}
            <div className="md:order-2 order-1">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-500/50 rounded-xl p-6 text-center transform hover:scale-105 transition-all shadow-lg shadow-yellow-500/5 dark:shadow-yellow-500/10">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-2xl border-4 border-white dark:border-gray-700 shadow-lg">
                  {topDrivers[0].avatar}
                </div>
                <div className="w-10 h-10 mx-auto -mt-7 mb-3 rounded-full bg-yellow-500 flex items-center justify-center text-white text-lg font-bold border-2 border-white dark:border-gray-800 shadow-sm">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{topDrivers[0].name}</h3>
                <div className="flex items-center justify-center gap-1 my-2">
                  <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-700 dark:text-green-400 font-medium">{topDrivers[0].badge}</span>
                </div>
                <div className="text-5xl font-black text-yellow-500 dark:text-yellow-400 mb-1">{topDrivers[0].score}</div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="md:order-3 order-3">
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 text-center transform md:mt-8 hover:scale-105 transition-all shadow-sm">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-white font-bold text-xl border-4 border-white dark:border-gray-600 shadow-sm">
                  {topDrivers[2].avatar}
                </div>
                <div className="w-8 h-8 mx-auto -mt-6 mb-3 rounded-full bg-orange-400 dark:bg-orange-700 flex items-center justify-center text-white text-sm font-bold border-2 border-white dark:border-gray-800">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{topDrivers[2].name}</h3>
                <div className="text-3xl font-black text-orange-500 dark:text-orange-400 my-1">{topDrivers[2].score}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Efficiency Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Safety Matrix */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Safety Matrix</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Harsh Braking vs Speeding Violations</p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Harsh Braking" 
                  stroke={chartColors.text}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Harsh Braking Events', position: 'bottom', fill: chartColors.text, fontSize: 12, offset: 0 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Speeding" 
                  stroke={chartColors.text}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Speeding Violations', angle: -90, position: 'left', fill: chartColors.text, fontSize: 12 }}
                />
                <Tooltip content={<CustomScatterTooltip isDarkMode={isDarkMode} />} />
                <Scatter data={safetyMatrixData}>
                  {safetyMatrixData.map((entry, index) => {
                    const color = entry.x < 8 && entry.y < 6 ? '#22c55e' : 
                                  entry.x < 15 && entry.y < 12 ? '#eab308' : '#ef4444';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Regenerative Braking */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Regen Braking</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Top driver energy recapture</p>
            </div>

            <div className="flex justify-center mb-6">
              <ResponsiveContainer width={200} height={200}>
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="70%" 
                  outerRadius="100%" 
                  data={[{ value: topDriver.regenScore, fill: '#22c55e' }]}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    background={{ fill: isDarkMode ? '#374151' : '#f3f4f6' }}
                    dataKey="value"
                    cornerRadius={10}
                  />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                    <tspan x="50%" dy="-0.5em" fontSize="36" fontWeight="900" fill={isDarkMode ? '#22c55e' : '#16a34a'}>
                      {topDriver.regenScore}
                    </tspan>
                    <tspan x="50%" dy="1.5em" fontSize="14" fill={chartColors.text}>
                      Score
                    </tspan>
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm font-bold text-gray-900 dark:text-white">Excellent Technique</p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {topDriver.name} is recapturing {topDriver.regenScore}% of braking energy. Fleet average is {avgRegenScore}%.
              </p>
            </div>
          </div>
        </div>

        {/* Driver List */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Driver Leaderboard</h2>
            </div>
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              {(['all', 'top', 'needsImprovement'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterView(filter)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    filterView === filter
                      ? 'bg-white dark:bg-gray-600 text-green-700 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter === 'top' ? 'Top Tier' : 'Needs Focus'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredDrivers.map((driver) => (
              <div
                key={driver.id}
                className="group bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-green-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-sm">
                      {driver.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{driver.name}</p>
                        {driver.badge && (
                          <span className="text-[10px] px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-700">
                            {driver.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Rank #{driver.rank}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center hidden sm:block">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{driver.score}</p>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400">Score</p>
                    </div>
                    <div className="text-center hidden md:block">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{driver.regenScore}%</p>
                      <p className="text-[10px] text-gray-400">Regen</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedDriver(driver);
                        setShowCoaching(true);
                      }}
                      className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-xs font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coaching Modal */}
        {showCoaching && selectedDriver && (
          <CoachingModal driver={selectedDriver} onClose={() => setShowCoaching(false)} />
        )}
      </div>
    </div>
  );
}