import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  badge?: string;
  className?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  trend,
  trendType = 'positive',
  icon: Icon,
  badge,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 sm:p-5 rounded-2xl bg-[#121824] border border-slate-800/90 hover:border-slate-700/80 transition-all ${
        onClick ? 'cursor-pointer hover:bg-slate-800/20 active:scale-[0.99]' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-300">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums tracking-tight">
          {value}
        </div>
        {badge && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
            {badge}
          </span>
        )}
      </div>

      {(subValue || trend) && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={`font-semibold ${
                trendType === 'positive'
                  ? 'text-emerald-400'
                  : trendType === 'negative'
                  ? 'text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              {trend}
            </span>
          )}
          {subValue && <span className="text-slate-500">{subValue}</span>}
        </div>
      )}
    </div>
  );
};
