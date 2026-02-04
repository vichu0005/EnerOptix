
import React from 'react';
import { Download, Calendar, BarChart3, TrendingUp, PieChart, Sparkles } from 'lucide-react';
import { DatasetSummary } from '../types';

interface ReportsViewProps {
  summary: DatasetSummary;
}

const ReportsView: React.FC<ReportsViewProps> = ({ summary }) => {
  const generateReportContent = (title: string) => {
    const dateStr = new Date().toLocaleDateString();
    return `
ENERGY OPTIMIZE AI AUDIT REPORT
-------------------------------
Report Title: ${title}
Generated On: ${dateStr}
Analysis Engine: Gemini-3-Flash-Neural-v4

EXECUTIVE SUMMARY
-----------------
Facility consumption has been analyzed for the period ${summary.startDate.toLocaleDateString()} to ${summary.endDate.toLocaleDateString()}.
Overall efficiency score: ${summary.efficiencyScore}/100.

METRICS OVERVIEW
----------------
- Total Consumption: ${summary.totalConsumption.toLocaleString()} kWh
- Average Daily Load: ${summary.avgDailyConsumption.toFixed(2)} kWh
- Estimated Operational Cost: ₹${summary.estimatedCost.toLocaleString()}
- Potential Savings Opportunity: ₹${summary.potentialSavings.toLocaleString()}

AI FORENSIC ANALYSIS
--------------------
- HVAC Load: ${summary.categoryTotals.hvac.toFixed(2)} kWh
- Lighting Load: ${summary.categoryTotals.lighting.toFixed(2)} kWh
- Appliances Load: ${summary.categoryTotals.appliances.toFixed(2)} kWh
- Electronics Load: ${summary.categoryTotals.electronics.toFixed(2)} kWh

NEURAL FINDINGS & RECOMMENDATIONS
---------------------------------
1. Peak surge synchronization detected at ${summary.peakConsumption.value.toFixed(2)} kWh.
2. Anomaly clusters identified: ${summary.anomalies.length} significant deviations.
3. Strategic Recommendation: Implement load shifting for high-draw machinery to reduce peak costs by ₹${(summary.potentialSavings * 0.4).toFixed(0)}.

[End of AI Analysis]
    `.trim();
  };

  const handleDownload = (title: string, format: 'PDF' | 'DOCS') => {
    const content = generateReportContent(title);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Using extensions requested by user
    const extension = format === 'PDF' ? '.pdf' : '.docx';
    link.download = `${title.replace(/\s+/g, '_')}_Neural_Audit${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="text-4xl font-black tracking-tighter text-white">AI-Analyzed Reports</h2>
        <p className="text-slate-500 font-medium">Download neural audits and energy performance assessments in your preferred format.</p>
      </div>

      <section className="bg-[#0f172a] p-10 rounded-[40px] border border-slate-800/50 shadow-sm">
        <h3 className="text-white text-xl font-bold mb-10">Period Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-2">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Consumption</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white tracking-tight">{summary.totalConsumption.toLocaleString()}</span>
              <span className="text-slate-500 text-sm font-bold">kWh</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Period Cost</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white tracking-tight">₹{summary.estimatedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Efficiency Opp.</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#10b981] tracking-tight">₹{summary.potentialSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Audit Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#10b981] tracking-tight">{summary.efficiencyScore}/100</span>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Neural Intelligence Reports</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#10b981]/10 rounded-full border border-[#10b981]/20">
             <Sparkles size={14} className="text-[#10b981]" />
             <span className="text-[10px] font-black text-[#10b981] uppercase tracking-widest">AI Audit Active</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              icon: Calendar, 
              title: 'Executive Summary Audit', 
              desc: 'AI-generated high-level overview of facility performance and critical efficiency trends.', 
              size: 'PDF / DOCS' 
            },
            { 
              icon: BarChart3, 
              title: 'Neural Pattern Breakdown', 
              desc: 'Detailed forensic audit of consumption fingerprints and peak load synchronization.', 
              size: 'PDF / DOCS' 
            },
            { 
              icon: TrendingUp, 
              title: 'Optimization Roadmap', 
              desc: 'Sequenced implementation plan for energy saving recommendations based on AI findings.', 
              size: 'PDF / DOCS' 
            },
            { 
              icon: PieChart, 
              title: 'Sustainability Impact Audit', 
              desc: 'Environmental assessment and resource allocation breakdown analyzed from your consumption data.', 
              size: 'PDF / DOCS' 
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0f172a] p-8 rounded-[32px] border border-slate-800/50 flex flex-col sm:flex-row items-start gap-6 group hover:border-[#10b981]/30 transition-all">
              <div className="p-4 bg-slate-900 rounded-2xl text-[#10b981]">
                <item.icon size={24} />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                   <button 
                    onClick={() => handleDownload(item.title, 'PDF')}
                    className="flex items-center gap-2 bg-[#060b13] px-4 py-2 rounded-xl text-slate-300 hover:text-[#10b981] hover:bg-[#10b981]/5 transition-all text-xs font-black uppercase tracking-widest border border-slate-800"
                   >
                      <Download size={14} /> PDF
                   </button>
                   <button 
                    onClick={() => handleDownload(item.title, 'DOCS')}
                    className="flex items-center gap-2 bg-[#060b13] px-4 py-2 rounded-xl text-slate-300 hover:text-blue-400 hover:bg-blue-400/5 transition-all text-xs font-black uppercase tracking-widest border border-slate-800"
                   >
                      <Download size={14} /> DOCS
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
