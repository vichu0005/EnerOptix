
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validation would happen here
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#060b13] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10b981]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-10 relative group">
        <div className="relative">
          <div className="absolute inset-0 bg-[#10b981] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="bg-[#0b121d] p-3 rounded-2xl border border-slate-800 relative shadow-2xl">
            <Zap className="text-[#10b981]" size={32} fill="currentColor" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Ener<span className="text-[#10b981]">Optix</span>
        </h1>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[480px] bg-[#0b121d] border border-slate-800/50 rounded-[32px] p-10 md:p-12 shadow-2xl relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Welcome Back</h2>
          <p className="text-slate-500 font-medium">Sign in to access your energy dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#10b981] transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#060b13] border border-slate-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/20 transition-all placeholder:text-slate-600 font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#10b981] transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#060b13] border border-slate-800 text-white rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/20 transition-all placeholder:text-slate-600 font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm font-bold text-[#10b981] hover:text-[#0da06f] transition-colors">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#10b981] hover:bg-[#0da06f] text-[#060b13] font-bold py-4 rounded-2xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-lg shadow-lg shadow-[#10b981]/10 mt-4"
          >
            Sign In <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-800/50 text-center">
          <p className="text-slate-500 font-medium">
            Don't have an account?{' '}
            <button className="text-[#10b981] font-bold hover:underline transition-all">
              Sign up
            </button>
          </p>
        </div>
      </div>

      <p className="mt-12 text-slate-600 text-[10px] font-bold uppercase tracking-[0.4em]">
        Secured by EnerOptix Intelligence
      </p>
    </div>
  );
};

export default LoginPage;
