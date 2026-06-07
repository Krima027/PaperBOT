// src/pages/AnalysisPage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, BookOpen, ChevronDown, ChevronUp,
  Sparkles, Brain, Database, FlaskConical, BarChart2,
  AlertTriangle, Telescope, BookMarked, Loader2, Copy, CheckCircle,
} from 'lucide-react';

import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import {
  getResearchProblem, getMethodology, getDataset, getResults,
  getLimitations, getFutureWork, getReferences,
} from '../api/paperApi';

function ExpandableSection({ title, icon: Icon, color, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card padding={false} hover={false} className="overflow-hidden">
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="font-semibold text-white">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/10 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-all">
      {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

const AI_SECTIONS = [
  { key: 'research_problem', label: 'Research Problem / Objective', icon: Brain,       color: 'bg-blue-500/20 text-blue-400',    fn: getResearchProblem, field: 'research_problem' },
  { key: 'methodology',      label: 'Methodology',                  icon: FlaskConical, color: 'bg-purple-500/20 text-purple-400', fn: getMethodology,      field: 'methodology'      },
  { key: 'dataset',          label: 'Dataset Used',                 icon: Database,     color: 'bg-cyan-500/20 text-cyan-400',     fn: getDataset,          field: 'dataset'          },
  { key: 'results',          label: 'Results & Findings',           icon: BarChart2,    color: 'bg-emerald-500/20 text-emerald-400', fn: getResults,         field: 'results'          },
  { key: 'limitations',      label: 'Limitations',                  icon: AlertTriangle, color: 'bg-amber-500/20 text-amber-400',  fn: getLimitations,      field: 'limitations'      },
  { key: 'future_work',      label: 'Future Work',                  icon: Telescope,    color: 'bg-rose-500/20 text-rose-400',     fn: getFutureWork,       field: 'future_work'      },
  { key: 'references',       label: 'References / Citations',       icon: BookMarked,   color: 'bg-slate-500/20 text-slate-400',   fn: getReferences,       field: 'references'       },
];

function AIAnalysisTab({ fullText }) {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState('');

  const fetchOne = async (section) => {
    setLoading(l => ({ ...l, [section.key]: true }));
    try {
      const res = await section.fn(fullText);
      const value = res[section.field] ?? res.error ?? 'No result returned.';
      setResults(r => ({ ...r, [section.key]: value }));
    } catch {
      setResults(r => ({ ...r, [section.key]: 'Error: Could not connect to backend.' }));
    }
    setLoading(l => ({ ...l, [section.key]: false }));
  };

  const fetchAll = async () => {
    if (!fullText) { setError('No paper uploaded yet. Please upload a PDF first.'); return; }
    setError('');
    for (const s of AI_SECTIONS) {
      if (!results[s.key]) await fetchOne(s);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-slate-400 text-sm">AI extracts key parameters from your paper.</p>
        <Button size="sm" icon={<Sparkles className="w-3.5 h-3.5" />} onClick={fetchAll}>
          Analyze All
        </Button>
      </div>
      {error && <div className="glass p-3 border border-red-500/30 text-red-400 text-sm">{error}</div>}

      {AI_SECTIONS.map((section) => (
        <Card key={section.key} padding={false} hover={false} className="overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className={`p-2 rounded-lg ${section.color}`}>
              <section.icon className="w-4 h-4" />
            </div>
            <span className="font-semibold text-white flex-1">{section.label}</span>
            {results[section.key] && <CopyBtn text={Array.isArray(results[section.key]) ? results[section.key].join('\n') : results[section.key]} />}
            {!results[section.key] && (
              <Button size="sm" variant="secondary"
                loading={loading[section.key]}
                onClick={() => { if (!fullText) { setError('No paper uploaded.'); return; } fetchOne(section); }}>
                {loading[section.key] ? 'Analyzing…' : 'Extract'}
              </Button>
            )}
          </div>
          {results[section.key] && (
            <div className="px-5 pb-4 border-t border-white/10 pt-3">
              {Array.isArray(results[section.key]) ? (
                <ul className="space-y-1">
                  {results[section.key].map((item, i) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-primary-400 mt-0.5">•</span>{item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{results[section.key]}</p>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState('extracted');
  const p = JSON.parse(localStorage.getItem('paperAnalysis') || 'null');

  if (!p) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto text-center mt-20">
          <h1 className="text-2xl font-bold text-white">No Paper Uploaded Yet</h1>
          <p className="text-slate-400 mt-3">Upload a PDF first to view analysis.</p>
        </div>
      </DashboardLayout>
    );
  }

  const validSections = Object.entries(p.sections || {}).filter(([_, c]) => c && c.trim().length > 0);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="success">Analysis Complete</Badge>
          </div>
          <h1 className="text-2xl font-bold text-white">
            {p.metadata?.title || p.filename || 'Research Paper'}
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Extracted from uploaded PDF</p>
        </div>

        {/* Metadata Card */}
        {p.metadata && (
          <Card hover={false} className="mb-5">
            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg">{p.metadata.title || 'Unknown Title'}</h2>
              {p.metadata.authors && p.metadata.authors.length > 0 && (
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Authors</p>
                  <p className="text-white text-sm">{p.metadata.authors.join(', ')}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* File Info */}
        <Card hover={false} className="mb-5">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary-400" />
            <div>
              <h3 className="text-white font-medium">Uploaded File</h3>
              <p className="text-slate-400 text-sm">{p.filename}</p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {[
            { id: 'extracted', label: 'Extracted Sections', icon: BookOpen },
            { id: 'ai',        label: 'AI Deep Analysis',   icon: Sparkles },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${activeTab === id
                  ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'}`}>
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'extracted' && (
          validSections.length > 0 ? (
            <div className="space-y-4">
              {validSections.map(([title, content]) => (
                <ExpandableSection key={title}
                  title={title.charAt(0).toUpperCase() + title.slice(1)}
                  icon={BookOpen}
                  color="bg-primary-500/20 text-primary-400"
                  defaultOpen={title === 'abstract'}>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                </ExpandableSection>
              ))}
            </div>
          ) : (
            <Card hover={false}>
              <h2 className="text-white font-bold text-lg mb-4">Full Extracted Text</h2>
              <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
                {p.full_text || 'No sections detected and no text available.'}
              </p>
            </Card>
          )
        )}

        {activeTab === 'ai' && <AIAnalysisTab fullText={p.full_text || ''} />}
      </div>
    </DashboardLayout>
  );
}
