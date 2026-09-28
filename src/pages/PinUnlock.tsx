import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Delete, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { UserAvatar } from '../components/ui/UserAvatar';

export const PinUnlock: React.FC = () => {
  const navigate = useNavigate();
  const { user, unlockWithPin } = useAuth();
  const [pin, setPin] = useState('');
  const [errorShake, setErrorShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle keyboard typing on desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
        if (pin.length < 4) {
          handleDigit(e.key);
        }
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  const handleDigit = (digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setErrorMessage('');

    if (newPin.length === 4) {
      setTimeout(() => {
        validatePin(newPin);
      }, 150);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMessage('');
  };

  const validatePin = (inputPin: string) => {
    const isValid = unlockWithPin(inputPin);
    if (isValid) {
      navigate('/');
    } else {
      setErrorShake(true);
      setErrorMessage('Code PIN incorrect (par défaut : 2026)');
      setTimeout(() => {
        setErrorShake(false);
        setPin('');
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white flex flex-col justify-center items-center p-4 sm:p-6 select-none relative">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 flex flex-col items-center">
        {/* User Card */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="relative mb-3">
            <UserAvatar size="xl" name={user.name} />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-orange-400 shadow-md">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">{user.name}</h2>
          <p className="text-xs text-slate-400">{user.organization.name}</p>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-base font-bold text-white">Déverrouillage rapide</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Saisissez votre code PIN à 4 chiffres (défaut : <strong className="text-orange-400">2026</strong>)
          </p>
        </div>

        {/* PIN 4-Dots Indicators */}
        <motion.div
          animate={errorShake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-5 mb-8"
        >
          {[0, 1, 2, 3].map((index) => {
            const isFilled = pin.length > index;
            return (
              <motion.div
                key={index}
                animate={{
                  scale: isFilled ? 1.2 : 1,
                  backgroundColor: isFilled ? '#F97316' : '#1E293B',
                }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  isFilled
                    ? 'border-orange-400 shadow-md shadow-orange-500/50'
                    : 'border-slate-700 bg-slate-800'
                }`}
              />
            );
          })}
        </motion.div>

        {/* Error message */}
        <div className="h-6 mb-4 text-center">
          {errorMessage && (
            <span className="text-xs text-rose-400 font-semibold animate-fade-in">
              {errorMessage}
            </span>
          )}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3.5 w-full max-w-xs mb-8">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="h-14 rounded-2xl bg-[#121824] hover:bg-slate-800/80 active:bg-orange-500/20 active:border-orange-500/40 border border-slate-800 text-lg font-bold text-white shadow-sm flex items-center justify-center transition-all cursor-pointer font-mono"
            >
              {digit}
            </button>
          ))}

          {/* Empty or shortcut */}
          <button
            type="button"
            onClick={() => validatePin('2026')}
            className="h-14 rounded-2xl bg-[#0B0F17] text-slate-500 hover:text-orange-400 text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
            title="Saisie auto du code par défaut"
          >
            Auto 2026
          </button>

          {/* Zero */}
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="h-14 rounded-2xl bg-[#121824] hover:bg-slate-800/80 active:bg-orange-500/20 active:border-orange-500/40 border border-slate-800 text-lg font-bold text-white shadow-sm flex items-center justify-center transition-all cursor-pointer font-mono"
          >
            0
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            className="h-14 rounded-2xl bg-[#121824] hover:bg-slate-800/80 active:bg-slate-700 border border-slate-800 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Effacer le dernier chiffre"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Fallback to Login */}
        <div className="text-center space-y-2">
          <Link
            to="/login"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Changer de compte ou mot de passe classique →
          </Link>
        </div>
      </div>
    </div>
  );
};
