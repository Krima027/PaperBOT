// src/components/Card.jsx
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  onClick,
  padding = true,
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.005 } : {}}
      onClick={onClick}
      className={`glass ${padding ? 'p-6' : ''} ${glow ? 'hover:shadow-glow hover:border-primary-500/40' : 'hover:bg-white/10'} transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ title, subtitle, action, icon: Icon }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 bg-primary-500/20 rounded-lg">
            <Icon className="w-5 h-5 text-primary-400" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-white text-base">{title}</h3>
          {subtitle && <p className="text-slate-400 text-sm mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
