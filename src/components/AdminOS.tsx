/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Users, DollarSign, Mail, Play, Plus, Trash2, 
  Download, RefreshCw, CheckCircle2, MessageCircle, 
  Send, Instagram, Facebook, Shield, Laptop, Star
} from "lucide-react";
import { CollabLead, InstagramReel, AffiliateItem, NewsletterSubscriber, CreatorStats, CreatorMessage } from "../types";

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
  messages: CreatorMessage[];
  setMessages: React.Dispatch<React.SetStateAction<CreatorMessage[]>>;
  currency: "USD" | "INR";
  formatPrice: (usdAmount: number, digits?: number) => string;
}

type TabType = "brand-deals" | "follower-messages" | "video-posts" | "affiliate-links" | "newsletter-friends" | "profile-stats";

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
  messages,
  setMessages,
  currency,
  formatPrice,
}: AdminOSProps) {
  const [activeTab, setActiveTab] = useState<TabType>("brand-deals");

  // New Post Form Local State
  const [newReelTitle, setNewReelTitle] = useState("");
  const [newReelCategory, setNewReelCategory] = useState<InstagramReel["category"]>("Makeup Tutorial");
  const [newReelViews, setNewReelViews] = useState(5000);
  const [newReelEr, setNewReelEr] = useState(8.5);

  // Stats edit local state
  const [followersInput, setFollowersInput] = useState(stats.followers);
  const [engagementInput, setEngagementInput] = useState(stats.engagementAvg);

  // Brand Deal log form local state
  const [dealBrand, setDealBrand] = useState("");
  const [dealContact, setDealContact] = useState("");
  const [dealEmail, setDealEmail] = useState("");
  const [dealBudget, setDealBudget] = useState(600);
  const [dealType, setDealType] = useState("Dedicated Instagram Sponsored Reel");
  const [dealNotes, setDealNotes] = useState("");

  // Search brand name
  const [brandSearchQuery, setBrandSearchQuery] = useState("");

  // Messaging interactive state
  const [replyInputId, setReplyInputId] = useState<string | null>(null);
  const [replyTextValue, setReplyTextValue] = useState("");
  const [automationKeyword, setAutomationKeyword] = useState("GLOW");
  const [automationReplyText, setAutomationReplyText] = useState("Hey beautiful! Here is my conceal style cheat-sheet + my ShopMy link: shopmy.us/blushwithrakhee/concealer-glow");

  // Form Submits
  const handleLogBrandDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealBrand || !dealContact || !dealEmail) return;

    // Convert to USD base representation if submitted in INR
    const finalBudget = currency === "INR" 
      ? Math.round(Number(dealBudget) / 83) 
      : Number(dealBudget);

    addLead({
      id: "deal-" + Date.now(),
      brandName: dealBrand,
      contactPerson: dealContact,
      email: dealEmail,
      budget: finalBudget,
      campaignType: dealType,
      campaignDetails: dealNotes || "No extra requirements added.",
      status: "New Lead",
      date: new Date().toISOString().split("T")[0],
      paymentStatus: "Unpaid"
    });

    setDealBrand("");
    setDealContact("");
    setDealEmail("");
    setDealNotes("");
    alert("New brand deal added to list successfully!");
  };

  const handleUpdateViewsStats = () => {
    updateStats({
      ...stats,
      followers: Number(followersInput),
      engagementAvg: Number(engagementInput)
    });
    alert("Profile numbers updated instantly on your main portfolio website!");
  };

  const handlePublishReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReelTitle) return;

    addReel({
      id: "reel-" + Date.now(),
      title: newReelTitle,
      category: newReelCategory,
      views: Number(newReelViews),
      likes: Math.round(newReelViews * 0.1),
      engagementRate: Number(newReelEr),
      thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      instagramUrl: "https://www.instagram.com/blushwithrakhee?igsh=MXBjMGFxZjN1cWR0OQ==",
      publishedDate: new Date().toISOString().split("T")[0]
    });

    setNewReelTitle("");
    alert("New Instagram Reel added! Go back to 'Beauty Content' on main page to preview.");
  };

  const handleSendReplyToFollower = (id: string) => {
    if (!replyTextValue.trim()) return;
    setMessages(prev => prev.map(m => m.id === id ? { ...m, replied: true, replyText: replyTextValue } : m));
    setReplyInputId(null);
    setReplyTextValue("");
    alert("Reply sent! An automated simulation of direct response is recorded.");
  };

  const handleToggleRepliedState = (id: string, curReplied: boolean) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, replied: !curReplied, replyText: !curReplied ? "Thank you sweetheart! Checking direct." : undefined } : m));
  };

  const handleCreateMockNewDM = () => {
    const followerNames = ["Rita Sengupta", "Anamika K.", "Tanya Chopra", "Meera Malhotra"];
    const followerHandles = ["@rita_s", "@makeupbyanamika", "@tanyachopra_90", "@meera_glows"];
    const questions = [
      "I commented GLOW, please send me the lipstick code!",
      "Are these blushes safe for dry sensitive skin types?",
      "Rakhee, which brush did you use to blend the concealer crease?",
      "Need your direct email address for my boutique skin brand"
    ];
    const randomIndex = Math.floor(Math.random() * followerNames.length);

    const newDM: CreatorMessage = {
      id: "msg-" + Date.now(),
      senderName: followerNames[randomIndex],
      senderHandle: followerHandles[randomIndex],
      messageText: questions[randomIndex],
      platform: "Instagram DM",
      date: new Date().toISOString().split("T")[0],
      replied: false
    };

    setMessages([newDM, ...messages]);
  };

  const handleExportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Email,Join Date,Interests"].join(",") + "\n"
      + subscribers.map(s => `"${s.name}","${s.email}","${s.dateJoined}","${s.beautyInterests.join("; ")}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subscribers_list_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Math totals for the desk display
  const totalBrandEarnings = leads
    .filter(l => l.status === "Approved" || l.status === "Completed")
    .reduce((sum, l) => sum + l.budget, 0);

  const pendingIncomingDeals = leads
    .filter(l => l.status === "New Lead" || l.status === "Negotiation")
    .reduce((sum, l) => sum + l.budget, 0);

  const activeNewsletterCount = subscribers.length;
  const totalAffClicks = affiliates.reduce((sum, a) => sum + a.clicks, 0);
  const totalAffEarnings = affiliates.reduce((sum, a) => sum + a.revenueGenerated, 0);

  return (
    <section id="admin-work-desk" className="py-10 bg-[#FAF8F5] border-t border-brand-blush/25 relative scroll-mt-20">
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Simplified Branding Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-brand-blush/15 pb-6 mb-8 text-left">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-rose text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-2">
              <Shield size={11} />
              <span>Rakhee's Private Desk</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-brand-dark">
              My Creator Notebook &amp; Helpers
            </h2>
            <p className="font-sans text-xs text-stone-500 mt-0.5">
              Welcome back, Rakhee! Use this simplified desk to change your portfolio stats, answer follower questions, draft brand deals, and view your newsletter list. No complex codes here.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={simulateClicks}
              className="inline-flex items-center gap-1.5 bg-brand-sand hover:bg-brand-rose hover:text-white text-brand-rose border border-brand-rose/25 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              title="Add simulated traffic views and sales clicks to your affiliate metrics"
            >
              <RefreshCw size={13} />
              <span>Simulate Reader Link Click</span>
            </button>

            <button
              onClick={handleCreateMockNewDM}
              className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              <MessageCircle size={13} />
              <span>Receive New Mock DM</span>
            </button>
          </div>
        </div>

        {/* Dynamic Plain-Text Notebook Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-brand-sand/35 p-1.5 rounded-2xl border border-brand-blush/20 shadow-sm mb-6" id="desk-navigation-bar">
          <button
            onClick={() => setActiveTab("brand-deals")}
            className={`w-full font-sans text-[11px] sm:text-xs font-bold py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center truncate ${
              activeTab === "brand-deals" 
                ? "bg-brand-rose text-white shadow-xs" 
                : "bg-white text-stone-600 hover:bg-stone-50 border border-brand-blush/5"
            }`}
          >
            🤝 Brand Deals ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("follower-messages")}
            className={`w-full font-sans text-[11px] sm:text-xs font-bold py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center truncate ${
              activeTab === "follower-messages" 
                ? "bg-brand-rose text-white shadow-xs" 
                : "bg-white text-stone-600 hover:bg-stone-50 border border-brand-blush/5"
            }`}
          >
            💬 Messages ({messages.filter(m => !m.replied).length})
          </button>
          <button
            onClick={() => setActiveTab("video-posts")}
            className={`w-full font-sans text-[11px] sm:text-xs font-bold py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center truncate ${
              activeTab === "video-posts" 
                ? "bg-brand-rose text-white shadow-xs" 
                : "bg-white text-stone-600 hover:bg-stone-50 border border-brand-blush/5"
            }`}
          >
            📹 Videos ({reels.length})
          </button>
          <button
            onClick={() => setActiveTab("affiliate-links")}
            className={`w-full font-sans text-[11px] sm:text-xs font-bold py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center truncate ${
              activeTab === "affiliate-links" 
                ? "bg-brand-rose text-white shadow-xs" 
                : "bg-white text-stone-600 hover:bg-stone-50 border border-brand-blush/5"
            }`}
          >
            🌟 Earnings
          </button>
          <button
            onClick={() => setActiveTab("newsletter-friends")}
            className={`w-full font-sans text-[11px] sm:text-xs font-bold py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center truncate ${
              activeTab === "newsletter-friends" 
                ? "bg-brand-rose text-white shadow-xs" 
                : "bg-white text-stone-600 hover:bg-stone-50 border border-brand-blush/5"
            }`}
          >
            💖 Friends ({activeNewsletterCount})
          </button>
          <button
            onClick={() => setActiveTab("profile-stats")}
            className={`w-full font-sans text-[11px] sm:text-xs font-bold py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center truncate ${
              activeTab === "profile-stats" 
                ? "bg-brand-rose text-white shadow-xs" 
                : "bg-white text-stone-600 hover:bg-stone-50 border border-brand-blush/5"
            }`}
          >
            ⚙️ Stats Setup
          </button>
        </div>

        {/* Simple count cards for Quick At-A-Glance views */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-brand-blush/10 text-left">
            <p className="text-[10px] uppercase text-stone-400 font-bold font-mono tracking-wider">Earned Brand Income</p>
            <p className="text-xl font-bold text-brand-dark mt-1">{formatPrice(totalBrandEarnings)}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-brand-blush/10 text-left">
            <p className="text-[10px] uppercase text-stone-400 font-bold font-mono tracking-wider">Potential Brand Inquiries</p>
            <p className="text-xl font-bold text-stone-500 mt-1">{formatPrice(pendingIncomingDeals)}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-brand-blush/10 text-left">
            <p className="text-[10px] uppercase text-stone-400 font-bold font-mono tracking-wider">Affiliate Sales Cash</p>
            <p className="text-xl font-bold text-[#4F7942] mt-1">{formatPrice(totalAffEarnings, 2)}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-brand-blush/10 text-left">
            <p className="text-[10px] uppercase text-stone-400 font-bold font-mono tracking-wider">Commission Link Clicks</p>
            <p className="text-xl font-bold text-brand-rose mt-1">{totalAffClicks} visits</p>
          </div>
        </div>

        {/* ================= TAB 1: BRAND DEALS (CRM) ================= */}
        {activeTab === "brand-deals" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left animate-fadeIn">
            
            {/* Left Column: Brand deal list table */}
            <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-brand-blush/10 shadow-sm">
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-stone-100">
                <h3 className="font-serif text-base font-bold text-brand-dark">Active Projects &amp; Negotiations</h3>
                <input 
                  type="text" 
                  placeholder="Type Brand name filter..." 
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  className="bg-stone-50 border border-brand-blush/20 text-xs px-2.5 py-1.5 rounded-xl focus:outline-none w-44"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-sans text-stone-600">
                  <thead>
                    <tr className="border-b border-stone-100 text-[10px] uppercase font-bold text-stone-400">
                      <th className="pb-3 text-left">Brand Partners</th>
                      <th className="pb-3 text-right">Offer Budget</th>
                      <th className="pb-3 text-left pl-4">Deal Status</th>
                      <th className="pb-3 text-left">Client Paid</th>
                      <th className="pb-3 text-right">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {leads
                      .filter(l => l.brandName.toLowerCase().includes(brandSearchQuery.toLowerCase()))
                      .map((lead) => (
                        <tr key={lead.id} className="hover:bg-stone-50">
                          <td className="py-3">
                            <p className="font-bold text-brand-dark text-sm">{lead.brandName}</p>
                            <p className="text-[10px] text-stone-500 mt-0.5">Contact: {lead.contactPerson} ({lead.email})</p>
                            <p className="text-[10px] text-brand-rose italic mt-1 bg-brand-sand/30 underline inline-block px-1.5 rounded">Format: {lead.campaignType}</p>
                            {lead.campaignDetails && (
                              <p className="text-[10.5px] text-stone-400 mt-1 pl-2 border-l border-brand-rose line-clamp-1" title={lead.campaignDetails}>
                                "{lead.campaignDetails}"
                              </p>
                            )}
                          </td>
                          <td className="py-3 text-right font-mono font-bold text-stone-800">{formatPrice(lead.budget)}</td>
                          <td className="py-3 pl-4">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as CollabLead["status"])}
                              className="bg-stone-50 border border-stone-200 text-[10px] px-2 py-1 rounded text-stone-700 font-semibold focus:outline-none cursor-pointer"
                            >
                              <option value="New Lead">1. New Deal Request</option>
                              <option value="Contacted">2. Contacted Partner</option>
                              <option value="Negotiation">3. In Price Negotiation</option>
                              <option value="Approved">4. Approved &amp; Booked</option>
                              <option value="Completed">5. Video Post Done &amp; Finished</option>
                              <option value="Rejected">Pass / Rejected</option>
                            </select>
                          </td>
                          <td className="py-3">
                            <select
                              value={lead.paymentStatus || "Unpaid"}
                              onChange={(e) => updateLeadPayment(lead.id, e.target.value as CollabLead["paymentStatus"])}
                              className={`text-[9.5px] px-2 py-0.5 font-bold rounded uppercase ${
                                lead.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700" :
                                lead.paymentStatus === "Partial" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-600 font-normal"
                              }`}
                            >
                              <option value="Unpaid">❌ Not Paid Yet</option>
                              <option value="Partial">⏳ Partially Paid</option>
                              <option value="Paid">✅ Fully Paid!</option>
                            </select>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                if(confirm(`Remove ${lead.brandName} from deals notebook?`)) deleteLead(lead.id);
                              }}
                              className="text-stone-300 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-stone-400">No brand deal entries yet. Log one on the right!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Simple Deal Logging Form */}
            <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-brand-blush/10 shadow-sm">
              <h3 className="font-serif text-base font-bold text-brand-dark mb-4 pb-2 border-b border-stone-100">
                Log a Brand Deal
              </h3>
              <form onSubmit={handleLogBrandDeal} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Brand / Company Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Fenty Beauty" 
                    value={dealBrand}
                    onChange={(e) => setDealBrand(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Contact Person Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Elena Ramos" 
                    value={dealContact}
                    onChange={(e) => setDealContact(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Their Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. partnerships@fenty.com" 
                    value={dealEmail}
                    onChange={(e) => setDealEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Price Deal ({currency === "INR" ? "INR ₹" : "USD $" })</label>
                    <input 
                      type="number" 
                      required
                      value={dealBudget}
                      onChange={(e) => setDealBudget(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Format</label>
                    <select
                      value={dealType}
                      onChange={(e) => setDealType(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-2 py-2 text-xs focus:outline-none text-stone-700"
                    >
                      <option value="Dedicated Instagram Sponsored Reel">Instagram Reel</option>
                      <option value="UGC Video Product Wear-Test (Raw)">UGC Raw Video</option>
                      <option value="1x Reel + 2x IG Story Injections">Reel + Stories</option>
                      <option value="Long-Term Brand Ambassadorship">Ambassador Deal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-500 font-semibold mb-1">General Deal Notes (Shipment, ideas...)</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Sending peach blush shade. Scheduled to film on physical delivery next Thursday." 
                    value={dealNotes}
                    onChange={(e) => setDealNotes(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-rose hover:bg-brand-dark text-white font-bold py-2.5 rounded-xl transition-all cursor-pointer text-xs"
                >
                  Save Deal to Notebook
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= TAB 2: FOLLOWER MESSAGES & COMMENTS ================= */}
        {activeTab === "follower-messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left animate-fadeIn">
            
            {/* Follower comments and messages list */}
            <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-brand-blush/10 shadow-sm">
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-stone-100">
                <div>
                  <h3 className="font-serif text-base font-bold text-brand-dark">Direct Follower Interaction Log</h3>
                  <p className="text-[11px] text-stone-500">Track and respond to those who text you, comment, or send Instagram and Facebook messages.</p>
                </div>
                <span className="font-mono text-[10px] bg-brand-sand text-brand-rose px-2 py-1 rounded-full font-bold">
                  {messages.filter(m => !m.replied).length} Waiting response
                </span>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`p-4 rounded-2xl border transition-all ${
                      msg.replied 
                        ? "bg-stone-50/50 border-stone-100 opacity-80" 
                        : "bg-white border-brand-blush/20 shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        {msg.platform === "Instagram Comment" && <Instagram size={14} className="text-pink-600" />}
                        {msg.platform === "Instagram DM" && <Instagram size={14} className="text-purple-600" />}
                        {msg.platform === "Facebook Message" && <Facebook size={14} className="text-blue-600" />}
                        <strong className="text-brand-dark text-xs">{msg.senderName}</strong>
                        <span className="text-[10px] font-mono text-stone-400">{msg.senderHandle}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9.5px] font-mono text-stone-400">{msg.date}</span>
                        <span className={`text-[8.5px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          msg.replied ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700 animate-pulse"
                        }`}>
                          {msg.replied ? "Replied" : "Unanswered"}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 mb-3">
                      <p className="text-stone-700 text-xs">"{msg.messageText}"</p>
                      {msg.targetPost && (
                        <p className="text-[9.5px] text-brand-rose mt-1.5 font-sans">
                          📌 Post source: <strong>{msg.targetPost}</strong>
                        </p>
                      )}
                      {msg.keywordTriggered && (
                        <p className="text-[9.5px] text-[#4F7942] font-mono mt-1 font-bold">
                          🤖 Trigger word detected: comment "{msg.keywordTriggered}"
                        </p>
                      )}
                    </div>

                    {msg.replied && msg.replyText && (
                      <div className="p-3 bg-brand-sand/20 rounded-xl border border-brand-blush/10 text-xs ml-4 mb-2">
                        <p className="text-stone-500 font-semibold mb-0.5">My response sent to follower:</p>
                        <p className="text-stone-700">"{msg.replyText}"</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleToggleRepliedState(msg.id, msg.replied)}
                        className="text-[11px] font-sans text-stone-500 hover:text-brand-rose hover:underline"
                      >
                        {msg.replied ? "Mark as Unanswered" : "Mark as Replied"}
                      </button>

                      {!msg.replied && replyInputId !== msg.id && (
                        <button
                          onClick={() => {
                            setReplyInputId(msg.id);
                            setReplyTextValue("");
                          }}
                          className="bg-brand-rose hover:bg-brand-dark text-white text-[10.5px] font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                        >
                          Write Reply
                        </button>
                      )}

                      {replyInputId === msg.id && (
                        <button
                          onClick={() => setReplyInputId(null)}
                          className="text-[11px] hover:underline text-stone-400 p-1 font-sans"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    {replyInputId === msg.id && (
                      <div className="mt-3 bg-brand-sand/20 p-3 rounded-xl border border-brand-blush/10">
                        <label className="block text-[10px] text-stone-500 font-semibold mb-1">Direct message / comment response draft:</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type comforting answer or product tips..."
                            value={replyTextValue}
                            onChange={(e) => setReplyTextValue(e.target.value)}
                            className="bg-white border border-brand-blush/20 rounded-lg px-2.5 py-1.5 focus:outline-none text-xs flex-1 text-stone-700"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSendReplyToFollower(msg.id)}
                            className="bg-brand-dark hover:bg-brand-rose text-white px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer"
                          >
                            <Send size={11} />
                            <span>Send</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Instant Dm Automation Configuration setup */}
            <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-brand-blush/10 shadow-sm space-y-4">
              <div>
                <h3 className="font-serif text-base font-bold text-brand-dark border-b border-stone-100 pb-2 mb-2">
                  Comment-to-DM Setup
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  We configure rules so when a follower comments a specific word on your videos, Instagram automatically DMs them your affiliate link instantly!
                </p>
              </div>

              <div className="p-4 bg-brand-sand/35 rounded-2xl space-y-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">Comment Word Trigger</label>
                  <input 
                    type="text" 
                    value={automationKeyword}
                    onChange={(e) => setAutomationKeyword(e.target.value.toUpperCase())}
                    className="w-full bg-white border border-brand-blush/20 rounded-xl px-3 py-1.5 text-xs text-brand-dark uppercase font-mono font-bold"
                  />
                  <p className="text-[9.5px] text-stone-400 mt-0.5">Follower type this under comments.</p>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">Auto-Response Message Draft</label>
                  <textarea 
                    rows={4}
                    value={automationReplyText}
                    onChange={(e) => setAutomationReplyText(e.target.value)}
                    className="w-full bg-white border border-brand-blush/20 rounded-xl p-2 text-[11px] text-stone-700 focus:outline-none"
                  />
                  <p className="text-[9.5px] text-stone-400 mt-0.5 text-right font-mono">Include ShopMy url link here.</p>
                </div>

                <button
                  type="button"
                  onClick={() => alert("Auto DM automated reply saved! Simulated triggers will now deploy this template.")}
                  className="w-full bg-brand-dark hover:bg-brand-rose text-white text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Save Active Auto-Rule
                </button>
              </div>

              <div className="border border-brand-blush/20 rounded-2xl p-3.5 space-y-2">
                <p className="font-serif text-xs font-bold text-brand-dark">How to trigger DM demo</p>
                <ol className="text-[10.5px] text-stone-500 list-decimal pl-4 space-y-1">
                  <li>Go to your homepage video showcase pool</li>
                  <li>Click on any wear-test or swatch Reel</li>
                  <li>Type standard test comment <strong className="font-mono text-brand-rose bg-brand-sand px-1 font-bold">GLOW</strong></li>
                  <li>An automated DM will instantly fire in simulated state!</li>
                </ol>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: VIDEO POSTS (CONTENT) ================= */}
        {activeTab === "video-posts" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left animate-fadeIn">
            
            <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-brand-blush/10 shadow-sm">
              <h3 className="font-serif text-base font-bold text-brand-dark pb-3 border-b border-stone-100 mb-4">My Reel Post Directory</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reels.map((rl) => (
                  <div key={rl.id} className="p-3 bg-[#FAF8F5] border border-brand-blush/10 rounded-2xl flex items-center gap-3">
                    <img 
                      src={rl.thumbnail} 
                      alt={rl.title} 
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-brand-blush/10" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left flex-grow min-w-0">
                      <p className="font-serif text-xs font-bold text-brand-dark line-clamp-1">{rl.title}</p>
                      <p className="text-[10px] text-brand-rose font-mono font-semibold mt-0.5">{rl.category}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[9.5px] text-stone-400 font-mono">
                        <span>👁️ {rl.views.toLocaleString()} visits</span>
                        <span>⭐ ER: {rl.engagementRate}%</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if(confirm("Remove this post from website?")) deleteReel(rl.id);
                      }}
                      className="text-stone-300 hover:text-red-500 p-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-brand-blush/10 shadow-sm">
              <h3 className="font-serif text-base font-bold text-brand-dark border-b border-stone-100 pb-2.5 mb-3">Add Video Post</h3>
              <form onSubmit={handlePublishReel} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Reel Video Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Rare Soft Pinch Blush Wear-test Shade Happy" 
                    value={newReelTitle}
                    onChange={(e) => setNewReelTitle(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Beauty Category</label>
                    <select
                      value={newReelCategory}
                      onChange={(e) => setNewReelCategory(e.target.value as InstagramReel["category"])}
                      className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-2 py-2 text-xs text-stone-700 font-medium focus:outline-none"
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
                    <label className="block text-stone-500 font-semibold mb-1">Views Count</label>
                    <input 
                      type="number" 
                      required
                      value={newReelViews}
                      onChange={(e) => setNewReelViews(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Engagement Avg Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    value={newReelEr}
                    onChange={(e) => setNewReelEr(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-dark hover:bg-brand-rose text-white font-bold py-2.5 rounded-xl transition-all cursor-pointer text-xs"
                >
                  Publish Video Post
                </button>
              </form>
            </div>

          </div>
        )}

        {/* ================= TAB 4: AFFILIATE LINKS ================= */}
        {activeTab === "affiliate-links" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left animate-fadeIn">
            
            <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-brand-blush/10 shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-stone-100 mb-4">
                <h3 className="font-serif text-base font-bold text-brand-dark">Affiliate Click &amp; Earnings Recorder</h3>
                <span className="text-[10px] bg-green-50 text-emerald-700 px-2 py-0.5 rounded font-bold font-mono">
                  Syncing active Storefront
                </span>
              </div>

              <div className="space-y-4">
                {affiliates.map((aff) => (
                  <div key={aff.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-brand-blush/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={aff.thumbnail} 
                        alt={aff.name} 
                        className="w-12 h-12 object-cover rounded-xl shrink-0 border border-brand-blush/10" 
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-serif text-sm font-bold text-brand-dark leading-tight">{aff.name}</h4>
                        <p className="text-[10.5px] text-stone-500 font-sans mt-0.5">{aff.brand} • Brand Link: <strong className="text-zinc-600 font-mono text-[9px]">{aff.affiliateUrl}</strong></p>
                        <p className="text-[10.5px] text-brand-rose font-medium mt-1 italic">"{aff.rakheeReview}"</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 text-center text-xs w-full sm:w-auto border-t sm:border-t-0 border-brand-blush/10 pt-3 sm:pt-0">
                      <div>
                        <p className="font-mono font-bold text-brand-rose">{aff.clicks}</p>
                        <span className="text-[9px] text-stone-400 font-sans font-bold uppercase">Clicks</span>
                      </div>
                      <div>
                        <p className="font-mono font-bold text-brand-dark">{aff.salesCount}</p>
                        <span className="text-[9px] text-stone-400 font-sans font-bold uppercase">Buyers</span>
                      </div>
                      <div>
                        <p className="font-mono font-bold text-green-600">{formatPrice(aff.revenueGenerated, 2)}</p>
                        <span className="text-[9px] text-stone-400 font-sans font-bold uppercase">Earnings</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-brand-blush/10 shadow-sm text-xs text-stone-600">
              <h3 className="font-serif text-base font-bold text-brand-dark mb-3 pb-2 border-b border-stone-100">Integrated Catalog</h3>
              <p className="leading-relaxed mb-4">
                We bundle products directly on ShopMy &amp; LTK. Whenever you update these, direct response commentautomations send the active link down follower chat tubes.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 bg-brand-sand/35 rounded-xl border border-brand-blush/10 text-left">
                  <p className="font-serif text-xs font-bold text-brand-dark">ShopMy Catalog Integration</p>
                  <p className="text-[10.5px] text-stone-500 mt-1">Gives followers 12-15% discount matches on selected creams &amp; correct shade items.</p>
                </div>
                <div className="p-3.5 bg-brand-sand/35 rounded-xl border border-brand-blush/10 text-left">
                  <p className="font-serif text-xs font-bold text-brand-dark">LTK Beauty Hub</p>
                  <p className="text-[10.5px] text-stone-500 mt-1">Secondary catalog references for seasonal tutorials and GRWM sound transitions.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 5: NEWSLETTER FRIENDS ================= */}
        {activeTab === "newsletter-friends" && (
          <div className="bg-white p-6 rounded-3xl border border-brand-blush/10 shadow-sm text-left animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-100 mb-6">
              <div>
                <h3 className="font-serif text-base font-bold text-brand-dark">My Newsletter Family List</h3>
                <p className="text-[11px] text-stone-500">List of subscribers who requested shade swatch cards and dewy skincare routines.</p>
              </div>

              <button
                onClick={handleExportSubscribers}
                className="bg-brand-dark hover:bg-brand-rose text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Download as Excel/CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-sans text-stone-600">
                <thead>
                  <tr className="border-b border-stone-100 text-[10px] uppercase font-bold text-stone-400">
                    <th className="pb-3 text-left">Subscriber Name</th>
                    <th className="pb-3 text-left">Email Address</th>
                    <th className="pb-3 text-left">Checked Beauty Interests</th>
                    <th className="pb-3 text-right">Date Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-stone-50">
                      <td className="py-3 font-semibold text-brand-dark">{sub.name}</td>
                      <td className="py-3 font-mono text-zinc-500">{sub.email}</td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {sub.beautyInterests.map((interest, i) => (
                            <span key={i} className="bg-brand-sand text-brand-rose text-[9px] font-sans font-semibold px-2.5 py-0.5 rounded-full border border-brand-blush/10">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 text-right font-mono text-stone-400">{sub.dateJoined}</td>
                    </tr>
                  ))}
                  {subscribers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-stone-400">No subscribers signed up yet. Code is ready!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 6: MY NUMBERS SETUP ================= */}
        {activeTab === "profile-stats" && (
          <div className="max-w-2xl bg-white p-6 rounded-3xl border border-brand-blush/10 shadow-sm text-left animate-fadeIn">
            <h3 className="font-serif text-base font-bold text-brand-dark pb-3 border-b border-stone-100 mb-4">Edit My Public Counter Targets</h3>
            
            <div className="space-y-4 text-xs font-sans">
              <p className="text-stone-500 leading-relaxed text-[11.5px]">
                Want to update your Instagram follower totals or modify your overall average engagement percentages? Edit the fields below and click Deploy. Your homepage cards will update instantly!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Set Total Followers</label>
                  <input 
                    type="number"
                    value={followersInput}
                    onChange={(e) => setFollowersInput(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-rose"
                  />
                  <p className="text-[10px] text-stone-400 mt-1 italic">Current total on homepage is: {stats.followers.toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-stone-500 font-semibold mb-1">Set Average Engagement (%)</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={engagementInput}
                    onChange={(e) => setEngagementInput(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-brand-blush/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-rose"
                  />
                  <p className="text-[10px] text-stone-400 mt-1 italic">Current engagement average is: {stats.engagementAvg}%</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleUpdateViewsStats}
                  className="bg-brand-rose hover:bg-brand-dark text-white font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer text-xs"
                >
                  Deploy Profile Updates Live
                </button>
              </div>

              <div className="pt-4 border-t border-stone-100 text-[10.5px] text-stone-400 space-y-1">
                <p>💡 <em>Tip: Brands love seeing engagement averages above 5%! Keeping your engagement correct helps land boutique face cream campaigns.</em></p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
