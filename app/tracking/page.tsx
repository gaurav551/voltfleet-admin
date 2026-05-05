"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Search, 
  MapPin, 
  Battery, 
  AlertTriangle, 
  Navigation,
  Clock,
  X,
  Zap,
  Moon,
  Sun,
} from 'lucide-react';

import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

interface Vehicle {
  id: string;
  model: string;
  driver: string;
  lat: number;
  lng: number;
  battery: number;
  heading: number;
  status: 'in-transit' | 'charging' | 'idle' | 'critical';
  speed: number;
  nextStop: string;
  eta: string;
  range: number;
  trail: Array<[number, number]>;
}

const vehicles: Vehicle[] = [
  { id: 'EV-1247', model: 'Tesla Model 3', driver: 'John Smith', lat: 40.7128, lng: -74.0060, battery: 87, heading: 45, status: 'in-transit', speed: 45, nextStop: 'Warehouse A', eta: '14:05 PM', range: 156, trail: [[40.7128, -74.0060], [40.7130, -74.0058], [40.7135, -74.0055]] },
  { id: 'EV-0934', model: 'Nissan Leaf', driver: 'Sarah Johnson', lat: 40.7580, lng: -73.9855, battery: 15, heading: 90, status: 'charging', speed: 0, nextStop: 'Station A-12', eta: '15:30 PM', range: 25, trail: [[40.7580, -73.9855], [40.7575, -73.9860]] },
  { id: 'EV-2156', model: 'Tesla Model Y', driver: 'Mike Davis', lat: 40.6892, lng: -74.0445, battery: 100, heading: 180, status: 'idle', speed: 0, nextStop: 'Depot North', eta: '16:00 PM', range: 320, trail: [[40.6892, -74.0445]] },
  { id: 'EV-3421', model: 'Chevy Bolt', driver: 'Emma Wilson', lat: 40.7489, lng: -73.9680, battery: 62, heading: 270, status: 'in-transit', speed: 35, nextStop: 'Downtown Hub', eta: '14:20 PM', range: 145, trail: [[40.7489, -73.9680], [40.7485, -73.9685], [40.7480, -73.9690]] },
  { id: 'EV-5089', model: 'Tesla Model 3', driver: 'David Brown', lat: 40.7614, lng: -73.9776, battery: 8, heading: 135, status: 'critical', speed: 0, nextStop: 'Emergency Charge', eta: 'NOW', range: 5, trail: [[40.7614, -73.9776]] },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-transit': return { dot: 'bg-green-500', label: 'Moving', color: '#22c55e', bg: 'from-green-900/20 to-green-800/20' };
    case 'charging': return { dot: 'bg-blue-500', label: 'Charging', color: '#3b82f6', bg: 'from-blue-900/20 to-blue-800/20' };
    case 'idle': return { dot: 'bg-yellow-500', label: 'Idle', color: '#eab308', bg: 'from-yellow-900/20 to-yellow-800/20' };
    case 'critical': return { dot: 'bg-red-500 animate-pulse', label: 'Critical', color: '#ef4444', bg: 'from-red-900/20 to-red-800/20' };
    default: return { dot: 'bg-gray-500', label: 'Unknown', color: '#6b7280', bg: 'from-gray-900/20 to-gray-800/20' };
  }
};

const getBatteryColor = (level: number) => {
  if (level >= 80) return 'bg-green-500';
  if (level >= 40) return 'bg-blue-500';
  if (level >= 20) return 'bg-yellow-500';
  return 'bg-red-500';
};

