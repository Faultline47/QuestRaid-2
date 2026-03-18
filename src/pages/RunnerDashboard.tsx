import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  MapPin,
  Star,
  ShieldAlert,
  ChevronRight,
  Filter,
  Trophy,
  CheckCircle,
  MessageCircle,
  Phone,
  ArrowRight,
  CircleDashed,
  Target
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function RunnerDashboard() {
  const { profile } = useAuth();
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [activeQuest, setActiveQuest] = useState<any>(null);

  // Mock available quests for Bounty Board
  const availableQuests = [
    {
        id: 101,
        title: 'Grocery Haul: Strict Order',
        category: 'Shopping',
        reward: 350,
        distance: '1.2km',
        storeDist: '3.5km',
        giverRating: 4.8,
        giverName: 'Sarah M.',
        rules: 'STRICT: Do not substitute items.',
        desc: 'Need 2kg rice, 1 tray eggs, and specifically Bear Brand milk. Must be delivered by 11:00.'
    },
    {
        id: 102,
        title: 'Leaking Sink - Urgent',
        category: 'Plumbing',
        reward: 1200,
        distance: '0.8km',
        storeDist: '1.5km',
        giverRating: 5.0,
        giverName: 'Jason R.',
        rules: 'FLEXIBLE: Runner can buy necessary parts at nearby hardware.',
        desc: 'Kitchen sink is overflowing. Need someone with Plumbing mastery to fix it immediately.',
        gated: 'Mastery: Plumber'
    },
    {
        id: 103,
        title: 'Move Heavy Boxes',
        category: 'Labor',
        reward: 500,
        distance: '4.5km',
        storeDist: '0km',
        giverRating: 3.2,
        giverName: 'Anonymous Giver',
        rules: 'FLEXIBLE: Just bring the boxes to the 3rd floor.',
        desc: 'Need extra hands to move furniture and boxes into my new apartment. Estimated 2 hours.'
    }
  ];

  if (activeQuest) {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter text-accent-cyan">ACTIVE BOUNTY</h1>
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                        <CircleDashed size={14} className="animate-spin" /> In Progress
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="p-4 bg-slate-800 rounded-2xl text-slate-400 hover:text-white transition-colors">
                        <Phone size={24} />
                    </button>
                    <button className="p-4 bg-slate-800 rounded-2xl text-slate-400 hover:text-white transition-colors">
                        <MessageCircle size={24} />
                    </button>
                </div>
            </header>

            <section className="p-8 rounded-[40px] bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-accent-cyan opacity-10 pointer-events-none">
                    <Zap size={180} />
                </div>

                <div className="relative z-10 space-y-8">
                    <div>
                        <span className="px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">
                           {activeQuest.category}
                        </span>
                        <h2 className="text-3xl font-black italic text-white tracking-tight">{activeQuest.title}</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Rules</span>
                            <div className={cn(
                                "p-4 rounded-2xl border font-bold text-sm",
                                activeQuest.rules.includes('STRICT') ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-green-500/10 border-green-500/20 text-green-400"
                            )}>
                                {activeQuest.rules}
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Estimated Reward</span>
                            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-2xl font-black italic text-accent-cyan">
                                ₱{activeQuest.reward} + <span className="text-slate-400">XP {activeQuest.reward}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Objective</h3>
                        <p className="text-slate-300 leading-relaxed text-lg">{activeQuest.desc}</p>
                    </div>

                    <div className="pt-8 border-t border-slate-800">
                         <button
                           onClick={() => setActiveQuest(null)}
                           className="w-full py-5 bg-accent-cyan text-white rounded-3xl font-black italic tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-cyan/30"
                         >
                            COMPLETE MISSION
                         </button>
                    </div>
                </div>
            </section>
        </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-accent-cyan">BOUNTY BOARD</h1>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Available Quests in Your Region</p>
        </div>
        <button className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all">
          <Filter size={24} />
        </button>
      </header>

      {/* Quest Grid */}
      <section className="grid gap-6">
        {availableQuests.map(q => (
          <div
            key={q.id}
            onClick={() => setSelectedQuest(q)}
            className="p-8 rounded-[32px] bg-slate-900 border border-slate-800 hover:border-accent-cyan/50 hover:shadow-2xl hover:shadow-accent-cyan/10 transition-all cursor-pointer group relative overflow-hidden"
          >
             {q.gated && (
                <div className="absolute top-0 right-0 px-4 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                    <ShieldAlert size={14} className="inline mr-1" /> {q.gated}
                </div>
             )}

             <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-[10px] font-black uppercase tracking-widest rounded-full">{q.category}</span>
                      <span className="flex items-center gap-1 text-slate-500 font-bold text-xs">
                         <Star size={14} fill="currentColor" className="text-accent-blue" />
                         Giver Rating: {q.giverRating}
                      </span>
                   </div>
                   <h3 className="text-3xl font-black italic text-white group-hover:text-accent-cyan transition-colors tracking-tight">{q.title}</h3>

                   {/* Tri-Node Distance UI */}
                   <div className="flex items-center gap-4 text-xs font-bold text-slate-400 font-geist-mono">
                       <div className="flex flex-col items-center">
                          <Target size={14} className="text-accent-cyan mb-1" />
                          <span>YOU</span>
                       </div>
                       <div className="flex-1 h-px bg-slate-800 border-t border-dashed border-slate-700 relative">
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px]">{q.distance}</span>
                       </div>
                       <div className="flex flex-col items-center">
                          <MapPin size={14} className="text-accent-blue mb-1" />
                          <span>STORE</span>
                       </div>
                       <div className="flex-1 h-px bg-slate-800 border-t border-dashed border-slate-700 relative">
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px]">{q.storeDist}</span>
                       </div>
                       <div className="flex flex-col items-center">
                          <CheckCircle size={14} className="text-green-500 mb-1" />
                          <span>DROP</span>
                       </div>
                   </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-slate-800 pt-6 md:pt-0">
                    <div className="text-right">
                        <span className="text-[10px] font-black text-slate-500 uppercase block mb-1">TOTAL REWARD</span>
                        <span className="text-3xl font-black italic text-accent-cyan font-geist-mono">₱{q.reward}</span>
                        <div className="text-[10px] font-bold text-slate-500">+ {q.reward} XP</div>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-accent-cyan group-hover:text-white transition-all shadow-lg group-hover:shadow-accent-cyan/20">
                        <ArrowRight size={24} />
                    </div>
                </div>
             </div>
          </div>
        ))}
      </section>

      {/* Quest Details Modal */}
      <AnimatePresence>
        {selectedQuest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuest(null)}
              className="absolute inset-0 bg-primary-bg/95 backdrop-blur-md"
            />
            <motion.div
              layoutId={`quest-${selectedQuest.id}`}
              className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-[40px] shadow-2xl overflow-hidden"
            >
                <div className="p-8 space-y-8">
                   <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[10px] font-black uppercase text-accent-cyan tracking-widest bg-accent-cyan/10 px-3 py-1 rounded-full mb-3 inline-block">{selectedQuest.category}</span>
                            <h2 className="text-3xl font-black italic tracking-tighter text-white">{selectedQuest.title}</h2>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-accent-blue font-black text-xl italic mb-1">
                                <Star size={20} fill="currentColor" /> {selectedQuest.giverRating}
                            </div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shadow Rating</span>
                        </div>
                   </div>

                   <div className="p-6 rounded-3xl bg-slate-950/50 border border-slate-800 space-y-4">
                       <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mission Intelligence</h3>
                       <p className="text-slate-300">{selectedQuest.desc}</p>
                       <div className={cn(
                           "p-4 rounded-xl border text-sm font-bold",
                           selectedQuest.rules.includes('STRICT') ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-green-500/10 border-green-500/20 text-green-400"
                       )}>
                           {selectedQuest.rules}
                       </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-slate-800 text-center">
                            <span className="text-[10px] font-black text-slate-500 uppercase block mb-1">XP EARN</span>
                            <span className="text-2xl font-black text-white italic">+{selectedQuest.reward}</span>
                        </div>
                        <div className="p-6 rounded-3xl bg-slate-800 text-center">
                            <span className="text-[10px] font-black text-slate-500 uppercase block mb-1">PAYOUT</span>
                            <span className="text-2xl font-black text-accent-cyan italic font-geist-mono">₱{selectedQuest.reward}</span>
                        </div>
                   </div>

                   <div className="pt-8 border-t border-slate-800">
                        <button
                          onClick={() => {
                              setActiveQuest(selectedQuest);
                              setSelectedQuest(null);
                          }}
                          className="w-full py-5 bg-accent-blue text-white rounded-3xl font-black italic tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-blue/30"
                        >
                           ACCEPT BOUNTY
                        </button>
                   </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
