
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '../types';

interface AnnualCostChartProps {
  data: MonthlyData[];
}

const AnnualCostChart: React.FC<AnnualCostChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800/50 shadow-sm">
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold">Historical Cost Analysis</h3>
        <p className="text-slate-500 text-sm font-medium">Monthly energy costs detected in dataset (Calculated in ₹)</p>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" strokeOpacity={0.3} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={15} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} tickFormatter={(v) => `₹${v.toLocaleString()}`} />
            <Tooltip 
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Cost']}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} 
            />
            <Line 
              type="monotone" 
              dataKey="cost" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#0f172a' }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnnualCostChart;
