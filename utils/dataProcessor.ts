
import { EnergyRecord, DatasetSummary, HourlyData, Anomaly, DataSourceMode, MonthlyData } from '../types';

export const processRawData = (data: any[]): EnergyRecord[] => {
  return data
    .map((row) => {
      const findValue = (keys: string[]) => {
        const foundKey = Object.keys(row).find((k) =>
          keys.some((search) => k.toLowerCase().includes(search.toLowerCase()))
        );
        return foundKey ? parseFloat(row[foundKey]) || 0 : 0;
      };

      const dateKey = Object.keys(row).find((k) =>
        ['date', 'time', 'timestamp'].some((search) => k.toLowerCase().includes(search))
      );

      const timestamp = dateKey ? new Date(row[dateKey]) : null;
      if (!timestamp || isNaN(timestamp.getTime())) return null;

      const hvac = findValue(['hvac', 'heating', 'cooling', 'ac']);
      const lighting = findValue(['lighting', 'light', 'illumination']);
      const appliances = findValue(['appliance', 'kitchen', 'laundry', 'washer', 'dryer', 'oven']);
      const electronics = findValue(['electronic', 'computer', 'tv', 'plug', 'socket']);
      const total = findValue(['total', 'consumption', 'usage', 'energy', 'value', 'kwh', 'power']);

      const calculatedTotal = total > 0 ? total : (hvac + lighting + appliances + electronics);

      return {
        timestamp,
        hvac,
        lighting,
        appliances,
        electronics,
        total: calculatedTotal
      };
    })
    .filter((record): record is EnergyRecord => record !== null)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

export const generateSummary = (records: EnergyRecord[], mode: DataSourceMode = 'static'): DatasetSummary => {
  if (records.length === 0) throw new Error('No valid records found');

  const totalConsumption = records.reduce((acc, curr) => acc + curr.total, 0);
  const categoryTotals = records.reduce(
    (acc, curr) => ({
      hvac: acc.hvac + curr.hvac,
      lighting: acc.lighting + curr.lighting,
      appliances: acc.appliances + curr.appliances,
      electronics: acc.electronics + curr.electronics,
    }),
    { hvac: 0, lighting: 0, appliances: 0, electronics: 0 }
  );

  const peak = records.reduce((prev, curr) => (curr.total > prev.total ? curr : prev), records[0]);

  const diffDays = Math.max(0.1, (
    (records[records.length - 1].timestamp.getTime() - records[0].timestamp.getTime()) / (1000 * 3600 * 24)
  ));

  const avgDailyConsumption = totalConsumption / (diffDays || 1);

  // Hourly Distribution
  const hourlyBuckets: { [key: string]: number[] } = {};
  for (let i = 0; i < 24; i += 2) {
    hourlyBuckets[`${i.toString().padStart(2, '0')}:00`] = [];
  }
  records.forEach(r => {
    const hour = r.timestamp.getHours();
    const bucketKey = `${(Math.floor(hour / 2) * 2).toString().padStart(2, '0')}:00`;
    if (hourlyBuckets[bucketKey]) hourlyBuckets[bucketKey].push(r.total);
  });
  const hourlyDistribution: HourlyData[] = Object.keys(hourlyBuckets).map(time => {
    const vals = hourlyBuckets[time];
    const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    return { time, value: avg, type: 'normal' };
  });
  const maxHourly = Math.max(...hourlyDistribution.map(h => h.value));
  const minHourly = Math.min(...hourlyDistribution.map(h => h.value));
  hourlyDistribution.forEach(h => {
    if (h.value > maxHourly * 0.85) h.type = 'peak';
    else if (h.value < minHourly * 1.25) h.type = 'low';
  });

  // Monthly Distribution
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyBuckets: { [key: string]: number } = {};
  records.forEach(r => {
    const monthName = months[r.timestamp.getMonth()];
    monthlyBuckets[monthName] = (monthlyBuckets[monthName] || 0) + r.total;
  });
  const monthlyDistribution: MonthlyData[] = Object.keys(monthlyBuckets).map(name => ({
    name,
    consumption: monthlyBuckets[name],
    cost: monthlyBuckets[name] * 0.12
  }));

  const baseline = minHourly;
  const variance = maxHourly - minHourly;
  const score = Math.max(0, Math.min(100, 100 - (variance / (avgDailyConsumption / 12 || 1) * 50)));

  const mean = totalConsumption / records.length;
  const stdDev = Math.sqrt(records.reduce((s, r) => s + Math.pow(r.total - mean, 2), 0) / records.length);
  const anomalies: Anomaly[] = records
    .filter(r => r.total > mean + 2.5 * stdDev)
    .slice(-2)
    .map(r => ({
      date: r.timestamp.toLocaleDateString() + ' ' + r.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: `Unusual ${((r.total / mean - 1) * 100).toFixed(0)}% spike detected`
    }));

  const estimatedCost = totalConsumption * 0.12;
  const potentialSavings = (variance * 0.2 + baseline * 0.1) * (diffDays || 1);

  return {
    startDate: records[0].timestamp,
    endDate: records[records.length - 1].timestamp,
    totalConsumption,
    avgDailyConsumption,
    peakConsumption: {
      value: peak.total,
      date: peak.timestamp,
    },
    categoryTotals,
    efficiencyScore: Math.round(score),
    hourlyDistribution,
    monthlyDistribution,
    anomalies,
    estimatedCost,
    potentialSavings,
    mode,
    consumptionTrend: calculateTrend(records),
    costTrend: calculateTrend(records), // Assuming cost is proportional to consumption for now
    confidenceScore: Math.min(99.9, Math.max(70, 100 - (stdDev / mean * 20))),
    peakLoadIntensity: maxHourly > avgDailyConsumption / 24 * 1.5 ? 'High' : maxHourly > avgDailyConsumption / 24 * 1.2 ? 'Medium' : 'Low',
    performanceVariance: ((totalConsumption - (baseline * 24 * (diffDays || 1))) / totalConsumption) * 100
  };
};

const calculateTrend = (records: EnergyRecord[]): number => {
  if (records.length < 2) return 0;
  const midpoint = Math.floor(records.length / 2);
  const firstHalf = records.slice(0, midpoint);
  const secondHalf = records.slice(midpoint);

  const avgFirst = firstHalf.reduce((a, b) => a + b.total, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((a, b) => a + b.total, 0) / secondHalf.length;

  if (avgFirst === 0) return 100;
  return ((avgSecond - avgFirst) / avgFirst) * 100;
};
