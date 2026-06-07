// src/components/EmptyState.jsx
import { motion } from 'framer-motion';
import { FileQuestion } from 'lucide-react';

export default function EmptyState({ icon: Icon = FileQuestion, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="p-5 bg-primary-500/10 border border-primary-500/20 rounded-2xl mb-5">
        <Icon className="w-10 h-10 text-primary-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">{description}</p>
      {action}
    </motion.div>
  );
}
