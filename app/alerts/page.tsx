'use client'
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Battery, 
  Zap, 
  Trash2, 
  Archive, 
  Filter, 
  Plus, 
  Settings,
  Search,
  ChevronRight,
  User,
  MessageSquare,
  TrendingUp,
  Bell,
  X
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

const mockAlerts = [
  {
    id: 1,
    type: 'critical',
    category: 'battery',
    title: 'Critical Battery Level',
    vehicle: 'T-402',
    message: 'Battery at 8% with 62 miles to base',
    timestamp: '2 min ago',
    status: 'new',
    location: 'Downtown Zone',
    assignee: null,
    rule: 'Battery < 10% + Distance > 50mi'
  },
  {
    id: 2,
    type: 'warning',
    category: 'geofence',
    title: 'Geofence Breach',
    vehicle: 'T-305',
    message: 'Vehicle exited Downtown Zone at 2:00 AM',
    timestamp: '15 min ago',
    status: 'new',
    location: 'Downtown Zone',
    assignee: null,
    rule: 'After Hours Exit'
  },
  {
    id: 3,
    type: 'critical',
    category: 'charging',
    title: 'Ghost Charging Detected',
    vehicle: 'T-108',
    message: 'Connector plugged in but no power flow detected',
    timestamp: '1 hour ago',
    status: 'in-progress',
    location: 'Charging Station 4',
    assignee: 'Mike Chen',
    rule: 'Manual Report'
  },
  {
    id: 4,
    type: 'warning',
    category: 'predictive',
    title: 'Predicted Failure Alert',
    vehicle: 'T-215',
    message: 'AI detected voltage irregularity in Module 3',
    timestamp: '3 hours ago',
    status: 'in-progress',
    location: 'En Route',
    assignee: 'Sarah Johnson',
    rule: 'AI Anomaly Detection'
  },
  {
    id: 5,
    type: 'info',
    category: 'maintenance',
    title: 'Scheduled Maintenance Due',
    vehicle: 'T-501',
    message: 'Vehicle is due for 10,000 mile service',
    timestamp: '5 hours ago',
    status: 'new',
    location: 'Depot',
    assignee: null,
    rule: 'Maintenance Schedule'
  },
  {
    id: 6,
    type: 'resolved',
    category: 'battery',
    title: 'Battery Temperature Normal',
    vehicle: 'T-402',
    message: 'Temperature returned to safe range',
    timestamp: '1 day ago',
    status: 'resolved',
    location: 'Charging Station 2',
    assignee: 'Mike Chen',
    rule: 'Temp > 45°C'
  }
];

