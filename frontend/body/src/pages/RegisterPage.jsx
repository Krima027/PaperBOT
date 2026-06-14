// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'


const passwordRequirements = [
  { test: (p) => p.length >= 8,          label: 'At least 8 characters'   },
  { test: (p) => /[A-Z]/.test(p),        label: 'One uppercase letter'    },
  { test: (p) => /[0-9]/.test(p),        label: 'One number'              },
  { test: (p) => /[^A-Za-z0-9]/.test(p), label: 'One special character'  },
];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const navigate = useNavigate();

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);

    const userData = { name: form.name, email: form.email, avatar: null };
    localStorage.setItem('user', JSON.stringify(userData));

    // Initialise empty history for this user
    const historyKey = `history_${form.email}`;
    if (!localStorage.getItem(historyKey)) {
      localStorage.setItem(historyKey, JSON.stringify([]));
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
        className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-dark-900 via-accent-950/30 to-dark-950 relative overflow-hidden p-12"
      >
        <div className="absolute top-1/5 right-1/4 w-80 h-80 bg-accent-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/5 left-1/4 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(168,85,247,0.07) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="p-2 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl shadow-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-white text-xl">PaperBOT</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center relative z-10">
          <div className="glass p-8 rounded-2xl max-w-sm mb-8">
            <Sparkles className="w-8 h-8 text-accent-400 mb-4" />
            <h3 className="text-2xl font-display font-bold text-white mb-3">Start Your Research Journey</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Join 50,000+ researchers who use PaperBOT to save hours of manual work every week.
            </p>
          </div>

          {[
            'Free forever plan — no credit card',
            'Analyze up to 5 papers per month',
            'AI-powered summaries & citations',
            'Cancel or upgrade anytime',
          ].map(t => (
            <div key={t} className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-slate-300 text-sm">{t}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-600 text-xs relative z-10">© 2025 PaperBOT · AI Research Platform</p>
      </motion.div>

      {/* Right form panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
        className="flex-1 lg:max-w-lg flex flex-col justify-center px-8 md:px-14 py-12 bg-dark-950 overflow-y-auto"
      >
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 lg:hidden mb-8">
            <div className="p-1.5 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg"><Zap className="w-4 h-4 text-white" /></div>
            <span className="font-display font-bold text-white">PaperBOT</span>
          </Link>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Create your account</h2>
          <p className="text-slate-400">Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign in</Link></p>
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
              const historyKey = `history_${decoded.email}`;
              if (!localStorage.getItem(historyKey)) {
                localStorage.setItem(historyKey, JSON.stringify([]));
              }
              navigate('/dashboard');
            }}
            onError={() => alert('Google sign-up failed. Please try again.')}
            width="100%"
            theme="filled_black"
            shape="rectangular"
            text="signup_with"
          />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
          <div className="relative flex justify-center text-xs text-slate-500"><span className="bg-dark-950 px-3">or register with email</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-1.5 block">Full name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text" value={form.name} onChange={update('name')} required
                placeholder="Your name"
                className="input-field pl-10"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 mb-1.5 block">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email" value={form.email} onChange={update('email')} required
                placeholder="you@university.edu"
                className="input-field pl-10"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPass ? 'text' : 'password'} value={form.password} onChange={update('password')} required
                placeholder="••••••••"
                className="input-field pl-10 pr-10"
              />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {form.password && (
              <div className="mt-2 space-y-1">
                {passwordRequirements.map(({ test, label }) => (
                  <div key={label} className={`flex items-center gap-2 text-xs ${test(form.password) ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <CheckCircle className="w-3 h-3" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 mb-1.5 block">Confirm password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPass ? 'text' : 'password'} value={form.confirm} onChange={update('confirm')} required
                placeholder="••••••••"
                className="input-field pl-10"
              />
            </div>
            {form.confirm && form.confirm !== form.password && (
              <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full justify-center"
            size="lg"
            loading={loading}
            disabled={form.confirm !== form.password}
            iconRight={!loading && <ArrowRight className="w-4 h-4" />}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </Button>
        </form>

        <p className="text-xs text-slate-600 text-center mt-8">
          By creating an account you agree to our <a href="#" className="text-slate-400 hover:text-white">Terms</a> and <a href="#" className="text-slate-400 hover:text-white">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}