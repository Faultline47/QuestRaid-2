import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Wallet, Plus, CreditCard, History, ArrowUpRight, ArrowDownLeft, Zap } from 'lucide-react';

export default function WalletDetail() {
  const { profile } = useAuth();

  const transactions = [
    { id: 1, type: 'spent', amount: 350, title: 'Grocery Delivery', date: '2 hours ago' },
    { id: 2, type: 'earned', amount: 1200, title: 'Sink Repair Bounty', date: 'Yesterday' },
    { id: 3, type: 'topup', amount: 5000, title: 'Wallet Top-Up (GCash)', date: '3 days ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-4xl font-black italic tracking-tighter text-white">CITIZEN WALLET</h1>
        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Manage Your Quest Credits</p>
      </header>

      <section className="p-10 rounded-[40px] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 text-accent-blue opacity-10 pointer-events-none">
            <Wallet size={200} />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <p className="text-[10px] font-black uppercase text-accent-blue mb-2 tracking-widest">Current Balance</p>
                <h2 className="text-6xl font-black italic text-white tracking-tighter mb-6 font-geist-mono">₱12,850.00</h2>
                <div className="flex gap-4">
                    <button className="flex-1 py-4 bg-accent-blue text-white rounded-2xl font-black italic flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg shadow-accent-blue/20">
                        <Plus size={20} /> TOP-UP
                    </button>
                    <button className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black italic flex items-center justify-center gap-2 hover:scale-105 transition-all">
                        <CreditCard size={20} /> WITHDRAW
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-800 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase">Vault Credits</p>
                        <p className="font-bold text-white">₱10,000 Locked</p>
                    </div>
                    <Zap className="text-accent-cyan" />
                </div>
                <p className="text-xs text-slate-500 italic">Locked credits are reserved for active quest contracts currently in progress.</p>
            </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-2">
            <History size={20} className="text-slate-500" />
            <h3 className="text-lg font-black text-white italic tracking-tight">TRANSACTION LOG</h3>
        </div>

        <div className="space-y-4">
            {transactions.map(tx => (
                <div key={tx.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            tx.type === 'earned' ? 'bg-green-500/10 text-green-400' :
                            tx.type === 'spent' ? 'bg-red-500/10 text-red-400' : 'bg-accent-blue/10 text-accent-blue'
                        }`}>
                            {tx.type === 'earned' ? <ArrowDownLeft size={24} /> :
                             tx.type === 'spent' ? <ArrowUpRight size={24} /> : <Plus size={24} />}
                        </div>
                        <div>
                            <h4 className="font-bold text-white">{tx.title}</h4>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{tx.date}</p>
                        </div>
                    </div>
                    <div className={`text-xl font-black italic font-geist-mono ${
                        tx.type === 'earned' ? 'text-green-400' :
                        tx.type === 'spent' ? 'text-red-400' : 'text-white'
                    }`}>
                        {tx.type === 'spent' ? '-' : '+'}{tx.amount}
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
