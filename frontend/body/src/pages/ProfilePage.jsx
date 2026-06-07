// src/pages/ProfilePage.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Bell, Shield, CreditCard, Moon, Sun, Globe,
  Edit3, Check, Camera, Zap, Crown, Download,
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card, { CardHeader } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

function getUser() {
  try {
    const stored = localStorage.getItem('user');
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function Toggle({ checked, onChange }) {
  return (
    <motion.button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-primary-600' : 'bg-white/20'}`}
    >
      <motion.div
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
      />
    </motion.button>
  );
}

export default function ProfilePage() {
  const storedUser = getUser();

  const [editName,  setEditName]  = useState(false);
  const [name,      setName]      = useState(storedUser?.name || 'User');
  const [tempName,  setTempName]  = useState(storedUser?.name || 'User');
  const [darkMode,  setDarkMode]  = useState(true);
  const [notifs,    setNotifs]    = useState({ email: true, weekly: true, tips: false, updates: true });
  const [saved,     setSaved]     = useState(false);

  const email = storedUser?.email || '';
  const avatar = storedUser?.avatar || null;
  const initials = getInitials(name);

  const saveName = () => {
    setName(tempName);
    setEditName(false);
    setSaved(true);
    // also update localStorage
    if (storedUser) {
      localStorage.setItem('user', JSON.stringify({ ...storedUser, name: tempName }));
    }
    setTimeout(() => setSaved(false), 2500);
  };

  const stats = [
    { label: 'Papers',      value: 47  },
    { label: 'Summaries',   value: 128 },
    { label: 'Citations',   value: 312 },
    { label: 'Days Active', value: 84  },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Profile & Settings</h1>
          <p className="text-slate-400 text-sm">Manage your account, preferences, and subscription.</p>
        </div>

        {/* Profile card */}
        <Card hover={false} className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              {avatar ? (
                <img src={avatar} alt={name} className="w-20 h-20 rounded-2xl object-cover shadow-glow" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-3xl font-bold text-white shadow-glow">
                  {initials}
                </div>
              )}
              <motion.button whileHover={{ scale: 1.1 }}
                className="absolute -bottom-2 -right-2 p-1.5 bg-dark-900 border border-white/20 rounded-lg text-slate-400 hover:text-white transition-all">
                <Camera className="w-3.5 h-3.5" />
              </motion.button>
            </div>
            <div className="flex-1">
              {editName ? (
                <div className="flex items-center gap-2 mb-1">
                  <input value={tempName} onChange={e => setTempName(e.target.value)}
                    className="input-field py-1.5 text-lg font-bold w-48" autoFocus />
                  <Button size="sm" onClick={saveName} icon={<Check className="w-3.5 h-3.5" />}>Save</Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-white">{name}</h2>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => { setTempName(name); setEditName(true); }}
                    className="p-1 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-all">
                    <Edit3 className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              )}
              {email && (
                <p className="text-slate-400 text-sm flex items-center gap-1.5 mb-3">
                  <Mail className="w-3.5 h-3.5" /> {email}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary"><Crown className="w-3 h-3" /> Pro Plan</Badge>
                <Badge variant="success">Verified</Badge>
                <Badge variant="default"><Globe className="w-3 h-3" /> MIT, Cambridge</Badge>
              </div>
            </div>
            {saved && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <Check className="w-4 h-4" /> Saved!
              </motion.div>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Theme */}
          <Card hover={false}>
            <CardHeader title="Appearance" icon={darkMode ? Moon : Sun} />
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Dark Mode</p>
                    <p className="text-xs text-slate-500">Use dark theme interface</p>
                  </div>
                </div>
                <Toggle checked={darkMode} onChange={setDarkMode} />
              </div>
              {[
                { label: 'Compact View',    desc: 'Reduce spacing in tables',   key: 'compact' },
                { label: 'Show Animations', desc: 'Enable UI micro-animations', key: 'anim'    },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <Toggle checked={true} onChange={() => {}} />
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card hover={false}>
            <CardHeader title="Notifications" icon={Bell} />
            <div className="space-y-4">
              {[
                { key: 'email',   label: 'Email notifications',  desc: 'Get notified via email'    },
                { key: 'weekly',  label: 'Weekly digest',        desc: 'Summary of your activity'  },
                { key: 'tips',    label: 'Usage tips',           desc: 'Tips to improve your work' },
                { key: 'updates', label: 'Product updates',      desc: 'New features & changelog'  },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <Toggle checked={notifs[key]} onChange={(v) => setNotifs(n => ({ ...n, [key]: v }))} />
                </div>
              ))}
            </div>
          </Card>

          {/* Security */}
          <Card hover={false}>
            <CardHeader title="Security" icon={Shield} />
            <div className="space-y-3">
              {[
                { label: 'Change Password',  desc: 'Last changed 30 days ago'   },
                { label: 'Two-Factor Auth',  desc: 'Not enabled — recommended'  },
                { label: 'Active Sessions',  desc: '2 devices logged in'        },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-primary-300 transition-colors">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Subscription */}
          <Card hover={false} glow>
            <CardHeader title="Subscription" icon={CreditCard} />
            <div className="p-4 bg-gradient-to-br from-primary-900/40 to-accent-900/30 border border-primary-500/25 rounded-xl mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white flex items-center gap-2"><Crown className="w-4 h-4 text-amber-400" /> Pro Plan</span>
                <Badge variant="success">Active</Badge>
              </div>
              <p className="text-slate-400 text-sm mb-3">$19/month · Renews June 24, 2025</p>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full" />
              </div>
              <p className="text-xs text-slate-500 mt-1">75% of billing period used</p>
            </div>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-center" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                Download Invoices
              </Button>
              <Button variant="danger" className="w-full justify-center" size="sm">
                Cancel Subscription
              </Button>
            </div>
          </Card>
        </div>

        {/* Danger zone */}
        <Card hover={false} className="mt-6 border-red-500/20">
          <CardHeader title="Danger Zone" icon={Shield} />
          <p className="text-slate-400 text-sm mb-4">These actions are permanent and cannot be undone.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="danger" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export All Data</Button>
            <Button variant="danger" size="sm">Delete Account</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
