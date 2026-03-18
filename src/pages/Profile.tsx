import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Camera,
  CheckCircle2,
  ShieldCheck,
  Trophy,
  Star,
  Settings,
  ChevronRight,
  User,
  Activity,
  Award
} from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { calculateLevel, calculateXPForNextLevel } from '../utils/rpg';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Profile() {
  const { user, profile, toggleRole } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || '',
    bio: profile?.bio || ''
  });

  if (!profile) return null;

  const isRunner = profile.role === 'runner';
  const level = calculateLevel(profile.xp);
  const xpForNextLevel = calculateXPForNextLevel(level);
  const progress = (profile.xp / xpForNextLevel) * 100;

  const handleUpdate = async () => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      displayName: formData.displayName,
      bio: formData.bio
    });
    setIsEditing(false);
  };

  const milestones = [
    { level: 5, label: 'Trusted Runner Badge', unlocked: level >= 5 },
    { level: 10, label: 'Priority Quest Feed', unlocked: level >= 10 },
    { level: 50, label: 'Lightning Uniform', unlocked: level >= 50 },
    { level: 100, label: 'Physical Reward Pack', unlocked: level >= 100 }
  ];

  const trueRatedMasteries = ['Electrician', 'Plumber', 'HVAC Tech', 'IT Support'];
  const customerRatedMasteries = ['Expert Shopper', 'Fast Courier', 'Heavy Lifter', 'Pet Whisperer'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header Profile Card */}
      <section className="relative overflow-hidden p-8 rounded-[32px] bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 text-slate-800 opacity-20 pointer-events-none">
          <Activity size={240} strokeWidth={1} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className={cn(
              "w-32 h-32 rounded-3xl overflow-hidden border-4",
              isRunner ? "border-accent-cyan" : "border-accent-blue"
            )}>
              <img src={profile.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.uid}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-slate-800 rounded-xl border border-slate-700 hover:text-accent-blue transition-colors">
              <Camera size={18} />
            </button>
          </div>

          <div className="text-center md:text-left flex-1">
            {isEditing ? (
              <div className="space-y-4 max-w-md">
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={e => setFormData({...formData, displayName: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white font-bold text-2xl"
                />
                <textarea
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-slate-300 h-24"
                  placeholder="Tell us about yourself..."
                />
                <div className="flex gap-2">
                  <button onClick={handleUpdate} className="px-6 py-2 bg-accent-blue rounded-xl font-bold">Save Changes</button>
                  <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-slate-800 rounded-xl font-bold">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black italic tracking-tighter text-white">{profile.displayName || 'Citizen'}</h1>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-700">Citizen</span>
                </div>
                <p className="text-slate-400 text-lg mb-6 max-w-lg">{profile.bio || "Welcome to QuestRaid. Ready to take on the world?"}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl font-bold text-sm border border-slate-700 hover:bg-slate-700 transition-all">
                    <Settings size={16} /> Edit Profile
                  </button>
                  <button onClick={toggleRole} className="flex items-center gap-2 px-4 py-2 bg-accent-blue/10 text-accent-cyan rounded-xl font-bold text-sm border border-accent-cyan/20 hover:bg-accent-blue/20 transition-all">
                    Switch to {isRunner ? 'Giver' : 'Runner'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Runner RPG Progress (Always visible if level > 0 or in runner mode) */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-8 rounded-[32px] bg-slate-900 border border-slate-800 shadow-xl">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-sm uppercase font-black tracking-widest text-slate-500 mb-1">XP Progression</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black italic text-accent-cyan">LVL {level}</span>
                  <span className="text-slate-400 font-bold font-geist-mono">{profile.xp} / {xpForNextLevel} XP</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-lg shadow-accent-cyan/20">
                <Trophy size={32} />
              </div>
           </div>

           <div className="relative h-6 bg-slate-800 rounded-full overflow-hidden mb-8 border border-slate-700">
             <motion.div
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-blue to-accent-cyan shadow-[0_0_20px_rgba(14,165,233,0.5)]"
             />
           </div>

           <div className="space-y-4">
              <h3 className="text-xs uppercase font-black tracking-widest text-slate-500 mb-4">Milestone Unlocks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {milestones.map((m) => (
                  <div key={m.level} className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border transition-all",
                    m.unlocked ? "bg-accent-cyan/10 border-accent-cyan/30 text-white" : "bg-slate-950/50 border-slate-800 text-slate-600 grayscale"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", m.unlocked ? "bg-accent-cyan/20" : "bg-slate-800")}>
                        <Award size={16} />
                      </div>
                      <span className="font-bold text-sm">{m.label}</span>
                    </div>
                    <span className="text-xs font-black">LVL {m.level}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>

        <div className="space-y-6">
            <div className="p-8 rounded-[32px] bg-slate-900 border border-slate-800 shadow-xl h-full">
                <h3 className="text-sm uppercase font-black tracking-widest text-slate-500 mb-6">Masteries</h3>

                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-black uppercase text-accent-blue mb-3">True-Rated (Verified)</p>
                        <div className="flex flex-wrap gap-2">
                            {trueRatedMasteries.map(m => (
                                <span key={m} className={cn(
                                    "px-3 py-1 rounded-lg text-xs font-bold border transition-all",
                                    profile.masteries.includes(m) ? "bg-accent-blue/20 border-accent-blue text-white" : "bg-slate-800/30 border-slate-800 text-slate-500"
                                )}>{m}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-black uppercase text-accent-cyan mb-3">Community-Vouched</p>
                        <div className="flex flex-wrap gap-2">
                            {customerRatedMasteries.map(m => (
                                <span key={m} className={cn(
                                    "px-3 py-1 rounded-lg text-xs font-bold border transition-all",
                                    profile.masteries.includes(m) ? "bg-accent-cyan/20 border-accent-cyan text-white" : "bg-slate-800/30 border-slate-800 text-slate-500"
                                )}>{m}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Ratings Section */}
      <section className="p-8 rounded-[32px] bg-slate-900 border border-slate-800 shadow-xl">
        <h2 className="text-sm uppercase font-black tracking-widest text-slate-500 mb-8">Reputation Engine</h2>
        <div className="grid md:grid-cols-2 gap-12">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-white">Runner Rating</h3>
                    <div className="flex items-center gap-1 text-accent-cyan font-black text-xl italic">
                        <Star size={20} fill="currentColor" /> 4.9 <span className="text-slate-500 text-sm not-italic">(128 reviews)</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm text-white">Giver #4202</span>
                            <span className="text-[10px] text-slate-500 uppercase font-black">2 days ago</span>
                        </div>
                        <p className="text-sm text-slate-400">"Absolute legend. Fixed my leaking pipe in 20 minutes. Very professional."</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-white">Shadow Rating</h3>
                    <div className="group relative">
                        <div className="flex items-center gap-1 text-accent-blue font-black text-xl italic blur-md select-none group-hover:blur-none transition-all cursor-help">
                            <Star size={20} fill="currentColor" /> 5.0
                        </div>
                        <div className="absolute top-full right-0 mt-2 w-48 p-2 bg-slate-800 text-[10px] text-slate-400 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                            Internal metric visible only to other Runners to ensure a toxic-free community.
                        </div>
                    </div>
                </div>
                <p className="text-sm text-slate-500 italic mb-4">Visible to Runners to inform bounty acceptance.</p>
                <div className="p-6 rounded-2xl bg-accent-blue/5 border border-accent-blue/10 border-dashed text-center">
                    <ShieldCheck size={24} className="mx-auto text-accent-blue mb-2" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trust Index Secured</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
