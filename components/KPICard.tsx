
import React from 'react';
import { LucideIcon, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  color: string;
  isLivePulse?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, icon: Icon, trend, color, isLivePulse }) => {
  return (
    <div className={`bg-[#0f172a] p-6 rounded-2xl border border-slate-800/50 shadow-sm hover:border-slate-700/50 transition-all group relative overflow-hidden ${isLivePulse ? 'border-[#10b981]/20' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${color} bg-opacity-10 text-white shadow-inner relative`}>
          <Icon className={color.replace('bg-', 'text-')} size={24} />
          {isLivePulse && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#10b981] rounded-full animate-ping"></div>
          )}
        </div>
        {trend && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full text-xs font-bold">
            <TrendingDown size={14} />
            {trend}
          </div>
        )}
        {isLivePulse && !trend && (
          <div className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full text-[10px] font-black uppercase tracking-wider">
            Streaming
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          {(title.includes('Consumption') || title.includes('Usage') || title.includes('Metering')) && <span className="text-slate-500 text-sm font-medium">kWh</span>}
        </div>
        {subtitle && <p className="text-xs text-slate-500 font-medium mt-1">{subtitle}</p>}
      </div>
      
      {isLivePulse && (
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-[#10b981]/5 rounded-full blur-xl translate-y-6 translate-x-6"></div>
      )}
    </div>
  );
};

export default KPICard;
