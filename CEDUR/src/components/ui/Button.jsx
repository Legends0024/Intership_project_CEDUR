import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(function Button(
  {
    children,
    className,
    variant = 'primary',
    size = 'md',
    as: Component = 'button',
    loading = false,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    ...props
  },
  ref
) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary:
      'bg-gradient-to-r from-brand-600 to-accent-violet hover:from-brand-700 hover:to-accent-violet/90 text-white shadow-md hover:shadow-lg shadow-brand-500/25 border border-transparent',
    secondary:
      'bg-slate-900 hover:bg-slate-800 text-white shadow-sm border border-slate-800',
    outline:
      'bg-white/80 hover:bg-white text-slate-800 border border-slate-200 hover:border-brand-500/50 shadow-sm hover:shadow',
    ghost:
      'bg-transparent hover:bg-slate-100/80 text-slate-700 hover:text-slate-900 border border-transparent',
    light:
      'bg-white text-brand-600 hover:bg-slate-50 shadow-md border border-slate-100',
    emerald:
      'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-full gap-2',
    lg: 'text-base px-7 py-3.5 rounded-full gap-2.5',
  };

  return (
    <Component
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </Component>
  );
});

export default Button;