const createVehicleIcon = (vehicle: Vehicle) => {
  const statusColor = getStatusColor(vehicle.status);
  return L.divIcon({
    className: 'custom-vehicle-marker',
    html: `
      <div style="position: relative; transform: rotate(${vehicle.heading}deg);">
        <div style="
          width: 40px;
          height: 40px;
          background: ${statusColor.color};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          border: 3px solid white;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L17 12H7L12 2Z M12 8V22" stroke="white" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <div style="
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background: ${statusColor.color};
          border: 2px solid white;
          border-radius: 50%;
          ${vehicle.status === 'critical' ? 'animation: pulse 1s infinite;' : ''}
        "></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const MapController: React.FC<{ center: [number, number] | null }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 13, { animate: true });
    }
  }, [center, map]);
  
  return null;
};

const Toast: React.FC<{ message: string; type: 'geofence' | 'warning' }> = ({ message, type }) => (
  <div
    className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-white font-medium text-sm flex items-center gap-2 z-[9999] ${
      type === 'geofence' ? 'bg-red-600' : 'bg-yellow-600'
    }`}
  >
    <AlertTriangle className="h-4 w-4" />
    {message}
  </div>
);

export default function LiveTrackingPage() {
  const { theme } = useTheme();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowBattery, setFilterLowBattery] = useState(false);
  const [geofenceAlert, setGeofenceAlert] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  const isDark = theme === 'dark';

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         v.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBattery = !filterLowBattery || v.battery < 30;
    return matchesSearch && matchesBattery;
  });

  useEffect(() => {
    if (geofenceAlert) {
      const timer = setTimeout(() => {
        setGeofenceAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [geofenceAlert]);

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setMapCenter([vehicle.lat, vehicle.lng]);
    if (vehicle.status === 'critical') {
      setGeofenceAlert(`${vehicle.id} requires immediate attention!`);
    }
  };

  return (
    <div className={`h-screen flex overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Left Sidebar */}
      <div className={`w-80 flex flex-col border-r ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        {/* Header */}
        <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Fleet Command
          </h1>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Real-time Vehicle Tracking</p>
        </div>

        {/* Search */}
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Vehicle ID or Driver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500' 
                  : 'bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400'
              } border focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:border-green-500`}
            />
          </div>
          
          <label className={`flex items-center gap-2 cursor-pointer text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <input
              type="checkbox"
              checked={filterLowBattery}
              onChange={(e) => setFilterLowBattery(e.target.checked)}
              className="rounded border-gray-400"
            />
            <Battery className="h-4 w-4 text-yellow-500" />
            Low Battery (&lt;30%)
          </label>
        </div>

        {/* Vehicle List */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2 p-4">
            {filteredVehicles.map((vehicle) => {
              const statusColor = getStatusColor(vehicle.status);
              const isSelected = selectedVehicle?.id === vehicle.id;

              return (
                <div
                  key={vehicle.id}
                  onClick={() => handleVehicleClick(vehicle)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? isDark 
                        ? 'bg-green-900/30 border-green-500/50 shadow-lg shadow-green-500/20'
                        : 'bg-green-50 border-green-400 shadow-lg shadow-green-500/10'
                      : isDark
                        ? 'bg-gray-700 border-gray-600 hover:border-green-500/50'
                        : 'bg-gray-50 border-gray-200 hover:border-green-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.id}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{vehicle.model}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                    }`}>
                      <div className={`h-2 w-2 rounded-full ${statusColor.dot}`}></div>
                      {statusColor.label}
                    </div>
                  </div>

                  <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{vehicle.driver}</p>

                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Battery</span>
                      <span className={`text-xs font-bold ${vehicle.battery < 20 ? 'text-red-400' : 'text-green-400'}`}>
                        {vehicle.battery}%
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}>
                      <div
                        className={getBatteryColor(vehicle.battery)}
                        style={{ width: `${vehicle.battery}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Zap className="h-3 w-3 inline mr-1" />
                    {vehicle.range} mi remaining
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        <MapContainer
          center={[40.7128, -73.9855]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={isDark 
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />
          
          <MapController center={mapCenter} />

          {vehicles.map((vehicle) => (
            <React.Fragment key={vehicle.id}>
              {vehicle.trail.length > 1 && (
                <Polyline
                  positions={vehicle.trail}
                  color={getStatusColor(vehicle.status).color}
                  weight={3}
                  opacity={0.6}
                  dashArray="5, 10"
                />
              )}
              
              <Marker
                position={[vehicle.lat, vehicle.lng]}
                icon={createVehicleIcon(vehicle)}
                eventHandlers={{
                  click: () => handleVehicleClick(vehicle),
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold">{vehicle.id}</p>
                    <p className="text-xs text-gray-600">{vehicle.driver}</p>
                    <p className="text-xs mt-1">Battery: {vehicle.battery}%</p>
                    <p className="text-xs">Speed: {vehicle.speed} mph</p>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>

        {/* Compass */}
        <div className={`absolute top-6 right-6 w-12 h-12 rounded-lg flex items-center justify-center z-[1000] shadow-lg ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
        } border`}>
          <div className="text-center">
            <div className="text-xs font-bold text-green-400">N</div>
            <Navigation className="h-4 w-4 text-green-500 mx-auto" />
          </div>
        </div>

        {/* Vehicle Detail Card */}
        {selectedVehicle && (
          <div className={`absolute bottom-6 left-6 w-80 rounded-xl p-6 shadow-2xl z-[1000] border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => setSelectedVehicle(null)}
              className={`absolute top-4 right-4 transition-colors ${
                isDark ? 'text-gray-400 hover:text-green-500' : 'text-gray-500 hover:text-green-600'
              }`}
            >
              <X className="h-5 w-5" />
            </button>

            <div className={`flex items-center gap-3 mb-4 pb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                {selectedVehicle.driver.charAt(0)}
              </div>
              <div>
                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedVehicle.driver}</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedVehicle.model}</p>
              </div>
            </div>

            <div className={`mb-4 p-4 rounded-lg border ${
              isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current Speed</p>
              <p className="text-4xl font-black text-green-500 font-mono">{selectedVehicle.speed}</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>mph</p>
            </div>

            <div className={`mb-4 p-4 rounded-lg border ${
              isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Next Stop</p>
              <p className={`text-sm font-bold flex items-center gap-2 mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <MapPin className="h-4 w-4 text-blue-500" />
                {selectedVehicle.nextStop}
              </p>
              <p className={`text-xs flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Clock className="h-3 w-3" />
                ETA: {selectedVehicle.eta}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Battery</p>
                <p className="text-lg font-bold text-green-400">{selectedVehicle.battery}%</p>
              </div>
              <div className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Range</p>
                <p className="text-lg font-bold text-blue-400">{selectedVehicle.range} mi</p>
              </div>
            </div>

            <div className={`p-3 rounded-lg text-center bg-gradient-to-r ${getStatusColor(selectedVehicle.status).bg} border ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <p className="text-xs font-bold text-green-400">
                Status: {getStatusColor(selectedVehicle.status).label.toUpperCase()}
              </p>
            </div>
          </div>
        )}
      </div>

      {geofenceAlert && <Toast message={geofenceAlert} type="geofence" />}
    </div>
  );
}



