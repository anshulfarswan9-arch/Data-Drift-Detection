"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Database, BarChart3, 
  RefreshCw, AlertTriangle, 
  Zap, Info, LayoutDashboard, Cpu, HardDrive, Bell, ShieldCheck, Terminal, Loader2, Gauge, TrendingUp
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, LabelList
} from 'recharts';

const generateData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    time: `${i + 1}h`,
    drift: (0.1 + Math.random() * 0.5).toFixed(2),
    latency: Math.floor(10 + Math.random() * 20),
    load: Math.floor(20 + Math.random() * 60),
  }));
};

const referenceSet = [
  { id: 1, feature: "User_Income", mean: "54.2k", std: "1.2", type: "Numerical" },
  { id: 2, feature: "User_Age", mean: "34.5", std: "8.2", type: "Numerical" },
  { id: 3, feature: "Credit_Score", mean: "710", std: "45", type: "Numerical" },
  { id: 4, feature: "DTI_Ratio", mean: "0.28", std: "0.05", type: "Ratio" },
  { id: 5, feature: "Emp_Length", mean: "6.2yr", std: "2.1", type: "Temporal" },
  { id: 6, feature: "Loan_Amount", mean: "15k", std: "2.5k", type: "Numerical" },
  { id: 7, feature: "Geo_Region", mean: "N/A", std: "N/A", type: "Categorical" },
];

const productionSet = [
  { id: 1, feature: "User_Income", mean: "41.8k", drift: 0.44, cause: "Market Wage Shift" },
  { id: 2, feature: "User_Age", mean: "35.1", drift: 0.18, cause: "Normal Aging" },
  { id: 3, feature: "Credit_Score", mean: "682", drift: 0.38, cause: "Economic Downturn" },
  { id: 4, feature: "DTI_Ratio", mean: "0.34", drift: 0.25, cause: "High Interest Rates" },
  { id: 5, feature: "Emp_Length", mean: "5.9yr", drift: 0.12, cause: "Stable Retention" },
  { id: 6, feature: "Loan_Amount", mean: "18.2k", drift: 0.32, cause: "Inflationary Demand" },
  { id: 7, feature: "Geo_Region", mean: "N/A", drift: 0.05, cause: "Expected Migration" },
];

