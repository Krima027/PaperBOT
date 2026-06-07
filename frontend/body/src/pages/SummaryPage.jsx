// src/pages/SummaryPage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Zap, Star, Download, Copy, ChevronDown, ChevronUp,
  FileText, CheckCircle, Lightbulb, BookOpen,
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card, { CardHeader } from '../components/Card';
import Button from '../components/Button';
import { getSummary, getTLDR, getContributions, getSectionSummaries } from '../api/paperApi';


function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      onClick={() => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-all"
    >
      {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
    </motion.button>
  );
}

function SectionCard({ section, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
      className="glass hover:bg-white/10 transition-all duration-300 overflow-hidden"
    >
      <button className="w-full flex items-center justify-between p-4 text-left" onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-400 text-xs flex items-center justify-center font-bold">{i + 1}</div>
          <span className="font-semibold text-white text-sm">{section.title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
          <p className="px-4 pb-4 text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-3">{section.summary}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function SummaryPage() {
  const [summary, setSummary] = useState('');
  const [tldr, setTldr] = useState('');
  const [contributions, setContributions] = useState([]);
  const [sectionSummaries, setSectionSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const loadSummary = async () => {

    try {

      const paperData = JSON.parse(
        localStorage.getItem("paperAnalysis")
      );

      if (!paperData) {
        setLoading(false);
        return;
      }

      const text =
        Object.values(
          paperData.sections || {}
        ).join("\n\n");

      const sections =
        paperData.sections || {};

      const summaryRes =
        await getSummary(text);

      const tldrRes =
        await getTLDR(text);

      const contribRes =
        await getContributions(text);

      const sectionRes =
        await getSectionSummaries(sections);

      setSummary(summaryRes.summary);

      setTldr(tldrRes.tldr);

      setContributions(
        contribRes.contributions
      );

      setSectionSummaries(
        [
          {
            title: "Abstract",
            summary: sectionRes.abstract_summary
          },
          {
            title: "Introduction",
            summary: sectionRes.introduction_summary
          },
          {
            title: "Methodology",
            summary: sectionRes.methodology_summary
          },
          {
            title: "Results",
            summary: sectionRes.results_summary
          },
          {
            title: "Conclusion",
            summary: sectionRes.conclusion_summary
          }
        ].filter(
          (s) => s.summary
        )
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

    loadSummary();

  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-white text-center mt-20">
          Loading AI Summary...
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-white mb-1">Smart Summary</h1>
            <p className="text-slate-400 text-sm">AI-generated summary of "Attention Is All You Need"</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" icon={<Copy className="w-3.5 h-3.5" />}>Copy All</Button>
            <Button size="sm" icon={<Download className="w-3.5 h-3.5" />}>Download PDF</Button>
          </div>
        </div>

        {/* TL;DR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative glass border border-primary-500/30 bg-gradient-to-br from-primary-900/30 to-accent-900/20 p-6 mb-6 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary-400" />
              <span className="font-bold text-primary-300 text-sm uppercase tracking-wider">TL;DR</span>
            </div>
            <CopyButton text={tldr} />
          </div>
          <p className="text-white text-base leading-relaxed font-medium">{tldr}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Key Contributions */}
          <Card hover={false}>
            <CardHeader title="Key Contributions" icon={Star} />
            <ul className="space-y-3">
              {contributions.map((c, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-2.5 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">{i + 1}</div>
                  {c}
                </motion.li>
              ))}
            </ul>
          </Card>

          <Card hover={false} className="mb-6">
            <CardHeader
              title="Paper Summary"
              icon={FileText}
            />

            <p className="text-slate-300 leading-relaxed">
              {summary}
            </p>
          </Card>

          {/* Highlights */}
          <Card hover={false}>
            <CardHeader title="Important Highlights" icon={Lightbulb} />
            <ul className="space-y-3">
              {contributions.map((h, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-slate-300"
                >
                  <Sparkles className="w-4 h-4 text-accent-400 flex-shrink-0" />
                  {h}
                </motion.li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Section-wise summaries */}
        <Card hover={false} className="mb-6">
          <CardHeader title="Section-wise Summaries" icon={BookOpen}
            action={
              <span className="text-xs text-slate-500">
                {sectionSummaries.length} sections
              </span>
            }
          />
          <div className="space-y-2">
            {sectionSummaries.map((section, i) => <SectionCard key={section.title} section={section} i={i} />)}
          </div>
        </Card>

        {/* Export options */}
        <Card hover={false}>
          <CardHeader title="Export Summary" icon={Download} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'PDF Report',  icon: FileText,  color: 'text-red-400    bg-red-500/20    border-red-500/25'    },
              { label: 'Word Doc',    icon: FileText,  color: 'text-blue-400   bg-blue-500/20   border-blue-500/25'   },
              { label: 'Plain Text',  icon: Copy,      color: 'text-slate-400  bg-white/10       border-white/20'      },
              { label: 'Markdown',    icon: BookOpen,  color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/25' },
            ].map(({ label, icon: Icon, color }) => {
              const [c1, c2, c3] = color.split(' ');
              return (
                <motion.button key={label} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${c2} ${c3} hover:opacity-90 transition-all`}>
                  <Icon className={`w-5 h-5 ${c1}`} />
                  <span className="text-xs text-slate-300 font-medium">{label}</span>
                </motion.button>
              );
            })}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
