'use client'
import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  MessageSquare,
  MapPin,
  FileCheck,
  Battery,
  Zap,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  Award,
  Shield,
  X
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

const mockDrivers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    photo: '👩‍💼',
    status: 'on-duty',
    vehicle: 'T-402',
    evScore: 92,
    regenScore: 95,
    speedScore: 89,
    rangeAnxiety: 18,
    pluginAdherence: 98,
    license: { number: 'DL-8392-4521', expires: '2026-08-15', status: 'active', daysLeft: 620 },
    medical: { expires: '2025-03-20', status: 'active', daysLeft: 101 },
    contact: { phone: '(555) 234-5678', email: 'sarah.j@fleet.com' },
    stats: { trips: 342, hours: 1205, incidents: 0 }
  },
  {
    id: 2,
    name: 'Mike Chen',
    photo: '👨‍🔧',
    status: 'off-duty',
    vehicle: null,
    evScore: 78,
    regenScore: 72,
    speedScore: 84,
    rangeAnxiety: 45,
    pluginAdherence: 91,
    license: { number: 'DL-6721-9834', expires: '2025-12-28', status: 'expiring', daysLeft: 19 },
    medical: { expires: '2026-01-10', status: 'active', daysLeft: 396 },
    contact: { phone: '(555) 876-5432', email: 'mike.c@fleet.com' },
    stats: { trips: 289, hours: 980, incidents: 1 }
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    photo: '👩‍🚀',
    status: 'on-duty',
    vehicle: 'T-215',
    evScore: 88,
    regenScore: 91,
    speedScore: 85,
    rangeAnxiety: 22,
    pluginAdherence: 95,
    license: { number: 'DL-4512-7890', expires: '2027-02-10', status: 'active', daysLeft: 793 },
    medical: { expires: '2024-11-30', status: 'expired', daysLeft: -9 },
    contact: { phone: '(555) 345-6789', email: 'emily.r@fleet.com' },
    stats: { trips: 412, hours: 1340, incidents: 0 }
  },
  {
    id: 4,
    name: 'James Wilson',
    photo: '👨‍💼',
    status: 'on-duty',
    vehicle: 'T-108',
    evScore: 95,
    regenScore: 97,
    speedScore: 93,
    rangeAnxiety: 12,
    pluginAdherence: 100,
    license: { number: 'DL-9823-1234', expires: '2026-05-22', status: 'active', daysLeft: 530 },
    medical: { expires: '2025-07-15', status: 'active', daysLeft: 218 },
    contact: { phone: '(555) 567-8901', email: 'james.w@fleet.com' },
    stats: { trips: 501, hours: 1580, incidents: 0 }
  }
];

