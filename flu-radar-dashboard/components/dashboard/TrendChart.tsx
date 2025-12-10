"use client";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

export function TrendChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <Card className="p-6 h-[400px] flex items-center justify-center">
                <p className="text-gray-400">No trend data available</p>
            </Card>
        );
    }

    // Calculate growth
    const firstDay = data[0]?.quantity || 0;
    const lastDay = data[data.length - 1]?.quantity || 0;
    const growth = firstDay > 0 ? ((lastDay - firstDay) / firstDay) * 100 : 0;
    const isGrowing = growth > 0;

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold">Pharmacy Purchase Trends</h3>
                    <p className="text-sm text-gray-500">7-Day Transaction Volume</p>
                </div>
                <div className={`text-right ${isGrowing ? 'text-red-500' : 'text-green-500'}`}>
                    <div className="text-2xl font-bold">{isGrowing ? '↑' : '↓'} {Math.abs(growth).toFixed(1)}%</div>
                    <div className="text-xs font-semibold">vs last week</div>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { weekday: 'short' })}
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis style={{ fontSize: '12px' }} />
                        <Tooltip
                            labelFormatter={(str) => new Date(str).toLocaleDateString()}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        {/* Threshold Line */}
                        <ReferenceLine y={100} stroke="orange" strokeDasharray="3 3">
                            <Label value="Warning Threshold" position="insideTopRight" fill="orange" fontSize={10} />
                        </ReferenceLine>

                        <Line
                            type="monotone"
                            dataKey="quantity"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#2563eb', strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                            name="Medication Sales"
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
