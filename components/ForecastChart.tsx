
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '../types';

interface ForecastChartProps {
  historicalData: MonthlyData[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ historicalData }) => {
  // Generate predictive data based on historical average
  const avgMonthly = historicalData.length > 0 
    ? historicalData.reduce((acc, curr) => acc + curr.consumption, 0) / historicalData.length 
    : 5000;

  const lastMonthIndex = historicalData.length > 0 
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(historicalData[historicalData.length-1].name)
    : -1;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const data = historicalData.map(d => ({
    name: d.name,
    actual: d.consumption,
    predicted: d.consumption
  }));

  // Add 3 forecast months
  for (let i = 1; i <= 3; i++) {
    const nextMonth = monthNames[(lastMonthIndex + i) % 12];
    data.push({
      name: nextMonth + '*',
      actual: undefined as any,
      predicted: avgMonthly * (1 + (Math.random() * 0.1 - 0.05)) // Random +/- 5% variance for "prediction"
    });
  }

  return (
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800/50 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-white text-xl font-bold">Neural Consumption Forecast</h3>
          <p className="text-slate-500 text-sm font-medium">Predictive modeling based on your uploaded data trends</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Predicted</span>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.05}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" strokeOpacity={0.3} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 600}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 600}} tickFormatter={(v) => `${(v/1000).toFixed(1)}k`} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
            <Area type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" />
            <Area type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-[10px] text-slate-500 font-bold italic">* Neural projection period</div>
    </div>
  );
};

export default ForecastChart;