export default function AlertsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [view, setView] = useState('inbox'); // inbox or kanban or rules
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [alerts, setAlerts] = useState(mockAlerts);

  const getAlertIcon = (category) => {
    switch(category) {
      case 'battery': return <Battery className="w-5 h-5" />;
      case 'charging': return <Zap className="w-5 h-5" />;
      case 'geofence': return <MapPin className="w-5 h-5" />;
      case 'predictive': return <TrendingUp className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type) => {
    switch(type) {
      case 'critical': return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', dot: 'bg-red-500' };
      case 'warning': return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', dot: 'bg-yellow-500' };
      case 'info': return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500' };
      case 'resolved': return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', dot: 'bg-green-500' };
      default: return { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', dot: 'bg-gray-500' };
    }
  };

  const updateAlertStatus = (id, newStatus, assignee = null) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: newStatus, assignee } : alert
    ));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    setSelectedAlert(null);
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterStatus === 'all') return true;
    return alert.status === filterStatus;
  });

  const alertCounts = {
    new: alerts.filter(a => a.status === 'new').length,
    'in-progress': alerts.filter(a => a.status === 'in-progress').length,
    resolved: alerts.filter(a => a.status === 'resolved').length
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} p-6`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
 <h1 className="text-3xl font-bold bg-gradient-to-r from-volt-400 to-cyber-400 bg-clip-text text-transparent">
                        Alerts & Notifications
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              Triage, assign, and resolve fleet issues in real-time
            </p>
          </div>
          <button
            onClick={() => setShowRuleBuilder(!showRuleBuilder)}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Settings className="w-4 h-4" />
            Rule Builder
          </button>
        </div>

        {/* View Toggle & Stats */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setView('inbox')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'inbox'
                  ? 'bg-orange-500 text-white'
                  : isDark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Inbox
            </button>
            <button
              onClick={() => setView('kanban')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'kanban'
                  ? 'bg-orange-500 text-white'
                  : isDark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Kanban
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{alertCounts.new} New</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{alertCounts['in-progress']} Active</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{alertCounts.resolved} Resolved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rule Builder Modal */}
      {showRuleBuilder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 max-w-2xl w-full`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Alert Rule Builder</h2>
              <button onClick={() => setShowRuleBuilder(false)} className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`${isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4 mb-4`}>
              <div className="flex items-center gap-2 text-sm mb-3">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>IF</span>
                <select className={`flex-1 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`}>
                  <option>Battery Level</option>
                  <option>Temperature</option>
                  <option>Location</option>
                  <option>Charging Status</option>
                </select>
                <select className={`px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`}>
                  <option>is below</option>
                  <option>is above</option>
                  <option>equals</option>
                </select>
                <input type="text" placeholder="10%" className={`w-24 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`} />
              </div>

              <div className="flex items-center gap-2 text-sm mb-3">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>AND</span>
                <select className={`flex-1 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`}>
                  <option>Distance to Base</option>
                  <option>Time of Day</option>
                  <option>Driver Status</option>
                </select>
                <select className={`px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`}>
                  <option>is greater than</option>
                  <option>is less than</option>
                </select>
                <input type="text" placeholder="50 miles" className={`w-24 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`} />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>THEN</span>
                <select className={`flex-1 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border`}>
                  <option>Send SMS to Driver</option>
                  <option>Create Critical Alert</option>
                  <option>Notify Dispatcher</option>
                  <option>Auto-assign Mechanic</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium">
                Save Rule
              </button>
              <button onClick={() => setShowRuleBuilder(false)} className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {view === 'inbox' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alert List */}
          <div className={`lg:col-span-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
            <div className={`p-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} border-b flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
                >
                  <option value="all">All Alerts</option>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <Archive className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-700">
              {filteredAlerts.map((alert) => {
                const colors = getAlertColor(alert.type);
                return (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedAlert?.id === alert.id 
                        ? isDark ? 'bg-gray-700' : 'bg-blue-50'
                        : isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center ${colors.text}`}>
                        {getAlertIcon(alert.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                          <span className="font-bold text-sm">{alert.vehicle}</span>
                          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{alert.timestamp}</span>
                        </div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>{alert.title}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{alert.message}</p>
                        {alert.assignee && (
                          <div className="flex items-center gap-1 mt-2">
                            <User className="w-3 h-3 text-blue-400" />
                            <span className="text-xs text-blue-400">{alert.assignee}</span>
                          </div>
                        )}
                      </div>
                      <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alert Detail Panel */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
            {selectedAlert ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{selectedAlert.title}</h3>
                    <button onClick={() => deleteAlert(selectedAlert.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getAlertColor(selectedAlert.type).bg} ${getAlertColor(selectedAlert.type).text}`}>
                      {selectedAlert.type}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedAlert.timestamp}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>VEHICLE</p>
                    <p className="font-medium">{selectedAlert.vehicle}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>LOCATION</p>
                    <p className="font-medium">{selectedAlert.location}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>MESSAGE</p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{selectedAlert.message}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-1`}>TRIGGERED BY</p>
                    <p className="text-sm text-orange-400">{selectedAlert.rule}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedAlert.status === 'new' && (
                    <>
                      <button
                        onClick={() => updateAlertStatus(selectedAlert.id, 'in-progress', 'Mike Chen')}
                        className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium text-sm hover:bg-yellow-600"
                      >
                        Assign to Mechanic
                      </button>
                      <button
                        onClick={() => updateAlertStatus(selectedAlert.id, 'resolved')}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-medium text-sm hover:bg-green-600"
                      >
                        Mark Resolved
                      </button>
                    </>
                  )}
                  {selectedAlert.status === 'in-progress' && (
                    <button
                      onClick={() => updateAlertStatus(selectedAlert.id, 'resolved')}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-medium text-sm hover:bg-green-600"
                    >
                      Mark Resolved
                    </button>
                  )}
                  <button className={`w-full px-4 py-2 rounded-lg font-medium text-sm ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                    Archive
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Bell className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Select an alert to view details</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['new', 'in-progress', 'resolved'].map((status) => (
            <div key={status} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold capitalize">{status.replace('-', ' ')}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  status === 'new' ? 'bg-red-500/10 text-red-400' :
                  status === 'in-progress' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-green-500/10 text-green-400'
                }`}>
                  {alerts.filter(a => a.status === status).length}
                </span>
              </div>
              <div className="space-y-3">
                {alerts.filter(a => a.status === status).map((alert) => {
                  const colors = getAlertColor(alert.type);
                  return (
                    <div key={alert.id} className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-lg p-3 cursor-move hover:shadow-lg transition-shadow`}>
                      <div className="flex items-start gap-2 mb-2">
                        <div className={`w-8 h-8 rounded ${colors.bg} flex items-center justify-center ${colors.text}`}>
                          {getAlertIcon(alert.category)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-1">{alert.vehicle}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{alert.title}</p>
                        </div>
                      </div>
                      {alert.assignee && (
                        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-700">
                          <User className="w-3 h-3 text-blue-400" />
                          <span className="text-xs text-blue-400">{alert.assignee}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}