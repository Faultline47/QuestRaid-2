import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Sword, Zap, CheckCircle, Clock, MapPin, Star, UserCheck } from 'lucide-react';

export default function Landing() {
  const { signIn } = useAuth();

  return (
    <div className="bg-primary-bg text-white font-geist-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/10 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/20 border border-accent-blue/30 text-accent-cyan text-sm font-bold mb-6">
            <Zap size={16} />
            <span>V1 ALPHA NOW LIVE</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            QUESTRAID
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The World is Your Quest Board. A decentralized marketplace where high-trust fulfillment meets RPG mechanics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={signIn}
              className="px-10 py-4 bg-accent-blue hover:bg-accent-cyan text-white rounded-2xl font-black text-lg shadow-xl shadow-accent-blue/20 transition-all flex items-center justify-center gap-2"
            >
              <Sword size={24} />
              BECOME A CITIZEN
            </button>
            <button className="px-10 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white rounded-2xl font-black text-lg transition-all">
              EXPLORE THE FEED
            </button>
          </div>
        </motion.div>

        {/* Floating elements animation */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-accent-blue/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </section>

      {/* Dual-Track Marketing Section */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* For Quest Givers */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-accent-blue/50 transition-all group"
          >
            <div className="w-16 h-16 bg-accent-blue/20 rounded-2xl flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 transition-transform">
              <Shield size={32} />
            </div>
            <h2 className="text-3xl font-black mb-4 italic">FOR THE GIVERS</h2>
            <p className="text-slate-400 mb-8 text-lg">Reclaim your time. Outsource your life to verified high-level Runners. From groceries to electrical repairs, consider it done.</p>
            <ul className="space-y-4 mb-8">
              {[
                "Vetted 'True-Rated' professionals",
                "Advanced 'Strict/Flex' fulfillment rules",
                "Asymmetric 'Shadow Ratings' for safety",
                "Milestone-gated Runner requirements"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={20} className="text-accent-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* For Runners */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-accent-cyan/50 transition-all group"
          >
            <div className="w-16 h-16 bg-accent-cyan/20 rounded-2xl flex items-center justify-center text-accent-cyan mb-6 group-hover:scale-110 transition-transform">
              <Sword size={32} />
            </div>
            <h2 className="text-3xl font-black mb-4 italic">FOR THE RUNNERS</h2>
            <p className="text-slate-400 mb-8 text-lg">Level up your life, literally. Earn XP for every PHP you make. Unlock prestige, badges, and the legendary Lightning Uniform.</p>
            <ul className="space-y-4 mb-8">
              {[
                "Uncapped RPG Leveling system",
                "Mastery system for specialized skills",
                "Priority quest access for Elites",
                "Voluntary bounty-based work feed"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={20} className="text-accent-cyan" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* Trust & Prestige Section */}
      <section className="py-24 px-4 border-t border-slate-900">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-16 italic underline decoration-accent-blue decoration-4 underline-offset-8">THE PRESTIGE SYSTEM</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="p-4">
                    <div className="text-accent-blue text-4xl font-black mb-2">LVL 5</div>
                    <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">TRUSTED BADGE</div>
                </div>
                <div className="p-4">
                    <div className="text-accent-cyan text-4xl font-black mb-2">LVL 10</div>
                    <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">EARLY ACCESS</div>
                </div>
                <div className="p-4">
                    <div className="text-white text-4xl font-black mb-2">LVL 50</div>
                    <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">LIGHTNING UNIFORM</div>
                </div>
                <div className="p-4">
                    <div className="text-accent-blue text-4xl font-black mb-2">LVL 100+</div>
                    <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">REAL REWARDS</div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-12 border-t border-slate-900 text-center">
        <div className="mb-8">
            <h2 className="text-2xl font-black italic">QUESTRAID</h2>
            <p className="text-slate-500 text-sm">© 2026 THE WORLD IS YOUR QUEST BOARD</p>
        </div>
      </footer>
    </div>
  );
}
