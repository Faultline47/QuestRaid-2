import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, User, Award, ShieldCheck } from 'lucide-react';

export default function Leaderboard() {
  const { profile } = useAuth();

  const runners = [
    { id: 1, name: 'Electro_Master', level: 142, xp: '2.02M', masteries: ['Electrician', 'HVAC'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
    { id: 2, name: 'RunnerPrime', level: 118, xp: '1.4M', masteries: ['Courier', 'IT'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
    { id: 3, name: 'TheHandyman', level: 98, xp: '960K', masteries: ['Plumber', 'Labor'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
    { id: 4, name: 'CyberDoc', level: 85, xp: '722K', masteries: ['IT Support'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4' },
    { id: 5, name: 'FastEddie', level: 72, xp: '518K', masteries: ['Fast Courier'], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-4xl font-black italic tracking-tighter text-white">THE GLOBAL RANKINGS</h1>
        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Top Rated Elite Runners</p>
      </header>

      {/* Podium Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-12">
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="order-2 md:order-1 p-8 rounded-[40px] bg-slate-900 border border-slate-800 text-center relative group hover:border-accent-cyan transition-all"
        >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-950 font-black italic text-slate-400">2</div>
            <img src={runners[1].avatar} className="w-24 h-24 mx-auto rounded-full border-4 border-slate-700 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black italic text-white mb-1">{runners[1].name}</h3>
            <div className="text-accent-cyan font-black italic mb-4">LVL {runners[1].level}</div>
            <div className="text-xs font-black text-slate-500 uppercase tracking-widest">{runners[1].xp} XP</div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="order-1 md:order-2 p-10 rounded-[48px] bg-gradient-to-b from-accent-blue/20 to-slate-900 border-2 border-accent-blue text-center relative shadow-2xl shadow-accent-blue/10 group hover:border-accent-cyan transition-all"
        >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center border-4 border-slate-950 font-black italic text-white shadow-xl shadow-accent-blue/30">1</div>
            <img src={runners[0].avatar} className="w-32 h-32 mx-auto rounded-full border-4 border-accent-blue mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black italic text-white mb-1">{runners[0].name}</h3>
            <div className="text-accent-cyan font-black italic mb-4">LVL {runners[0].level}</div>
            <div className="text-xs font-black text-slate-500 uppercase tracking-widest">{runners[0].xp} XP</div>
            <div className="mt-6 flex justify-center gap-2">
                <ShieldCheck className="text-accent-blue" />
                <Award className="text-accent-cyan" />
            </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="order-3 p-8 rounded-[40px] bg-slate-900 border border-slate-800 text-center relative group hover:border-accent-cyan transition-all"
        >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-950 font-black italic text-slate-500">3</div>
            <img src={runners[2].avatar} className="w-24 h-24 mx-auto rounded-full border-4 border-slate-700 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black italic text-white mb-1">{runners[2].name}</h3>
            <div className="text-accent-cyan font-black italic mb-4">LVL {runners[2].level}</div>
            <div className="text-xs font-black text-slate-500 uppercase tracking-widest">{runners[2].xp} XP</div>
        </motion.div>
      </section>

      {/* List View */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Honorable Mentions</h3>
        {runners.slice(3).map((r, i) => (
            <div key={r.id} className="p-6 rounded-[32px] bg-slate-900 border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-6">
                    <span className="w-8 font-black italic text-slate-700">{i + 4}</span>
                    <img src={r.avatar} className="w-12 h-12 rounded-xl" />
                    <div>
                        <h4 className="font-bold text-white italic">{r.name}</h4>
                        <div className="flex gap-2 mt-1">
                            {r.masteries.map(m => (
                                <span key={m} className="px-2 py-0.5 rounded-lg bg-slate-800 text-[8px] font-black uppercase text-slate-500">{m}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xl font-black italic text-white font-geist-mono">LVL {r.level}</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{r.xp} XP</div>
                </div>
            </div>
        ))}
      </section>
    </div>
  );
}
