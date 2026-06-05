/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Play, Award, ShoppingBag, Eye, Heart, MessageSquare, 
  ShieldCheck, ChevronRight, ChevronLeft, ArrowRight, Star, 
  Quote, Mail, Calendar, Video, Sparkle, Camera, HelpCircle, 
  Laptop, CheckCircle2 
} from "lucide-react";

interface MediaKitAuditProps {
  onRequestCollab: () => void;
  incrementDownloads: () => void;
  downloadCount: number;
  formatPrice: (usdAmount: number, digits?: number) => string;
}

export default function MediaKitAudit({ onRequestCollab, incrementDownloads, downloadCount, formatPrice }: MediaKitAuditProps) {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [selectedContentCategory, setSelectedContentCategory] = useState("All");
  const [activeVideoModal, setActiveVideoModal] = useState<any | null>(null);
  
  // Custom states for downloads and contact modals
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isHoveredCard, setIsHoveredCard] = useState<number | null>(null);

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const partnerBrands = [
    { name: "Nykaa Beauty", type: "nykaa" },
    { name: "Tira Beauty", type: "tira" },
    { name: "Charlotte Tilbury", type: "tilbury" },
    { name: "Dior Beauty", type: "dior" },
    { name: "Estée Lauder", type: "lauder" },
    { name: "Rare Beauty", type: "rare" },
    { name: "Fenty Beauty", type: "fenty" },
    { name: "Huda Beauty", type: "huda" },
    { name: "Sephora India", type: "sephora" },
    { name: "MAC Cosmetics", type: "mac" },
    { name: "Laneige", type: "laneige" },
  ];

  // Tripled brand inventory for visual seamless scrolling marquee
  const scrollingBrands = [...partnerBrands, ...partnerBrands, ...partnerBrands];

  const valueCards = [
    {
      id: 1,
      title: "📸 High Quality Visual Content",
      description: "Beautiful photography and cinematic beauty content designed to stop scrolling and capture attention.",
      pillText: "Couture Quality",
      colorClass: "bg-amber-50/50 hover:bg-amber-50"
    },
    {
      id: 2,
      title: "💄 Authentic Product Reviews",
      description: "Honest recommendations that build trust and encourage genuine purchasing decisions.",
      pillText: "100% Unedited",
      colorClass: "bg-red-50/50 hover:bg-rose-50"
    },
    {
      id: 3,
      title: "❤️ Engaged Beauty Community",
      description: "An audience that actively interacts, asks questions, and values beauty education.",
      pillText: "Active Interaction",
      colorClass: "bg-stone-50 hover:bg-stone-100"
    },
    {
      id: 4,
      title: "✨ Professional Brand Partnerships",
      description: "Reliable communication, premium content delivery, and long-term collaboration opportunities.",
      pillText: "Business Ready",
      colorClass: "bg-orange-50/50 hover:bg-orange-50"
    }
  ];

  const featuredContent = [
    {
      id: "tut-soft-glow",
      title: "South Asian Soft Glam Base",
      category: "Makeup Tutorials",
      imgUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      duration: "3 min watch",
      badge: "💄 Tutorials",
      caption: "Stunning warm gold contour and luminous skin match prep workflow."
    },
    {
      id: "hack-powder-radiance",
      title: "Dewy Skin Cheat Code",
      category: "Beauty Hacks",
      imgUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600",
      duration: "1 min read",
      badge: "✨ Beauty Hacks",
      caption: "Transform dry powder textures to high-gloss sheer glass skin."
    },
    {
      id: "rev-balm-wear",
      title: "Honest Double Wear Review",
      category: "Product Reviews",
      imgUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
      duration: "4 min wear-test",
      badge: "🎥 Reviews",
      caption: "True skin results over 8 active hours under harsh indoor stage lighting."
    },
    {
      id: "brid-kashmiri-look",
      title: "Traditional Kashmiri Bridal Art",
      category: "Bridal Transformations",
      imgUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600",
      duration: "6 min step-by-step",
      badge: "👰 Bridal",
      caption: "Exquisite traditional eye gold foil detailing and heavy luxury jewelry face styling."
    },
    {
      id: "grwm-guest-sangeet",
      title: "Heavy Festive GRWM Glam",
      category: "GRWM Content",
      imgUrl: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=600",
      duration: "2 min fast paced",
      badge: "📸 GRWM",
      caption: "Flawless quick wedding guest styling designed with lightweight, high-pigment products."
    }
  ];

  const contentCategories = ["All", "Makeup Tutorials", "Beauty Hacks", "Product Reviews", "Bridal Transformations", "GRWM Content"];

  const filteredContent = selectedContentCategory === "All"
    ? featuredContent
    : featuredContent.filter(c => c.category === selectedContentCategory);

  const testimonials = [
    {
      name: "Aisha Sharma",
      role: "Campaign Lead, Nykaa Luxe",
      rating: 5,
      logo: "NYKAA LUXE",
      quote: "Working with Rakhee was exceptional. Her unedited beauty wear-test drove an outstanding 24% click-through rate increase. Unparalleled aesthetic and strict adherence to creative briefs!",
      profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Komal Kapur",
      role: "Senior Marketing PR, Charlotte Tilbury India",
      rating: 5,
      logo: "Charlotte Tilbury",
      quote: "Rakhee delivers true luxury visual standards. Her audience trust operates at a different tier—the comments were packed with positive sentiment and purchase receipts. Truly premium!",
      profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Meera Sen",
      role: "Sponsorship Manager, Fenty Beauty",
      rating: 5,
      logo: "FENTY BEAUTY",
      quote: "Highly professional communication, exquisite video clarity, and stellar engagement loops. She is a joy to collaborate with and our first choice for upcoming luxury product campaigns.",
      profile: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Sanya Rajput",
      role: "Luxury Event Director & Client",
      rating: 5,
      logo: "Luxe Transformations",
      quote: "As a professional planner, the skin finish is what I care about. Rakhee's bridal application held up beautifully from noon till midnight under full tropical high humidity. Spectacular masterclass talent!",
      profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const serviceOffers = [
    {
      id: "serv-tutorials",
      title: "Makeup Tutorials",
      description: "Dedicated step-by-step masterclasses showing real, high-resolution product performance directly to purchase-ready organic beauty enthusiasts.",
      icon: <Sparkles className="text-brand-rose" size={24} />,
      benefits: ["High authentic retention", "Real-skin closeups", "Comment section matching", "FTC compliant tagging"]
    },
    {
      id: "serv-reviews",
      title: "Product Reviews",
      description: "True-skin double-wear tests and textures swatching under standard daily natural light to answer beauty concerns before they decide.",
      icon: <Camera className="text-brand-rose" size={24} />,
      benefits: ["High viewer trust", "Full color-range swatch", "Honest wear statistics", "Ingredient deep-dive"]
    },
    {
      id: "serv-sponsored",
      title: "Sponsored Content",
      description: "Premium integrated endorsements matching the brand core spirit seamlessly with high-polished aesthetic pacing and clear call-to-actions.",
      icon: <Award className="text-brand-rose" size={24} />,
      benefits: ["Custom brief alignment", "Long shelf-life visibility", "Clean product hero shots", "Usage rights options"]
    },
    {
      id: "serv-reels",
      title: "Instagram Reels",
      description: "Highly shareable, scroll-stopping beauty assets with elegant audio pairings, macro texture details, and fluid pace transitions.",
      icon: <Video className="text-brand-rose" size={24} />,
      benefits: ["Viral explore potential", "Macro-scale clear details", "Sub-translated guides", "High engagement metrics"]
    },
    {
      id: "serv-bridal",
      title: "Bridal Beauty Campaigns",
      description: "Exclusive luxury campaigns capturing bridal glow preparation, live ceremony previews, traditional jewel pairings and high-glamour finishes.",
      icon: <Star className="text-brand-rose" size={24} />,
      benefits: ["Niche affluent reach", "Emotionally rich visual assets", "High-conversion products list", "Durable beauty proof"]
    },
    {
      id: "serv-launch",
      title: "Product Launch Promotions",
      description: "Complete multichannel launch packages spanning stories blast, unboxing, ingredient swatch tests, and product-paving walkthroughs.",
      icon: <ShoppingBag className="text-brand-rose" size={24} />,
      benefits: ["Immediate buzz generation", "Exclusive tracking link", "Unboxing visual aesthetic", "Direct DM leads integration"]
    }
  ];

  const handleDownloadKit = (e: MouseEvent) => {
    e.preventDefault();
    incrementDownloads();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);

    // Mock PDF generate / open action
    const text = "RAKHEE CHAKRABORTY - LUXY BEAUTY MEDIA KIT (PARTNERSHIP CHANNELS & HIGHLIGHT RATES 2026)\n\nThank you for choosing to partner with independent luxury creator Rakhee. Our rates start transparently from $450 USD. Please contact our coordinator via our brand dashboard to get fully updated metrics, pricing formats and reserve your campaign timelines.";
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Rakhee_Chakraborty_MediaKit.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDiscoveryCall = () => {
    // Dispatch custom open event to DM Assistant
    const event = new CustomEvent("open-dm-assistant", {
      detail: { packageSelected: "Brand Discovery Call" }
    });
    window.dispatchEvent(event);
  };

  return (
    <section id="mediakit" className="bg-[#FFFBF9] relative overflow-hidden">
      
      {/* Custom Styles Inject for marquee looping & general beauty gradient textures */}
      <style>{`
        @keyframes brand-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-brand-marquee {
          animation: brand-marquee 25s linear infinite;
        }
        .animate-brand-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* ================= SECTION 1: ✨ LET'S CREATE BEAUTY TOGETHER ================= */}
      <div className="pt-24 pb-16 lg:pt-32 relative border-b border-brand-blush/10 bg-gradient-to-b from-white via-[#FFF9F7] to-[#FFFBF9]">
        <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-gradient-to-bl from-brand-blush/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-brand-rose/5 blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            
            {/* Elegant Copywriting Intro Box */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.3em] font-bold block">
                CREATIVE COLLABORATIONS
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl text-brand-dark leading-[1.1] font-medium tracking-tight">
                ✨ Let&apos;s Create <br className="hidden sm:inline" />
                <span className="italic font-light text-brand-rose">Beauty Together</span>
              </h1>
              
              <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Helping beauty brands connect with a highly engaged audience through authentic content, honest reviews, and stunning visual storytelling. We bridge luxury brands and real skin finishes perfectly.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  onClick={onRequestCollab}
                  className="bg-brand-dark hover:bg-brand-rose text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-300 shadow-md hover:scale-102 flex items-center gap-2 cursor-pointer"
                >
                  <span>💕 Request Collaboration</span>
                  <ArrowRight size={13} />
                </button>
                <button
                  onClick={handleDownloadKit}
                  className="bg-white hover:bg-stone-50 border border-brand-blush/40 text-stone-700 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>📧 Download Media Kit</span>
                </button>
              </div>

              {/* Verified Badge Metrics */}
              <div className="pt-8 grid grid-cols-3 gap-6 border-t border-brand-blush/15 max-w-md">
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">15.4K</p>
                  <p className="font-sans text-[10px] text-stone-400 font-bold uppercase tracking-wider">Followers</p>
                </div>
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">11.2%</p>
                  <p className="font-sans text-[10px] text-stone-400 font-bold uppercase tracking-wider">Engagement Rate</p>
                </div>
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">1.2M+</p>
                  <p className="font-sans text-[10px] text-stone-400 font-bold uppercase tracking-wider">Monthly Views</p>
                </div>
              </div>
            </div>

            {/* Premium Immersive Brand Image Hero Cover */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-[38px] bg-gradient-to-tr from-brand-rose/20 via-brand-blush/10 to-amber-100 blur-xl opacity-75" />
              <div className="relative rounded-[32px] overflow-hidden border border-brand-blush/25 shadow-2xl bg-stone-100 aspect-[4/5] max-w-sm mx-auto group">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=700"
                  alt="Premium Luxury Cosmetics application"
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Glass Accent Indicator */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/70 backdrop-blur-md border border-white/50 p-4 rounded-2xl flex items-center gap-3 shadow-lg justify-between">
                  <div className="text-left">
                    <p className="font-serif text-xs font-bold text-brand-dark">Independent Beauty Creator</p>
                    <p className="font-mono text-[9px] text-brand-rose font-bold uppercase tracking-widest mt-0.5">Est. Kolkata, India</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-rose text-white flex items-center justify-center">
                    <Sparkles size={14} className="animate-spin" style={{ animationDuration: "12s" }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= SECTION 2: WHY BRANDS LOVE WORKING WITH RAKHEE ================= */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              OUR VALUE PILLARS
            </span>
            <h2 className="font-serif text-3xl text-brand-dark font-medium">
              Why Brands Love Working with Rakhee
            </h2>
            <p className="font-sans text-stone-500 mt-3 text-xs sm:text-sm">
              We skip generic influencer scripts. Every single partnership is built with cinematic aesthetic, detailed education, and genuine viewer response tracking.
            </p>
            <div className="w-12 h-1 bg-brand-rose/60 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {valueCards.map((card) => (
              <div
                key={card.id}
                onMouseEnter={() => setIsHoveredCard(card.id)}
                onMouseLeave={() => setIsHoveredCard(null)}
                className={`p-8 rounded-3xl border border-brand-blush/20 shadow-xs transition-all duration-500 ease-out flex flex-col justify-between group h-full cursor-default ${card.colorClass} ${
                  isHoveredCard === card.id ? "scale-103 shadow-lg -translate-y-1.5" : ""
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-brand-rose bg-white border border-brand-blush/20 px-2.5 py-1 rounded-full">
                      {card.pillText}
                    </span>
                    <span className="text-brand-rose/30 group-hover:text-brand-rose transition-colors duration-300 font-serif text-3xl font-light">
                      0{card.id}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-lg font-bold text-brand-dark group-hover:text-brand-rose transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="font-sans text-xs text-stone-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-blush/10 flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider font-bold text-brand-dark opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                  <span>Explore outcome</span> <ChevronRight size={10} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ================= SECTION 4: BRAND COLLABORATION SHOWCASE ================= */}
      <div className="py-14 bg-brand-dark/95 text-white overflow-hidden relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-rose/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 text-center">
          <p className="font-mono text-[10px] text-brand-blush uppercase tracking-[0.25em] font-bold mb-1.5">
            PARTNERSHIPS DIRECTORY
          </p>
          <h4 className="font-serif text-xl sm:text-2xl text-stone-100 mb-2 font-medium">
            Trusted Collaboration Partner
          </h4>
          <p className="font-sans text-xs text-stone-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Creating authentic beauty content that helps brands build trust, awareness, and engagement across South Asian demographics.
          </p>

          {/* Endless looping marquee track */}
          <div className="relative w-full overflow-hidden mb-2">
            <div className="flex z-10 w-max animate-brand-marquee items-center py-2">
              {scrollingBrands.map((b, bIdx) => {
                let logoContent = null;
                switch (b.type) {
                  case "nykaa":
                    logoContent = (
                      <div className="flex items-center gap-1 ml-0.5 select-none">
                        <span className="font-sans font-black tracking-[0.16em] text-[#FF1493] text-[15px]">NYKAA</span>
                        <span className="text-[#FF1493] text-xs">♥</span>
                      </div>
                    );
                    break;
                  case "tira":
                    logoContent = (
                      <div className="flex items-center gap-1 select-none">
                        <span className="font-serif font-light tracking-[0.3em] text-[#D4AF37] text-[13px] uppercase">tira</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                      </div>
                    );
                    break;
                  case "dior":
                    logoContent = (
                      <span className="font-serif tracking-[0.25em] font-bold text-white text-[15px] select-none">DIOR</span>
                    );
                    break;
                  case "tilbury":
                    logoContent = (
                      <div className="flex items-center gap-2 select-none">
                        <div className="w-5 h-5 rounded-full border border-amber-400 flex items-center justify-center text-[9px] font-serif text-amber-400 font-bold bg-amber-400/5">CT</div>
                        <span className="font-serif tracking-[0.18em] text-amber-300 text-[11px] uppercase">Tilbury</span>
                      </div>
                    );
                    break;
                  case "sephora":
                    logoContent = (
                      <div className="flex items-center gap-2 select-none">
                        <div className="flex flex-col gap-[2.5px] w-4 shrink-0">
                          <div className="h-[2px] bg-white w-full"></div>
                          <div className="h-[2px] bg-stone-900 w-full"></div>
                          <div className="h-[2px] bg-white w-full"></div>
                        </div>
                        <span className="font-sans font-black tracking-[0.22em] text-white text-[13px]">SEPHORA</span>
                      </div>
                    );
                    break;
                  case "mac":
                    logoContent = (
                      <span className="font-sans font-bold tracking-[0.3em] text-stone-200 text-[13px] select-none">M·A·C</span>
                    );
                    break;
                  case "fenty":
                    logoContent = (
                      <div className="flex items-center gap-1 select-none">
                        <span className="font-sans font-extrabold tracking-[0.15em] text-white text-[13px]">FEИTY</span>
                        <span className="font-sans font-light tracking-[0.2em] text-stone-300 text-[9px] ml-1">BEAUTY</span>
                      </div>
                    );
                    break;
                  case "lauder":
                    logoContent = (
                      <span className="font-serif tracking-[0.1em] text-amber-200 text-[13px] italic font-semibold select-none">Estēe Lauder</span>
                    );
                    break;
                  case "rare":
                    logoContent = (
                      <div className="flex items-center gap-2 select-none">
                        <div className="w-3.5 h-3.5 bg-amber-50 rounded-full flex items-center justify-center shrink-0 shadow-xs border border-amber-100">
                          <div className="w-1.5 h-1.5 bg-brand-rose rounded-full"></div>
                        </div>
                        <span className="font-serif tracking-[0.18em] text-stone-300 text-[12px] font-medium">Rare Beauty</span>
                      </div>
                    );
                    break;
                  case "laneige":
                    logoContent = (
                      <span className="font-sans font-semibold tracking-[0.25em] text-sky-300 text-[11px] uppercase select-none">LANEIGE</span>
                    );
                    break;
                  case "huda":
                    logoContent = (
                      <div className="flex items-center gap-1 select-none">
                        <span className="font-sans tracking-wide text-stone-300 text-[11px] uppercase">HUDA</span>
                        <span className="font-sans font-black tracking-[0.2em] text-[#E8C8C8] text-[12px]">BEAUTY</span>
                      </div>
                    );
                    break;
                  default:
                    logoContent = (
                      <span className="font-serif text-xs font-bold tracking-widest text-[#E8C8C8] uppercase select-none">
                        {b.name}
                      </span>
                    );
                }

                return (
                  <div
                    key={bIdx}
                    className="bg-white/5 border border-white/10 hover:border-brand-blush/40 hover:bg-white/10 px-8 py-5 rounded-2xl mx-3.5 transition-colors duration-300 flex items-center justify-center shrink-0 min-w-[200px]"
                  >
                    {logoContent}
                  </div>
                );
              })}
            </div>
            
            {/* Soft fade gradients on edges for smooth appearance */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none" />
          </div>

        </div>
      </div>

      {/* ================= SECTION 5: SOCIAL PROOF ================= */}
      <div className="py-20 bg-white relative">
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-brand-blush/5 blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="space-y-2 mb-12">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block">
              RECOMMENDED INFLUENCE
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl text-brand-dark font-medium">
              Loved By Clients &amp; Brands
            </h3>
            <div className="w-12 h-0.5 bg-brand-rose/40 mx-auto mt-4 rounded-full" />
          </div>

          {/* Testimonial Active Slider Slider container with floating quotation */}
          <div className="relative bg-[#FFF9F7] border border-brand-blush/20 p-8 sm:p-12 rounded-[32px] shadow-sm max-w-3xl mx-auto text-left">
            
            {/* Absolute floating quotes accent */}
            <Quote className="absolute top-6 right-8 text-brand-rose/10 pointer-events-none w-20 h-20" size={60} />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Rating line */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(testimonials[activeTestimonialIndex].rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="font-mono text-[10px] text-stone-400 ml-1">Verified partner feedback</span>
                </div>

                <p className="font-serif text-sm sm:text-base text-stone-700 leading-relaxed italic">
                  &quot;{testimonials[activeTestimonialIndex].quote}&quot;
                </p>

                {/* Identity line */}
                <div className="flex items-center justify-between pt-4 border-t border-brand-blush/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonials[activeTestimonialIndex].profile}
                      alt={testimonials[activeTestimonialIndex].name}
                      className="w-10 h-10 rounded-full object-cover border border-brand-blush/40"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif text-xs font-bold text-brand-dark">
                        {testimonials[activeTestimonialIndex].name}
                      </h4>
                      <p className="font-sans text-[10px] text-stone-500">
                        {testimonials[activeTestimonialIndex].role}
                      </p>
                    </div>
                  </div>

                  <span className="font-serif text-[10px] tracking-widest font-bold text-brand-rose/65 uppercase">
                    {testimonials[activeTestimonialIndex].logo}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider dot triggers */}
            <div className="flex items-center gap-1.5 mt-8 justify-center">
              {testimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveTestimonialIndex(dotIdx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeTestimonialIndex === dotIdx ? "bg-brand-rose w-6" : "bg-brand-rose/25 hover:bg-brand-rose/50"
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* ================= SECTION 6: WHAT YOU CAN COLLABORATE ON ================= */}
      <div className="py-20 bg-[#FFFBF9]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              OUR DEPLOYED SERVICES
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl text-brand-dark font-medium">
              What We Can Collaborate On
            </h3>
            <p className="font-sans text-stone-500 mt-3 text-xs sm:text-sm">
              Tailored deliverable packages built to deliver high conversion, meticulous brand aesthetics, and absolute consumer audience retention.
            </p>
            <div className="w-12 h-1 bg-brand-rose/60 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {serviceOffers.map((serv) => (
              <div
                key={serv.id}
                className="bg-white p-6 rounded-3xl border border-brand-blush/15 hover:border-brand-rose/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blush/10 flex items-center justify-center mb-4 text-brand-rose group-hover:scale-110 duration-300">
                    {serv.icon}
                  </div>
                  <h4 className="font-serif text-[15px] sm:text-[16px] font-bold text-brand-dark">
                    {serv.title}
                  </h4>
                  <p className="font-sans text-xs text-stone-500 leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                {/* Micro outcomes */}
                <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
                  <p className="font-serif text-[10px] text-stone-400 font-bold uppercase tracking-wider">Campaign Goals:</p>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-sans text-stone-600">
                    {serv.benefits.map((b, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-brand-rose rounded-full shrink-0" />
                        <span className="truncate">{b}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ================= SECTION 7: READY TO WORK TOGETHER? ================= */}
      <div className="py-20 lg:py-24 bg-gradient-to-tr from-brand-rose/10 via-[#FFF4EE] to-[#FFF9F6] border-t border-brand-blush/10">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center space-y-8 relative">
          
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-brand-rose/15 pointer-events-none">
            <Sparkle size={80} className="animate-pulse" />
          </div>

          {/* Elegant headline with blush accent */}
          <div className="space-y-4">
            <h3 className="font-serif text-3xl lg:text-4xl text-brand-dark font-medium leading-tight">
              Let&apos;s Build <span className="italic font-light text-brand-rose">Something Beautiful</span> Together
            </h3>
            <p className="font-sans text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Whether you&apos;re launching a new beauty product, building brand awareness, or looking for authentic creator partnerships, let&apos;s create content your audience will love.
            </p>
          </div>

          {/* Call-to-action actions buttons row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto pt-4">
            <button
              onClick={onRequestCollab}
              className="bg-brand-rose hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex-grow text-center flex items-center justify-center gap-1.5"
            >
              💕 Request Collaboration
            </button>
            <button
              onClick={handleDownloadKit}
              className="bg-white hover:bg-stone-50 border border-brand-blush/35 text-stone-700 text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-sm cursor-pointer hover:border-brand-rose flex-grow text-center flex items-center justify-center gap-1.5"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 size={13} className="text-green-500 animate-bounce" />
                  <span>Media Kit Saved!</span>
                </>
              ) : (
                <>
                  <span>📧 Download Media Kit</span>
                </>
              )}
            </button>
            <button
              onClick={handleDiscoveryCall}
              className="bg-[#2D2A29] hover:bg-brand-rose text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex-grow text-center flex items-center justify-center gap-1.5"
            >
              <Calendar size={13} />
              <span>📅 Discovery Call</span>
            </button>
          </div>

          <div className="pt-4 flex justify-center items-center gap-8 text-[11px] font-mono text-stone-400">
            <span>⚡ Next Turnaround: 5-7 Days</span>
            <span>📍 Active Base: India / Online</span>
          </div>

        </div>
      </div>

      {/* ================= EXTRA IMAGES LIGHTBOX/VIDEO MODAL ================= */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" id="portfolio-lightbox-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white max-w-lg w-full rounded-[24px] overflow-hidden shadow-2xl border border-stone-200 text-left"
            >
              {/* Close triggers */}
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:opacity-100 opacity-60 transition-opacity cursor-pointer shadow-lg font-sans font-bold text-xs"
              >
                ✕
              </button>

              <div className="aspect-[4/5] bg-black relative">
                <img
                  src={activeVideoModal.imgUrl}
                  alt={activeVideoModal.title}
                  className="w-full h-full object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
                
                {/* Simulated visual video details overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-white text-left space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFFBF9] bg-brand-rose px-2.5 py-1 rounded-full font-bold">
                    {activeVideoModal.badge}
                  </span>
                  <h4 className="font-serif text-lg font-bold">{activeVideoModal.title}</h4>
                  <p className="font-sans text-xs text-stone-200 leading-relaxed">
                    {activeVideoModal.caption}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-stone-400">
                    <span className="flex items-center gap-1"><Eye size={12} /> Live Preview Standard</span>
                    <span>HD 1080p 60fps</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
