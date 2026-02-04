
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { EnergyRecord } from '../types';

interface ChartsSectionProps {
  records: EnergyRecord[];
  isLive?: boolean;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ records, isLive }) => {
  // Define sampling to keep chart performant
  const chartData = records.map(r => ({
    time: r.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: isLive ? '2-digit' : undefined }),
    current: r.total,
    optimized: r.total * 0.85 // Mocked optimization line
  }));

  const displayData = isLive 
    ? chartData.slice(-30) // Show last 30 readings for live mode
    : chartData.filter((_, i) => records.length > 50 ? i % Math.floor(records.length / 50) === 0 : true);

  return (
    <div className="bg-[#0f172a] p-8 rounded-[40px] border border-slate-800/50 shadow-sm relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#10b981]/30"></div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-white text-xl font-bold">Consumption Intelligence</h3>
            {isLive && (
              <div className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded border border-blue-500/20 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                Real-Time
              </div>
            )}
          </div>
          <p className="text-slate-500 text-sm font-medium">Current vs Optimized Load Profile (kWh)</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0da06f]/40"></div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Target</span>
          </div>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0da06f" stopOpacity={0.05}/>
                <stop offset="95%" stopColor="#0da06f" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" strokeOpacity={0.5} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}}
              dx={-10}
            />
            <Tooltip 
              isAnimationActive={!isLive}
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderRadius: '16px', 
                border: '1px solid #1e293b',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
              }}
              itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            />
            <Area 
              type="monotone" 
              dataKey="optimized" 
              stroke="#0da06f" 
              strokeWidth={2}
              strokeOpacity={0.4}
              fillOpacity={1} 
              fill="url(#colorOptimized)" 
              isAnimationActive={!isLive}
            />
            <Area 
              type="monotone" 
              dataKey="current" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCurrent)" 
              isAnimationActive={!isLive}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {isLive && (
        <div className="absolute bottom-6 right-8 text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
          <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
          Sampling frequency: 0.33 Hz
        </div>
      )}
    </div>
  );
};

export default ChartsSection;
