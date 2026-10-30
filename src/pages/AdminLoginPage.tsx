import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { adminLogin } from '../services/authService';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@yazhiholidays.com');
  const [password, setPassword] = useState('Yazhi@Luxury2026');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = adminLogin(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-navy-midnight flex items-center justify-center p-4 pt-20">
      
      {/* Background ambient gold ring */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-gold-royal/10 pointer-events-none"></div>

      <div className="w-full max-w-md bg-navy-royal/60 border border-gold-royal/30 rounded-3xl p-8 shadow-luxury-dark backdrop-blur-xl relative z-10 text-white">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-full mx-auto p-0.5 bg-gradient-to-tr from-gold-metallic via-gold-royal to-gold-light shadow-gold-glow">
            <img
              src="/yazhi-logo.jpg"
              alt="Yazhi Holidays"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="font-serif text-2xl text-white font-semibold">
              Yazhi Staff Administration
            </h1>
            <span className="text-[11px] font-mono tracking-widest text-gold-royal uppercase block mt-1">
              SECURE CONCIERGE ACCESS
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 text-xs bg-red-900/60 text-red-200 border border-red-500/50 rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* Demo Credentials Helper */}
        <div className="mb-6 p-3 rounded-xl bg-navy-midnight/80 border border-gold-royal/20 text-xs text-sand-ivory/80 space-y-1">
          <span className="font-semibold text-gold-royal block">Pre-filled Authorized Credentials:</span>
          <div className="font-mono text-[11px] text-sand-ivory/70">
            Email: <span className="text-white">admin@yazhiholidays.com</span><br />
            Password: <span className="text-white">Yazhi@Luxury2026</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-sand-ivory/80 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gold-royal" />
              <span>Staff Email Address</span>
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-navy-midnight/90 border border-navy-royal rounded-xl text-white placeholder-slate-muted focus:outline-none focus:border-gold-royal font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-sand-ivory/80 mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-gold-royal" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-navy-midnight/90 border border-navy-royal rounded-xl text-white placeholder-slate-muted focus:outline-none focus:border-gold-royal font-sans"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 active:scale-95 transition-all shadow-gold-glow flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Verifying Credentials...' : 'Authenticate & Open Portal'}</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-navy-royal/60 text-center">
          <Link
            to="/"
            className="text-xs text-sand-ivory/60 hover:text-gold-royal transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};
