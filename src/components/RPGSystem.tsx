import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap } from 'lucide-react';
import { calculateLevel } from '../utils/rpg';

export function LevelUpCelebration() {
  const { profile } = useAuth();
  const [lastLevel, setLastLevel] = useState<number | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (profile) {
      const currentLevel = calculateLevel(profile.xp);
      if (lastLevel !== null && currentLevel > lastLevel) {
        setShow(true);
        const timer = setTimeout(() => setShow(false), 5000);
        return () => clearTimeout(timer);
      }
      setLastLevel(currentLevel);
    }
  }, [profile?.xp]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <div className="bg-accent-blue/90 backdrop-blur-xl p-12 rounded-[60px] border-4 border-accent-cyan shadow-[0_0_100px_rgba(14,165,233,0.5)] text-center relative">
            <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 flex items-center justify-center opacity-20"
            >
                <Zap size={300} className="text-white" />
            </motion.div>

            <div className="relative z-10">
                <Trophy size={80} className="mx-auto text-white mb-6" />
                <h2 className="text-6xl font-black italic text-white tracking-tighter mb-2">LEVEL UP!</h2>
                <p className="text-2xl font-bold text-accent-cyan">You've reached Level {lastLevel && lastLevel + 1}</p>
                <div className="mt-8 flex gap-4 justify-center">
                    <div className="px-4 py-2 bg-white/20 rounded-full text-white text-xs font-black uppercase tracking-widest">New Perks Unlocked</div>
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ReputationSystem() {
    // This is a UI-only component to demonstrate the asymmetric ratings logic
    return (
        <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-blue rounded-xl flex items-center justify-center text-white">
                        <Star size={20} fill="currentColor" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase">Public Runner Rating</p>
                        <p className="font-bold text-white">4.9 / 5.0 <span className="text-slate-500 font-normal">(128 reviews)</span></p>
                    </div>
                </div>
                <button className="text-[10px] font-black text-accent-blue uppercase hover:underline">View All</button>
             </div>

             <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl border-dashed">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-accent-cyan">
                        <Zap size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase">Hidden Giver Rating</p>
                        <p className="font-bold text-accent-cyan">TRUSTED GIVER <span className="text-slate-500 font-normal">(4.8 Shadow Score)</span></p>
                    </div>
                </div>
                <div className="group relative">
                    <div className="cursor-help text-slate-500">
                        <Zap size={16} />
                    </div>
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-[10px] text-slate-400 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                        Visible only to Runners to prevent toxic customer interactions.
                    </div>
                </div>
             </div>
        </div>
    );
}
