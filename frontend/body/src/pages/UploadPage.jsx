// src/pages/UploadPage.jsx
import { uploadPaper } from "../api/paperApi";
import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, FileText, X, CheckCircle, AlertCircle,
  CloudUpload, FileSearch, Sparkles,
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card, { CardHeader } from '../components/Card';
import Button from '../components/Button';

const TIPS = [
  'Supports PDF files up to 100MB',
  'Scanned PDFs may produce reduced accuracy',
  'Multiple papers can be queued for upload',
  'Analysis begins automatically after upload',
];

function getUser() {
  try {
    const stored = localStorage.getItem('user');
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function saveToHistory(email, entries) {
  if (!email) return;
  try {
    const existing = JSON.parse(localStorage.getItem(`history_${email}`) || '[]');
    const updated = [...entries, ...existing];
    localStorage.setItem(`history_${email}`, JSON.stringify(updated));
  } catch {}
}

export default function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState({});
  const inputRef = useRef();
  const navigate = useNavigate();

  const addFiles = useCallback((newFiles) => {
    const pdfs = Array.from(newFiles).filter(f => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
    setFiles(prev => [...prev, ...pdfs.map(f => ({ 
      file: f, 
      id: Math.random().toString(36).slice(2) 
    }))]);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const removeFile = (id) => setFiles(f => f.filter(x => x.id !== id));

  const startUpload = async () => {
    if (!files.length || uploading) return;

    setUploading(true);
    const results = [];

    try {
      for (const fileObj of files) {
        const { file, id } = fileObj;

        const interval = setInterval(() => {
          setProgress(prev => ({
            ...prev,
            [id]: Math.min((prev[id] || 0) + 5, 95)
          }));
        }, 100);

        try {
          const result = await uploadPaper(file);
          results.push({ result, file });
          setProgress(prev => ({ ...prev, [id]: 100 }));
        } catch (err) {
          console.error(`Failed to upload: ${file.name}`, err);
          throw err;
        } finally {
          clearInterval(interval);
        }
      }

      // Save analysis data as before
      const analysisData = results.map(r => r.result);
      localStorage.setItem("paperAnalysis", JSON.stringify(analysisData.length > 1 ? analysisData : analysisData[0]));
      localStorage.setItem("paperText", results[0].result.full_text);

      // Save to per-user history so HistoryPage & ProfilePage pick it up
      const user = getUser();
      const email = user?.email || '';
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);

      const historyEntries = results.map(({ result, file }, idx) => {
        // Count how many papers this user already has to generate "Paper Upload N"
        let existingCount = 0;
        try {
          const existing = JSON.parse(localStorage.getItem(`history_${email}`) || '[]');
          existingCount = existing.length;
        } catch {}

        return {
          id: `${Date.now()}_${idx}`,
          title: result.title || `Paper Upload ${existingCount + idx + 1}`,
          authors: Array.isArray(result.authors) ? result.authors.join(', ') : (result.authors || ''),
          year: result.year || null,
          date: dateStr,
          status: 'Analyzed',
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          pages: result.pages || null,
        };
      });

      saveToHistory(email, historyEntries);

      setDone(true);
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      alert(error.message || "An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const resetPage = () => {
    setFiles([]);
    setDone(false);
    setProgress({});
  };

  if (done) return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto text-center py-20">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}
          className="inline-flex p-6 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-6"
        >
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-3xl font-display font-bold text-white mb-3"
        >
          Upload Successful!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-slate-400 mb-8"
        >
          Your paper{files.length > 1 ? 's are' : ' is'} being analyzed by our AI. This takes about 30 seconds.
        </motion.p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/analysis')} icon={<FileSearch className="w-4 h-4" />}>
            View Analysis
          </Button>
          <Button variant="secondary" onClick={resetPage} icon={<Upload className="w-4 h-4" />}>
            Upload Another
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Upload Research Paper</h1>
          <p className="text-slate-400 text-sm">Upload your PDF and PaperBOT will analyze it instantly.</p>
        </div>

        <motion.div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          animate={{ scale: dragging ? 1.02 : 1 }}
          className={`relative border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all duration-300 mb-6
            ${dragging
              ? 'border-primary-500 bg-primary-500/10 shadow-glow'
              : 'border-white/20 hover:border-primary-500/50 hover:bg-white/5'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input 
            ref={inputRef} type="file" multiple accept=".pdf" className="hidden"
            onChange={e => { addFiles(e.target.files); e.target.value = ''; }} 
            disabled={uploading}
          />

          <AnimatePresence mode="wait">
            {dragging ? (
              <motion.div key="drag" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <CloudUpload className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <p className="text-primary-300 text-lg font-semibold">Drop your PDF here!</p>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}
                  className="inline-flex p-5 bg-primary-500/20 border border-primary-500/25 rounded-2xl mb-5">
                  <Upload className="w-10 h-10 text-primary-400" />
                </motion.div>
                <p className="text-white font-semibold text-lg mb-2">Drag & drop your PDF here</p>
                <p className="text-slate-400 text-sm mb-4">or <span className="text-primary-400 font-medium">click to browse</span> your files</p>
                <span className="badge-primary">PDF only · Max 100MB</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 mb-6">
              {files.map(({ file, id }) => (
                <motion.div key={id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                  className="glass p-4 flex items-center gap-4">
                  <div className="p-2.5 bg-primary-500/20 border border-primary-500/25 rounded-xl flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    {uploading && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>{progress[id] === 100 ? 'Analyzed' : 'Uploading…'}</span>
                          <span>{progress[id] || 0}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: `${progress[id] || 0}%` }}
                            className="h-full bg-gradient-to-r from-primary-600 to-accent-500 rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {!uploading && (
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => removeFile(id)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-red-400 transition-all">
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                  {uploading && progress[id] === 100 && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {files.length > 0 && !uploading && (
          <Button onClick={startUpload} size="lg" className="w-full justify-center" icon={<Sparkles className="w-5 h-5" />}>
            Analyze {files.length} Paper{files.length > 1 ? 's' : ''} with AI
          </Button>
        )}

        <Card className="mt-6" hover={false}>
          <CardHeader title="Upload Tips" icon={AlertCircle} />
          <ul className="space-y-2">
            {TIPS.map(t => (
              <li key={t} className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}