
import React from 'react';
import { Sparkles, Clock, Thermometer, Zap, TrendingUp, Search, Info } from 'lucide-react';
import ForecastChart from './ForecastChart';
import AnnualCostChart from './AnnualCostChart';
import { DatasetSummary } from '../types';

interface InsightsViewProps {
  summary: DatasetSummary;
}

const InsightsView: React.FC<InsightsViewProps> = ({ summary }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="text-4xl font-black tracking-tighter">AI Insights</h2>
        <p className="text-slate-500 font-medium">Machine learning-powered analysis of your energy consumption patterns.</p>
      </div>

      {/* Pattern Detection Summary */}
      <section className="bg-[#10b981]/5 border border-[#10b981]/10 rounded-[40px] p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#10b981] rounded-lg text-black">
              <Search size={20} />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Neural Pattern Detection</h3>
          </div>
          <p className="text-slate-400 font-medium leading-relaxed">
            Our engine has successfully mapped your facility's energy fingerprint. We've detected a recurring <span className="text-[#10b981]">Peak Surge Pattern</span>. This surge is primarily driven by coincidental high-draw cycles from both HVAC systems and primary appliances. Implementing a sequenced startup protocol could mitigate this peak by up to 14%.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Confidence Score</span>
              <span className="text-white font-bold text-lg">{summary.confidenceScore.toFixed(1)}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active Anomalies</span>
              <span className="text-[#10b981] font-bold text-lg">{summary.anomalies.length} Found</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-80 bg-[#0f172a] rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Info size={16} className="text-[#10b981]" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Audit Context</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-[10px] font-bold">AVG COST / DAY</p>
              <p className="text-white font-black text-xl">₹{(summary.estimatedCost / Math.max(1, (summary.endDate.getTime() - summary.startDate.getTime()) / (1000 * 3600 * 24))).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] font-bold">PEAK LOAD INTENSITY</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${summary.peakLoadIntensity === 'High' ? 'bg-orange-500 w-3/4' :
                      summary.peakLoadIntensity === 'Medium' ? 'bg-yellow-500 w-1/2' : 'bg-[#10b981] w-1/4'
                    }`}></div>
                </div>
                <span className={`${summary.peakLoadIntensity === 'High' ? 'text-orange-500' :
                    summary.peakLoadIntensity === 'Medium' ? 'text-yellow-500' : 'text-[#10b981]'
                  } text-xs font-bold`}>{summary.peakLoadIntensity}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f172a] p-8 rounded-[40px] border border-slate-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-[#10b981]/10 rounded-2xl text-[#10b981]">
            <Sparkles size={28} />
          </div>
          <div>
            <h3 className="text-white text-xl font-bold">AI Analysis Summary</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Based on latest dataset trends</p>
          </div>
        </div>

        <p className="text-slate-400 font-medium leading-relaxed mb-10 max-w-4xl">
          Our AI has analyzed your energy consumption patterns and identified key insights that could help you save up to <span className="text-[#10b981] font-bold">₹{summary.potentialSavings.toFixed(0)} per month</span>. Your efficiency score of {summary.efficiencyScore}/100 indicates energy management status.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#060b13]/50 p-6 rounded-3xl border border-slate-800/50">
            <h4 className="text-3xl font-black text-[#10b981] mb-1">{summary.efficiencyScore}</h4>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Efficiency Score</p>
          </div>
          <div className="bg-[#060b13]/50 p-6 rounded-3xl border border-slate-800/50">
            <h4 className="text-3xl font-black text-[#10b981] mb-1">₹{summary.potentialSavings.toFixed(0)}</h4>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Monthly Savings Potential</p>
          </div>
          <div className="bg-[#060b13]/50 p-6 rounded-3xl border border-slate-800/50">
            <h4 className={`text-3xl font-black mb-1 ${summary.performanceVariance > 0 ? 'text-red-400' : 'text-[#10b981]'}`}>
              {summary.performanceVariance > 0 ? '+' : ''}{summary.performanceVariance.toFixed(1)}%
            </h4>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Performance Variance</p>
          </div>
        </div>
      </section>

      <ForecastChart historicalData={summary.monthlyDistribution} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { icon: Clock, title: 'Peak Usage Pattern Detected', badge: 'Efficiency Alert', desc: 'Your highest consumption occurs during evening peaks. Consider pre-cooling/heating before these hours.' },
          { icon: Thermometer, title: 'HVAC Efficiency Opportunity', badge: '₹' + (summary.potentialSavings * 0.4).toFixed(0) + ' potential', desc: 'HVAC optimization detected. A 2°C thermostat adjustment could yield significant savings based on current load.' },
          { icon: Zap, title: 'Standby Power Drain', badge: 'Audit Findings', desc: 'A percentage of your baseline consumption comes from devices in standby mode. Smart power strips are recommended.' },
          { icon: TrendingUp, title: 'Consumption Trend Analysis', badge: 'Strategic Trend', desc: 'Energy usage patterns show significant seasonal variance. Neural models suggest proactive adjustments for next month.' }
        ].map((item, i) => (
          <div key={i} className="bg-[#0f172a] p-8 rounded-[32px] border border-slate-800/50 group hover:border-[#10b981]/30 transition-all">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-slate-900 rounded-2xl text-slate-400 group-hover:text-[#10b981] transition-colors">
                <item.icon size={24} />
              </div>
              <span className="bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                {item.badge}
              </span>
            </div>
            <h4 className="text-white text-lg font-bold mb-3">{item.title}</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <AnnualCostChart data={summary.monthlyDistribution} />
    </div>
  );
};

export default InsightsView;
