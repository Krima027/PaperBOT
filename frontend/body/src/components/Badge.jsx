// src/components/Badge.jsx
export default function Badge({ children, variant = 'primary', className = '' }) {
  const map = {
    primary:  'badge-primary',
    success:  'badge-success',
    warning:  'badge-warning',
    purple:   'badge-purple',
    danger:   'badge bg-red-500/20 text-red-300 border border-red-500/30',
    default:  'badge bg-white/10 text-slate-300 border border-white/20',
  };
  return <span className={`${map[variant] || map.default} ${className}`}>{children}</span>;
}
