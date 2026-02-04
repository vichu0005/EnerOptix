
import React, { useState } from 'react';
import { Upload, FileText, LayoutDashboard, Lightbulb, Settings, Zap, ChevronDown, Activity, ArrowRight, Database, Globe } from 'lucide-react';

interface EmptyStateProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLiveConnect: () => void;
  isLoading: boolean;
  isConnectingLive: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onFileUpload, onLiveConnect, isLoading, isConnectingLive }) => {
  const [activeMode, setActiveMode] = useState<'live' | 'static'>('live');

  return (
    <div className="min-h-screen bg-[#060b13] text-white flex flex-col">
      {/* Header Mockup for Consistency */}
      <header className="bg-[#0b121d] border-b border-slate-800 px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-[#10b981] p-1.5 rounded-lg text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Zap size={20} fill="currentColor" />
              </div>
              <h1 className="font-bold text-lg text-white tracking-tight">Energy<span className="text-[#10b981]">Optimize</span></h1>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                <LayoutDashboard size={18} />
                Dashboard
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#10b981] bg-[#10b981]/10 rounded-lg">
                <Upload size={18} />
                Data Center
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                <Lightbulb size={18} />
                Insights
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                <FileText size={18} />
                Reports
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all">
                <Settings size={20} />
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Switcher and Branding */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full">
                <Globe size={14} className="text-[#10b981]" />
                <span className="text-[10px] font-black text-[#10b981] uppercase tracking-widest">Global Intelligence Active</span>
              </div>
              <h2 className="text-6xl font-black tracking-tighter leading-[0.9]">
                Choose Your <br />
                <span className="text-slate-500">Dashboard</span>
              </h2>
              <p className="text-slate-400 font-medium text-lg max-w-sm leading-relaxed">
                Connect to a live telemetry stream or upload historical audit files for deep neural analysis.
              </p>
            </div>

            {/* Sliding Toggle Component */}
            <div className="bg-[#0f172a] p-1.5 rounded-2xl border border-slate-800 flex items-center relative w-fit shadow-2xl">
              <button 
                onClick={() => setActiveMode('live')}
                className={`relative z-10 flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeMode === 'live' ? 'text-[#060b13]' : 'text-slate-500 hover:text-white'}`}
              >
                <Activity size={16} />
                Live Stream
              </button>
              <button 
                onClick={() => setActiveMode('static')}
                className={`relative z-10 flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeMode === 'static' ? 'text-[#060b13]' : 'text-slate-500 hover:text-white'}`}
              >
                <Database size={16} />
                Historical
              </button>
              
              {/* Slider Background */}
              <div 
                className={`absolute top-1.5 bottom-1.5 rounded-xl transition-all duration-500 ease-out bg-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.4)] ${
                  activeMode === 'live' ? 'left-1.5 w-[140px]' : 'left-[148px] w-[140px]'
                }`}
              />
            </div>
          </div>

          {/* Right Column: Interaction Zone */}
          <div className="lg:col-span-7 relative min-h-[460px] flex items-center">
            {activeMode === 'live' ? (
              <div key="live-panel" className="animate-in fade-in slide-in-from-right-8 duration-500 w-full">
                <div 
                  onClick={!isLoading && !isConnectingLive ? onLiveConnect : undefined}
                  className={`
                    group relative flex flex-col items-center justify-center w-full h-[460px] border-2 border-slate-800 rounded-[56px] cursor-pointer
                    transition-all duration-500 overflow-hidden bg-[#0f172a]/20 hover:border-[#10b981]/50 hover:bg-[#10b981]/5 shadow-2xl
                    ${isConnectingLive ? 'cursor-not-allowed opacity-80' : ''}
                  `}
                >
                  {isConnectingLive ? (
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-[#10b981]/10 border-t-[#10b981] rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-4 h-4 bg-[#10b981] rounded-full animate-pulse shadow-[0_0_15px_#10b981]"></div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 font-black uppercase tracking-[0.4em]">Initializing Stream...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center p-12">
                      <div className="p-8 bg-slate-900 rounded-[36px] mb-8 group-hover:scale-105 group-hover:bg-[#10b981] group-hover:text-[#060b13] transition-all duration-500 text-[#10b981]">
                        <Activity size={56} />
                      </div>
                      <h3 className="text-3xl text-white font-black mb-4 tracking-tighter">Connect IoT Engine</h3>
                      <p className="text-slate-500 font-medium mb-10 max-w-sm">Tap to ingest real-time MQTT/WebSocket telemetry from your smart meters.</p>
                      <div className="flex items-center gap-3 bg-[#10b981] px-10 py-4 rounded-3xl text-[#060b13] font-black text-xs uppercase tracking-widest hover:bg-[#0da06f] transition-all shadow-2xl shadow-[#10b981]/20">
                        Launch Live View <ArrowRight size={18} />
                      </div>
                    </div>
                  )}
                  {/* Neural Background Effect */}
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#10b981]/10 rounded-full blur-[80px] group-hover:bg-[#10b981]/20 transition-all"></div>
                </div>
              </div>
            ) : (
              <div key="static-panel" className="animate-in fade-in slide-in-from-right-8 duration-500 w-full">
                <label className={`
                  group relative flex flex-col items-center justify-center w-full h-[460px] border-2 border-dashed border-slate-800 rounded-[56px] cursor-pointer
                  transition-all duration-500 bg-[#0f172a]/20 hover:border-[#10b981]/50 hover:bg-[#10b981]/5 shadow-2xl
                  ${isLoading ? 'cursor-not-allowed opacity-80' : ''}
                `}>
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-16 h-16 border-4 border-[#10b981]/10 border-t-[#10b981] rounded-full animate-spin"></div>
                      <p className="text-sm text-slate-400 font-black uppercase tracking-[0.4em]">Decoding Analysis...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center p-12">
                      <div className="p-8 bg-slate-900 rounded-[36px] mb-8 group-hover:scale-105 group-hover:bg-[#10b981] group-hover:text-[#060b13] transition-all duration-500 text-slate-400">
                        <Database size={56} />
                      </div>
                      <h3 className="text-3xl text-white font-black mb-4 tracking-tighter">Audit Dataset</h3>
                      <p className="text-slate-500 font-medium mb-10 max-w-sm">Drop your historical CSV, Excel, or JSON files here for a full forensic audit.</p>
                      
                      <div className="flex items-center gap-4">
                        {['CSV', 'XLSX', 'JSON'].map(ext => (
                          <span key={ext} className="text-[10px] font-black border border-slate-800 px-4 py-2 rounded-xl text-slate-500 group-hover:border-slate-700 transition-colors">{ext}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".csv,.xls,.xlsx" 
                    onChange={onFileUpload}
                    disabled={isLoading || isConnectingLive}
                  />
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-all"></div>
                </label>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 px-8 text-center border-t border-slate-800/20">
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
          Secure Local Sandbox • Distributed Grid Intelligence • Precision Tier Active
        </p>
      </footer>
    </div>
  );
};

export default EmptyState;
