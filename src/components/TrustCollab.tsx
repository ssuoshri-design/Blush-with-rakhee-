import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Star, ArrowRight } from "lucide-react";

interface TrustCollabProps {
  onSelectService: (serviceName: string) => void;
}

export default function TrustCollab({ onSelectService }: TrustCollabProps) {
  // Before-After Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);

  // Active Brand Carousel index
  const [brandIndex, setBrandIndex] = useState(0);

  // Stats state for premium animated counters
  const [stats, setStats] = useState({
    lovers: 0,
    reach: 0.0,
    sessions: 0,
    collabs: 0
  });

  useEffect(() => {
    let isMounted = true;
    const duration = 1600;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      if (isMounted) {
        setStats({
          lovers: Math.min(Math.floor(easeProgress * 50), 50),
          reach: Number((easeProgress * 2.0).toFixed(1)),
          sessions: Math.min(Math.floor(easeProgress * 500), 500),
          collabs: Math.min(Math.floor(easeProgress * 100), 100)
        });
      }

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  const partnerBrands = [
    { name: "MAC Cosmetics" },
    { name: "Estée Lauder" },
    { name: "Rare Beauty" },
    { name: "Sephora" },
    { name: "Aurora Skin" },
    { name: "Glossier" }
  ];

  // Brand index rotational timer
  useEffect(() => {
    const brandTimer = setInterval(() => {
      setBrandIndex((prev) => (prev + 1) % partnerBrands.length);
    }, 3000);
    return () => clearInterval(brandTimer);
  }, []);

  const testimonials = [
    {
      id: "testi-1",
      name: "Ananya Sharma",
      role: "Bridal Client",
      feedback: "Rakhee is an absolute magician! She did my bridal makeup and I felt so elegant and confident. The glow stayed intact all night without feeling heavy. She listened to every single detail I requested!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      tag: "Wedding Look"
    },
    {
      id: "testi-2",
      name: "Priya Patel",
      role: "Special Occasion Client",
      feedback: "Honestly, the best party makeup experience ever! Rakhee has this beautiful way of enhancing your natural features without making you look caked. I got hundreds of compliments on my dewy reception glow!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      tag: "Reception Glow"
    },
    {
      id: "testi-3",
      name: "Shalini Sen",
      role: "Beauty Content Creator",
      feedback: "As a product reviewer myself, I’m extremely particular. Rakhee's recommendations are so honest and her makeup techniques are flawless. Her ability to blend drugstore hacks with luxury brands is unmatched.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150",
      tag: "Coached Session"
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="why-trust-rakhee" className="py-20 lg:py-28 bg-[#FCF5F3] relative overflow-hidden">
      
      {/* Luxury Background Gradients */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-brand-blush/20 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-20 w-[450px] h-[450px] rounded-full bg-brand-sand/50 blur-3xl pointer-events-none" />
      
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-brand-blush/5 via-brand-blush/20 to-transparent hidden lg:block" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-brand-blush/5 via-brand-blush/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24" id="trust-header">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-rose/10 text-brand-rose rounded-full text-xs font-mono tracking-widest uppercase font-bold mb-4"
          >
            <Sparkles size={12} className="animate-pulse" /> Why Thousands Trust Rakhee
          </motion.div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-dark font-medium tracking-tight leading-tight">
            Real Beauty. Real Results. Real Trust.
          </h2>
          
          <p className="font-sans text-stone-600 mt-5 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            From luxury wedding glams to exquisite party makeup, Rakhee has built a trusted reputation as a leading makeup artist who values authenticity, elegant techniques, and personalized results.
          </p>
          <div className="w-16 h-1 bg-brand-rose/60 mx-auto mt-6 rounded-full" />
        </div>

        {/* ================= 2-COLUMN LUXURY EDITORIAL GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20 max-w-5xl mx-auto" id="trust-editorial-grid">
          
          {/* CARD 2: Happy Clients */}
          <div 
            className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-brand-blush/20 group hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            id="ed-card-clients"
          >
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between text-left">
              <div>
                <span className="font-mono text-[10px] text-brand-rose uppercase tracking-[0.2em] font-bold block mb-2">
                  100% SATISFACTION RATIO
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-brand-dark font-semibold mb-3 flex items-center gap-2">
                  ❤️ Happy Clients
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  Trusted by brides, professionals, creators, and beauty enthusiasts who love looking and feeling their best.
                </p>
              </div>

              {/* Client Visual Display Block */}
              <div className="relative h-64 w-full rounded-2xl bg-gradient-to-br from-brand-sand/40 to-brand-blush/15 p-4 overflow-hidden border border-brand-blush/10 flex flex-col justify-center space-y-3">
                <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-sm text-left max-w-[95%] transform -rotate-1 relative">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" 
                      alt="Ananya Sharma" 
                      className="w-6 h-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-[10px] font-bold text-stone-800">Ananya Sharma (Bride)</h4>
                      <div className="flex text-yellow-500 text-[8px]">
                        <Star size={8} fill="currentColor" className="stroke-none" />
                        <Star size={8} fill="currentColor" className="stroke-none" />
                        <Star size={8} fill="currentColor" className="stroke-none" />
                        <Star size={8} fill="currentColor" className="stroke-none" />
                        <Star size={8} fill="currentColor" className="stroke-none" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-stone-600 italic">"Rakhee made me feel like royalty! Best wedding glam..."</p>
                </div>

                <div className="bg-[#2D2D2D]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-sm text-left max-w-[95%] self-end transform rotate-1 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                      alt="Priya Patel" 
                      className="w-6 h-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-[10px] font-bold text-white">Priya Patel (Party Guest)</h4>
                      <div className="flex text-yellow-500 text-[8px]">
                        <Star size={8} fill="currentColor" className="stroke-none" />
                        <Star size={8} fill="currentColor" className="stroke-none" />
                        <Star size={8} fill="currentColor" className="stroke-none" />
                        <Star size={8} fill="currentColor" className="stroke-none" />
                        <Star size={8} fill="currentColor" className="stroke-none" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-white/90 italic">"The dewy reception makeup stayed flawless all night long."</p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#FCF8F6] border-t border-brand-blush/10 flex items-center justify-between">
              <span className="text-[10px] text-stone-500 font-sans">Read full community testimonials</span>
              <button 
                onClick={() => scrollToSection("brand-collab-testimonials")}
                className="text-xs font-bold text-brand-rose hover:text-brand-dark transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read Reviews</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CARD 3: Brand Collaborations */}
          <div 
            className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-brand-blush/20 group hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            id="ed-card-collabs"
          >
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between text-left">
              <div>
                <span className="font-mono text-[10px] text-brand-rose uppercase tracking-[0.2em] font-bold block mb-2">
                  TRUSTED BRAND NETWORK
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-brand-dark font-semibold mb-3 flex items-center gap-2">
                  🤝 Brand Collaborations
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  Partnering with beauty brands that genuinely deliver value to the audience.
                </p>
              </div>

              {/* Logo Carousel Container */}
              <div className="relative h-64 w-full rounded-2xl bg-white border border-stone-100 flex items-center justify-center overflow-hidden">
                <div className="text-center w-full px-4">
                  <p className="text-[9px] text-stone-400 font-mono tracking-widest uppercase mb-4">Official Product Collaborations</p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    {partnerBrands.map((brand, i) => (
                      <span 
                        key={i} 
                        className={`px-3 py-1.5 border rounded-xl text-[10px] font-mono font-extrabold ${
                          brandIndex === i 
                            ? 'bg-brand-rose text-white border-brand-rose scale-105 shadow-md shadow-brand-rose/25' 
                            : 'bg-white text-stone-500 border-stone-100'
                        } transition-all duration-300`}
                      >
                        {brand.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#FCF8F6] border-t border-brand-blush/10 flex items-center justify-between">
              <span className="text-[10px] text-stone-500 font-sans">Trusted by global beauty partners</span>
              <button 
                onClick={() => onSelectService("UGC Content Creation")}
                className="text-xs font-bold text-brand-rose hover:text-brand-dark transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>See Collaborations</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* ================= ANIMATED STATS BAR ================= */}
        <div className="bg-[#2D2D2D] text-white rounded-[2.5rem] py-12 px-6 sm:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-2xl relative overflow-hidden mb-24 border border-white/5" id="animated-stats-block">
          
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand-rose/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-1">
            <h4 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white flex items-center justify-center">
              <span>{stats.lovers}</span>K+
            </h4>
            <p className="text-[10px] sm:text-xs font-sans tracking-widest text-[#E8C8C8] uppercase font-semibold">
              Beauty Lovers
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white flex items-center justify-center">
              <span>{stats.reach}</span>M+
            </h4>
            <p className="text-[10px] sm:text-xs font-sans tracking-widest text-[#E8C8C8] uppercase font-semibold">
              Monthly Reach
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white flex items-center justify-center">
              <span>{stats.sessions}</span>+
            </h4>
            <p className="text-[10px] sm:text-xs font-sans tracking-widest text-[#E8C8C8] uppercase font-semibold">
              Makeup Sessions
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white flex items-center justify-center">
              <span>{stats.collabs}</span>+
            </h4>
            <p className="text-[10px] sm:text-xs font-sans tracking-widest text-[#E8C8C8] uppercase font-semibold">
              Brand Collabs
            </p>
          </div>

        </div>

        {/* ================= TESTIMONIAL CARDS (FULL WIDTH DECK) ================= */}
        <div className="scroll-mt-20" id="brand-collab-testimonials">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              REAL TESTIMONIALS
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-brand-dark font-medium leading-tight">
              What People Say About Rakhee
            </h2>
            <div className="w-12 h-1 bg-brand-rose/60 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi) => (
              <div
                key={testi.id}
                className="bg-white p-7 rounded-3xl border border-brand-blush/25 hover:border-brand-rose/60 transition-all duration-300 shadow-sm hover:shadow-xl text-left flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex text-yellow-500 mb-4 gap-0.5">
                    {[...Array(testi.rating)].map((_, idx) => (
                      <Star key={idx} size={14} fill="currentColor" className="stroke-none" />
                    ))}
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-stone-600 italic leading-relaxed mb-6 text-left">
                    "{testi.feedback}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <div className="relative">
                    <img 
                      src={testi.image} 
                      alt={testi.name} 
                      className="w-10 h-10 rounded-full object-cover border border-brand-blush"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-brand-rose text-white p-0.5 rounded-full text-[6px]">💖</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-serif text-sm font-bold text-brand-dark">{testi.name}</h4>
                    <p className="text-[10px] text-stone-400 font-mono tracking-wider">{testi.role}</p>
                  </div>
                  <span className="ml-auto bg-brand-sand/70 text-brand-rose font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                    {testi.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
