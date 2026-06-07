// src/pages/WritingPage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, FileEdit, RefreshCw, Quote, CheckCircle, Search,
  Sparkles, ArrowRight, Copy, Download, X, Loader2,
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { writingModules } from '../data/mockData';
import {
  getLiteratureReview,
  getParaphrase,
  generateAbstract,
  getResearchGap,
  improveGrammar,
} from '../api/paperApi';

const iconMap = { BookOpen, FileEdit, RefreshCw, Quote, CheckCircle, Search };

// Abstract generator needs 4 fields; others just need free text
const ABSTRACT_MODULE_ID = 'abstract';

function AbstractForm({ onGenerate, loading }) {
  const [fields, setFields] = useState({
    research_problem: '',
    methodology: '',
    results: '',
    conclusion: '',
  });
  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));
  return (
    <div className="space-y-3">
      {[
        { key: 'research_problem', label: 'Research Problem' },
        { key: 'methodology',      label: 'Methodology'      },
        { key: 'results',          label: 'Results'          },
        { key: 'conclusion',       label: 'Conclusion'       },
      ].map(({ key, label }) => (
        <div key={key}>
          <label className="text-xs font-medium text-slate-400 mb-1 block">{label}</label>
          <textarea
            value={fields[key]}
            onChange={set(key)}
            rows={2}
            placeholder={`Enter ${label.toLowerCase()}…`}
            className="input-field resize-none w-full"
          />
        </div>
      ))}
      <Button
        onClick={() => onGenerate(fields)}
        loading={loading}
        className="w-full justify-center"
        icon={!loading && <Sparkles className="w-4 h-4" />}
      >
        {loading ? 'Generating…' : 'Generate Abstract'}
      </Button>
    </div>
  );
}

async function callApi(moduleId, input) {
  const paperData = JSON.parse(localStorage.getItem('paperAnalysis') || '{}');
  const paperText = paperData.full_text || '';

  switch (moduleId) {
    case 'literature': {
      const text = input || paperText;
      const res = await getLiteratureReview(text);
      return res.literature_review || res.error || 'No result.';
    }
    case 'paraphrase': {
      const res = await getParaphrase(input);
      return res.paraphrased_text || res.error || 'No result.';
    }
    case 'abstract': {
      // input is the fields object from AbstractForm
      const res = await generateAbstract(
        input.research_problem,
        input.methodology,
        input.results,
        input.conclusion,
      );
      return res.abstract || res.error || 'No result.';
    }
    case 'gap': {
      const text = input || paperText;
      const res = await getResearchGap(text);
      return res.research_gap || res.error || 'No result.';
    }
    case 'grammar': {
      const res = await improveGrammar(input);
      return res.improved_text || res.error || 'No result.';
    }
    case 'citation': {
      // Citation is reference-based; use uploaded paper references or a simple prompt
      const res = await getResearchGap(input || paperText); // reuse gap for now
      return `Generate citations from your references section. For now, paste your reference text in the input and use the Paraphrasing tool to reformat it into APA/IEEE style.\n\nExtracted info:\n${res.research_gap || ''}`;
    }
    default:
      return 'Feature not available.';
  }
}

function ModuleCard({ module }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const Icon = iconMap[module.icon];

  const generate = async (inputData) => {
    setLoading(true);
    setError('');
    try {
      const result = await callApi(module.id, inputData || input);
      setOutput(result);
    } catch (err) {
      setError('Failed to connect to backend. Make sure the server is running on port 8000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isAbstract = module.id === ABSTRACT_MODULE_ID;
  const needsInput = !['literature', 'gap'].includes(module.id);

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        onClick={() => setOpen(true)}
        className="glass p-6 cursor-pointer hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
      >
        <div className={`inline-flex p-3 bg-gradient-to-br ${module.color} rounded-xl mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-semibold text-white text-base mb-2">{module.title}</h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{module.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {module.features.map(f => <span key={f} className="badge-primary text-xs">{f}</span>)}
        </div>
        <div className="flex items-center gap-1 text-primary-400 text-sm font-medium">
          <span>Open tool</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>

      <Modal isOpen={open} onClose={() => { setOpen(false); setOutput(''); setInput(''); setError(''); }} title={module.title} size="lg">
        <div className="space-y-4">
          {isAbstract ? (
            <AbstractForm onGenerate={generate} loading={loading} />
          ) : (
            <>
              {needsInput && (
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Input Text</label>
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    rows={5}
                    placeholder={`Enter text for ${module.title.toLowerCase()}…`}
                    className="input-field resize-none w-full"
                  />
                </div>
              )}
              {!needsInput && (
                <p className="text-slate-400 text-sm">
                  This tool will use your uploaded paper automatically. Upload a paper first for best results.
                </p>
              )}
              <Button
                onClick={() => generate(input)}
                loading={loading}
                className="w-full justify-center"
                icon={!loading && <Sparkles className="w-4 h-4" />}
              >
                {loading ? 'Generating…' : 'Generate with AI'}
              </Button>
            </>
          )}

          {error && (
            <div className="glass p-3 border border-red-500/30 text-red-400 text-sm">{error}</div>
          )}

          <AnimatePresence>
            {output && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="glass p-4 border border-emerald-500/25">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 text-sm font-medium">Generated</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.1 }}
                    onClick={() => navigator.clipboard.writeText(output).catch(() => {})}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                    <Copy className="w-4 h-4" />
                  </motion.button>
                </div>
                <pre className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">{output}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </>
  );
}

export default function WritingPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white mb-1">AI Writing Assistant</h1>
        <p className="text-slate-400 text-sm">Powerful AI tools to supercharge your academic writing. Click any module to get started.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {writingModules.map(m => <ModuleCard key={m.id} module={m} />)}
      </div>

      <div className="mt-8 glass border border-accent-500/25 bg-gradient-to-r from-accent-900/20 to-primary-900/20 p-5 flex items-center gap-4">
        <div className="p-3 bg-accent-500/20 rounded-xl flex-shrink-0">
          <Sparkles className="w-6 h-6 text-accent-400" />
        </div>
        <div>
          <p className="text-white font-semibold mb-0.5">Pro Tip</p>
          <p className="text-slate-400 text-sm">Upload a paper first so the AI can use it as context for Literature Review and Research Gap tools automatically.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
