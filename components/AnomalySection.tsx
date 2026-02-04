
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Anomaly } from '../types';

interface AnomalySectionProps {
  anomalies: Anomaly[];
}

const AnomalySection: React.FC<AnomalySectionProps> = ({ anomalies }) => {
  if (anomalies.length === 0) return null;

  return (
    <div className="bg-[#1a1c2e]/40 border-l-4 border-amber-500 p-6 rounded-r-2xl rounded-l-md mb-8">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
          <AlertTriangle size={24} />
        </div>
        <div className="space-y-2">
          <h4 className="text-white font-bold text-lg">Anomalies Detected</h4>
          <div className="space-y-1">
            {anomalies.map((a, i) => (
              <p key={i} className="text-sm text-slate-300">
                <span className="font-bold text-slate-100">{a.date}:</span> {a.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalySection;
