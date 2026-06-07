// src/pages/LandingPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, FileText, Sparkles, PenTool, Quote, CheckCircle,
  Search, ArrowRight, Star, ChevronDown, Brain, Upload,
  BarChart3, BookOpen, Shield, Globe, Menu, X,
} from 'lucide-react';
import { testimonials, pricingPlans } from '../data/mockData';

const features = [
  { icon: FileText,  title: 'Instant Paper Analysis', desc: 'Extract title, authors, abstract, methodology, results, and limitations in seconds.',         color: 'from-blue-500 to-primary-500'   },
  { icon: Sparkles,  title: 'AI Smart Summaries',     desc: 'Get TL;DR, section-wise summaries, and key contributions with one click.',                     color: 'from-primary-500 to-accent-500'  },
  { icon: PenTool,   title: 'AI Writing Assistant',   desc: 'Literature reviews, abstract generation, paraphrasing, and citation formatting all-in-one.',    color: 'from-accent-500 to-pink-500'     },
  { icon: Quote,     title: 'Citation Generator',      desc: 'Auto-generate citations in APA, MLA, Chicago, IEEE, Harvard, and Vancouver formats.',          color: 'from-cyan-500 to-blue-500'       },
  { icon: Search,    title: 'Research Gap Finder',    desc: 'Discover unexplored angles and novel research opportunities in your field.',                    color: 'from-emerald-500 to-teal-500'    },
  { icon: BarChart3, title: 'Analytics Dashboard',    desc: 'Track your research productivity with beautiful charts and activity timelines.',                 color: 'from-orange-500 to-amber-500'    },
];

