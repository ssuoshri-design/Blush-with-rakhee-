/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Users, DollarSign, LayoutDashboard, Radio, Mail, Eye, 
  TrendingUp, Play, Plus, Trash2, Edit3, Bookmark, 
  Download, RefreshCw, BarChart2, ShieldAlert, CheckCircle2, 
  HelpCircle, Settings, FileText, ArrowUpRight, MessageSquare 
} from "lucide-react";
import { CollabLead, InstagramReel, AffiliateItem, NewsletterSubscriber, CreatorStats } from "../types";

interface AdminOSProps {
  stats: CreatorStats;
  updateStats: (stats: CreatorStats) => void;
  leads: CollabLead[];
  addLead: (lead: CollabLead) => void;
  updateLeadStatus: (id: string, status: CollabLead["status"]) => void;
  updateLeadPayment: (id: string, payment: CollabLead["paymentStatus"]) => void;
  deleteLead: (id: string) => void;
  reels: InstagramReel[];
  addReel: (reel: InstagramReel) => void;
  deleteReel: (id: string) => void;
  affiliates: AffiliateItem[];
  simulateClicks: () => void;
  subscribers: NewsletterSubscriber[];
  downloadCount: number;
}

export default function AdminOS({
  stats,
  updateStats,
  leads,
  addLead,
  updateLeadStatus,
  updateLeadPayment,
  deleteLead,
  reels,
  addReel,
  deleteReel,
  affiliates,
  simulateClicks,
  subscribers,
  downloadCount,
}: AdminOSProps) {
  const [activeSubTab, setActiveSubTab] = useState<"dashboard" | "crm" | "content" | "affiliates" | "newsletter" | "analytics">("dashboard");

  // Content CMS Edit State
  const [newReelTitle, setNewReelTitle] = useState("");
  const [newReelCategory, setNewReelCategory] = useState<InstagramReel["category"]>("Makeup Tutorial");
  const [newReelViews, setNewReelViews] = useState(5000);
  const [newReelEr, setNewReelEr] = useState(8.5);
  const [newReelThumbnail, setNewReelThumbnail] = useState("https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600");

  // Stat numbers edit states
  const [editFollowers, setEditFollowers] = useState(stats.followers);
  const [editEngagement, setEditEngagement] = useState(stats.engagementAvg);

  // CRM Search & Filters
  const [crmSearch, setCrmSearch] = useState("");
  const [crmStatusFilter, setCrmStatusFilter] = useState("All");

  // Manual CRM creation
  const [manualBrand, setManualBrand] = useState("");
  const [manualPerson, setManualPerson] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualBudget, setManualBudget] = useState(500);
  const [manualType, setManualType] = useState("Sponsored Reel");
  const [manualNotes, setManualNotes] = useState("");

  const handleManualLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualBrand || !manualPerson || !manualEmail) return;

    addLead({
      id: "manual-" + Date.now(),
      brandName: manualBrand,
      contactPerson: manualPerson,
      email: manualEmail,
      budget: Number(manualBudget),
      campaignType: manualType,
      campaignDetails: manualNotes || "Manually logged lead internally inside the OS portal.",
      status: "New Lead",
      date: new Date().toISOString().split("T")[0],
      paymentStatus: "Unpaid"
    });

    setManualBrand("");
    setManualPerson("");
    setManualEmail("");
    setManualNotes("");
  };

  const handleStatSave = () => {
    updateStats({
      ...stats,
      followers: Number(editFollowers),
      engagementAvg: Number(editEngagement)
    });
    alert("Creator stats update dispatced to homepage!");
  };

  const handleContentReelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReelTitle) return;

    addReel({
      id: "reel-" + Date.now(),
      title: newReelTitle,
      category: newReelCategory,
      views: Number(newReelViews),
      likes: Math.round(newReelViews * 0.1),
      engagementRate: Number(newReelEr),
      thumbnail: newReelThumbnail,
      instagramUrl: "https://placeholder-instagram.com/reel/new",
      publishedDate: new Date().toISOString().split("T")[0]
    });

    setNewReelTitle("");
    alert("New Reel added to Content CMS! Scroll down standard grids to view.");
  };

  const fileRefExport = () => {
    // Simulated CSV export download
    const formatCsv = "ID,Name,Email,Interests,DateJoined\n" + 
      subscribers.map(s => `"${s.id}","${s.name}","${s.email}","${s.beautyInterests.join(";")}","${s.dateJoined}"`).join("\n");
    const blob = new Blob([formatCsv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `blush_with_rakhee_subscribers_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Math KPI Calculations
  const pipelineTotal = leads.reduce((sum, l) => sum + (l.status !== "Rejected" ? l.budget : 0), 0);
  const completedDealsTotal = leads.reduce((sum, l) => sum + (l.status === "Completed" ? l.budget : 0), 0);
  const affiliateRevenueTotal = affiliates.reduce((sum, a) => sum + a.revenueGenerated, 0);
  const totalLeadsCount = leads.length;

  return (
    <section id="admin-os-portal" className="py-16 bg-stone-50 border-t border-brand-blush/25 relative scroll-mt-20">
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-brand-blush/20 pb-8 mb-10 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-brand-dark/95 text-white border border-[#B76E79] px-3 py-1 rounded-full mb-3 shadow-sm animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Authenticated Admin Portal</span>
            </div>
            
            <h2 className="font-serif text-3xl font-bold text-brand-dark leading-tight">
              Creator Operating System <span className="text-brand-rose italic font-light">Suite</span>
            </h2>
            <p className="font-sans text-xs text-stone-500 mt-1 max-w-xl">
              Unrestricted access to CRM lead statuses, affiliate click trackers, real-time analytics dashboards, and CMS home layouts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={simulateClicks}
              className="inline-flex items-center gap-1.5 bg-brand-rose/20 text-brand-rose border border-brand-blush hover:bg-brand-rose hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <RefreshCw size={13} className="animate-spin-slow" />
              <span>Simulate Traffic Click</span>
            </button>
            <button
              onClick={fileRefExport}
              className="inline-flex items-center gap-1.5 bg-brand-dark text-white hover:bg-brand-rose px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Download size={13} />
              <span>Export Subscribers CSV</span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Control tabs */}
        <div className="flex flex-wrap gap-1 bg-white p-1 rounded-2xl border border-brand-blush/25 shadow-sm mb-8" id="os-tab-nav">
          <button
            onClick={() => setActiveSubTab("dashboard")}
            className={`flex-1 min-w-[120px] font-sans text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all cursor-pointer ${
              activeSubTab === "dashboard" ? "bg-brand-rose text-white shadow-sm" : "text-stone-600 hover:bg-brand-sand/30"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSubTab("crm")}
            className={`flex-1 min-w-[120px] font-sans text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all cursor-pointer ${
              activeSubTab === "crm" ? "bg-brand-rose text-white shadow-sm" : "text-stone-600 hover:bg-brand-sand/30"
            }`}
          >
            CRM Leads
          </button>
          <button
            onClick={() => setActiveSubTab("content")}
            className={`flex-1 min-w-[120px] font-sans text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all cursor-pointer ${
              activeSubTab === "content" ? "bg-brand-rose text-white shadow-sm" : "text-stone-600 hover:bg-brand-sand/30"
            }`}
          >
            Content CMS
          </button>
          <button
            onClick={() => setActiveSubTab("affiliates")}
            className={`flex-1 min-w-[120px] font-sans text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all cursor-pointer ${
              activeSubTab === "affiliates" ? "bg-brand-rose text-white shadow-sm" : "text-stone-600 hover:bg-brand-sand/30"
            }`}
          >
            Affiliates
          </button>
          <button
            onClick={() => setActiveSubTab("newsletter")}
            className={`flex-1 min-w-[120px] font-sans text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all cursor-pointer ${
              activeSubTab === "newsletter" ? "bg-brand-rose text-white shadow-sm" : "text-stone-600 hover:bg-brand-sand/30"
            }`}
          >
            Newsletter
          </button>
          <button
            onClick={() => setActiveSubTab("analytics")}
            className={`flex-1 min-w-[120px] font-sans text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all cursor-pointer ${
              activeSubTab === "analytics" ? "bg-brand-rose text-white shadow-sm" : "text-stone-600 hover:bg-brand-sand/30"
            }`}
          >
            Traffic Analytics
          </button>
        </div>

        {/* ================= VIEW: DASHBOARD PANEL METRICS ================= */}
        {activeSubTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn text-left">
            {/* KPI Cards row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="os-dashboard-kpis">
              <div className="bg-white p-5 rounded-2xl border border-brand-blush/20 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wider">Revenue Pipeline</span>
                  <div className="w-8 h-8 rounded-full bg-brand-sand flex items-center justify-center text-brand-rose"><DollarSign size={14} /></div>
                </div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-brand-dark">${pipelineTotal.toLocaleString()}</p>
                <div className="text-[10px] text-stone-400 mt-1">Actively Negotiated &amp; Approved</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-brand-blush/20 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wider">Laid CRM Leads</span>
                  <div className="w-8 h-8 rounded-full bg-brand-sand flex items-center justify-center text-brand-rose"><Users size={14} /></div>
                </div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-brand-dark">{totalLeadsCount}</p>
                <div className="text-[10px] text-stone-400 mt-1">{leads.filter(l => l.status === "New Lead").length} Unread / New Requests</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-brand-blush/20 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wider">Affiliate Earnings</span>
                  <div className="w-8 h-8 rounded-full bg-brand-sand flex items-center justify-center text-brand-rose"><Radio size={14} /></div>
                </div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-green-600">${affiliateRevenueTotal.toFixed(2)}</p>
                <div className="text-[10px] text-stone-400 mt-1">Commission payouts unlocked</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-brand-blush/20 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wider">Digital Outreach</span>
                  <div className="w-8 h-8 rounded-full bg-brand-sand flex items-center justify-center text-brand-rose"><Mail size={14} /></div>
                </div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-brand-dark">{subscribers.length}</p>
                <div className="text-[10px] text-stone-400 mt-1">{downloadCount} Media kit packets shared</div>
              </div>
            </div>

            {/* Content Spotlight Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="os-dashboard-split">
              
              {/* Recent brand acquisitions pipeline (Left lg:col-span-8) */}
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-brand-blush/20 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-4">
                    <h3 className="font-serif text-lg font-bold">Recent Campaign Acquisitions</h3>
                    <button onClick={() => setActiveSubTab("crm")} className="text-xs text-brand-rose hover:underline font-bold font-mono uppercase">View CRM Pipeline &rarr;</button>
                  </div>

                  <div className="space-y-3">
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="p-3.5 rounded-xl bg-brand-sand/20 border border-brand-blush/10 flex items-center justify-between gap-4">
                        <div className="text-left">
                          <p className="font-serif text-sm font-bold">{lead.brandName}</p>
                          <p className="text-[10px] text-stone-500 font-sans mt-0.5">Contact: {lead.contactPerson} • {lead.campaignType}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-dark">${lead.budget}</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                            lead.status === "Approved" ? "bg-emerald-50 text-emerald-700" :
                            lead.status === "Negotiation" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 bg-brand-sand/30 p-4 rounded-2xl flex items-center justify-between text-xs font-sans">
                  <span>Authorized Secure Session: ID blush_ops_2026</span>
                  <span className="text-brand-rose font-bold">● SYSTEM ONLINE</span>
                </div>
              </div>

              {/* Direct Metrics Quick settings (Right lg:col-span-4) */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-brand-blush/20 shadow-sm text-left">
                <h3 className="font-serif text-lg font-bold border-b border-stone-100 pb-4 mb-4">Ecosystem Overview</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-stone-500 mb-1 font-bold">Update Followers on Homepage</label>
                    <div className="flex gap-1.5">
                      <input 
                        type="number"
                        value={editFollowers}
                        onChange={(e) => setEditFollowers(Number(e.target.value))}
                        className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-stone-500 mb-1 font-bold">Update Engagement Rate (%)</label>
                    <div className="flex gap-1.5">
                      <input 
                        type="number"
                        step="0.1"
                        value={editEngagement}
                        onChange={(e) => setEditEngagement(Number(e.target.value))}
                        className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleStatSave}
                    className="w-full bg-brand-dark hover:bg-brand-rose text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Deploy Updates
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= VIEW: CRM PIPELINE SYSTEM ================= */}
        {activeSubTab === "crm" && (
          <div className="space-y-6 animate-fadeIn text-left" id="os-crm-portal">
            
            {/* Split row: Leads list table vs Manual entry */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Leads table column */}
              <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-brand-blush/20 shadow-sm">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4 mb-4">
                  <h3 className="font-serif text-lg font-bold">CRM Pipeline Campaigns</h3>
                  
                  {/* Local CRM filtering */}
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="text" 
                      placeholder="Search base brand..." 
                      value={crmSearch}
                      onChange={(e) => setCrmSearch(e.target.value)}
                      className="bg-stone-50 border border-brand-blush/20 px-2.5 py-1.5 text-xs rounded-xl focus:outline-none w-36"
                    />
                    <select
                      value={crmStatusFilter}
                      onChange={(e) => setCrmStatusFilter(e.target.value)}
                      className="bg-stone-50 border border-brand-blush/20 px-2.5 py-1.5 text-xs rounded-xl focus:outline-none"
                    >
                      <option value="All">All Stages</option>
                      <option value="New Lead">New Lead</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Approved">Approved</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-700 font-sans">
                    <thead>
                      <tr className="border-b border-stone-100 uppercase text-[9px] text-stone-400 font-bold font-mono">
                        <th className="pb-3">Brand Name</th>
                        <th className="pb-3 text-right">Budget</th>
                        <th className="pb-3">Workflow Status</th>
                        <th className="pb-3">Bill Payment</th>
                        <th className="pb-3 text-right text-stone-300">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {leads
                        .filter(l => crmStatusFilter === "All" || l.status === crmStatusFilter)
                        .filter(l => l.brandName.toLowerCase().includes(crmSearch.toLowerCase()))
                        .map((lead) => (
                          <tr key={lead.id} className="hover:bg-brand-sand/15 transition-colors">
                            <td className="py-3">
                              <p className="font-serif text-sm font-bold text-brand-dark">{lead.brandName}</p>
                              <p className="text-[10px] text-stone-500 mt-0.5">{lead.contactPerson} • {lead.email}</p>
                              <p className="text-[9px] text-brand-rose font-mono">Date Logged: {lead.date}</p>
                            </td>
                            <td className="py-3 text-right font-mono font-bold text-brand-dark">${lead.budget}</td>
                            <td className="py-3">
                              {/* Inline status updating dropdown */}
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as CollabLead["status"])}
                                className={`text-[9px] px-2 py-1 font-bold rounded-full uppercase focus:outline-none ${
                                  lead.status === "Approved" ? "bg-emerald-50 text-emerald-700" :
                                  lead.status === "Negotiation" ? "bg-amber-50 text-amber-700 animate-pulse" :
                                  lead.status === "Completed" ? "bg-zinc-100 text-stone-600" : "bg-blue-50 text-blue-700"
                                }`}
                              >
                                <option value="New Lead">New Lead</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Negotiation">Negotiation</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="py-3">
                              {/* Dynamic payment tracking dropdown */}
                              <select
                                value={lead.paymentStatus || "Unpaid"}
                                onChange={(e) => updateLeadPayment(lead.id, e.target.value as CollabLead["paymentStatus"])}
                                className={`text-[9.5px] px-2.5 py-0.5 font-bold rounded uppercase ${
                                  lead.paymentStatus === "Paid" ? "bg-green-100 text-green-800" :
                                  lead.paymentStatus === "Partial" ? "bg-amber-100 text-amber-800" : "bg-red-50 text-red-500"
                                }`}
                              >
                                <option value="Unpaid">Unpaid</option>
                                <option value="Partial">Partial</option>
                                <option value="Paid">Paid</option>
                              </select>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="text-red-500 hover:text-red-700 p-1 cursor-pointer inline-block"
                                title="Delete lead audit record"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Manual leads entry box Column */}
              <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-brand-blush/20 shadow-sm">
                <h3 className="font-serif text-md font-bold border-b border-stone-100 pb-3.5 mb-4">Log Direct Campaign Lead</h3>
                
                <form onSubmit={handleManualLeadSubmit} className="space-y-3 font-sans">
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Brand Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rare Beauty Co." 
                      value={manualBrand}
                      onChange={(e) => setManualBrand(e.target.value)}
                      className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Contact Person</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Selena Gomez" 
                      value={manualPerson}
                      onChange={(e) => setManualPerson(e.target.value)}
                      className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Representative Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="gomez@rarebeauty.com" 
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Rate Budget</label>
                      <input 
                        type="number" 
                        required
                        value={manualBudget}
                        onChange={(e) => setManualBudget(Number(e.target.value))}
                        className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Format Type</label>
                      <select 
                        value={manualType}
                        onChange={(e) => setManualType(e.target.value)}
                        className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none text-stone-700"
                      >
                        <option value="Sponsored Reel">Sponsored Reel</option>
                        <option value="UGC Video Raw">UGC Video Raw</option>
                        <option value="Story Series">Story Series</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Log Campaign Notes</label>
                    <textarea 
                      rows={2}
                      placeholder="Products received. Scheduled for publication." 
                      value={manualNotes}
                      onChange={(e) => setManualNotes(e.target.value)}
                      className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-rose hover:bg-brand-dark text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                  >
                    Create Lead Entry
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

        {/* ================= VIEW: CONTENT CMS LAYOUTS ================= */}
        {activeSubTab === "content" && (
          <div className="space-y-6 animate-fadeIn text-left" id="os-cms-portal">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Add New Reels CMS block (Left lg:col-span-5) */}
              <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-brand-blush/20 shadow-sm">
                <h3 className="font-serif text-md font-bold border-b border-stone-100 pb-3.5 mb-4">Upload New Reels Metadata</h3>
                
                <form onSubmit={handleContentReelSubmit} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Reel Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Laneige Tint Double Wear Swatch test" 
                      value={newReelTitle}
                      onChange={(e) => setNewReelTitle(e.target.value)}
                      className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Beauty Category</label>
                      <select 
                        value={newReelCategory}
                        onChange={(e) => setNewReelCategory(e.target.value as InstagramReel["category"])}
                        className="bg-stone-50 border border-brand-blush/20 text-[11px] px-2 py-1.5 rounded-lg w-full text-stone-700 font-medium focus:outline-none"
                      >
                        <option value="Skincare">Skincare</option>
                        <option value="Makeup Tutorial">Makeup Tutorial</option>
                        <option value="Beauty Hack">Beauty Hack</option>
                        <option value="GRWM">GRWM</option>
                        <option value="Transformation">Transformation</option>
                        <option value="Product Reviews">Product Reviews</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Views Count</label>
                      <input 
                        type="number" 
                        required
                        value={newReelViews}
                        onChange={(e) => setNewReelViews(Number(e.target.value))}
                        className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Engagement Rate (%)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        required
                        value={newReelEr}
                        onChange={(e) => setNewReelEr(Number(e.target.value))}
                        className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-lg w-full focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Published Date</label>
                      <input 
                        type="text" 
                        disabled 
                        value="TODAY (Auto)"
                        className="bg-stone-100 border border-zinc-200 text-stone-400 text-xs px-2.5 py-1.5 rounded-lg w-full cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-stone-500 mb-1 font-bold">Thumbnail Asset URL</label>
                    <input 
                      type="text" 
                      value={newReelThumbnail}
                      onChange={(e) => setNewReelThumbnail(e.target.value)}
                      className="bg-stone-50 border border-brand-blush/20 text-xs px-3 py-1.5 rounded-lg w-full font-mono text-[10px] focus:outline-none"
                    />
                    <p className="text-[8.5px] text-stone-400 mt-1">Placeholder images default to highly curated swatches.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-rose hover:bg-brand-dark text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors mt-2"
                  >
                    Add Reel to CMS Live Grids
                  </button>

                </form>
              </div>

              {/* Display list of reels editable (Right lg:col-span-7) */}
              <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-brand-blush/20 shadow-sm">
                <h3 className="font-serif text-md font-bold border-b border-stone-100 pb-3.5 mb-4">Reels Metadata List ({reels.length} Items)</h3>
                
                <div className="space-y-3 max-h-[440px] overflow-y-auto pr-2">
                  {reels.map((rl) => (
                    <div key={rl.id} className="p-3 bg-stone-50 border border-zinc-100 rounded-xl flex items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-3">
                        <img src={rl.thumbnail} alt={rl.title} className="w-10 h-10 object-cover rounded-lg shrink-0" referrerPolicy="no-referrer" />
                        <div>
                          <p className="font-serif text-xs font-bold text-brand-dark line-clamp-1">{rl.title}</p>
                          <p className="text-[9.5px] text-brand-rose font-mono font-bold mt-0.5 uppercase">{rl.category} • {rl.views.toLocaleString()} views • ER {rl.engagementRate}%</p>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteReel(rl.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="Delete reel entry"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= VIEW: AFFILIATES TRACKING PAGE ================= */}
        {activeSubTab === "affiliates" && (
          <div className="space-y-6 animate-fadeIn text-left" id="os-affiliates-portal">
            
            {/* Split layout: products grid + commissions summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Programs grid table (Left lg:col-span-8) */}
              <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-brand-blush/20 shadow-sm">
                <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-4">
                  <h3 className="font-serif text-lg font-bold">Active Affiliate Programs</h3>
                  <span className="font-mono text-[9px] bg-brand-rose/15 text-brand-rose px-2 py-0.5 rounded font-bold">
                    Tracking Portal Syncing
                  </span>
                </div>

                <div className="space-y-4">
                  {affiliates.map((aff) => {
                    const conversionRate = aff.clicks > 0 ? ((aff.salesCount / aff.clicks) * 100).toFixed(1) : "0";
                    return (
                      <div key={aff.id} className="p-4 rounded-2xl bg-brand-sand/20 border border-brand-blush/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 self-start sm:self-center">
                          <img src={aff.thumbnail} alt={aff.name} className="w-12 h-12 object-cover rounded-xl shrink-0 border border-brand-blush/20" referrerPolicy="no-referrer" />
                          <div className="text-left">
                            <h4 className="font-serif text-sm font-bold text-brand-dark">{aff.name}</h4>
                            <p className="text-[10px] text-stone-500 font-sans mt-0.5">{aff.brand} • Category: {aff.category}</p>
                            <p className="text-[10px] text-brand-rose font-semibold mt-1">Review: &quot;{aff.rakheeReview}&quot;</p>
                          </div>
                        </div>

                        {/* Conversions / Sales KPIs */}
                        <div className="grid grid-cols-3 gap-6 text-center text-xs w-full sm:w-auto self-end border-t sm:border-t-0 border-brand-blush/10 pt-3 sm:pt-0">
                          <div>
                            <p className="font-mono font-bold">{aff.clicks}</p>
                            <span className="text-[8.5px] text-stone-400 font-mono font-semibold uppercase tracking-wider">Clicks</span>
                          </div>
                          <div>
                            <p className="font-mono font-bold">{aff.salesCount}</p>
                            <span className="text-[8.5px] text-stone-400 font-mono font-semibold uppercase tracking-wider">Sales</span>
                          </div>
                          <div>
                            <p className="font-mono font-bold text-green-600">${aff.revenueGenerated.toFixed(2)}</p>
                            <span className="text-[8.5px] text-stone-400 font-mono font-semibold uppercase tracking-wider">Earned</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Commission rules cards (Right lg:col-span-4) */}
              <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-brand-blush/20 shadow-sm">
                <h3 className="font-serif text-md font-bold mb-3 border-b border-stone-100 pb-3.5">Integrated Marketplaces</h3>
                
                <div className="space-y-3.5 text-xs text-stone-600 font-sans">
                  <div className="p-3 bg-brand-sand/50 rounded-xl border border-brand-blush/10">
                    <p className="font-serif text-xs font-bold text-brand-dark">ShopMy Premium Suite</p>
                    <p className="text-[10.5px] mt-1 leading-relaxed">Integrated directly inside @blushwithrakhee&apos;s personal showcase. Direct DM keywords forward to shopmy catalog links automatically.</p>
                    <div className="flex justify-between mt-2.5 font-mono text-[9px]">
                      <span>Average commissions:</span>
                      <span className="text-brand-rose font-bold">12% - 15% Standard</span>
                    </div>
                  </div>

                  <div className="p-3 bg-brand-sand/50 rounded-xl border border-brand-blush/10">
                    <p className="font-serif text-xs font-bold text-brand-dark">LTK Beauty Hub</p>
                    <p className="text-[10.5px] mt-1 leading-relaxed">Secondary link-clicks tracking for seasonal makeup transformations and beauty hacks uploads.</p>
                    <div className="flex justify-between mt-2.5 font-mono text-[9px]">
                      <span>Average commissions:</span>
                      <span className="text-brand-rose font-bold">10% Standard</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= VIEW: NEWSLETTER EMAIL SUBSCRIBERS ================= */}
        {activeSubTab === "newsletter" && (
          <div className="bg-white p-6 rounded-3xl border border-brand-blush/20 shadow-sm text-left animate-fadeIn" id="os-newsletter-portal">
            <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-4 flex-wrap gap-2">
              <div>
                <h3 className="font-serif text-lg font-bold">Registered Community Subscribers</h3>
                <p className="text-[10px] text-stone-500 font-sans mt-0.5">Showing list of registered users via hero/newsletter forms.</p>
              </div>

              <button
                onClick={fileRefExport}
                className="inline-flex items-center gap-1 bg-brand-rose hover:bg-brand-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors"
              >
                <Download size={13} />
                <span>Export to CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans text-stone-700">
                <thead>
                  <tr className="border-b border-stone-100 uppercase text-[9px] text-stone-400 font-bold font-mono">
                    <th className="pb-3.5">Name</th>
                    <th className="pb-3.5">Email address</th>
                    <th className="pb-3.5">Interests Checklist selection</th>
                    <th className="pb-3.5 text-right font-mono">Date joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {subscribers.map((sub, ind) => (
                    <tr key={sub.id} className="hover:bg-brand-sand/10 transition-colors">
                      <td className="py-3 font-semibold text-brand-dark">{sub.name}</td>
                      <td className="py-3 font-mono text-zinc-600">{sub.email}</td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {sub.beautyInterests.map((interest, i) => (
                            <span key={i} className="bg-brand-sand text-brand-rose text-[8.5px] font-semibold px-2 py-0.5 rounded-full border border-brand-blush/10">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 text-right font-mono font-medium">{sub.dateJoined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-brand-sand/35 p-4 rounded-2xl border border-brand-blush/20 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 text-left">
              <div>
                <p className="font-serif text-xs font-bold text-brand-dark">Active Campaigns dispatch</p>
                <p className="font-sans text-[11px] text-stone-500 mt-0.5">Want to alert subscribers of a new product review or code code update?</p>
              </div>
              <button
                onClick={() => alert("Campaign queued successfully! Simulated email alerts dispatched layout.")}
                className="bg-brand-dark hover:bg-brand-rose text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Simulate Direct Campaign Push
              </button>
            </div>

          </div>
        )}

        {/* ================= VIEW: TRAFFIC ANALYTICS CHART ================= */}
        {activeSubTab === "analytics" && (
          <div className="space-y-6 animate-fadeIn text-left" id="os-analytics-portal">
            
            {/* Visual trends charts representing traffic Referral lists and device views */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Traffic graphic card (Left lg:col-span-8) */}
              <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-brand-blush/20 shadow-sm text-left relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-4">
                    <h3 className="font-serif text-lg font-bold">Monthly Traffic Conversions Tracker</h3>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded font-bold">
                      Organic SEO Optimized
                    </span>
                  </div>

                  {/* Draw beautiful high-quality vector CSS diagrams to represent real chart trends */}
                  <div className="h-44 flex items-end justify-between gap-1 mt-6 relative border-b border-stone-100 pb-1 px-4">
                    
                    {/* Background helper lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30 text-[8px] font-mono text-zinc-400">
                      <div className="border-b border-zinc-200 w-full text-right">30k Views</div>
                      <div className="border-b border-zinc-200 w-full text-right">15k Views</div>
                      <div className="border-b border-zinc-200 w-full text-right">0k Views</div>
                    </div>

                    {/* Bars visual elements */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 group select-none relative z-10">
                      <span className="text-[9px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 text-brand-rose">$4.2k</span>
                      <div className="w-8 bg-brand-blush/40 group-hover:bg-brand-rose rounded-t-md h-12 transition-all duration-500" />
                      <span className="text-[10px] font-mono font-medium text-stone-500 mt-1">Jan</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-1.5 group select-none relative z-10">
                      <span className="text-[9px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 text-brand-rose">$5.8k</span>
                      <div className="w-8 bg-brand-blush/40 group-hover:bg-brand-rose rounded-t-md h-20 transition-all duration-500" />
                      <span className="text-[10px] font-mono font-medium text-stone-500 mt-1">Feb</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-1.5 group select-none relative z-10">
                      <span className="text-[9px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 text-brand-rose">$8.1k</span>
                      <div className="w-8 bg-brand-blush/40 group-hover:bg-brand-rose rounded-t-md h-28 transition-all duration-500" />
                      <span className="text-[10px] font-mono font-medium text-stone-500 mt-1">Mar</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-1.5 group select-none relative z-10">
                      <span className="text-[9px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 text-brand-rose">$10.9k</span>
                      <div className="w-8 bg-brand-rose rounded-t-md h-36 transition-all duration-500" />
                      <span className="text-[10px] font-mono font-medium text-stone-500 mt-1 font-bold">Today</span>
                    </div>
                  </div>

                  <p className="font-sans text-[11px] text-stone-400 italic text-center mt-3">
                    Hover columns to review monthly active income scaling targets.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 bg-brand-sand/20 p-4 rounded-xl flex items-center justify-between text-xs text-stone-500">
                  <span>Standard attribution modeling: Last-touch CRM records</span>
                  <span>Telemetry is synced in real-time.</span>
                </div>
              </div>

              {/* Referral list sources card (Right lg:col-span-4) */}
              <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-brand-blush/20 shadow-sm flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-serif text-md font-bold border-b border-stone-100 pb-3.5 mb-4">Traffic Channel Sources</h3>
                  
                  <div className="space-y-3 font-sans text-xs text-stone-600">
                    <div className="flex items-center justify-between">
                      <span className="font-medium font-serif">Instagram Stories</span>
                      <span className="font-mono font-bold text-brand-rose">48% Traffic share</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded-full"><div className="bg-[#B76E79] h-full rounded-full w-48%" /></div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-medium font-serif">Reels Caption Automations</span>
                      <span className="font-mono font-bold text-brand-rose">35% Traffic share</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded-full"><div className="bg-[#B76E79] h-full rounded-full w-[35%]" /></div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-medium font-serif">Direct Organic Bio links</span>
                      <span className="font-mono font-bold text-brand-rose">17% Traffic share</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded-full"><div className="bg-[#B76E79] h-full rounded-full w-[17%]" /></div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100 bg-[#E8C8C8]/10 p-3.5 rounded-2xl border border-[#E8C8C8]/25 text-xs text-brand-rose text-center font-bold">
                  Conversion Rate Ratio: 8.8% average
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}
