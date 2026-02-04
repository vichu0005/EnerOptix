
import React, { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Upload, Lightbulb, FileText, Settings, Zap, User, LogOut, ChevronDown, Activity, Database } from 'lucide-react';
import { DataSourceMode } from '../types';

interface DashboardHeaderProps {
  onReset: () => void;
  fileName: string;
  activeTab: 'dashboard' | 'insights' | 'reports';
  setActiveTab: (tab: 'dashboard' | 'insights' | 'reports') => void;
  mode: DataSourceMode;
  onModeToggle: (mode: DataSourceMode) => void;
  hasBothData?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onReset,
  fileName,
  activeTab,
  setActiveTab,
  mode,
  onModeToggle,
  hasBothData = false
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#0b121d] border-b border-slate-800 sticky top-0 z-50 px-6 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-[#10b981] p-1.5 rounded-lg text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Zap size={20} fill="currentColor" />
            </div>
            <h1 className="font-bold text-lg text-white tracking-tight">Ener<span className="text-[#10b981]">Optix</span></h1>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'dashboard' ? 'text-[#10b981] bg-[#10b981]/10' : 'text-slate-400 hover:text-white'
                }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
            {/* Show Data Center only in Historical (static) dashboard mode */}
            {mode === 'static' && (
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                <Upload size={18} />
                Data Center
              </button>
            )}
            <button
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'insights' ? 'text-[#10b981] bg-[#10b981]/10' : 'text-slate-400 hover:text-white'
                }`}
            >
              <Lightbulb size={18} />
              Insights
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'reports' ? 'text-[#10b981] bg-[#10b981]/10' : 'text-slate-400 hover:text-white'
                }`}
            >
              <FileText size={18} />
              Reports
            </button>
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-4 bg-[#0f172a] p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onModeToggle('live')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${mode === 'live' ? 'bg-[#10b981] text-[#060b13]' : 'text-slate-500 hover:text-slate-300'
              }`}
          >
            <Activity size={12} />
            Live View
          </button>
          <button
            onClick={() => onModeToggle('static')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${mode === 'static' ? 'bg-[#10b981] text-[#060b13]' : 'text-slate-500 hover:text-slate-300'
              }`}
          >
            <Database size={12} />
            Historical
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right mr-4 border-r border-slate-800 pr-4">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Source Stream
            </p>
            <p className="text-xs text-slate-300 font-bold max-w-[150px] truncate">
              {mode === 'live' ? 'Real-Time Telemetry' : (fileName || 'Static Audit')}
            </p>
          </div>

          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`flex items-center gap-2 p-2 rounded-xl transition-all ${isSettingsOpen ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            >
              <Settings size={20} className={isSettingsOpen ? 'animate-spin-slow' : ''} />
              <ChevronDown size={14} className={`transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSettingsOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-slate-800 mb-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">User Settings</p>
                  <p className="text-sm font-bold text-white truncate">you@example.com</p>
                </div>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                  <User size={18} className="text-slate-500" />
                  My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                  <Activity size={18} className="text-slate-500" />
                  Active: {mode === 'live' ? 'Live Telemetry' : 'File Audit'}
                </button>

                <div className="h-px bg-slate-800 my-2 mx-2"></div>

                <button
                  onClick={() => window.location.reload()}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
