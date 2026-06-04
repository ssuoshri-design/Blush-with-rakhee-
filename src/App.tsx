import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Pillars from "./components/Pillars";
import Showcase from "./components/Showcase";
import TrustCollab from "./components/TrustCollab";
import MediaKitAudit from "./components/MediaKitAudit";
import FunnelRoadmap from "./components/FunnelRoadmap";
import NewsletterContact from "./components/NewsletterContact";
import AdminOS from "./components/AdminOS";

import { 
  initialStats, 
  initialPillars, 
  initialReels, 
  initialLeads, 
  initialAffiliateProducts, 
  initialNewsletterSubscribers 
} from "./mockData";
import { CollabLead, InstagramReel, AffiliateItem, NewsletterSubscriber, CreatorStats } from "./types";
import { AlertCircle, CheckCircle2, Heart, HeartHandshake, Instagram, Mail, MessageSquare } from "lucide-react";

export default function App() {
  // Dual layout mode: "public" handles the consumer branding, "admin" is the Creator operating system
  const [currentMode, setMode] = useState<"public" | "admin">("public");

  // CRM State core
  const [leads, setLeads] = useState<CollabLead[]>(() => {
    const saved = localStorage.getItem("blush_leads");
    return saved ? JSON.parse(saved) : initialLeads;
  });

  // Creator profile core stats (Followers count, ER)
  const [stats, setStats] = useState<CreatorStats>(() => {
    const saved = localStorage.getItem("blush_stats");
    return saved ? JSON.parse(saved) : initialStats;
  });

  // Content CMS State core - allows updating Reels catalogue dynamically
  const [reels, setReels] = useState<InstagramReel[]>(() => {
    const saved = localStorage.getItem("blush_reels");
    return saved ? JSON.parse(saved) : initialReels;
  });

  // Affiliate click tracker metrics
  const [affiliates, setAffiliates] = useState<AffiliateItem[]>(() => {
    const saved = localStorage.getItem("blush_affiliates");
    return saved ? JSON.parse(saved) : initialAffiliateProducts;
  });

  // Newsletter audience list
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    const saved = localStorage.getItem("blush_subscribers");
    return saved ? JSON.parse(saved) : initialNewsletterSubscribers;
  });

  // Downloads tracking count
  const [downloadCount, setDownloadCount] = useState<number>(() => {
    const saved = localStorage.getItem("blush_downloads");
    return saved ? Number(saved) : 48;
  });

  // High-fidelity active selection feedback mapping
  const [selectedCampaignType, setSelectedCampaignType] = useState<string>("Dedicated Instagram Sponsored Reel");

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("blush_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("blush_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("blush_reels", JSON.stringify(reels));
  }, [reels]);

  useEffect(() => {
    localStorage.setItem("blush_affiliates", JSON.stringify(affiliates));
  }, [affiliates]);

  useEffect(() => {
    localStorage.setItem("blush_subscribers", JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem("blush_downloads", String(downloadCount));
  }, [downloadCount]);

  // Helpers to adjust CRM levels
  const addLead = (newLead: CollabLead) => {
    setLeads([newLead, ...leads]);
  };

  const updateLeadStatus = (id: string, status: CollabLead["status"]) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  const updateLeadPayment = (id: string, paymentStatus: CollabLead["paymentStatus"]) => {
    setLeads(leads.map(l => l.id === id ? { ...l, paymentStatus } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  // Content CMS helpers
  const addReel = (newReel: InstagramReel) => {
    setReels([newReel, ...reels]);
  };

  const deleteReel = (id: string) => {
    setReels(reels.filter(r => r.id !== id));
  };

  // Direct Submission forms handlers (public page triggers)
  const handleNewsletterSubmit = (newSub: Omit<NewsletterSubscriber, "id" | "dateJoined">) => {
    const completedRecord: NewsletterSubscriber = {
      ...newSub,
      id: "sub-" + Date.now(),
      dateJoined: new Date().toISOString().split("T")[0]
    };
    setSubscribers([completedRecord, ...subscribers]);
  };

  const handleContactSubmit = (newProposal: Omit<CollabLead, "id" | "date" | "status">) => {
    const completeProposal: CollabLead = {
      ...newProposal,
      id: "proposal-" + Date.now(),
      status: "New Lead",
      date: new Date().toISOString().split("T")[0],
      paymentStatus: "Unpaid"
    };
    setLeads([completeProposal, ...leads]);
  };

  // Incrementor for media downloads metric
  const incrementDownloads = () => {
    setDownloadCount(prev => prev + 1);
  };

  // Simulator link clicks telemetry generator (Simulates organic growth)
  const simulateTrafficClicks = () => {
    const updated = affiliates.map((item) => {
      // Randomly award 10-50 clicks
      const randomizedClicksDelta = Math.floor(Math.random() * 40) + 10;
      // 5% click to buy conversion average
      const salesDelta = Math.max(1, Math.round(randomizedClicksDelta * 0.08));
      
      const newClicksSum = item.clicks + randomizedClicksDelta;
      const newSalesSum = item.salesCount + salesDelta;
      const newCommissionEarned = newSalesSum * item.price * item.commissionRate;

      return {
        ...item,
        clicks: newClicksSum,
        salesCount: newSalesSum,
        revenueGenerated: Number(newCommissionEarned)
      };
    });
    setAffiliates(updated);
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-brand-blush">
      
      {/* Sticky Header block navigation integration */}
      <Header 
        currentMode={currentMode} 
        setMode={setMode} 
        scrollToSection={scrollToSection} 
      />

      {/* Main Core Router Screen mapping */}
      <main className="flex-grow">
        {currentMode === "public" ? (
          <div className="animate-fadeIn">
            {/* Section 1: Hero Section */}
            <Hero 
              onWorkWithMe={() => scrollToSection("contact")}
              onExploreContent={() => scrollToSection("portfolio")}
            />

            {/* Section 2: Personal Biography */}
            <About />

            {/* Section 3: Value Content Pillars */}
            <Pillars 
              onFilterCategory={(category) => {
                scrollToSection("portfolio");
              }}
            />

            {/* Sections 4 & 5: IG Reels Grid Portfolio and Dynamic Zoom/Sound Pacing Player */}
            <Showcase />

            {/* Sections 6 & 7: Why trust Rakhee & Core Brand Sponsorship Hub */}
            <TrustCollab 
              onSelectService={(serviceTitle) => {
                setSelectedCampaignType(serviceTitle);
                scrollToSection("contact");
              }} 
            />

            {/* Sections 8 & 9: PDF Media Kit Rates Sheets & Real audits of technical setups */}
            <MediaKitAudit 
              onRequestCollab={() => scrollToSection("contact")}
              incrementDownloads={incrementDownloads}
              downloadCount={downloadCount}
            />

            {/* Sections 10 & 11: DM Key phrases automation & Monetization timeline projection */}
            <FunnelRoadmap />

            {/* Sections 12, 13, 14 & 15: Mailing lists updates, Testimonial cards list, FAQs Accordions, CRM Proposal Form */}
            <NewsletterContact 
              onNewsletterSubmit={handleNewsletterSubmit}
              onContactSubmit={handleContactSubmit}
              selectedCampaignType={selectedCampaignType}
              setSelectedCampaignType={setSelectedCampaignType}
            />
          </div>
        ) : (
          /* High-Fidelity Creator Admin OS Panel View Mode */
          <div className="animate-fadeIn bg-stone-50">
            <AdminOS 
              stats={stats}
              updateStats={setStats}
              leads={leads}
              addLead={addLead}
              updateLeadStatus={updateLeadStatus}
              updateLeadPayment={updateLeadPayment}
              deleteLead={deleteLead}
              reels={reels}
              addReel={addReel}
              deleteReel={deleteReel}
              affiliates={affiliates}
              simulateClicks={simulateTrafficClicks}
              subscribers={subscribers}
              downloadCount={downloadCount}
            />
          </div>
        )}
      </main>

      {/* Deep Footer integration including legal parameters */}
      <footer className="bg-brand-dark text-white border-t border-white/5 py-12 px-4 lg:px-8 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-lg font-bold uppercase tracking-widest text-[#E8C8C8]">
              BLUSH <span className="font-light italic text-[#F5EFE8]">With</span> RAKHEE
            </h4>
            <p className="font-sans text-xs text-stone-300 leading-relaxed max-w-xs">
              A high-polished beauty creator brand ecosystem, tracking metrics, automating affiliate conversions, and delivering top-tier UGC content draft materials.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/blushwithrakhee" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-rose transition-colors flex items-center justify-center text-stone-200">
                <Instagram size={14} />
              </a>
              <a href="mailto:ssuoshri@gmail.com" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-rose transition-colors flex items-center justify-center text-stone-200">
                <Mail size={14} />
              </a>
              <a href="https://wa.me/15550192301" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-rose transition-colors flex items-center justify-center text-stone-200">
                <MessageSquare size={14} />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-xs text-stone-300 font-sans">
            <h5 className="font-mono text-[9px] uppercase tracking-widest font-bold text-stone-400">Quick Portal Anchors</h5>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("home"), 100); }} className="hover:text-brand-blush hover:underline cursor-pointer block text-left">Brand Home</button>
              <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("about"), 100); }} className="hover:text-brand-blush hover:underline cursor-pointer block text-left">Meet Rakhee</button>
              <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("portfolio"), 100); }} className="hover:text-brand-blush hover:underline cursor-pointer block text-left">Campaign Showcase</button>
              <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("mediakit"), 100); }} className="hover:text-brand-blush hover:underline cursor-pointer block text-left">Media Kit &amp; Rates</button>
              <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("contact"), 100); }} className="hover:text-brand-blush hover:underline cursor-pointer block text-left">Partnership Form</button>
              <button onClick={() => setMode(currentMode === "public" ? "admin" : "public")} className="hover:text-brand-blush hover:underline cursor-pointer font-bold block text-left">Private OS portal</button>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3.5 text-xs text-stone-300 font-sans">
            <h5 className="font-mono text-[9px] uppercase tracking-widest font-bold text-stone-400">FTC &amp; Compliance statement</h5>
            <p className="leading-relaxed text-[10.5px] text-stone-400">
              Blush With Rakhee reserves absolute alignment rights. Sponsored campaigns, unedited wear-tests reviews, and associated affiliate commissions abide strictly by the Federal Trade Commission transparent tagging requirements. Double-wear swatches reflect exact unmodified textures.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 font-mono gap-4">
          <span>&copy; {new Date().getFullYear()} Blush With Rakhee. All Rights Reserved.</span>
          <span className="flex items-center gap-1">
            Engineered with <Heart size={10} fill="#B76E79" className="text-brand-rose" /> as a Premium Creator Operating System.
          </span>
        </div>
      </footer>

    </div>
  );
}
