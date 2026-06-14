// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Brain, BookOpen } from 'lucide-react';
import Button from '../components/Button';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'


export default function LoginPage() {
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [remember,  setRemember]  = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);

    // Derive a display name from the email (e.g. "krima@gmail.com" → "Krima")
    const namePart = email.split('@')[0];
    const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const userData = { name: displayName, email, avatar: null };
    localStorage.setItem('user', JSON.stringify(userData));

    // Initialise empty history for this user if not already present
    const historyKey = `history_${email}`;
    if (!localStorage.getItem(historyKey)) {
      localStorage.setItem(historyKey, JSON.stringify([]));
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel – illustration */}
      <motion.div
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
        className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-dark-900 via-primary-950 to-dark-950 relative overflow-hidden p-12"
      >
        {/* BG orbs */}
        <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-primary-600/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl" />
        <div className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="p-2 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl shadow-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-white text-xl">PaperBOT</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center relative z-10">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
            <div className="glass border border-white/20 p-8 rounded-2xl max-w-sm mb-8">
              <Sparkles className="w-8 h-8 text-primary-400 mb-4" />
              <p className="text-2xl font-display font-bold text-white mb-3">Welcome Back!</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Continue where you left off. Your papers, summaries, and citations are waiting for you.
              </p>
            </div>
          </motion.div>

          {[
            { icon: Brain,    text: 'AI-powered paper analysis',       color: 'text-primary-400', bg: 'bg-primary-500/20' },
            { icon: BookOpen, text: 'Smart literature review builder', color: 'text-accent-400',  bg: 'bg-accent-500/20'  },
            { icon: Sparkles, text: 'Instant research summaries',      color: 'text-cyan-400',    bg: 'bg-cyan-500/20'    },
          ].map(({ icon: Icon, text, color, bg }) => (
            <motion.div key={text} whileHover={{ x: 4 }}
              className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${bg}`}><Icon className={`w-4 h-4 ${color}`} /></div>
              <span className="text-slate-300 text-sm">{text}</span>
            </motion.div>
          ))}
        </div>

        <p className="text-slate-600 text-xs relative z-10">© 2025 PaperBOT · Research made intelligent</p>
      </motion.div>

      {/* Right panel – form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
        className="flex-1 lg:max-w-lg flex flex-col justify-center px-8 md:px-14 py-12 bg-dark-950"
      >
        <div className="mb-10">
          <Link to="/" className="flex items-center gap-2 lg:hidden mb-8">
            <div className="p-1.5 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg"><Zap className="w-4 h-4 text-white" /></div>
            <span className="font-display font-bold text-white">PaperBOT</span>
          </Link>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Sign in to your account</h2>
          <p className="text-slate-400">Don't have an account? <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">Sign up free</Link></p>
        </div>

        {/* Google */}
        <div className="w-full mb-6">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              const userData = {
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture,
              };
              localStorage.setItem('user', JSON.stringify(userData));
              // Initialise empty history for this Google user if not already present
              const historyKey = `history_${decoded.email}`;
              if (!localStorage.getItem(historyKey)) {
                localStorage.setItem(historyKey, JSON.stringify([]));
              }
              navigate('/dashboard');
            }}
            onError={() => alert('Google login failed. Please try again.')}
            width="100%"
            theme="filled_black"
            shape="rectangular"
            text="signin_with"
          />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
          <div className="relative flex justify-center text-xs text-slate-500"><span className="bg-dark-950 px-3">or continue with email</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-1.5 block">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="you@university.edu"
                className="input-field pl-10"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <a href="#" className="text-xs text-primary-400 hover:text-primary-300">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="input-field pl-10 pr-10"
              />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="rounded border-white/20 bg-white/5 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="remember" className="text-sm text-slate-400">Remember me for 30 days</label>
          </div>

          <Button type="submit" className="w-full justify-center" size="lg" loading={loading} iconRight={!loading && <ArrowRight className="w-4 h-4" />}>
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>

        <p className="text-xs text-slate-600 text-center mt-8">
          By signing in you agree to our <a href="#" className="text-slate-400 hover:text-white">Terms</a> and <a href="#" className="text-slate-400 hover:text-white">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}