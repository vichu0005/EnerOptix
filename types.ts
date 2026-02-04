
export interface EnergyRecord {
  timestamp: Date;
  hvac: number;
  lighting: number;
  appliances: number;
  electronics: number;
  total: number;
}

export interface HourlyData {
  time: string;
  value: number;
  type: 'low' | 'normal' | 'peak';
}

export interface MonthlyData {
  name: string;
  consumption: number;
  cost: number;
}

export interface Anomaly {
  date: string;
  description: string;
}

export type DataSourceMode = 'static' | 'live';

export interface DatasetSummary {
  startDate: Date;
  endDate: Date;
  totalConsumption: number;
  avgDailyConsumption: number;
  peakConsumption: {
    value: number;
    date: Date;
  };
  categoryTotals: {
    hvac: number;
    lighting: number;
    appliances: number;
    electronics: number;
  };
  efficiencyScore: number;
  hourlyDistribution: HourlyData[];
  monthlyDistribution: MonthlyData[];
  anomalies: Anomaly[];
  estimatedCost: number;
  potentialSavings: number;
  mode: DataSourceMode;
  consumptionTrend: number;
  costTrend: number;
  confidenceScore: number;
  peakLoadIntensity: 'Low' | 'Medium' | 'High';
  performanceVariance: number;
}

export interface AIInsight {
  title: string;
  description: string;
  type: 'optimization' | 'anomaly' | 'forecast';
}