const stats = [
  { value: '50K+', label: 'Researchers'    },
  { value: '2M+',  label: 'Papers Analyzed' },
  { value: '99.2%', label: 'Accuracy'      },
  { value: '120+', label: 'Universities'   },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="p-1.5 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg shadow-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg">PaperBOT</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          {['Features', 'Pricing', 'Testimonials', 'About'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login"    className="btn-ghost text-sm">Sign In</Link>
          <Link to="/register" className="btn-primary text-sm">Get Started Free</Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(o => !o)} className="md:hidden p-2 rounded-lg hover:bg-white/10">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark-900/95 backdrop-blur-xl border-b border-white/10 px-4 pb-5 space-y-3"
        >
          {['Features', 'Pricing', 'Testimonials'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
               className="block py-2 text-slate-300 hover:text-white font-medium">{l}</a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link to="/login"    className="btn-secondary justify-center text-sm">Sign In</Link>
            <Link to="/register" className="btn-primary  justify-center text-sm">Get Started Free</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-900/10 rounded-full blur-3xl" />
        {/* Grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass border border-primary-500/30 rounded-full text-sm text-primary-300 font-medium mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Powered by Advanced AI · Research Made Simple
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
            Research Smarter,<br />
            <span className="gradient-text">Write Faster</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            PaperBOT analyzes research papers, generates intelligent summaries, creates citations,
            and assists your academic writing — all powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary text-base px-8 py-3.5"
              >
                Start For Free <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/dashboard">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-secondary text-base px-8 py-3.5">
                <Brain className="w-5 h-5" /> View Live Demo
              </motion.button>
            </Link>
          </div>

          {/* Floating UI preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="glass border border-white/20 rounded-2xl overflow-hidden shadow-card">
              <div className="bg-dark-900/80 px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-slate-500 mx-auto">PaperBOT — AI Analysis</span>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {[
                  { label: 'Analyzing', value: 'Attention Is All You Need', icon: FileText, color: 'text-primary-400' },
                  { label: 'Extracted Keywords', value: '6 key terms found', icon: Search, color: 'text-emerald-400' },
                  { label: 'Summary Ready', value: 'TL;DR generated ✓', icon: Sparkles, color: 'text-accent-400' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <Icon className={`w-5 h-5 ${color} mb-2`} />
                    <p className="text-xs text-slate-500 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                    <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ delay: 1, duration: 1.5 }}
                        className={`h-full bg-gradient-to-r ${color === 'text-primary-400' ? 'from-primary-600 to-accent-500' : color === 'text-emerald-400' ? 'from-emerald-600 to-teal-500' : 'from-accent-600 to-pink-500'} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 left-0 right-0 h-24 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      <a href="#features" className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="p-2 rounded-full border border-white/20 text-slate-500 hover:text-white cursor-pointer">
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </a>
    </section>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) };

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <HeroSection />

      {/* Stats */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }, i) => (
            <motion.div key={label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="text-4xl font-display font-bold gradient-text mb-1">{value}</div>
              <div className="text-slate-400 text-sm">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="badge-primary mb-4 inline-flex">All-In-One Research Platform</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Everything You Need to<br /><span className="gradient-text">Accelerate Research</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">From PDF upload to publication-ready writing — PaperBOT handles every step of your research workflow.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div key={title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div whileHover={{ y: -4 }} className="glass p-6 h-full hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
                <div className={`inline-flex p-3 bg-gradient-to-br ${color} rounded-xl mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Showcase */}
      <section className="py-24 bg-gradient-to-b from-transparent via-primary-950/20 to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="badge-purple mb-4 inline-flex">AI-Powered Engine</span>
            <h2 className="text-4xl font-display font-bold text-white mb-5">Your AI Research<br /><span className="gradient-text">Co-Pilot</span></h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              PaperBOT's engine reads PDFs just like a human researcher — extracting structure, understanding context, identifying gaps, and generating publication-quality content.
            </p>
            <div className="space-y-4">
              {[
                { icon: Upload,     text: 'Upload any PDF research paper',              color: 'bg-blue-500/20 text-blue-400' },
                { icon: Brain,      text: 'AI extracts & understands all sections',     color: 'bg-purple-500/20 text-purple-400' },
                { icon: Sparkles,   text: 'Generates summaries, citations & reviews',   color: 'bg-accent-500/20 text-accent-400' },
                { icon: Shield,     text: 'Academic integrity preserved throughout',    color: 'bg-emerald-500/20 text-emerald-400' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${color}`}><Icon className="w-4 h-4" /></div>
                  <span className="text-slate-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass p-6 space-y-4 hover:shadow-glow transition-shadow duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">PaperBOT AI</p>
                <p className="text-slate-500 text-xs">Analyzing your paper…</p>
              </div>
            </div>
            {[
              { label: 'Reading PDF structure',    pct: 100, color: 'from-blue-600 to-primary-600'  },
              { label: 'Extracting key sections',  pct: 90,  color: 'from-primary-600 to-accent-600'},
              { label: 'Generating TL;DR',         pct: 75,  color: 'from-accent-600 to-pink-600'   },
              { label: 'Building citations',       pct: 60,  color: 'from-cyan-600 to-blue-600'     },
              { label: 'Finding research gaps',    pct: 45,  color: 'from-emerald-600 to-teal-600'  },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>{label}</span><span>{pct}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-4xl font-display font-bold text-white mb-3">Loved by Researchers<br /><span className="gradient-text">Worldwide</span></h2>
          <p className="text-slate-400">Join 50,000+ researchers from top institutions</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, avatar, text, rating, color }, i) => (
            <motion.div key={name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div whileHover={{ y: -4 }} className="glass p-6 h-full hover:border-white/20 transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold`}>{avatar}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-slate-500 text-xs">{role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-4xl font-display font-bold text-white mb-3">Simple, Transparent<br /><span className="gradient-text">Pricing</span></h2>
          <p className="text-slate-400">Start free. Upgrade when you need more power.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map(({ name, price, period, description, features, cta, highlighted, badge }, i) => (
            <motion.div key={name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`relative glass p-7 h-full flex flex-col transition-all duration-300 ${highlighted ? 'border-primary-500/50 bg-primary-600/10 shadow-glow' : 'hover:border-white/20'}`}
              >
                {badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white text-xs font-bold rounded-full">{badge}</span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-slate-400 text-sm font-medium mb-1">{name}</p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-5xl font-display font-bold text-white">${price}</span>
                    <span className="text-slate-400 text-sm mb-2">/{period}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{description}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${highlighted ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-glow' : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/20'}`}>
                  {cta}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto glass border border-primary-500/30 bg-gradient-to-br from-primary-900/30 to-accent-900/20 p-12 text-center rounded-3xl hover:shadow-glow-lg transition-shadow duration-500"
        >
          <Globe className="w-12 h-12 text-primary-400 mx-auto mb-5" />
          <h2 className="text-4xl font-display font-bold text-white mb-4">Ready to Transform Your Research?</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Join 50,000+ researchers using PaperBOT to work smarter, write faster, and publish more.</p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(99,102,241,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-lg px-10 py-4"
            >
              Get Started Free — No Card Required <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-white">PaperBOT</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">AI-powered research assistant for the modern academic.</p>
          </div>
          {[
            { title: 'Product',  links: ['Features', 'Pricing', 'Changelog', 'Roadmap']    },
            { title: 'Company',  links: ['About', 'Blog', 'Careers', 'Press']              },
            { title: 'Support',  links: ['Documentation', 'Help Center', 'Privacy', 'Terms'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-white font-semibold text-sm mb-4">{title}</p>
              <ul className="space-y-2">
                {links.map(l => <li key={l}><a href="#" className="text-slate-500 text-sm hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-slate-500 text-sm">
          © 2025 PaperBOT. All rights reserved. Built with ❤️ for researchers worldwide.
        </div>
      </footer>
    </div>
  );
}