export default function DriversPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-500' };
      case 'expiring': return { bg: 'bg-orange-500/10', text: 'text-orange-400', dot: 'bg-orange-500 animate-pulse' };
      case 'expired': return { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-500' };
      default: return { bg: 'bg-gray-500/10', text: 'text-gray-400', dot: 'bg-gray-500' };
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-blue-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const DonutChart = ({ score, size = 60 }) => {
    const color = score >= 90 ? '#22c55e' : score >= 75 ? '#3b82f6' : score >= 60 ? '#eab308' : '#ef4444';
    const circumference = 2 * Math.PI * 18;
    const offset = circumference - (score / 100) * circumference;

    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke={isDark ? '#374151' : '#e5e7eb'} strokeWidth="4" />
        <circle
          cx="20" cy="20" r="18" fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 20 20)"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <text x="20" y="20" textAnchor="middle" dy="0.3em" fontSize="10" fontWeight="bold" fill={color}>
          {score}
        </text>
      </svg>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} p-6`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-volt-400 to-cyber-400 bg-clip-text text-transparent">
Drivers Management          </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          Automated compliance tracking and performance monitoring
        </p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Active Drivers</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {mockDrivers.filter(d => d.status === 'on-duty').length}/{mockDrivers.length}
          </p>
        </div>
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Avg EV Score</p>
          <p className="text-2xl font-bold text-green-400">
            {Math.round(mockDrivers.reduce((acc, d) => acc + d.evScore, 0) / mockDrivers.length)}
          </p>
        </div>
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Expiring Soon</p>
          <p className="text-2xl font-bold text-orange-400">
            {mockDrivers.filter(d => d.license.status === 'expiring' || d.medical.status === 'expiring').length}
          </p>
        </div>
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Compliance Issues</p>
          <p className="text-2xl font-bold text-red-400">
            {mockDrivers.filter(d => d.license.status === 'expired' || d.medical.status === 'expired').length}
          </p>
        </div>
      </div>

      {/* Driver Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockDrivers.map((driver) => (
            <div
              key={driver.id}
              onClick={() => setSelectedDriver(driver)}
              className={`${isDark ? 'bg-gray-800 border-gray-700 hover:border-blue-500/50' : 'bg-white border-gray-200 hover:border-blue-400'} border rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`text-4xl ${driver.license.status === 'expired' || driver.medical.status === 'expired' ? 'blur-sm grayscale' : ''}`}>
                    {driver.photo}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{driver.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${driver.status === 'on-duty' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {driver.status === 'on-duty' ? `On Duty - ${driver.vehicle}` : 'Off Duty'}
                      </span>
                    </div>
                  </div>
                </div>
                <DonutChart score={driver.evScore} size={50} />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-2`}>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Regen Braking</p>
                  <p className={`text-sm font-bold ${getScoreColor(driver.regenScore)}`}>{driver.regenScore}%</p>
                </div>
                <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-2`}>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Speed Adherence</p>
                  <p className={`text-sm font-bold ${getScoreColor(driver.speedScore)}`}>{driver.speedScore}%</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                {driver.license.status !== 'active' && (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(driver.license.status).bg} ${getStatusColor(driver.license.status).text} flex items-center gap-1`}>
                    <AlertCircle className="w-3 h-3" />
                    License {driver.license.status}
                  </span>
                )}
                {driver.medical.status !== 'active' && (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(driver.medical.status).bg} ${getStatusColor(driver.medical.status).text} flex items-center gap-1`}>
                    <AlertCircle className="w-3 h-3" />
                    Medical {driver.medical.status}
                  </span>
                )}
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}>
                  <MessageSquare className="w-3 h-3 inline mr-1" />
                  Message
                </button>
                <button className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`}>
                  <MapPin className="w-3 h-3 inline mr-1" />
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
          {selectedDriver ? (
            <>
              <div className={`p-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} border-b flex items-center justify-between`}>
                <h2 className="text-lg font-bold">Driver Profile</h2>
                <button onClick={() => setSelectedDriver(null)} className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <div className={`flex items-center gap-3 mb-4 pb-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                  <div className={`text-5xl ${selectedDriver.license.status === 'expired' || selectedDriver.medical.status === 'expired' ? 'blur-sm grayscale' : ''}`}>
                    {selectedDriver.photo}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{selectedDriver.name}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedDriver.contact.email}</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                  {['overview', 'wallet', 'ev-metrics'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        activeTab === tab
                          ? 'bg-blue-500 text-white'
                          : isDark ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {tab === 'wallet' ? 'Compliance Wallet' : tab === 'ev-metrics' ? 'EV Metrics' : 'Overview'}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-2`}>EV SCORE</p>
                      <div className="flex items-center gap-3">
                        <DonutChart score={selectedDriver.evScore} size={60} />
                        <div>
                          <p className={`text-2xl font-bold ${getScoreColor(selectedDriver.evScore)}`}>{selectedDriver.evScore}/100</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Excellent Performance</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>TOTAL TRIPS</p>
                        <p className="text-xl font-bold">{selectedDriver.stats.trips}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>HOURS DRIVEN</p>
                        <p className="text-xl font-bold">{selectedDriver.stats.hours}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>INCIDENTS</p>
                        <p className={`text-xl font-bold ${selectedDriver.stats.incidents === 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedDriver.stats.incidents}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>STATUS</p>
                        <p className={`text-sm font-bold ${selectedDriver.status === 'on-duty' ? 'text-green-400' : 'text-gray-400'}`}>
                          {selectedDriver.status === 'on-duty' ? 'On Duty' : 'Off Duty'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'wallet' && (
                  <div className="space-y-4">
                    {/* License Card */}
                    <div className={`${isDark ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300'} border rounded-lg p-4`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Shield className={`w-5 h-5 ${getStatusColor(selectedDriver.license.status).text}`} />
                          <span className="font-bold text-sm">Driver's License</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(selectedDriver.license.status).bg} ${getStatusColor(selectedDriver.license.status).text}`}>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedDriver.license.status).dot}`}></div>
                          {selectedDriver.license.status}
                        </span>
                      </div>
                      <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/70'} rounded p-3 space-y-2`}>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>LICENSE NUMBER</p>
                        <p className="font-mono font-bold text-sm">{selectedDriver.license.number}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className={`w-4 h-4 ${getStatusColor(selectedDriver.license.status).text}`} />
                          <span className={`text-xs ${getStatusColor(selectedDriver.license.status).text}`}>
                            Expires: {new Date(selectedDriver.license.expires).toLocaleDateString()} 
                            {selectedDriver.license.status !== 'expired' && ` (${selectedDriver.license.daysLeft} days)`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Medical Certificate */}
                    <div className={`${isDark ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'} border rounded-lg p-4`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileCheck className={`w-5 h-5 ${getStatusColor(selectedDriver.medical.status).text}`} />
                          <span className="font-bold text-sm">Medical Certificate</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(selectedDriver.medical.status).bg} ${getStatusColor(selectedDriver.medical.status).text}`}>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedDriver.medical.status).dot}`}></div>
                          {selectedDriver.medical.status}
                        </span>
                      </div>
                      <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/70'} rounded p-3`}>
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-4 h-4 ${getStatusColor(selectedDriver.medical.status).text}`} />
                          <span className={`text-xs ${getStatusColor(selectedDriver.medical.status).text}`}>
                            Expires: {new Date(selectedDriver.medical.expires).toLocaleDateString()}
                            {selectedDriver.medical.status !== 'expired' && ` (${selectedDriver.medical.daysLeft} days)`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {(selectedDriver.license.status === 'expired' || selectedDriver.medical.status === 'expired') && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-red-400 mb-1">Driver Suspended</p>
                            <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              This driver cannot operate vehicles until compliance documents are renewed.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'ev-metrics' && (
                  <div className="space-y-4">
                    <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-4`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Range Anxiety Score</span>
                        <span className={`text-2xl font-bold ${getScoreColor(100 - selectedDriver.rangeAnxiety)}`}>
                          {selectedDriver.rangeAnxiety}%
                        </span>
                      </div>
                      <div className={`w-full h-2 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all"
                          style={{ width: `${selectedDriver.rangeAnxiety}%` }}
                        ></div>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                        Charges when battery is still above 50%
                      </p>
                    </div>

                    <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-4`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Plug-in Adherence</span>
                        <span className={`text-2xl font-bold ${getScoreColor(selectedDriver.pluginAdherence)}`}>
                          {selectedDriver.pluginAdherence}%
                        </span>
                      </div>
                      <div className={`w-full h-2 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all"
                          style={{ width: `${selectedDriver.pluginAdherence}%` }}
                        ></div>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                        Remembers to plug in at end of shift
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className={`${isDark ? 'bg-green-900/20 border-green-500/30' : 'bg-green-50 border-green-300'} border rounded-lg p-3`}>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>REGEN BRAKING</p>
                        <p className="text-xl font-bold text-green-400">{selectedDriver.regenScore}%</p>
                      </div>
                      <div className={`${isDark ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-300'} border rounded-lg p-3`}>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>SPEED ADHERENCE</p>
                        <p className="text-xl font-bold text-blue-400">{selectedDriver.speedScore}%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <User className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Select a driver to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}