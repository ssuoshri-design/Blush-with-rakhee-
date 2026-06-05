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

import { 
  initialStats, 
  initialPillars, 
  initialReels, 
  initialLeads, 
  initialAffiliateProducts, 
  initialNewsletterSubscribers,
  initialCreatorMessages
} from "./mockData";
import { CollabLead, InstagramReel, AffiliateItem, NewsletterSubscriber, CreatorStats, CreatorMessage } from "./types";
import { AlertCircle, CheckCircle2, Heart, HeartHandshake, Instagram, Mail, MessageSquare, Facebook, Lock } from "lucide-react";

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
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/blushwithrakhee?igsh=MXBjMGFxZjN1cWR0OQ==" target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-rose transition-colors flex items-center justify-center text-stone-200">
                  <Instagram size={14} />
                </a>
                <a href="https://www.facebook.com/share/1CmrEHVJgH/" target="_blank" rel="noreferrer" title="Facebook" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-rose transition-colors flex items-center justify-center text-stone-200">
                  <Facebook size={14} />
                </a>
                <a href="mailto:rakhee.chakraborty1985@gmail.com" title="Email" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-rose transition-colors flex items-center justify-center text-stone-200">
                  <Mail size={14} />
                </a>
              </div>
              <a href="mailto:rakhee.chakraborty1985@gmail.com" className="font-mono text-[10.5px] text-stone-400 hover:text-brand-rose transition-colors block leading-none">
                rakhee.chakraborty1985@gmail.com
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
          <div className="flex items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} Blush With Rakhee. All Rights Reserved.</span>
            {/* Invisibly small 20% opacity block lock icon system trigger */}
            <button
              onClick={() => {
                setShowAdminLogin(true);
                setAdminPasswordInput("");
                setAdminLoginError(false);
              }}
              className="opacity-20 hover:opacity-100 transition-opacity cursor-pointer p-1 text-white hover:text-brand-rose"
              title="Admin Portal"
            >
              <Lock size={11} />
            </button>
          </div>
          <span className="flex items-center gap-1">
            Engineered with <Heart size={10} fill="#B76E79" className="text-brand-rose" /> as a Premium Creator Operating System.
          </span>
        </div>
      </footer>

      {/* SECURE ADMIN AUTHORIZATION OVERLAY MODAL */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-brand-dark/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-brand-blush/35 p-8 max-w-sm w-full shadow-2xl relative animate-fadeIn text-left">
            <button 
              onClick={() => setShowAdminLogin(false)} 
              className="absolute top-4 right-4 text-stone-400 hover:text-brand-dark font-sans text-sm font-bold p-1"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-full bg-brand-sand/50 text-brand-rose flex items-center justify-center mx-auto mb-4">
              <Lock size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-center text-brand-dark mb-1">
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
                className={`w-full bg-stone-50 border ${adminLoginError ? "border-red-400 focus:ring-red-400" : "border-brand-blush/30 focus:ring-brand-rose"} font-mono text-center tracking-widest text-sm px-4 py-3 rounded-2xl focus:outline-none transition-all text-brand-dark`}
                autoFocus
              />
              {adminLoginError && (
                <p className="text-[10px] text-red-500 font-sans font-bold flex items-center justify-center gap-1">
                  <AlertCircle size={10} />
                  <span>Invalid Administrator Passphrase</span>
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-brand-dark hover:bg-brand-rose text-white text-xs font-bold uppercase tracking-wider py-3 rounded-2xl transition-colors cursor-pointer"
              >
                Authenticate Identity &rarr;
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Official Instagram DM Assistant Chatbot Widget */}
      <InstagramDMAssistant />

    </div>
  );
}