export default function DriftMonitoringSystem() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState<any[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    setData(generateData());
    setHasMounted(true);
  }, []);

  const handleTriggerAlert = () => {
    setNotifying(true);
    setTimeout(() => {
      setNotifying(false);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 4000);
    }, 1200);
  };

  if (!hasMounted) return <div className="min-h-screen bg-[#050505]" />;
  const currentDrift = data.length > 0 ? (data[data.length - 1].drift * 100).toFixed(0) : "0";

  return (
    <div className="min-h-screen bg-[#050505] text-[#00f2ff] font-mono relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`, backgroundSize: '45px 45px' }} />
      </div>

      <nav className="fixed left-0 top-0 h-full w-20 border-r border-[#00f2ff]/10 bg-black/90 flex flex-col items-center py-8 z-50">
        <div className="w-10 h-10 border-2 border-[#ff0055] flex items-center justify-center mb-12 shadow-[0_0_15px_#ff0055]">
          <Activity className="text-[#ff0055]" size={20} />
        </div>
        <div className="flex flex-col gap-10">
          <NavIcon icon={<LayoutDashboard size={20}/>} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavIcon icon={<Database size={20}/>} active={activeTab === 'data'} onClick={() => setActiveTab('data')} />
          <NavIcon icon={<BarChart3 size={20}/>} active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <NavIcon icon={<Info size={20}/>} active={activeTab === 'rca'} onClick={() => setActiveTab('rca')} />
        </div>
      </nav>

      <main className="pl-20 min-h-screen relative z-10">
        <header className="h-28 border-b border-[#00f2ff]/20 bg-black/70 backdrop-blur-md flex items-center justify-between px-10">
          <div>
            <h1 className="text-2xl font-black italic text-white tracking-widest uppercase">Data Drift Monitoring System</h1>
            <p className="text-[9px] text-[#00f2ff] opacity-60 uppercase mt-1">Core System Analysis // Real-time Tracking</p>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => setData(generateData())} className="w-56 h-9 border border-[#00f2ff] hover:bg-[#00f2ff] hover:text-black transition-all text-[9px] font-black uppercase flex items-center justify-center gap-2"><RefreshCw size={14} /> Refresh_Stream</button>
            <button onClick={handleTriggerAlert} disabled={notifying} className="w-56 h-9 border border-[#ff0055] bg-[#ff0055]/5 hover:bg-[#ff0055] hover:text-white transition-all text-[9px] font-black uppercase flex items-center justify-center gap-2">
              {notifying ? <Loader2 size={14} className="animate-spin" /> : <Bell size={14} />} Trigger_Detection_Alert
            </button>
          </div>
        </header>

        <AnimatePresence>
          {showStatus && (
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="fixed top-32 right-10 z-[100] bg-black border-l-4 border-[#00f2ff] p-4 flex items-center gap-4 shadow-[0_0_20px_#00f2ff40]">
              <ShieldCheck className="text-[#00f2ff]" size={24} />
              <div><p className="text-xs font-black text-white uppercase">Alert Dispatched</p><p className="text-[10px] text-[#00f2ff] font-bold">NOTIFIED THE USER OF CRITICAL DRIFT</p></div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-10 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard title="CURRENT_DRIFT" value={`${currentDrift}%`} color="text-[#ff0055]" />
                  <StatCard title="INTEGRITY" value="84.2%" color="text-[#00f2ff]" />
                  <StatCard title="LATENCY" value="14ms" color="text-white" />
                  <StatCard title="UPTIME" value="99.9%" color="text-emerald-400" />
                </div>
                <div className="bg-black border border-[#00f2ff]/20 p-8">
                  <h3 className="text-[10px] font-black mb-8 text-[#00f2ff] uppercase tracking-widest flex items-center gap-2"><Activity size={14} /> Live_Drift_Stream</h3>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}><CartesianGrid stroke="#00f2ff08" vertical={false} /><XAxis dataKey="time" stroke="#00f2ff40" fontSize={10} /><YAxis stroke="#00f2ff40" fontSize={10} /><Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #ff0055' }} /><Area type="step" dataKey="drift" stroke="#ff0055" fill="#ff005508" strokeWidth={3}><LabelList dataKey="drift" position="top" fill="#ff0055" fontSize={10} /></Area></AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'data' && (
              <motion.div key="data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-black border border-[#00f2ff]/20 p-6">
                  <h3 className="text-[#00f2ff] font-black text-xs uppercase mb-6 flex items-center gap-2"><Database size={16}/> Reference_Dataset</h3>
                  <table className="w-full text-left text-[10px]">
                    <thead className="text-[#ff0055] border-b border-[#00f2ff]/10 uppercase"><tr><th className="py-3 px-2">FEATURE</th><th>MEAN</th><th>STD_DEV</th><th className="text-right">TYPE</th></tr></thead>
                    <tbody>{referenceSet.map(r => (<tr key={r.id} className="border-b border-[#00f2ff]/5"><td className="py-4 px-2 font-bold text-white uppercase">{r.feature}</td><td>{r.mean}</td><td>{r.std}</td><td className="text-right text-[#00f2ff]">{r.type}</td></tr>))}</tbody>
                  </table>
                </div>
                <div className="bg-black border border-[#ff0055]/20 p-6">
                  <h3 className="text-[#ff0055] font-black text-xs uppercase mb-6 flex items-center gap-2"><HardDrive size={16}/> Production_Dataset</h3>
                  <table className="w-full text-left text-[10px]">
                    <thead className="text-[#00f2ff] border-b border-[#ff0055]/10 uppercase"><tr><th className="py-3 px-2">FEATURE</th><th>LIVE_VAL</th><th>DRIFT</th><th className="text-right">STATUS</th></tr></thead>
                    <tbody>{productionSet.map(p => (<tr key={p.id} className="border-b border-[#ff0055]/5"><td className="py-4 px-2 font-bold text-white uppercase">{p.feature}</td><td>{p.mean}</td><td className="text-[#ff0055] font-black">{(p.drift * 100).toFixed(0)}%</td><td className="text-right"><span className={`text-[8px] font-black px-2 py-0.5 border ${p.drift > 0.35 ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-[#00f2ff] text-[#00f2ff]'}`}>{p.drift > 0.35 ? 'CRITICAL' : 'STABLE'}</span></td></tr>))}</tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-black border border-[#ff0055]/30 p-8 flex flex-col">
                    <h4 className="text-[11px] font-black text-[#ff0055] uppercase mb-6 flex items-center gap-2"><TrendingUp size={16} /> Feature_Drift_Intensity</h4>
                    <div className="h-[300px] w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid stroke="#ff005510" vertical={false} /><XAxis dataKey="time" stroke="#ff005540" fontSize={10} /><YAxis stroke="#ff005540" fontSize={10} /><Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #ff0055'}} /><Bar dataKey="drift" fill="#ff0055"><LabelList dataKey="drift" position="top" fill="#fff" fontSize={10} /></Bar></BarChart></ResponsiveContainer></div>
                    <div className="mt-6 pt-4 border-t border-white/5"><p className="text-[10px] text-slate-400 leading-relaxed italic"><b className="text-white">REPRESENTATION:</b> This bar chart shows the statistical drift score per hour. A higher bar indicates a larger gap between real-world data and the model's training data.</p></div>
                  </div>
                  <div className="bg-black border border-[#00f2ff]/30 p-8 flex flex-col">
                    <h4 className="text-[11px] font-black text-[#00f2ff] uppercase mb-6 flex items-center gap-2"><Activity size={16} /> System_Load_Analytics</h4>
                    <div className="h-[300px] w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid stroke="#00f2ff10" vertical={false} /><XAxis dataKey="time" stroke="#00f2ff40" fontSize={10} /><YAxis stroke="#00f2ff40" fontSize={10} /><Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #00f2ff'}} /><Line type="monotone" dataKey="load" stroke="#00f2ff" strokeWidth={3} dot={{ r: 4, fill: '#00f2ff' }}><LabelList dataKey="load" position="top" fill="#00f2ff" fontSize={10} /></Line></LineChart></ResponsiveContainer></div>
                    <div className="mt-6 pt-4 border-t border-white/5"><p className="text-[10px] text-slate-400 leading-relaxed italic"><b className="text-white">REPRESENTATION:</b> This line graph tracks incoming requests per second. It is used to cross-reference if drift occurs during peak usage hours.</p></div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'rca' && (
              <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center gap-2 mb-4 text-[#ff0055]"><ShieldCheck size={20} /><h2 className="text-lg font-black uppercase italic tracking-tighter">Diagnostics & Auto-Remediation</h2></div>
                {productionSet.map((item) => (
                  <div key={item.feature} className={`bg-black border border-white/5 border-l-4 p-6 flex justify-between items-center group ${item.drift > 0.35 ? 'border-l-[#ff0055]' : 'border-l-[#00f2ff]'}`}>
                    <div><div className="flex items-center gap-3"><p className="text-white font-black text-sm uppercase">{item.feature}</p><span className={`text-[9px] font-bold ${item.drift > 0.35 ? 'text-[#ff0055]' : 'text-[#00f2ff]'}`}>{(item.drift * 100).toFixed(0)}% DRIFT</span></div><p className="text-slate-500 text-[10px] italic mt-1">{item.cause}</p></div>
                    <div className="text-right"><button className={`text-[9px] px-4 py-1 font-black uppercase ${item.drift > 0.35 ? 'bg-[#ff0055] text-white' : 'bg-[#00f2ff] text-black'}`}>{item.drift > 0.35 ? 'Retrain Model' : 'Auto-Optimize'}</button></div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavIcon({ icon, active, onClick }: any) {
  return (<button onClick={onClick} className={`p-4 transition-all duration-300 ${active ? 'text-[#ff0055] border-r-2 border-[#ff0055] bg-[#ff0055]/10 shadow-[5px_0_15px_-5px_#ff0055]' : 'text-[#00f2ff]/30 hover:text-white'}`}>{icon}</button>);
}

function StatCard({ title, value, color }: any) {
  return (<div className="bg-black border border-[#00f2ff]/10 p-6 relative overflow-hidden group"><div className="absolute top-0 right-0 w-2 h-full bg-[#00f2ff]/5 group-hover:bg-[#ff0055]/20 transition-colors" /><p className="text-[9px] text-slate-500 font-black uppercase mb-3 tracking-widest">{title}</p><h3 className={`text-4xl font-black italic tracking-tighter ${color}`}>{value}</h3></div>);
}