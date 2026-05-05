'use client'
import React, { useState } from 'react';
import { 
  Settings, 
  MapPin, 
  Users, 
  Clock, 
  Shield, 
  Zap,
  Plus,
  Edit,
  Trash2,
  Save,
  Bell,
  Battery,
  Gauge,
  Calendar
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = 'Admin' | 'Dispatcher' | 'Driver' | 'Mechanic' | 'Accountant';

type AutoAssignStrategy = 'highest-charge' | 'lowest-mileage';

interface Geofence {
  id: number;
  name: string;
  speedLimit: number;
  detentionAlert: number;
  color: string;
  coords: [number, number][];
}

interface Permission {
  id: string;
  label: string;
  defaults: Record<Role, boolean>;
}

interface PermissionRow extends Permission {
  values: Record<Role, boolean>;
}

interface ShiftTemplate {
  id: number;
  name: string;
  start: string;
  end: string;
  color: string;
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const mockGeofences: Geofence[] = [
  { id: 1, name: 'Central Warehouse', speedLimit: 15, detentionAlert: 120, color: '#22c55e', coords: [[37.7, -122.4], [37.8, -122.4], [37.8, -122.3], [37.7, -122.3]] },
  { id: 2, name: 'Downtown Zone', speedLimit: 25, detentionAlert: 60, color: '#3b82f6', coords: [[37.75, -122.45], [37.85, -122.45], [37.85, -122.35], [37.75, -122.35]] }
];

const roles: Role[] = ['Admin', 'Dispatcher', 'Driver', 'Mechanic', 'Accountant'];

const permissions: Permission[] = [
  { id: 'view_routes', label: 'View Routes', defaults: { Admin: true, Dispatcher: true, Driver: true, Mechanic: false, Accountant: false } },
  { id: 'edit_routes', label: 'Edit Routes', defaults: { Admin: true, Dispatcher: true, Driver: false, Mechanic: false, Accountant: false } },
  { id: 'view_drivers', label: 'View Drivers', defaults: { Admin: true, Dispatcher: true, Driver: false, Mechanic: true, Accountant: false } },
  { id: 'edit_drivers', label: 'Edit Drivers', defaults: { Admin: true, Dispatcher: false, Driver: false, Mechanic: false, Accountant: false } },
  { id: 'view_financials', label: 'View Financials', defaults: { Admin: true, Dispatcher: false, Driver: false, Mechanic: false, Accountant: true } },
  { id: 'edit_financials', label: 'Edit Financials', defaults: { Admin: true, Dispatcher: false, Driver: false, Mechanic: false, Accountant: true } },
  { id: 'view_analytics', label: 'View Analytics', defaults: { Admin: true, Dispatcher: true, Driver: false, Mechanic: false, Accountant: true } },
  { id: 'manage_alerts', label: 'Manage Alerts', defaults: { Admin: true, Dispatcher: true, Driver: false, Mechanic: true, Accountant: false } },
  { id: 'assign_vehicles', label: 'Assign Vehicles', defaults: { Admin: true, Dispatcher: true, Driver: false, Mechanic: false, Accountant: false } }
];

const shiftTemplates: ShiftTemplate[] = [
  { id: 1, name: 'Morning Shift', start: '06:00', end: '14:00', color: '#f59e0b' },
  { id: 2, name: 'Day Shift', start: '14:00', end: '22:00', color: '#3b82f6' },
  { id: 3, name: 'Night Shift', start: '22:00', end: '06:00', color: '#8b5cf6' }
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<string>('geofence');
  const [geofences, setGeofences] = useState<Geofence[]>(mockGeofences);
  const [selectedGeofence, setSelectedGeofence] = useState<Geofence | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [permissionMatrix, setPermissionMatrix] = useState<PermissionRow[]>(
    permissions.map(p => ({ ...p, values: { ...p.defaults } }))
  );
  const [autoAssignStrategy, setAutoAssignStrategy] = useState<AutoAssignStrategy>('highest-charge');
  const [shifts, setShifts] = useState<ShiftTemplate[]>(shiftTemplates);

  const togglePermission = (permissionId: string, role: Role): void => {
    setPermissionMatrix(prev => prev.map(p => 
      p.id === permissionId 
        ? { ...p, values: { ...p.values, [role]: !p.values[role] } }
        : p
    ));
  };

  const ToggleSwitch = ({ checked, onChange }: ToggleSwitchProps) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        checked ? 'bg-green-500' : isDark ? 'bg-gray-700' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} p-6`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-volt-400 to-cyber-400 bg-clip-text text-transparent">
          Settings & Configuration
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          Granular control over geofences, permissions, and automation
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'geofence', label: 'Geofence Config', icon: MapPin },
          { id: 'rbac', label: 'Access Control', icon: Shield },
          { id: 'shifts', label: 'Shift Management', icon: Clock }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-purple-500 text-white'
                : isDark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Geofence Configuration */}
      {activeTab === 'geofence' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className={`lg:col-span-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
            <div className={`p-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} border-b flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <h2 className="font-bold">Interactive Geofence Map</h2>
              </div>
              <button
                onClick={() => setIsDrawing(!isDrawing)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  isDrawing 
                    ? 'bg-green-500 text-white' 
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
              >
                <Plus className="w-4 h-4" />
                {isDrawing ? 'Drawing Mode...' : 'Draw Zone'}
              </button>
            </div>

            {/* Simulated Map */}
            <div className={`relative h-[500px] ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
              {/* Map Grid Background */}
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(${isDark ? '#374151' : '#e5e7eb'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#374151' : '#e5e7eb'} 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}></div>

              {/* Geofence Polygons */}
              {geofences.map((geo, idx) => (
                <div
                  key={geo.id}
                  onClick={() => setSelectedGeofence(geo)}
                  className="absolute cursor-pointer group"
                  style={{
                    left: '20%',
                    top: idx === 0 ? '20%' : '50%',
                    width: '40%',
                    height: '30%',
                    backgroundColor: `${geo.color}20`,
                    border: `3px solid ${geo.color}`,
                    borderRadius: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  <div className="absolute top-2 left-2 px-3 py-1 rounded-lg text-xs font-bold text-white"
                    style={{ backgroundColor: geo.color }}>
                    {geo.name}
                  </div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                </div>
              ))}

              {/* Drawing Indicator */}
              {isDrawing && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium shadow-lg animate-pulse">
                  Click and drag to draw a geofence polygon
                </div>
              )}

              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border shadow-lg`}>
                  <Plus className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border shadow-lg`}>
                  <MapPin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
            <h3 className="text-lg font-bold mb-4">Zone Configuration</h3>
            
            {selectedGeofence ? (
              <div className="space-y-4">
                <div>
                  <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}>ZONE NAME</label>
                  <input
                    type="text"
                    value={selectedGeofence.name}
                    onChange={(e) => setSelectedGeofence({ ...selectedGeofence, name: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
                  />
                </div>

                <div>
                  <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}>SPEED LIMIT INSIDE ZONE</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={selectedGeofence.speedLimit}
                      onChange={(e) => setSelectedGeofence({ ...selectedGeofence, speedLimit: Number(e.target.value) })}
                      className={`flex-1 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
                    />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>km/h</span>
                  </div>
                </div>

                <div>
                  <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}>DETENTION ALERT</label>
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-purple-400" />
                    <span className="text-sm flex-1">Notify if stay duration exceeds</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      value={selectedGeofence.detentionAlert}
                      onChange={(e) => setSelectedGeofence({ ...selectedGeofence, detentionAlert: Number(e.target.value) })}
                      className={`flex-1 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
                    />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>minutes</span>
                  </div>
                </div>

                <div>
                  <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 block`}>ZONE COLOR</label>
                  <div className="flex gap-2">
                    {['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedGeofence({ ...selectedGeofence, color })}
                        className={`w-8 h-8 rounded-lg border-2 ${selectedGeofence.color === color ? 'border-white' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg font-medium text-sm hover:bg-purple-600 flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button className="p-2 rounded-lg text-red-400 border border-red-500/30 hover:bg-red-500/10">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Select a geofence zone or draw a new one to configure settings
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RBAC Matrix */}
      {activeTab === 'rbac' && (
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
          <div className={`p-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} border-b`}>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <h2 className="font-bold">Role-Based Access Control Matrix</h2>
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              Toggle permissions for each role using the switches below
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`text-left p-4 text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Permission
                  </th>
                  {roles.map((role) => (
                    <th key={role} className={`text-center p-4 text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full ${
                          role === 'Admin' ? 'bg-purple-500/20 text-purple-400' :
                          role === 'Dispatcher' ? 'bg-blue-500/20 text-blue-400' :
                          role === 'Driver' ? 'bg-green-500/20 text-green-400' :
                          role === 'Mechanic' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-pink-500/20 text-pink-400'
                        } flex items-center justify-center`}>
                          {role === 'Admin' ? '👑' : role === 'Dispatcher' ? '📋' : role === 'Driver' ? '🚗' : role === 'Mechanic' ? '🔧' : '💰'}
                        </div>
                        <span>{role}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {permissionMatrix.map((permission) => (
                  <tr key={permission.id} className={`${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Zap className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium">{permission.label}</span>
                      </div>
                    </td>
                    {roles.map((role) => (
                      <td key={role} className="p-4 text-center">
                        <div className="flex justify-center">
                          <ToggleSwitch
                            checked={permission.values[role]}
                            onChange={() => togglePermission(permission.id, role)}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`p-4 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`}>
                {permissionMatrix.reduce((acc, p) => acc + Object.values(p.values).filter(Boolean).length, 0)} Permissions Active
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium text-sm hover:bg-purple-600 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Permission Matrix
            </button>
          </div>
        </div>
      )}

      {/* Shift Management */}
      {activeTab === 'shifts' && (
        <div className="space-y-6">
          {/* Auto-Assign Strategy */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
            <div className="flex items-center gap-2 mb-4">
              <Battery className="w-5 h-5 text-purple-400" />
              <h2 className="font-bold">Auto-Assign Vehicle Strategy</h2>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Configure how vehicles are automatically assigned to drivers at shift start
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setAutoAssignStrategy('highest-charge')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  autoAssignStrategy === 'highest-charge'
                    ? 'border-purple-500 bg-purple-500/10'
                    : isDark ? 'border-gray-700 bg-gray-900 hover:border-gray-600' : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Battery className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm">Highest Charge</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Maximize range</p>
                  </div>
                </div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} text-left`}>
                  Assigns the vehicle with the highest battery charge to ensure maximum range availability
                </p>
              </button>

              <button
                onClick={() => setAutoAssignStrategy('lowest-mileage')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  autoAssignStrategy === 'lowest-mileage'
                    ? 'border-purple-500 bg-purple-500/10'
                    : isDark ? 'border-gray-700 bg-gray-900 hover:border-gray-600' : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Gauge className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm">Lowest Mileage</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Balance wear</p>
                  </div>
                </div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} text-left`}>
                  Distributes usage evenly across fleet by assigning vehicles with lowest total mileage
                </p>
              </button>
            </div>
          </div>

          {/* Shift Timeline */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <h2 className="font-bold">Shift Templates & Rotation</h2>
              </div>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium text-sm hover:bg-purple-600 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Shift
              </button>
            </div>

            {/* 24-Hour Timeline */}
            <div className="relative mb-8">
              {/* Hour markers */}
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                {[0, 6, 12, 18, 24].map((hour) => (
                  <span key={hour}>{hour.toString().padStart(2, '0')}:00</span>
                ))}
              </div>

              {/* Timeline bar */}
              <div className={`relative h-20 ${isDark ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg overflow-hidden`}>
                {shifts.map((shift) => {
                  const startHour = parseInt(shift.start.split(':')[0]);
                  const endHour = parseInt(shift.end.split(':')[0]);
                  const duration = endHour > startHour ? endHour - startHour : 24 - startHour + endHour;
                  const left = (startHour / 24) * 100;
                  const width = (duration / 24) * 100;

                  return (
                    <div
                      key={shift.id}
                      className="absolute top-0 h-full cursor-move group"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        backgroundColor: `${shift.color}40`,
                        borderLeft: `3px solid ${shift.color}`,
                        borderRight: `3px solid ${shift.color}`
                      }}
                    >
                      <div className="p-2 h-full flex flex-col justify-center">
                        <p className="text-xs font-bold" style={{ color: shift.color }}>{shift.name}</p>
                        <p className="text-xs text-gray-400">{shift.start} - {shift.end}</p>
                      </div>
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  );
                })}
              </div>

              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-2 text-center`}>
                Drag shift blocks to adjust timing • Click to edit details
              </p>
            </div>

            {/* Shift Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shifts.map((shift) => (
                <div key={shift.id} className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-300'} border rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: shift.color }}></div>
                      <span className="font-bold text-sm">{shift.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <button className={`p-1 rounded ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className={`p-1 rounded ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{shift.start} - {shift.end}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {Math.floor(Math.random() * 5) + 3} Drivers
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}