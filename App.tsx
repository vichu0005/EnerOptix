
import React, { useState, useCallback, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  Zap, TrendingUp, IndianRupee, ArrowDown,
  Activity, Database
} from 'lucide-react';
import EmptyState from './components/EmptyState';
import DashboardHeader from './components/DashboardHeader';
import KPICard from './components/KPICard';
import ChartsSection from './components/ChartsSection';
import InsightsPanel from './components/InsightsPanel';
import EfficiencyScore from './components/EfficiencyScore';
import PeakHoursChart from './components/PeakHoursChart';
import DeviceBreakdown from './components/DeviceBreakdown';
import AnomalySection from './components/AnomalySection';
import InsightsView from './components/InsightsView';
import ReportsView from './components/ReportsView';
import LoginPage from './components/LoginPage';
import { EnergyRecord, DatasetSummary, DataSourceMode } from './types';
import { processRawData, generateSummary } from './utils/dataProcessor';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [staticData, setStaticData] = useState<EnergyRecord[]>([]);
  const [liveData, setLiveData] = useState<EnergyRecord[]>([]);

  const [summary, setSummary] = useState<DatasetSummary | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConnectingLive, setIsConnectingLive] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'insights' | 'reports'>('dashboard');
  const [mode, setMode] = useState<DataSourceMode>('live');

  const liveIntervalRef = useRef<number | null>(null);

  const startLiveMonitoring = useCallback(() => {
    setIsConnectingLive(true);
    setMode('live');

    setTimeout(() => {
      setIsConnectingLive(false);

      setLiveData([{
        timestamp: new Date(),
        hvac: 1, lighting: 0.5, appliances: 0.5, electronics: 0.5, total: 2.5
      }]);

      liveIntervalRef.current = window.setInterval(() => {
        const now = new Date();
        const base = 2.0 + Math.random() * 3.0;
        const newRecord: EnergyRecord = {
          timestamp: now,
          hvac: base * 0.4,
          lighting: base * 0.2,
          appliances: base * 0.25,
          electronics: base * 0.15,
          total: base
        };

        setLiveData(prev => {
          const updated = [...prev, newRecord].slice(-100);
          return updated;
        });
      }, 3000);
    }, 1500);
  }, []);

  useEffect(() => {
    const activeData = mode === 'live' ? liveData : staticData;
    if (activeData.length > 0) {
      try {
        const genSummary = generateSummary(activeData, mode);
        setSummary(genSummary);
      } catch (e) {
        console.error("Summary error:", e);
      }
    } else {
      setSummary(null);
    }
  }, [liveData, staticData, mode]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const bstr = e.target?.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });

        const processed = processRawData(jsonData);
        if (processed.length === 0) {
          alert('Could not find valid energy data in the file.');
          setIsLoading(false);
          return;
        }

        setStaticData(processed);
        setMode('static');
        setActiveTab('dashboard');
        // Fixed typo: removed extra closing parenthesis from catch parameter
      } catch (error) {
        console.error("Upload error:", error);
        alert('Error processing file.');
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  }, []);

  const handleReset = () => {
    if (liveIntervalRef.current) {
      clearInterval(liveIntervalRef.current);
      liveIntervalRef.current = null;
    }
    setLiveData([]);
    setStaticData([]);
    setSummary(null);
    setFileName('');
    setActiveTab('dashboard');
    setIsConnectingLive(false);
    setMode('live');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const currentData = mode === 'live' ? liveData : staticData;
  if (currentData.length === 0 && !summary) {
    return (
      <EmptyState
        onFileUpload={handleFileUpload}
        onLiveConnect={startLiveMonitoring}
        isLoading={isLoading}
        isConnectingLive={isConnectingLive}
      />
    );
  }

  const renderContent = () => {
    if (!summary) return null;

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-black tracking-tighter">
                    {mode === 'live' ? 'Live Telemetry' : 'Facility Audit'}
                  </h2>
                  <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${mode === 'live' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                    {mode === 'live' ? 'Real-Time' : 'Historical'}
                  </div>
                </div>
                <p className="text-slate-500 font-medium max-w-lg">
                  {mode === 'live'
                    ? "Currently visualizing active grid consumption from connected sensors."
                    : "Reviewing aggregated historical performance from uploaded dataset."}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Analytics Engine</p>
                  <p className="text-xs text-white font-bold">{mode === 'live' ? 'Stream Processing' : 'Deep Neural Audit'}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-800 ${mode === 'live' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-slate-900 text-slate-500'}`}>
                  {mode === 'live' ? <Activity size={24} className="animate-pulse" /> : <Database size={24} />}
                </div>
              </div>
            </div>

            <section className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${mode === 'live' ? '3' : '4'} gap-6`}>
              <KPICard
                title="Total Consumption"
                value={summary.totalConsumption.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                subtitle={mode === 'live' ? 'Rolling Window Total' : 'Cumulative Audit Total'}
                icon={Zap}
                trend={mode === 'static' ? `${summary.consumptionTrend > 0 ? '+' : ''}${summary.consumptionTrend.toFixed(1)}%` : undefined}
                color="bg-[#10b981]"
                isLivePulse={mode === 'live'}
              />
              <KPICard
                title={mode === 'live' ? "Latest Metering" : "Average Usage"}
                value={mode === 'live' ? (currentData[currentData.length - 1]?.total.toFixed(2) || '0') : summary.avgDailyConsumption.toFixed(2)}
                subtitle={mode === 'live' ? 'Near-real-time sensor data' : 'Daily average for period'}
                icon={Activity}
                color="bg-[#10b981]"
                isLivePulse={mode === 'live'}
              />
              <KPICard
                title={mode === 'live' ? "Operational Cost" : "Monthly Cost"}
                value={`₹${summary.estimatedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                subtitle="Based on utility tariffs"
                icon={IndianRupee}
                trend={mode === 'static' ? `${summary.costTrend > 0 ? '+' : ''}${summary.costTrend.toFixed(1)}%` : undefined}
                color="bg-[#10b981]"
              />
              {mode === 'static' && (
                <KPICard
                  title="Potential Savings"
                  value={`₹${summary.potentialSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                  subtitle="Optimization Opportunity"
                  icon={ArrowDown}
                  color="bg-[#10b981]"
                />
              )}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChartsSection records={currentData} isLive={mode === 'live'} />
              </div>
              <div>
                <EfficiencyScore score={summary.efficiencyScore} totalConsumption={summary.totalConsumption} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PeakHoursChart data={summary.hourlyDistribution} />
              <DeviceBreakdown categoryTotals={summary.categoryTotals} total={summary.totalConsumption} />
            </div>

            <div className="max-w-5xl mx-auto w-full pt-10">
              <AnomalySection anomalies={summary.anomalies} />
              <InsightsPanel />
            </div>
          </div>
        );
      case 'insights':
        return <InsightsView summary={summary} />;
      case 'reports':
        return <ReportsView summary={summary} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#060b13] flex flex-col text-white pb-20">
      <DashboardHeader
        onReset={handleReset}
        fileName={fileName}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mode={mode}
        onModeToggle={setMode}
      />

      <main className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto w-full">
        {renderContent()}
      </main>

      <footer className="py-10 px-8 border-t border-slate-800/50 bg-[#060b13] mt-20">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <Zap size={16} className="text-[#10b981]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">
              {mode === 'live' ? 'Edge-Stream AI v4.0' : 'Audit-Neural Engine v2.1'}
            </span>
          </div>
          <div className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
            Separated Dashboard Architecture • Enterprise Grade Security
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
