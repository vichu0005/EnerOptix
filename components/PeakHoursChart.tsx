
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { HourlyData } from '../types';

interface PeakHoursChartProps {
  data: HourlyData[];
}

const PeakHoursChart: React.FC<PeakHoursChartProps> = ({ data }) => {
  return (
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800/50 shadow-sm">
      <div className="mb-8">
        <h3 className="text-white text-lg font-bold">Peak Hours Analysis</h3>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Hourly consumption pattern (kWh)</p>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" strokeOpacity={0.3} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}}
            />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
              labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
              itemStyle={{ fontWeight: 'bold' }}
              formatter={(value) => [`${value} kWh`, 'Usage']}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => {
                let color = '#10b981'; // Normal
                if (entry.type === 'peak') color = '#f59e0b';
                if (entry.type === 'low') color = '#3b82f6'; // Better distinct color for Low
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Low Usage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Peak Hours</span>
        </div>
      </div>
    </div>
  );
};

export default PeakHoursChart;
