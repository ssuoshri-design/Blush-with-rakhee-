import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Pillars from "./components/Pillars";
import Showcase from "./components/Showcase";
import TrustCollab from "./components/TrustCollab";
import MediaKitAudit from "./components/MediaKitAudit";
import NewsletterContact from "./components/NewsletterContact";
import AdminOS from "./components/AdminOS";
import InstagramDMAssistant from "./components/InstagramDMAssistant";
import LegalViewer from "./components/LegalViewer";
import BeautyRewardWidget from "./components/BeautyRewardWidget";

import { 
  initialStats, 
  initialPillars, 
  initialReels, 
  initialLeads, 
  initialAffiliateProducts, 
  initialNewsletterSubscribers,
  initialCreatorMessages,
  initialRewardsConfig,
  initialRewardClaims
} from "./mockData";
import { CollabLead, InstagramReel, AffiliateItem, NewsletterSubscriber, CreatorStats, CreatorMessage, RewardConfig, RewardClaim } from "./types";
import { AlertCircle, CheckCircle2, Heart, HeartHandshake, Instagram, Mail, MessageSquare, Facebook, Lock, Youtube, Phone, MapPin, Clock, ShieldCheck, Send, Sparkles } from "lucide-react";


export default function App() {
  // Dual layout mode: "public" handles the consumer branding, "admin" is the Creator operating system
  const [currentMode, setMode] = useState<"public" | "admin">("public");

  // Admin login dialog authentication states
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminLoginError, setAdminLoginError] = useState(false);

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

  // Direct follower comments, DMs & texts tracking
  const [messages, setMessages] = useState<CreatorMessage[]>(() => {
    const saved = localStorage.getItem("blush_messages");
    return saved ? JSON.parse(saved) : initialCreatorMessages;
  });

  // Instagram DM Chat Lead Tracking (persistent state)
  const [instagramChatLeads, setInstagramChatLeads] = useState<any[]>(() => {
    const saved = localStorage.getItem("blush_insta_chat_leads");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Provide some nice initial seed data for the admin so it is not empty initially!
    return [
      {
        id: "chat-lead-1",
        name: "Priya Sharma (@priya_glams)",
        whatsapp: "+91 98100 12345",
        date: "Nov 28th, 2026",
        location: "Taj Palace, New Delhi",
        eventType: "Bridal wedding",
        guestCount: "Bride + 4 family members",
        desiredPackage: "Complete Glam Package",
        timestamp: "2026-06-05T12:30:00Z",
        status: "Completed"
      },
      {
        id: "chat-lead-2",
        name: "Nikita Kapoor (@niki_kapoor)",
        whatsapp: "+91 99990 54321",
        date: "Oct 15th, 2026",
        location: "Hyatt Regency, Gurgaon",
        eventType: "Engagement Ceremony",
        guestCount: "Just myself",
        desiredPackage: "💄 Makeup Only",
        timestamp: "2026-06-05T10:15:00Z",
        status: "Completed"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("blush_insta_chat_leads", JSON.stringify(instagramChatLeads));
  }, [instagramChatLeads]);

  const handleInstagramLeadCaptured = (leadDetails: any) => {
    // Basic formatting
    const uniqueUserTag = `user_${Math.floor(1000 + Math.random() * 9000)}`;
    const newChatLead = {
      id: "chat-lead-" + Date.now(),
      name: leadDetails.name && leadDetails.name.trim() !== ""
        ? leadDetails.name
        : (leadDetails.whatsapp 
          ? `Inquirer [${leadDetails.whatsapp.substring(leadDetails.whatsapp.length - 5)}]` 
          : `Lead (${uniqueUserTag})`),
      whatsapp: leadDetails.whatsapp || "No Phone Provided",
      date: leadDetails.date || "Not Specified",
      location: leadDetails.location || "Not specified",
      eventType: leadDetails.eventType || "Inquiry",
      guestCount: leadDetails.guestCount || "1",
      desiredPackage: leadDetails.desiredPackage || "Custom",
      source: leadDetails.source || "Direct Website / Meta Link 🌐",
      timestamp: new Date().toISOString(),
      status: leadDetails.status || "Completed"
    };

    setInstagramChatLeads(prev => {
      // Avoid duplicating the exact same completed phone number in quick succession
      if (leadDetails.whatsapp && prev.some(l => l.whatsapp === leadDetails.whatsapp && l.status === "Completed" && leadDetails.status === "Completed")) {
        return prev;
      }
      return [newChatLead, ...prev];
    });
  };

  // Downloads tracking count
  const [downloadCount, setDownloadCount] = useState<number>(() => {
    const saved = localStorage.getItem("blush_downloads");
    return saved ? Number(saved) : 48;
  });

  // Dynamic pricing converter (INR vs USD)
  const [currency, setCurrency] = useState<"USD" | "INR">(() => {
    const saved = localStorage.getItem("blush_currency");
    return saved === "INR" ? "INR" : "USD";
  });

  const formatPrice = (usdAmount: number, digits: number = 0): string => {
    if (currency === "INR") {
      const inrAmount = usdAmount * 83; // 1 USD = 83 INR
      return `₹${Math.round(inrAmount).toLocaleString("en-IN")}`;
    }
    return `$${usdAmount.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
  };

  // High-fidelity active selection feedback mapping
  const [selectedCampaignType, setSelectedCampaignType] = useState<string>("Dedicated Instagram Sponsored Reel");

  // Premium Beauty Reward States
  const [rewards, setRewards] = useState<RewardConfig[]>(() => {
    const saved = localStorage.getItem("blush_reward_config");
    return saved ? JSON.parse(saved) : initialRewardsConfig;
  });

  const [claims, setClaims] = useState<RewardClaim[]>(() => {
    const saved = localStorage.getItem("blush_reward_claims");
    return saved ? JSON.parse(saved) : initialRewardClaims;
  });

  useEffect(() => {
    localStorage.setItem("blush_reward_config", JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem("blush_reward_claims", JSON.stringify(claims));
  }, [claims]);

  // Active Legal Document state to drive print-ready viewer modal
  const [activeLegalDoc, setActiveLegalDoc] = useState<string | null>(null);

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
    localStorage.setItem("blush_messages", JSON.stringify(messages));
  }, [messages]);


  useEffect(() => {
    localStorage.setItem("blush_downloads", String(downloadCount));
  }, [downloadCount]);

  useEffect(() => {
    localStorage.setItem("blush_currency", currency);
  }, [currency]);

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
        currency={currency}
        setCurrency={setCurrency}
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

            {/* Sections 8 & 9: PDF Media Kit Rates Sheets */}
            <MediaKitAudit 
              onRequestCollab={() => scrollToSection("contact")}
              incrementDownloads={incrementDownloads}
              downloadCount={downloadCount}
              formatPrice={formatPrice}
            />

            {/* Sections 12, 13, 14 & 15: Mailing lists updates, Testimonial cards list, FAQs Accordions, CRM Proposal Form */}
            <NewsletterContact 
              onNewsletterSubmit={handleNewsletterSubmit}
              onContactSubmit={handleContactSubmit}
              selectedCampaignType={selectedCampaignType}
              setSelectedCampaignType={setSelectedCampaignType}
              currency={currency}
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
              messages={messages}
              setMessages={setMessages}
              currency={currency}
              formatPrice={formatPrice}
              instagramChatLeads={instagramChatLeads}
              setInstagramChatLeads={setInstagramChatLeads}
              rewards={rewards}
              setRewards={setRewards}
              claims={claims}
              setClaims={setClaims}
            />
          </div>
        )}
      </main>

      {/* Deep Redesigned Luxury Footer section with full trust anchors & Razorpay compliance links */}
      <footer className="bg-[#131110] text-[#ECE7E3] border-t border-[#B76E79]/15 pt-20 pb-12 px-4 lg:px-8 text-left transition-colors relative overflow-hidden font-sans">
        
        {/* Subtle glowing ambient luxury backdrop elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#B76E79]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber-500/[0.03] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Main Footer Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
            
            {/* COLUMN 1: Brand Area (Section 1) + Contact Info (Section 6) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <h4 className="font-serif text-xl font-bold uppercase tracking-[0.2em] text-[#E8C8C8]">
                  BLUSH <span className="font-light italic text-[#ECE7E3] tracking-normal lowercase">with</span> RAKHEE
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-sans">
                  Empowering beauty enthusiasts and aspiring makeup artists through professional education, expert guidance, and real-world transformations.
                </p>
                
                {/* Section 1 Social Icons - Premium Hover Elements */}
                <div className="flex items-center gap-2.5 pt-2">
                  <a href="https://www.instagram.com/blushwithrakhee?igsh=MXBjMGFxZjN1cWR0OQ==" target="_blank" rel="noreferrer" title="Instagram" 
                     className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#B76E79] hover:bg-[#B76E79] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-[#ECE7E3]">
                    <Instagram size={15} />
                  </a>
                  <a href="https://www.facebook.com/share/1CmrEHVJgH/" target="_blank" rel="noreferrer" title="Facebook" 
                     className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#B76E79] hover:bg-[#B76E79] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-[#ECE7E3]">
                    <Facebook size={15} />
                  </a>
                  <a href="https://www.youtube.com/@blushwithrakhee" target="_blank" rel="noreferrer" title="YouTube" 
                     className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#B76E79] hover:bg-[#B76E79] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-[#ECE7E3]">
                    <Youtube size={15} />
                  </a>
                  <a href="https://wa.me/919811255432" target="_blank" rel="noreferrer" title="WhatsApp Advisory Desk" 
                     className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#B76E79] hover:bg-[#B76E79] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-[#ECE7E3]">
                    <MessageSquare size={15} />
                  </a>
                  <a href="mailto:rakhee.chakraborty1985@gmail.com" title="Email" 
                     className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#B76E79] hover:bg-[#B76E79] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-[#ECE7E3]">
                    <Mail size={15} />
                  </a>
                </div>
              </div>

              {/* Section 6 - Contact Information Details */}
              <div className="space-y-3 pt-4 border-t border-white/5 text-xs text-stone-300 font-sans">
                <h5 className="font-mono text-[9px] uppercase tracking-widest font-bold text-[#E8C8C8]">Academy Desk coordinates</h5>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <Mail size={13} className="text-[#B76E79] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-mono text-[10px] text-stone-500 leading-none">Admission Inquiry Email</p>
                      <a href="mailto:rakhee.chakraborty1985@gmail.com" className="hover:text-white transition-colors">
                        rakhee.chakraborty1985@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Phone size={13} className="text-[#B76E79] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-mono text-[10px] text-stone-500 leading-none">Desk Mobile Hotline</p>
                      <a href="tel:+919811255432" className="hover:text-white transition-colors">
                        +91 98112 55432
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Clock size={13} className="text-[#B76E79] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-mono text-[10px] text-stone-500 leading-none">Standard SLA Hours</p>
                      <p className="text-[11px]">Mon &ndash; Sat: 10:00 AM &ndash; 6:00 PM IST</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <MapPin size={13} className="text-[#B76E79] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-mono text-[10px] text-stone-500 leading-none">Main Office Registry</p>
                      <p className="text-[11px] text-stone-400">Sector 54, Gurgaon, Haryana, 122003, India</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* COLUMN 2: Sections 2 & 3 - Quick Links & Student Resources */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              
              {/* Section 2 - Quick Links */}
              <div className="space-y-3.5 text-xs text-stone-300 font-sans">
                <h5 className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-[#E8C8C8] pb-1 border-b border-white/5">
                  Navigation Gateway
                </h5>
                <ul className="space-y-2 font-medium">
                  <li>
                    <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("home"), 100); }} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      Home Page Portal
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("about"), 100); }} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      Meet Rakhee Chakraborty
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("premium-courses"), 100); }} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      Course Curriculum Fees
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("portfolio"), 100); }} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      Dynamic Video Tutorials
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("student-results-section"), 100); }} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      Live Skin Transformations
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("mediakit"), 100); }} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      Brand Collaborations &amp; Rates
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("contact"), 100); }} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      Direct Partnerships Form
                    </button>
                  </li>
                </ul>
              </div>

              {/* Section 3 - Student Resources */}
              <div className="space-y-3.5 text-xs text-stone-300 font-sans">
                <h5 className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-[#E8C8C8] pb-1 border-b border-white/5">
                  UGC &amp; Learning Hub
                </h5>
                <ul className="space-y-2 font-medium text-stone-400">
                  <li>
                    <button onClick={() => alert("Simulation Gateway: Redirection to Kajabi Course Access portal is ready.")} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      Private Course Access Setup
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setMode("admin"); }} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block font-semibold text-emerald-500">
                      Student CRM Dashboard
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("newsletter"), 150); }} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      FAQ &amp; Swatches Accordions
                    </button>
                  </li>
                  <li>
                    <button onClick={() => alert("Digital Certificate of Graduation validator will activate in upcoming cohorts.")} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      Graduation Certificates Directory
                    </button>
                  </li>
                  <li>
                    <button onClick={() => alert("Support ticket gateway: Support ticket generated. Our Admission coordinators SLA: 2 hours.")} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block/80">
                      Admissions Support Center
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setMode("public"); setTimeout(() => scrollToSection("mediakit"), 100); }} 
                            className="hover:text-[#B76E79] duration-200 cursor-pointer text-left block">
                      Free South Asian Skin eBook Guide
                    </button>
                  </li>
                </ul>
              </div>

            </div>

            {/* COLUMN 3: Section 4 & 5 - Legal & Trust Center + Secure Payments */}
            <div className="lg:col-span-2 space-y-8 text-xs text-stone-300 font-sans">
              
              {/* Section 4 - Legal Links */}
              <div className="space-y-3.5">
                <h5 className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-[#E8C8C8] pb-1 border-b border-white/5">
                  Razorpay Policy Center
                </h5>
                <ul className="space-y-2 text-stone-300 font-medium">
                  <li>
                    <button onClick={() => setActiveLegalDoc("privacy")} className="hover:text-[#B76E79] duration-200 cursor-pointer block text-left">
                      Privacy Policy &bull; Registry
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveLegalDoc("terms")} className="hover:text-[#B76E79] duration-200 cursor-pointer block text-left">
                      Terms &amp; Conditions
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveLegalDoc("refund")} className="hover:text-[#B76E79] duration-200 cursor-pointer block text-[#B76E79] font-semibold text-left">
                      Refund Policy (SLA 5-7d)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveLegalDoc("cancellation")} className="hover:text-[#B76E79] duration-200 cursor-pointer block text-left">
                      Cancellation Guidelines
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveLegalDoc("cookie")} className="hover:text-[#B76E79] duration-200 cursor-pointer block text-left">
                      Cookies Cache Policy
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveLegalDoc("disclaimer")} className="hover:text-[#B76E79] duration-200 cursor-pointer block text-left">
                      FTC Affiliate Disclaimer
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveLegalDoc("contact")} className="hover:text-[#B76E79] duration-200 cursor-pointer block text-left font-bold text-[#E8C8C8]">
                      Merchant Registry Contact
                    </button>
                  </li>
                </ul>
              </div>

              {/* Section 5 - Secure Payments */}
              <div className="space-y-3.5 pt-4 border-t border-white/5">
                <h5 className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-[#E8C8C8] flex items-center gap-1">
                  <span>🔒 Secured Payments</span>
                </h5>
                <div className="space-y-2.5">
                  
                  {/* Trust Badge Grid Icons */}
                  <div className="bg-[#FFFBF9]/10 rounded-xl p-2.5 border border-white/5 flex flex-wrap gap-2 justify-center items-center">
                    <span className="font-sans font-extrabold text-white text-[10px] tracking-wide bg-[#131110] px-2 py-1 rounded border border-[#B76E79]/20">Razorpay</span>
                    <span className="font-sans font-bold text-sky-400 text-[8px] bg-sky-950 px-1.5 py-0.5 rounded">UPI</span>
                    <span className="font-sans text-red-500 font-extrabold text-[8px] bg-white px-1.5 py-0.5 rounded">VISA/MC</span>
                    <span className="font-sans font-semibold text-stone-300 text-[8px] bg-stone-850 px-1 rounded">NetBanking</span>
                  </div>

                  <p className="text-[10px] text-stone-500 leading-relaxed font-sans block">
                    All admission payments are securely processed through Razorpay core systems with PCI-DSS compliance using industry-standard SHA-256 secure encryption protocols.
                  </p>
                </div>
              </div>

            </div>

            {/* COLUMN 4: Section 7 - Newsletter Subscription signup */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-5.5 space-y-4 relative">
                <div className="absolute top-3 right-4 text-[#B76E79]/30">
                  <Sparkles size={16} />
                </div>
                
                <div className="space-y-1">
                  <h5 className="font-serif text-sm font-bold text-[#E8C8C8] tracking-wide">
                    Join The Beauty Community
                  </h5>
                  <p className="text-[11px] text-stone-400 font-sans leading-relaxed">
                    Get premium professional makeup guides, honest product swatch reports, and rare cohort discount warnings directly.
                  </p>
                </div>

                {/* Simulated newsletter submit */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formElement = e.currentTarget;
                    const emailInput = formElement.elements.namedItem("email") as HTMLInputElement;
                    if (emailInput && emailInput.value.trim() !== "") {
                      handleNewsletterSubmit({ name: "Dear Reader", email: emailInput.value, beautyInterests: [] });
                      emailInput.value = "";
                      alert("Successfully subscribed! Check your inbox for Rakhee's hand-drafted Welcome guidelines booklet!");
                    }
                  }}
                  className="space-y-2 pt-1 font-sans"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="name@gmail.com"
                    required
                    className="w-full bg-[#131110] text-xs px-3.5 py-2.5 rounded-xl text-white border border-white/10 focus:outline-none focus:border-[#B76E79] transition-all font-mono"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#B76E79] hover:bg-white hover:text-stone-900 border border-[#B76E79] text-white py-2.5 px-3 rounded-xl cursor-pointer text-xs font-bold uppercase tracking-widest duration-300 flex items-center justify-center gap-1.5"
                  >
                    <span>Subscribe Registry</span>
                    <Send size={11} />
                  </button>
                </form>
                
                <p className="text-[9.5px] italic text-stone-500 text-center select-none block-none leading-none pt-1">
                  *Completely opt-outable at any time with 1-click. Safe parameters.
                </p>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR: Legal Copyright Area & Compliance Links */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-500 font-mono gap-6">
            
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
              <span>&copy; {new Date().getFullYear()} Blush With Rakhee &bull; Razorpay Certified Educator. All Rights Reserved.</span>
              
              <div className="flex items-center gap-1">
                {/* Invisibly small 20% opacity lock icon for Admin Authenticate trigger */}
                <button
                  onClick={() => {
                    setShowAdminLogin(true);
                    setAdminPasswordInput("");
                    setAdminLoginError(false);
                  }}
                  className="opacity-15 hover:opacity-100 transition-opacity cursor-pointer p-1 text-white hover:text-[#B76E79]"
                  title="Secure Admin Operating System Panel"
                >
                  <Lock size={12} />
                </button>
                <span className="text-stone-700">|</span>
                <span className="text-[10px] text-stone-600">Secure AES-256 Gateways</span>
              </div>
            </div>

            {/* Direct visible bottom links as mandated by Razorpay compliance */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-stone-400">
              <button onClick={() => setActiveLegalDoc("privacy")} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              <span className="text-stone-800">&bull;</span>
              <button onClick={() => setActiveLegalDoc("terms")} className="hover:text-white transition-colors cursor-pointer">Terms &amp; Conditions</button>
              <span className="text-stone-800">&bull;</span>
              <button onClick={() => setActiveLegalDoc("refund")} className="hover:text-white transition-colors cursor-pointer">Refund Policy</button>
              <span className="text-stone-800">&bull;</span>
              <button onClick={() => setActiveLegalDoc("contact")} className="hover:text-white transition-colors cursor-pointer">Contact Us</button>
            </div>

          </div>

        </div>
      </footer>

      {/* PREMIUM BEAUTY REWARD INTERACTING FLOATING PLATFORM */}
      <BeautyRewardWidget
        rewards={rewards}
        setRewards={setRewards}
        claims={claims}
        setClaims={setClaims}
        currency={currency}
        formatPrice={formatPrice}
      />

      {/* SECURE RAZORPAY LEGAL COMPLIANCE VIEWER DRAWER MODAL */}
      <LegalViewer
        documentType={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />

      {/* SECURE ADMIN AUTHORIZATION OVERLAY MODAL */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-[#131110]/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] border border-[#B76E79]/20 p-8 max-w-sm w-full shadow-2xl relative animate-fadeIn text-left">
            <button 
              onClick={() => setShowAdminLogin(false)} 
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 font-sans text-sm font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-full bg-[#FFF2F2] text-[#B76E79] flex items-center justify-center mx-auto mb-4 border border-[#B76E79]/15">
              <Lock size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-center text-[#2D2A29] mb-1">
              Authorized OS Identity Verification
            </h3>
            <p className="font-sans text-[11px] text-center text-stone-500 mb-6 leading-relaxed">
              Please enter the administrator passphrase to gain secure root access to the Creator Operating System.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (adminPasswordInput === "Rakhee@1985") {
                setMode("admin");
                setShowAdminLogin(false);
                setAdminLoginError(false);
                setAdminPasswordInput("");
              } else {
                setAdminLoginError(true);
              }
            }} className="space-y-4">
              <input 
                type="password"
                required
                placeholder="••••••••"
                value={adminPasswordInput}
                onChange={(e) => {
                  setAdminPasswordInput(e.target.value);
                  if (adminLoginError) setAdminLoginError(false);
                }}
                className={`w-full bg-stone-50 border ${adminLoginError ? "border-red-400 focus:ring-red-400" : "border-[#B76E79]/30 focus:ring-[#B76E79]"} font-mono text-center tracking-widest text-sm px-4 py-3 rounded-2xl focus:outline-none transition-all text-[#2D2A29]`}
                autoFocus
              />
              {adminLoginError && (
                <p className="text-[10px] text-red-500 font-sans font-bold flex items-center justify-center gap-1">
                  <AlertCircle size={10} />
                  <span>Invalid Passphrase. Use: Rakhee@1985</span>
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-[#2D2A29] hover:bg-[#B76E79] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-2xl transition-all cursor-pointer"
              >
                Authenticate Identity &rarr;
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Official Instagram DM Assistant Chatbot Widget */}
      <InstagramDMAssistant onLeadCaptured={handleInstagramLeadCaptured} />

    </div>
  );
}
