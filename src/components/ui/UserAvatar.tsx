import React from 'react';
import { User } from 'lucide-react';

interface UserAvatarProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name = 'Momar Diop',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 text-xl',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8 sm:w-10 sm:h-10',
  };

  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-orange-950/60 border border-orange-500/40 shadow-md flex items-center justify-center text-orange-400 shrink-0 ${sizeClasses[size]} ${className}`}
      title={name}
      aria-label={`Profil de ${name}`}
    >
      <User className={`${iconSizes[size]} stroke-[2.2]`} />
      {/* Small Pro indicator dot */}
      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0B0F17]" />
    </div>
  );
};
