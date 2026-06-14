// src/pages/HistoryPage.jsx
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History, Search, Filter, Download, Eye, Trash2,
  FileText, Calendar, ChevronDown, X, Upload,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Card, { CardHeader } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';

const statusVariant = { Analyzed: 'success', Summarized: 'primary', Pending: 'warning' };
const STATUSES = ['All', 'Analyzed', 'Summarized', 'Pending'];

function getUser() {
  try {
    const stored = localStorage.getItem('user');
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function getUserHistory(email) {
  try {
    const stored = localStorage.getItem(`history_${email}`);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

export default function HistoryPage() {
  const user = getUser();
  const email = user?.email || '';

  const [query,      setQuery]      = useState('');
  const [status,     setStatus]     = useState('All');
  const [sortBy,     setSortBy]     = useState('date');
  const [papers,     setPapers]     = useState(() => getUserHistory(email));
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return papers
      .filter(p => {
        const matchQ = p.title.toLowerCase().includes(query.toLowerCase()) ||
                       (p.authors || '').toLowerCase().includes(query.toLowerCase());
        const matchS = status === 'All' || p.status === status;
        return matchQ && matchS;
      })
      .sort((a, b) => {
        if (sortBy === 'date')  return new Date(b.date) - new Date(a.date);
        if (sortBy === 'year')  return (b.year || 0) - (a.year || 0);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [papers, query, status, sortBy]);

  const remove = (id) => {
    const updated = papers.filter(x => x.id !== id);
    setPapers(updated);
    if (email) localStorage.setItem(`history_${email}`, JSON.stringify(updated));
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white mb-1">Paper History</h1>
        <p className="text-slate-400 text-sm">All your previously uploaded and analyzed research papers.</p>
      </div>

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search papers by title or author…"
            className="input-field pl-9"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status filter chips */}
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <motion.button key={s} whileTap={{ scale: 0.95 }}
              onClick={() => setStatus(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                ${status === s
                  ? 'bg-primary-600/30 border-primary-500/50 text-primary-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}>
              {s}
            </motion.button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => setFilterOpen(o => !o)}
            className="btn-secondary text-sm h-full">
            <Filter className="w-4 h-4" />
            Sort: {sortBy === 'date' ? 'Date' : sortBy === 'year' ? 'Year' : 'Title'}
            <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </motion.button>
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 z-10 glass border border-white/20 rounded-xl overflow-hidden w-36 shadow-card"
              >
                {[['date', 'Newest First'], ['year', 'By Year'], ['title', 'By Title']].map(([val, label]) => (
                  <button key={val} onClick={() => { setSortBy(val); setFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/10 ${sortBy === val ? 'text-primary-300' : 'text-slate-300'}`}>
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results count */}
      <p className="text-slate-500 text-sm mb-4">{filtered.length} paper{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={History}
          title={papers.length === 0 ? 'No papers yet' : 'No papers found'}
          description={
            papers.length === 0
              ? 'Upload your first paper to get started with AI analysis.'
              : query
                ? `No papers match "${query}". Try different search terms.`
                : 'No papers match the selected filter.'
          }
          action={
            papers.length === 0
              ? <Link to="/upload"><Button icon={<Upload className="w-4 h-4" />}>Upload Paper</Button></Link>
              : <Button onClick={() => { setQuery(''); setStatus('All'); }}>Clear Filters</Button>
          }
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map(({ id, title, authors, year, date, status: s, size, pages }) => (
              <motion.div
                key={id} layout
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                className="glass p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-500/20 border border-primary-500/25 rounded-xl flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-primary-300 transition-colors">{title}</h3>
                      <Badge variant={statusVariant[s] || 'default'}>{s}</Badge>
                    </div>
                    {authors && <p className="text-slate-400 text-xs mb-2">{authors}{year ? ` · ${year}` : ''}</p>}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      {date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {date}</span>}
                      {pages  && <span>{pages} pages</span>}
                      {size   && <span>{size}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button whileHover={{ scale: 1.1 }}
                      className="p-2 rounded-lg hover:bg-white/10 text-slate-500 hover:text-primary-400 transition-all">
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }}
                      className="p-2 rounded-lg hover:bg-white/10 text-slate-500 hover:text-emerald-400 transition-all">
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }}
                      onClick={() => remove(id)}
                      className="p-2 rounded-lg hover:bg-white/10 text-slate-500 hover:text-red-400 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </DashboardLayout>
  );
}