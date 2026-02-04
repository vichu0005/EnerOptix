
import React from 'react';

interface EfficiencyScoreProps {
  score: number;
  totalConsumption: number;
}

const EfficiencyScore: React.FC<EfficiencyScoreProps> = ({ score, totalConsumption }) => {
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getStatus = (s: number) => {
    if (s > 80) return 'Excellent';
    if (s > 60) return 'Good';
    if (s > 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800/50 flex flex-col items-center justify-center relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#10b981]/30"></div>
      <h3 className="text-white text-lg font-bold mb-1 self-start">Efficiency Score</h3>
      <p className="text-slate-500 text-xs font-medium mb-8 self-start">AI-powered energy rating</p>
      
      <div className="relative flex items-center justify-center w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-slate-800"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-[#10b981]"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-5xl font-bold text-white tracking-tighter">{score}</span>
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">out of 100</span>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <span className="text-[#10b981] font-bold text-lg">{getStatus(score)}</span>
      </div>

      <div className="w-full mt-10 pt-6 border-t border-slate-800/50">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest text-center">Optimization potential detected in HVAC & Lighting sectors</p>
      </div>
    </div>
  );
};

export default EfficiencyScore;
