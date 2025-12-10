import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, AlertTriangle, Users } from 'lucide-react';

const OutbreakHeatmap = () => {
    const [selectedPincode, setSelectedPincode] = useState<any>(null);
    const [hoverPincode, setHoverPincode] = useState<any>(null);
    const [timeRange, setTimeRange] = useState('24h');

    // Simulated outbreak data for Mumbai pincodes
    // In a real app, this would come from the API
    const outbreakData = [
        { pincode: '400001', name: 'Fort', x: 30, y: 45, severity: 'red', cases: 45, risk: 92 },
        { pincode: '400005', name: 'Colaba', x: 25, y: 55, severity: 'orange', cases: 28, risk: 78 },
        { pincode: '400012', name: 'Parel', x: 45, y: 40, severity: 'yellow', cases: 12, risk: 45 },
        { pincode: '400022', name: 'Dadar', x: 50, y: 35, severity: 'green', cases: 3, risk: 15 },
        { pincode: '400034', name: 'Kurla', x: 65, y: 50, severity: 'red', cases: 38, risk: 85 },
        { pincode: '400051', name: 'Bandra', x: 40, y: 25, severity: 'orange', cases: 22, risk: 68 },
        { pincode: '400067', name: 'Kandivali', x: 55, y: 15, severity: 'yellow', cases: 8, risk: 32 },
        { pincode: '400078', name: 'Borivali', x: 60, y: 10, severity: 'green', cases: 2, risk: 8 },
        { pincode: '400092', name: 'Goregaon', x: 70, y: 30, severity: 'orange', cases: 19, risk: 62 },
    ];

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'red': return '#ef4444';
            case 'orange': return '#f97316';
            case 'yellow': return '#eab308';
            default: return '#22c55e';
        }
    };

    const getSeverityLabel = (severity: string) => {
        switch (severity) {
            case 'red': return 'Critical';
            case 'orange': return 'High Risk';
            case 'yellow': return 'Elevated';
            default: return 'Normal';
        }
    };

    const getRadius = (cases: number) => {
        return Math.max(15, Math.min(40, cases * 0.8));
    };

    const activeData = selectedPincode || hoverPincode;
    const stats = {
        total: outbreakData.length,
        critical: outbreakData.filter(d => d.severity === 'red').length,
        high: outbreakData.filter(d => d.severity === 'orange').length,
        elevated: outbreakData.filter(d => d.severity === 'yellow').length,
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <h2 className="text-xl font-bold text-gray-800">Outbreak Heatmap - Mumbai</h2>
                </div>

                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                </select>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Total Areas</div>
                    <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-xs text-red-600 mb-1">Critical</div>
                    <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 mb-1">High Risk</div>
                    <div className="text-2xl font-bold text-orange-600">{stats.high}</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-xs text-yellow-600 mb-1">Elevated</div>
                    <div className="text-2xl font-bold text-yellow-600">{stats.elevated}</div>
                </div>
            </div>

            {/* Map Container */}
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-gray-200 overflow-hidden">
                <svg
                    viewBox="0 0 100 70"
                    className="w-full h-[500px]"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                    {/* Grid lines */}
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100" height="70" fill="url(#grid)" />

                    {/* Outbreak circles */}
                    {outbreakData.map((location, index) => {
                        const radius = getRadius(location.cases);
                        const isActive = activeData?.pincode === location.pincode;

                        return (
                            <g key={location.pincode}>
                                {/* Pulsing animation for critical areas */}
                                {location.severity === 'red' && (
                                    <circle
                                        cx={location.x}
                                        cy={location.y}
                                        r={radius}
                                        fill={getSeverityColor(location.severity)}
                                        opacity="0.3"
                                        className="animate-ping"
                                    />
                                )}

                                {/* Main circle */}
                                <circle
                                    cx={location.x}
                                    cy={location.y}
                                    r={isActive ? radius * 1.2 : radius}
                                    fill={getSeverityColor(location.severity)}
                                    opacity={isActive ? 0.8 : 0.6}
                                    stroke="white"
                                    strokeWidth={isActive ? 0.8 : 0.4}
                                    className="cursor-pointer transition-all duration-300"
                                    onMouseEnter={() => setHoverPincode(location)}
                                    onMouseLeave={() => setHoverPincode(null)}
                                    onClick={() => setSelectedPincode(location)}
                                    style={{
                                        filter: isActive ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none'
                                    }}
                                />

                                {/* Area label */}
                                <text
                                    x={location.x}
                                    y={location.y + radius + 3}
                                    textAnchor="middle"
                                    fontSize="2.5"
                                    fill="white"
                                    fontWeight="600"
                                    className="pointer-events-none"
                                >
                                    {location.name}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Severity Level</div>
                    <div className="space-y-1.5">
                        {[
                            { severity: 'red', label: 'Critical' },
                            { severity: 'orange', label: 'High Risk' },
                            { severity: 'yellow', label: 'Elevated' },
                            { severity: 'green', label: 'Normal' }
                        ].map(item => (
                            <div key={item.severity} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: getSeverityColor(item.severity) }}
                                />
                                <span className="text-xs text-gray-600">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detail Panel */}
            {activeData && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">{activeData.name}</h3>
                            <p className="text-sm text-gray-600">Pincode: {activeData.pincode}</p>
                        </div>
                        <span
                            className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                            style={{ backgroundColor: getSeverityColor(activeData.severity) }}
                        >
                            {getSeverityLabel(activeData.severity)}
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <div>
                                <div className="text-xs text-gray-500">Anomalous Cases</div>
                                <div className="text-xl font-bold text-gray-800">{activeData.cases}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-500" />
                            <div>
                                <div className="text-xs text-gray-500">Risk Score</div>
                                <div className="text-xl font-bold text-gray-800">{activeData.risk}%</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <div>
                                <div className="text-xs text-gray-500">Population</div>
                                <div className="text-xl font-bold text-gray-800">~12K</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setSelectedPincode(null)}
                        className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        View Detailed Report
                    </button>
                </div>
            )}
        </div>
    );
};

export default OutbreakHeatmap;
