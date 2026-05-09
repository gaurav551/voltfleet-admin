'use client'
import dynamic from 'next/dynamic';

const TrackingMap = dynamic(() => import('./TrackingMap'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 text-sm animate-pulse">Loading Fleet Command...</p>
      </div>
    </div>
  ),
});

export default function TrackingPage() {
  return <TrackingMap />;
}