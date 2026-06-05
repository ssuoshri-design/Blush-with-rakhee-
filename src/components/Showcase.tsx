/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Play, Pause, Award, ShoppingBag, Eye, Video, 
  Users, Smile, Gem, Check, ChevronRight, Palette, Star, 
  Volume2, VolumeX, X, ArrowRight, Heart, RefreshCw, Trophy,
  TrendingUp
} from "lucide-react";

interface TutorialCard {
  id: string;
  title: string;
  category: "Masterclass" | "Transformation" | "Tutorial" | "Product Study";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  thumbnail: string;
  quote: string;
  lessonHighlights: string[];
  featuredProducts: string[];
  studentRating: string;
}

export default function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePreview, setActivePreview] = useState<any | null>(null);
  
  // Custom video simulator states within active modal
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackTime, setPlaybackTime] = useState<number>(12);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Load containers from localStorage dynamically
  const [assignedContainers, setAssignedContainers] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem("blush_instagram_containers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem("blush_instagram_containers");
        setAssignedContainers(saved ? JSON.parse(saved) : {});
      } catch (err) {
        console.error("Error reading instagram containers:", err);
      }
    };
    window.addEventListener("instagram-containers-updated", handleUpdate);
    return () => window.removeEventListener("instagram-containers-updated", handleUpdate);
  }, []);

  // Auto incremental simulation for active tutorial video play-timeline
  useEffect(() => {
    let interval: any;
    if (activePreview && isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= 180) return 0; // wrap around
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activePreview, isPlaying]);

  const getMappedResult = (index: number, defaultItem: any, slotKey: string) => {
    const assigned = assignedContainers[slotKey];
    if (assigned) {
      return {
        clientName: assigned.caption ? assigned.caption.split("\n")[0] : defaultItem.clientName,
        beforeImg: assigned.media_type === "VIDEO" && assigned.thumbnail_url ? assigned.thumbnail_url : assigned.media_url,
        afterImg: assigned.media_url,
        feedback: assigned.caption || defaultItem.feedback,
        artist: assigned.username ? `@${assigned.username} Live` : defaultItem.artist,
        isInstagram: true,
        permalink: assigned.permalink
      };
    }
    return { ...defaultItem, isInstagram: false };
  };

  const getMappedTutorial = (index: number, defaultItem: any, slotKey: string) => {
    const assigned = assignedContainers[slotKey];
    if (assigned) {
      return {
        id: slotKey,
        title: assigned.caption ? "🎥 " + assigned.caption.split("\n")[0].substring(0, 32) + (assigned.caption.split("\n")[0].length > 32 ? "..." : "") : defaultItem.title,
        category: assigned.media_type === "VIDEO" ? "Transformation" : "Tutorial",
        difficulty: "Live Feed",
        duration: "Quick Study",
        thumbnail: assigned.media_type === "VIDEO" && assigned.thumbnail_url ? assigned.thumbnail_url : assigned.media_url,
        quote: assigned.caption || defaultItem.quote,
        lessonHighlights: [
          assigned.caption ? assigned.caption.substring(0, 50) + "..." : "Official Live Instagram Content Publication",
          "Includes interactive cosmetics application details",
          "Check out full live coverage on @blushwithrakhee",
          "Meta API verified sync active"
        ],
        featuredProducts: [
          "Meta API Live",
          "Instagram Reel"
        ],
        studentRating: "Live Verified",
        isInstagram: true,
        permalink: assigned.permalink
      };
    }
    return { ...defaultItem, isInstagram: false };
  };

  const dynamicStudentResults = [
    getMappedResult(0, {
      clientName: "Aarohi's Sangeet Glam (Student Work)",
      beforeImg: "https://images.unsplash.com/photo-1522335789253-aabd1fc54bc9?auto=format&fit=crop&q=80&w=300",
      afterImg: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=300",
      feedback: "Rakhee made me feel like royalty! I felt so light and my makeup stayed perfectly radiant from 3 PM all the way until our midnight afterparty. Genuinely flawless!",
      artist: "By Batch-9 Student Tania"
    }, "container_01"),
    getMappedResult(1, {
      clientName: "Meera's Royal Bridal Look",
      beforeImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=300",
      afterImg: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=300",
      feedback: "My wedding pictures turned out like a fairy tale! Her mastery with shade matching is unreal—there was zero gray cast and I looked exactly like myself, only ultra-glammed!",
      artist: "By Instructor Rakhee"
    }, "container_02"),
    getMappedResult(2, {
      clientName: "Ritika's Glass Skin Sangeet Glow",
      beforeImg: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=300",
      afterImg: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=300",
      feedback: "As Rakhee's hands-on student, I got to practice on real live models. This before and after was my third attempt, and Rakhee's shading techniques helped me nail the cut-crease!",
      artist: "By Student Ritika"
    }, "container_03"),
    getMappedResult(3, {
      clientName: "Elena's Crimson Soiree",
      beforeImg: "https://images.unsplash.com/photo-1595959183075-c1d09e37b19c?auto=format&fit=crop&q=80&w=300",
      afterImg: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=300",
      feedback: "I got so many compliments at the reception soiree! The texture feels exactly like skin, no cakey weight whatsoever. Rakhee is the only artist I trust.",
      artist: "By Professional Alumni Sanya"
    }, "container_04")
  ];

  const dynamicTutorialsByCatalog = [
    getMappedTutorial(0, {
      id: "class-soft-glam",
      title: "💄 Soft Glam Masterclass",
      category: "Masterclass",
      difficulty: "Beginner",
      duration: "25 Minutes",
      thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      quote: "Achieve flawless everyday base glamour, specializing in soft-glam blending and color matching South Asian skin undertones.",
      lessonHighlights: [
        "Advanced skin preparation for all-day luminous moisture",
        "Selecting and blending clean concealers without creasing",
        "Dabbing and lock-placement of monochromatic peach-pinks",
        "Setting soft golden-matte lids for bright eye highlight look"
      ],
      featuredProducts: [
        "Hydrating Peptide Cream Base",
        "Cream Peach Blush Set",
        "Translucent Micro-Finishing Powder"
      ],
      studentRating: "4.9/5 (1,230+ Reviews)"
    }, "container_05"),
    getMappedTutorial(1, {
      id: "class-bridal-trans",
      title: "👰 Bridal Makeup Transformation",
      category: "Transformation",
      difficulty: "Advanced",
      duration: "48 Minutes",
      thumbnail: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600",
      quote: "Take your skills to the luxury level. Master exquisite traditional bridal contours, high-definition setting, and heavy eye artistry.",
      lessonHighlights: [
        "Neutralizing hyperpigmentation without heavy cake-weight",
        "Precision cut-crease eye carving & seamless glitter bonding",
        "Securing sweatproof, flash-safe base finishes for indoor stages",
        "Elite lash layering, brow lifts, and luxury jewel framing tips"
      ],
      featuredProducts: [
        "Full-Coverage HD Matte Liquid Foundation",
        "Durable Multi-Chroma Pressed Glitter Palette",
        "Super-Lock Setting Mist Spray"
      ],
      studentRating: "5.0/5 (840+ Reviews)"
    }, "container_06"),
    getMappedTutorial(2, {
      id: "class-party-glam",
      title: "✨ Party Glam in 20 Minutes",
      category: "Tutorial",
      difficulty: "Intermediate",
      duration: "18 Minutes",
      thumbnail: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600",
      quote: "Fast, striking, and absolutely elegant. Create a glass-skin wet-highlight base paired with a dewy, glossy finish for evening events.",
      lessonHighlights: [
        "Speed base correction under 3 minutes",
        "Building dual-tone strobing lines on cheekbones & jaw contours",
        "Achieving the pristine plump nude-pink lined lips look",
        "Durable setting hacks for busy sangeet and cocktail dances"
      ],
      featuredProducts: [
        "Radiant liquid strobing highlighter",
        "Velvet Plum Lip Matte Cream",
        "Collagen Glow Gloss Top"
      ],
      studentRating: "4.8/5 (950+ Reviews)"
    }, "container_07"),
    getMappedTutorial(3, {
      id: "class-product-review",
      title: "🎥 Product Swatching & Application",
      category: "Product Study",
      difficulty: "Beginner",
      duration: "12 Minutes",
      thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
      quote: "Build reliable professional products knowledge. De-influence makeup viral trends, test real skin textures under natural camera lenses.",
      lessonHighlights: [
        "Analyzing ingredient ratios for active hydration vs. oil control",
        "Sponge vs. dense brush swatch absorption differences",
        "Oxidation wear-tests over active pores and uneven textures",
        "Budget alternative formulation dupes vs. high-tag luxury options"
      ],
      featuredProducts: [
        "Luminous Hydrating Tinted Primer",
        "Dewy Cream Cheek Sticks",
        "Smoothing Loose Setting Veil"
      ],
      studentRating: "4.9/5 (1,120+ Reviews)"
    }, "container_08")
  ];

  const studentResults = dynamicStudentResults;
  const tutorialsByCatalog = dynamicTutorialsByCatalog;

  const categories = ["All", "Masterclass", "Transformation", "Tutorial", "Product Study"];

  const filteredTutorials = selectedCategory === "All"
    ? tutorialsByCatalog
    : tutorialsByCatalog.filter(t => t.category === selectedCategory);

  const coreSyllabus = [
    {
      title: "Skin Preparation",
      description: "Prep dry, oily, or hyper-pigmented bases to hold HD makeup flawlessly for up to 16 hours.",
      icon: <Sparkles className="text-brand-rose" size={24} />
    },
    {
      title: "Foundation Matching",
      description: "Master complex South Asian warm and neutral undertones without causing flat or gray casts.",
      icon: <Palette className="text-brand-rose" size={24} />
    },
    {
      title: "Eye Makeup Mastery",
      description: "Expert steps for precision cut-crease, glamorous wings, gold leaf foils, and premium lash draping.",
      icon: <Eye className="text-brand-rose" size={24} />
    },
    {
      title: "Bridal Techniques",
      description: "Signature wedding styles, high-coverage matte bridal canvases, and heavy-glitter reception aesthetics.",
      icon: <Gem className="text-brand-rose" size={24} />
    },
    {
      title: "Content Creation",
      description: "How to film macro-beauty details under natural light, edit pacing transitions, and master social media.",
      icon: <Video className="text-brand-rose" size={24} />
    },
    {
      title: "Client Handling",
      description: "Complete blueprint to manage consultations, execute trial makeups, and build friendly customer relations.",
      icon: <Smile className="text-brand-rose" size={24} />
    },
    {
      title: "Product Knowledge",
      description: "Learn luxury high-end investments and high-conversion drugstore dupes to build your professional kit.",
      icon: <ShoppingBag className="text-brand-rose" size={24} />
    },
    {
      title: "Business Growth",
      description: "Setup your pricing packages, draft high-ticket bridal contracts, and scale your styling brand client bookings.",
      icon: <TrendingUp className="text-brand-rose" size={24} />
    }
  ];

  const premiumPrograms = [
    {
      title: "Beauty Foundations Program",
      price: "₹20,000",
      duration: "2-Week Intensive Cohort",
      level: "Beginner Friendly",
      description: "Go from zero makeup knowledge to confidently master prepping skin, color-correcting dark circles, and applying stunning flawless everyday glams.",
      color: "border-brand-blush/30 hover:border-brand-rose/60 bg-white/70",
      bullets: [
        "A-to-Z everyday self-glam and simple base building",
        "Correctly mapping skin prep dry/oily types",
        "Mastering blush, eyeliner, and soft contour ratios",
        "Includes beginner makeup tool brush kit + manual"
      ],
      seats: "2 seats remaining"
    },
    {
      title: "Advanced Makeup Artist Program",
      price: "₹40,000",
      duration: "4-Week Professional Certification",
      level: "Intermediate & Advanced",
      description: "Perfect advanced techniques like high-end South Asian bridal glams, HD airbrushed-effect matte skins, intricate cut-crease detail, and elite client looks.",
      color: "border-brand-rose bg-[#FFF9F7] shadow-lg relative ring-1 ring-brand-rose/40",
      popular: true,
      bullets: [
        "Flawless heavy bridal contouring & undertone science",
        "Precision sangeet/wedding cut-crease & gold foils",
        "Practicing directly on real live models in the studio",
        "Professional Makeup Artist Certification upon graduation"
      ],
      seats: "Last 1 seat remaining"
    },
    {
      title: "Professional Makeup Business Mastery",
      price: "₹60,000",
      duration: "6-Week Business Accelerator",
      level: "Elite Career Building",
      description: "Step-by-step agency scaling system. Learn to master professional high-definition photography, launch viral beauty videos, draft bridal contracts, and secure consistent ₹50k+ bookings.",
      color: "border-brand-dark hover:border-brand-rose bg-white/80",
      bullets: [
        "1-on-1 private business branding audit with Rakhee",
        "Legal contracts & client quotation master sheets",
        "Mastering high-retention cinematic social media reels",
        "Guaranteed 3 luxury live bridal shadows internship assignments"
      ],
      seats: "3 seats remaining"
    }
  ];

  const formatSecondsToMinutes = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? "0" : ""}${remaining}`;
  };

  const handleBookCourse = (programTitle: string) => {
    // Generate custom trigger event for global DMAssistant
    const event = new CustomEvent("open-dm-assistant", {
      detail: { packageSelected: programTitle }
    });
    window.dispatchEvent(event);
  };

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-gradient-to-b from-white via-brand-sand/15 to-white relative">
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-brand-rose/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-brand-blush/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* ================= STUDENT CLINIC BEFORE-AND-AFTERS ================= */}
        <div className="mb-24 py-16 bg-[#FFFBF9] border border-brand-blush/25 rounded-[32px] px-6 lg:px-12" id="student-results-section">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              PROVEN RESULTS
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl text-brand-dark font-medium">
              Student Results &amp; Live Transformations
            </h3>
            <p className="font-sans text-stone-500 mt-3 text-xs sm:text-sm">
              Unedited skin finishes. Slide through real client photos, graduate student practice work, and luxury bridal face glams.
            </p>
            <div className="w-12 h-0.5 bg-brand-rose/40 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {studentResults.map((res, idx) => (
              <div key={idx} className="bg-white p-5 sm:p-6 rounded-2xl border border-brand-blush/15 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-stretch text-left">
                
                {/* Images side-by-side inside card */}
                <div className="grid grid-cols-2 gap-2 shrink-0 w-full sm:w-56 h-40">
                  <div className="relative rounded-xl overflow-hidden bg-stone-50 border border-stone-100">
                    <img 
                      src={res.beforeImg} 
                      alt="Before application" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded font-bold">Before</span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-stone-50 border border-stone-100">
                    <img 
                      src={res.afterImg} 
                      alt="Glammed result" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2 left-2 bg-brand-rose/90 text-white text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded font-bold">After</span>
                  </div>
                </div>

                {/* Outcomes explanation text block */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-brand-rose font-bold font-mono bg-brand-blush/10 px-2 py-0.5 rounded-full">{res.artist}</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-brand-dark mb-1.5">{res.clientName}</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-stone-600 italic leading-relaxed line-clamp-3">
                      &quot;{res.feedback}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono text-amber-600 mt-2 font-bold">
                    <Star size={10} fill="currentColor" /> Verified Transformation Match
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ================= WHAT YOU WILL LEARN ================= */}
        <div className="mb-24 text-center" id="syllabus-overview">
          <div className="max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              CURRICULUM BULLET POINTS
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl text-brand-dark font-medium">
              What You Will Learn
            </h3>
            <p className="font-sans text-stone-500 mt-3 text-xs sm:text-sm">
              We skip the fluff. Our comprehensive syllabus is built with clear visual lessons to move you towards absolute artistry confidence.
            </p>
            <div className="w-12 h-0.5 bg-brand-rose/40 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {coreSyllabus.map((syl, index) => (
              <div 
                key={index}
                className="bg-white/80 p-6 rounded-2xl border border-brand-blush/20 hover:border-brand-rose/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-blush/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {syl.icon}
                  </div>
                  <h4 className="font-serif text-base font-bold text-brand-dark mb-2">{syl.title}</h4>
                  <p className="font-sans text-xs text-stone-600 leading-relaxed">
                    {syl.description}
                  </p>
                </div>
                <div className="mt-4 w-6 h-1 bg-brand-rose/40 rounded-full group-hover:w-12 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* ================= PREMIUM COURSE SECTIONS (PRICING) ================= */}
        <div className="py-12" id="premium-courses">
          <div className="text-center max-w-2xl mx-auto mb-14 justify-center">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              ENROLL IN MENTORSHIP
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl text-brand-dark font-medium">
              Premium Signature Programs
            </h3>
            <p className="font-sans text-stone-500 mt-3 text-xs sm:text-sm">
              Professional programs built exclusively for transformational career outcomes. Take the fastlane.
            </p>
            <div className="w-12 h-0.5 bg-brand-rose/40 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {premiumPrograms.map((prog, index) => (
              <div
                key={index}
                className={`border rounded-[32px] p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between text-left group ${prog.color}`}
              >
                {prog.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-brand-rose text-white text-[9px] uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Trophy size={10} fill="currentColor" /> Highly Recommended
                  </div>
                )}
                
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-rose bg-brand-blush/15 px-2.5 py-1 rounded-full">
                      {prog.level}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-brand-dark mt-3">{prog.title}</h4>
                    <p className="font-mono text-3xl font-bold text-brand-dark mt-2 tracking-tight">
                      {prog.price}
                    </p>
                    <p className="text-[10px] text-stone-400 font-sans mt-0.5 hover:text-stone-500">{prog.duration}</p>
                  </div>

                  <p className="font-sans text-xs sm:text-xs text-stone-600 leading-relaxed border-t border-brand-blush/10 pt-4">
                    {prog.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h5 className="font-serif text-xs font-bold text-stone-800 uppercase tracking-wider">Core Graduation Targets:</h5>
                    <ul className="space-y-2 text-xs font-sans text-stone-600">
                      {prog.bullets.map((bull, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <Check className="text-brand-rose shrink-0 mt-0.5" size={12} />
                          <span>{bull}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-blush/10">
                  <div className="flex items-center justify-between text-[10px] text-amber-700 font-mono font-bold mb-3.5">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" /> {prog.seats}
                    </span>
                    <span>Cohort Limit: 10 Seats</span>
                  </div>
                  
                  <button
                    onClick={() => handleBookCourse(prog.title)}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      prog.popular
                        ? "bg-brand-rose text-white hover:bg-brand-dark shadow-md"
                        : "bg-brand-dark text-white hover:bg-brand-rose"
                    }`}
                  >
                    <span>Reserve My Mentorship Seat</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] font-sans text-stone-400 italic text-center mt-10">
            *Looking for customized 1-on-1 shadow-bridal styling programs? Click on a seat reserve button above to chat directly with her admissions coordinator.
          </p>
        </div>

      </div>

      {/* ================= MASTERCLASS LESSON VIDEO PREVIEW MODAL (NETFLIX STYLE) ================= */}
      <AnimatePresence>
        {activePreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md" id="preview-lesson-modal">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl border border-stone-200"
            >
              {/* Close Button overlay */}
              <button
                onClick={() => setActivePreview(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
              >
                <X size={16} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Visual Video Stream Mockup */}
                <div className="lg:col-span-7 bg-black relative flex flex-col justify-end aspect-video lg:aspect-auto h-72 lg:h-[460px] overflow-hidden">
                  <img
                    src={activePreview.thumbnail}
                    alt={activePreview.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                  {/* Playback Controls Layer */}
                  <div className="relative z-10 p-5 text-left w-full space-y-4">
                    <span className="bg-brand-rose px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest text-white font-mono font-bold">
                      STREAMING LESSON PREVIEW
                    </span>

                    <h4 className="font-serif text-lg sm:text-xl font-bold text-white line-clamp-1">{activePreview.title}</h4>

                    {/* Scrub line indicator */}
                    <div className="space-y-1">
                      <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-rose transition-all ease-linear"
                          style={{ width: `${(playbackTime / 180) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-white/50">
                        <span>{formatSecondsToMinutes(playbackTime)}</span>
                        <span>03:00</span>
                      </div>
                    </div>

                    {/* Operational Toggles */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-10 h-10 bg-white text-brand-dark rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                        >
                          {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="translate-x-0.5" />}
                        </button>
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
                        >
                          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>

                      <span className="text-[10px] text-white/60 font-mono">Difficulty: <strong>{activePreview.difficulty}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Metadata & Takeaways Detail Segment */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between text-left h-full max-h-[460px] overflow-y-auto bg-stone-50">
                  
                  <div className="space-y-5">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-brand-rose font-bold block">
                        Course Lesson Syllabus
                      </span>
                      <h3 className="font-serif text-lg font-bold text-brand-dark mt-1">Lesson Highlights</h3>
                      <p className="font-sans text-[11px] text-stone-500 mt-2 leading-relaxed">
                        {activePreview.quote}
                      </p>
                    </div>

                    {/* Highlights bullets */}
                    <div className="space-y-2">
                      <h5 className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold">What we master:</h5>
                      <ul className="space-y-1.5 font-sans text-xs text-stone-600">
                        {activePreview.lessonHighlights.map((high, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Check className="text-brand-rose shrink-0 mt-0.5" size={11} />
                            <span>{high}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Primary Products Used */}
                    <div className="space-y-2 border-t border-brand-blush/20 pt-4">
                      <h5 className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold">Featured Cosmetics:</h5>
                      <div className="flex flex-wrap gap-1">
                        {activePreview.featuredProducts.map((prod, idx) => (
                          <span key={idx} className="bg-brand-blush/10 text-brand-rose text-[9.5px] font-mono px-2 py-0.5 rounded font-medium border border-brand-blush/10">
                            {prod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-brand-blush/20 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
                      <span>Full syllabus includes 14 lessons</span>
                      <span className="font-bold text-brand-rose">{activePreview.studentRating.split(" ")[0]} Rating</span>
                    </div>
                    <button
                      onClick={() => {
                        handleBookCourse(activePreview.title);
                        setActivePreview(null);
                      }}
                      className="w-full bg-brand-rose hover:bg-brand-dark text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all text-center"
                    >
                      <Sparkles size={12} fill="currentColor" /> Enroll &amp; Master Artist Program
                    </button>
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
