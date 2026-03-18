import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Zap,
  ChevronRight,
  Filter,
  Package,
  Calendar,
  DollarSign
} from 'lucide-react';
import { doc, setDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function GiverDashboard() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'Pending' | 'On-Going' | 'Cancelled' | 'Finished'>('Pending');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = ['Pending', 'On-Going', 'Cancelled', 'Finished'];

  // Mock data for initial UI render
  const quests = [
    { id: 1, title: 'Grocery Delivery', status: 'Pending', reward: 150, location: 'SM North EDSA', time: 'ASAP' },
    { id: 2, title: 'Sink Repair', status: 'On-Going', reward: 800, location: 'Quezon City', time: '14:00 Today' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white">GIVER DASHBOARD</h1>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Active Quests Inventory</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="p-4 bg-accent-blue rounded-2xl text-white shadow-xl shadow-accent-blue/20 hover:scale-105 transition-all flex items-center gap-2 font-black"
        >
          <Plus size={24} />
          POST NEW QUEST
        </button>
      </header>

      {/* Stats Quick View */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active', value: 3, icon: Zap, color: 'text-accent-blue' },
          { label: 'Completed', value: 12, icon: CheckCircle, color: 'text-green-400' },
          { label: 'Cancelled', value: 1, icon: XCircle, color: 'text-red-400' },
          { label: 'Spent (PHP)', value: '15,200', icon: DollarSign, color: 'text-white' }
        ].map((stat, i) => (stat && (
          <div key={i} className="p-6 rounded-[24px] bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center">
            <stat.icon size={20} className={cn("mb-2", stat.color)} />
            <span className="text-2xl font-black italic text-white">{stat.value}</span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
          </div>
        )))}
      </section>

      {/* Inventory Tabs */}
      <section className="space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                activeTab === tab
                  ? "bg-slate-800 text-white border border-slate-700"
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {quests.map(q => (
            <div key={q.id} className="p-6 rounded-[32px] bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue/10 transition-colors">
                      <Package size={32} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-white italic tracking-tight">{q.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-1">
                         <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                            <MapPin size={14} className="text-accent-blue" /> {q.location}
                         </span>
                         <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                            <Clock size={14} className="text-accent-blue" /> {q.time}
                         </span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                    <div className="text-right">
                        <span className="text-[10px] font-black text-slate-500 uppercase block mb-1">REWARD</span>
                        <span className="text-2xl font-black italic text-accent-cyan font-geist-mono">₱{q.reward}</span>
                    </div>
                    <button className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors text-slate-400">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* Create Quest Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="absolute inset-0 bg-primary-bg/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[40px] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
            >
               <div className="p-8 space-y-8">
                  <header>
                     <h2 className="text-3xl font-black italic tracking-tighter text-white">NEW QUEST CONTRACT</h2>
                     <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Define your requirements</p>
                  </header>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-accent-blue">Quest Title</label>
                        <input type="text" placeholder="e.g., Grocery Palengke Run" className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:border-accent-blue outline-none transition-all" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-accent-blue">Location / Node</label>
                        <input type="text" placeholder="e.g., SM Aura BGC" className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:border-accent-blue outline-none transition-all" />
                    </div>
                  </div>

                  <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-accent-blue">Detailed Description</label>
                      <textarea placeholder="List specific items, instructions, or specialized needs..." className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white h-32 focus:border-accent-blue outline-none transition-all" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <label className="text-[10px] font-black uppercase text-accent-blue">Fulfillment Intelligence</label>
                        <div className="flex p-1 bg-slate-800 rounded-2xl border border-slate-700">
                           <button className="flex-1 py-3 px-4 rounded-xl bg-accent-blue text-white text-xs font-black uppercase tracking-wider">Strict</button>
                           <button className="flex-1 py-3 px-4 rounded-xl text-slate-500 text-xs font-black uppercase tracking-wider hover:text-white transition-colors">Flexible</button>
                        </div>
                        <p className="text-xs text-slate-500 italic">"Flexible" allows Runners to suggest substitutions if items are out of stock.</p>
                     </div>

                     <div className="space-y-6">
                        <label className="text-[10px] font-black uppercase text-accent-blue">Scheduling</label>
                        <div className="flex p-1 bg-slate-800 rounded-2xl border border-slate-700">
                           <button className="flex-1 py-3 px-4 rounded-xl bg-slate-700 text-white text-xs font-black uppercase tracking-wider">Post Now</button>
                           <button className="flex-1 py-3 px-4 rounded-xl text-slate-500 text-xs font-black uppercase tracking-wider hover:text-white transition-colors">Schedule</button>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Calendar size={14} />
                            <span className="text-xs font-bold">Today, ASAP</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase text-accent-blue">Tipping Bonus (Instant XP)</label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {['₱30', '₱50', '₱70', '₱100', '₱250', 'Custom'].map(amt => (
                            <button key={amt} className="py-3 px-2 rounded-xl border border-slate-700 text-xs font-black text-slate-400 hover:border-accent-cyan hover:text-accent-cyan transition-all">
                                {amt}
                            </button>
                        ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-accent-blue/5 border border-accent-blue/10">
                     <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="text-accent-blue" />
                        <span className="text-sm font-black uppercase italic text-white tracking-widest">Skill Gating</span>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-black uppercase text-slate-400 hover:border-accent-cyan transition-colors">LVL 5+ REQ</button>
                        <button className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-black uppercase text-slate-400 hover:border-accent-cyan transition-colors">CERTIFIED ELECTRICIAN</button>
                        <button className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-black uppercase text-slate-400 hover:border-accent-cyan transition-colors">TOP RATED ONLY</button>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase text-accent-blue">Payment Method</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['GCash', 'Maya', 'Visa/MC', 'Wallet'].map(p => (
                            <div key={p} className="p-4 rounded-2xl border border-slate-800 bg-slate-950/50 flex flex-col items-center justify-center gap-2 grayscale hover:grayscale-0 cursor-pointer hover:border-accent-blue transition-all">
                                <CreditCard size={18} className="text-slate-500" />
                                <span className="text-[10px] font-black uppercase tracking-wider">{p}</span>
                            </div>
                        ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row gap-4">
                    <button className="flex-1 py-5 bg-accent-blue text-white rounded-3xl font-black italic tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-blue/30">
                        AUTHORIZE & DEPLOY QUEST
                    </button>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="py-5 px-10 bg-slate-800 text-slate-400 rounded-3xl font-black uppercase text-xs hover:bg-slate-700 transition-colors"
                    >
                        CANCEL
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
