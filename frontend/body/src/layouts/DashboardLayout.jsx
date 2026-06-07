// src/layouts/DashboardLayout.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Upload, FileSearch, Sparkles, PenTool,
  History, User, ChevronLeft, ChevronRight, Bell, Search,
  LogOut, Menu, X, Zap, Settings,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard',        path: '/dashboard',  icon: LayoutDashboard },
  { label: 'Upload Paper',     path: '/upload',     icon: Upload          },
  { label: 'Paper Analysis',   path: '/analysis',   icon: FileSearch      },
  { label: 'Smart Summary',    path: '/summary',    icon: Sparkles        },
  { label: 'AI Writing',       path: '/writing',    icon: PenTool         },
  { label: 'History',          path: '/history',    icon: History         },
  { label: 'Profile',          path: '/profile',    icon: User            },
];

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

export default function DashboardLayout({ children }) {
  const [collapsed,    setCollapsed]    = useState(false);
  const [mobileOpen,  setMobileOpen]   = useState(false);
  const [notifications, setNotifications] = useState(3);
  const location  = useLocation();
  const navigate  = useNavigate();

  const user = getUser();
  const displayName = user?.name || 'User';
  const initials = getInitials(displayName);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : (collapsed ? 'w-16' : 'w-60')} transition-all duration-300`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 p-4 border-b border-white/10 ${collapsed && !mobile ? 'justify-center' : ''}`}>
        <div className="p-2 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex-shrink-0 shadow-glow">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {(!collapsed || mobile) && (
          <span className="font-display font-bold text-white text-lg">PaperBOT</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <motion.div key={path} whileHover={{ x: 2 }}>
              <Link
                to={path}
                onClick={() => mobile && setMobileOpen(false)}
                className={`nav-item ${active ? 'active' : ''} ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
                title={collapsed && !mobile ? label : ''}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary-400' : ''}`} />
                {(!collapsed || mobile) && <span>{label}</span>}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className={`p-3 border-t border-white/10 space-y-1 ${collapsed && !mobile ? 'items-center flex flex-col' : ''}`}>
        <Link
          to="/profile"
          className={`nav-item ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
          title={collapsed && !mobile ? 'Settings' : ''}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {(!collapsed || mobile) && <span>Settings</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={`nav-item w-full ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
          title={collapsed && !mobile ? 'Log Out' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0 text-red-400" />
          {(!collapsed || mobile) && <span className="text-red-400">Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-dark-950">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col relative bg-dark-900/80 border-r border-white/10 flex-shrink-0 overflow-hidden"
      >
        <Sidebar />
        {/* Collapse toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(c => !c)}
          className="absolute -right-3 top-16 z-10 p-1 bg-dark-800 border border-white/20 rounded-full text-slate-400 hover:text-white"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </motion.button>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-full z-40 w-64 bg-dark-900 border-r border-white/10 md:hidden flex flex-col"
            >
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-slate-400" />
              </button>
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-4 md:px-6 h-14 border-b border-white/10 bg-dark-900/60 backdrop-blur-md flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-white/10">
            <Menu className="w-5 h-5 text-slate-400" />
          </button>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search papers, summaries…"
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-primary-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="relative p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              onClick={() => setNotifications(0)}
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-dark-900" />
              )}
            </motion.button>
            <Link to="/profile" className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 transition-all">
              {user?.avatar ? (
                <img src={user.avatar} alt={displayName} className="w-7 h-7 rounded-lg object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-xs font-bold text-white">
                  {initials}
                </div>
              )}
              <span className="text-sm font-medium text-slate-300 hidden sm:block">{displayName}</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-mesh">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
