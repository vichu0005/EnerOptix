
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DeviceBreakdownProps {
  categoryTotals: {
    hvac: number;
    lighting: number;
    appliances: number;
    electronics: number;
  };
  total: number;
}

const DeviceBreakdown: React.FC<DeviceBreakdownProps> = ({ categoryTotals, total }) => {
  const data = useMemo(() => {
    const categoriesSum = categoryTotals.hvac + categoryTotals.lighting + categoryTotals.appliances + categoryTotals.electronics;
    const other = Math.max(0, total - categoriesSum);
    
    return [
      { name: 'HVAC', value: categoryTotals.hvac, color: '#10b981' },
      { name: 'Lighting', value: categoryTotals.lighting, color: '#0da06f' },
      { name: 'Appliances', value: categoryTotals.appliances, color: '#059669' },
      { name: 'Electronics', value: categoryTotals.electronics, color: '#047857' },
      { name: 'Other', value: other, color: '#84cc16' },
    ].filter(item => item.value > 0);
  }, [categoryTotals, total]);

  const totalForCalc = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800/50 shadow-sm h-full">
      <div className="mb-8">
        <h3 className="text-white text-lg font-bold">Device Breakdown</h3>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Energy usage by category</p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={75}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 w-full space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-slate-400 text-sm font-semibold">{item.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white font-bold text-sm">
                  {((item.value / totalForCalc) * 100).toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">{item.value.toFixed(1)} kWh</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceBreakdown;
