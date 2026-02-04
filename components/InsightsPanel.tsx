
import React from 'react';
import { Sparkles, Clock, Thermometer, Zap } from 'lucide-react';

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium';
  savings: string;
  icon: any;
}

const recommendations: AIRecommendation[] = [
  {
    id: '1',
    title: 'Shift Heavy Loads to Off-Peak Hours',
    description: 'Running high-consumption appliances between 10 PM - 6 AM could save up to 23% on your energy bill.',
    impact: 'high',
    savings: '₹3,200/month',
    icon: Clock
  },
  {
    id: '2',
    title: 'HVAC Optimization Detected',
    description: 'Your cooling system runs 15% more than average. Consider adjusting thermostat by 2°C during peak hours.',
    impact: 'high',
    savings: '₹4,500/month',
    icon: Thermometer
  },
  {
    id: '3',
    title: 'Phantom Load Alert',
    description: 'Standby power consumption detected. Smart power strips could eliminate 8% of baseline usage.',
    impact: 'medium',
    savings: '₹1,200/month',
    icon: Zap
  }
];

const InsightsPanel: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter">AI Recommendations</h2>
          <p className="text-slate-500 font-medium">Personalized suggestions to optimize your energy usage</p>
        </div>
        <div className="flex items-center gap-2 text-[#10b981] font-bold text-sm">
          <div className="flex -space-x-1">
             <div className="w-5 h-5 rounded-full border-2 border-[#060b13] bg-[#10b981]/20 flex items-center justify-center">
                <Sparkles size={10} />
             </div>
          </div>
          <span>5 opportunities found</span>
        </div>
      </div>

      {/* Recommendations Summary */}
      <div className="bg-[#10b981]/5 border border-[#10b981]/20 rounded-3xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="text-[#10b981]" size={20} />
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Strategy Summary</h4>
        </div>
        <p className="text-slate-400 text-sm font-medium leading-relaxed">
          Based on our neural audit, your facility exhibits significant high-load density during afternoon peaks. By implementing automated load-shifting for heavy appliances and optimizing your HVAC schedule, you can achieve a projected savings of over <span className="text-[#10b981] font-bold">₹8,900</span> monthly while improving your overall efficiency score by 12 points.
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className="group relative bg-[#0f172a] border border-slate-800/50 rounded-3xl p-6 transition-all hover:border-[#10b981]/30 hover:shadow-lg hover:shadow-[#10b981]/5 overflow-hidden"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 bg-slate-900 rounded-2xl text-slate-400 group-hover:text-[#10b981] transition-colors">
                <rec.icon size={24} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-bold text-lg">{rec.title}</h4>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    rec.impact === 'high' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {rec.impact} impact
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl">
                  {rec.description}
                </p>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2 text-[#10b981] font-bold text-sm">
                    <Sparkles size={16} />
                    <span>Save {rec.savings}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-[#10b981]/10 transition-colors"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InsightsPanel;
