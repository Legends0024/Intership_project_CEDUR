import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({
  children,
  className,
  variant = 'brand',
  dot = false,
  icon: Icon,
  ...props
}) {
  const variants = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200/80',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    violet: 'bg-purple-50 text-purple-700 border-purple-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const dotColors = {
    brand: 'bg-brand-500',
    emerald: 'bg-emerald-500',
    violet: 'bg-purple-500',
    amber: 'bg-amber-500',
    cyan: 'bg-cyan-500',
    slate: 'bg-slate-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', dotColors[variant])}
        />
      )}
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
