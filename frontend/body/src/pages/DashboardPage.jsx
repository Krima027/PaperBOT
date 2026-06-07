// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText, Sparkles, Quote, Clock, Upload, TrendingUp,
  ArrowRight, Eye, Download, BarChart3, Activity,
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card, { CardHeader } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { StatCardSkeleton, TableRowSkeleton } from '../components/Skeleton';
import { stats, recentPapers, activityTimeline } from '../data/mockData';

const iconMap = { FileText, Sparkles, Quote, Clock };
const colorMap = {
  primary: { text: 'text-primary-400', bg: 'bg-primary-500/20', border: 'border-primary-500/30' },
  purple:  { text: 'text-purple-400',  bg: 'bg-purple-500/20',  border: 'border-purple-500/30'  },
  cyan:    { text: 'text-cyan-400',    bg: 'bg-cyan-500/20',    border: 'border-cyan-500/30'    },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' },
};

const statusVariant = { Analyzed: 'success', Summarized: 'primary', Pending: 'warning' };
const activityIcon  = { upload: Upload, summary: Sparkles, citation: Quote, writing: FileText, analyze: Eye };
const activityColor = { upload: 'bg-blue-500/20 text-blue-400', summary: 'bg-purple-500/20 text-purple-400', citation: 'bg-cyan-500/20 text-cyan-400', writing: 'bg-emerald-500/20 text-emerald-400', analyze: 'bg-primary-500/20 text-primary-400' };

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1400); return () => clearTimeout(t); }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Welcome back, Alex 👋</h1>
          <p className="text-slate-400 text-sm">Here's what's happening with your research today.</p>
        </div>
        <Link to="/upload">
          <Button icon={<Upload className="w-4 h-4" />}>Upload Paper</Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map(({ label, value, change, icon, color }, i) => {
              const Icon = iconMap[icon];
              const c    = colorMap[color];
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className={`stat-card border ${c.border}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-400 text-xs font-medium">{label}</p>
                    <div className={`p-2 rounded-lg ${c.bg}`}>
                      <Icon className={`w-4 h-4 ${c.text}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{value}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-medium">{change}</span>
                    <span className="text-xs text-slate-500">vs last month</span>
                  </div>
                </motion.div>
              );
            })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Papers table */}
        <div className="lg:col-span-2">
          <Card padding={false} hover={false}>
            <CardHeader
              title="Recent Papers"
              subtitle="Your latest uploaded research papers"
              icon={FileText}
              action={<Link to="/history" className="text-xs text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {['Title', 'Authors', 'Year', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading
                    ? Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={5} />)
                    : recentPapers.map(({ id, title, authors, year, status }) => (
                        <tr key={id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-4 py-3 max-w-xs">
                            <p className="font-medium text-slate-200 truncate group-hover:text-white transition-colors text-xs" title={title}>{title}</p>
                          </td>
                          <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{authors}</td>
                          <td className="px-4 py-3 text-slate-400 text-xs">{year}</td>
                          <td className="px-4 py-3">
                            <Badge variant={statusVariant[status]}>{status}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Link to="/analysis">
                                <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-primary-400 transition-all">
                                  <Eye className="w-3.5 h-3.5" />
                                </motion.button>
                              </Link>
                              <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-emerald-400 transition-all">
                                <Download className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Activity timeline */}
        <Card hover={false}>
          <CardHeader title="Recent Activity" icon={Activity} />
          <div className="space-y-4">
            {activityTimeline.map(({ id, action, detail, time, type }) => {
              const Icon = activityIcon[type];
              return (
                <motion.div key={id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: id * 0.08 }}
                  className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${activityColor[type]}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200 leading-tight">{action}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{detail}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Quick actions + Chart placeholder */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card hover={false}>
          <CardHeader title="Quick Actions" icon={Sparkles} />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Upload Paper',    path: '/upload',   icon: Upload,   color: 'from-blue-600 to-primary-600' },
              { label: 'View Analysis',   path: '/analysis', icon: Eye,      color: 'from-primary-600 to-accent-600' },
              { label: 'Smart Summary',   path: '/summary',  icon: Sparkles, color: 'from-accent-600 to-pink-600' },
              { label: 'AI Writing',      path: '/writing',  icon: FileText, color: 'from-cyan-600 to-blue-600' },
            ].map(({ label, path, icon: Icon, color }) => (
              <Link key={label} to={path}>
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="glass p-4 text-center hover:bg-white/10 transition-all duration-200 cursor-pointer">
                  <div className={`inline-flex p-2.5 bg-gradient-to-br ${color} rounded-xl mb-2 shadow-glow`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs font-medium text-slate-300">{label}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </Card>

        <Card hover={false}>
          <CardHeader title="Activity Overview" icon={BarChart3} />
          {/* Chart placeholder with animated bars */}
          <div className="flex items-end justify-between gap-2 h-32 px-2">
            {[65, 40, 85, 55, 70, 90, 60, 80, 45, 75, 50, 95].map((h, i) => (
              <motion.div key={i}
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.05, duration: 0.5 }}
                style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                className={`flex-1 rounded-sm bg-gradient-to-t ${i % 3 === 0 ? 'from-primary-600 to-primary-400' : i % 3 === 1 ? 'from-accent-600 to-accent-400' : 'from-primary-800 to-primary-600'} opacity-80 hover:opacity-100 transition-opacity cursor-default`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-2 px-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
