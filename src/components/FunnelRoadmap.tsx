/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  MessageSquare, Send, ShoppingBag, ExternalLink, DollarSign, 
  ChevronRight, TrendingUp, Sparkles, Award, UserPlus, Users, Radio 
} from "lucide-react";

export default function FunnelRoadmap() {
  // Funnel States
  const [activeFunnelStep, setActiveFunnelStep] = useState<number>(0);
  const [inputComment, setInputComment] = useState("");
  const [simulationComments, setSimulationComments] = useState<number>(100);
  const [customKeyword, setCustomKeyword] = useState("GLOW");

  // Funnel steps list
  const funnelSteps = [
    { id: 0, title: "Comment", desc: "Follower comments a keyword (e.g. 'GLOW') on a Reel." },
    { id: 1, title: "Auto-DM", desc: "Instagram automation instantly triggers a personal message." },
    { id: 2, title: "Product Card", desc: "High-value cosmetic card with swatches and pricing delivered." },
    { id: 3, title: "Affiliate Link Click", desc: "Follower taps the tracking URL to purchase." },
    { id: 4, title: "Revenue Potential", desc: "Commission credited to Rakhee's Creator operating system." }
  ];

  // Monetization stages list
  const roadmapStages = [
    {
      id: 1,
      target: "1,009 Followers",
      status: "Current",
      title: "Establish Micro-Authority",
      milestones: [
        "100% Reel formats layout",
        "8.8% baseline engagement benchmark",
        "Comment-to-DM automation systems integration",
      ],
      desc: "Lay down deep trust credentials, pristine beauty guidelines, and pixel-perfect portfolio."
    },
    {
      id: 2,
      target: "3,000 Followers",
      status: "Upcoming",
      title: "PR Gift Gifting Campaigns",
      milestones: [
        "Select cosmetic brand target seedings",
        "Establish PR packaging delivery channels",
        "Consistent wear-test showcases in mobile grids",
      ],
      desc: "Receive and swatch viral items prior to commercial retail shelf releases."
    },
    {
      id: 3,
      target: "5,000 Followers",
      status: "Planned",
      title: "UGC Monetization Scaling",
      milestones: [
        "Create dedicated RAW UGC bundles with 30-day licensing agreements",
        "Charge $400 - $600 base rates for edited ad reels",
        "Formulate analytics feedback reports for partners",
      ],
      desc: "Unlock scalable raw footage contracts independent of follower metrics."
    },
    {
      id: 4,
      target: "10,000+ Followers",
      status: "Scale Outlook",
      title: "Long-Term Brand Equity",
      milestones: [
        "Secure $1,200+ multi-month retainer ambassador contracts",
        "Launch digital courses addressing South Asian makeup placement matching skin prep secrets",
        "Release custom brush tool kits under brand name",
      ],
      desc: "Consolidate active personal brand power to drive self-owned beauty product lines."
    }
  ];

  // Math calculators for Interactive Funnel Simulation
  // Calculations:
  // Comments count -> conversion to DM open (95%) -> recommendations clicks (40%) -> purchases (6%) -> avg commission ($3.45)
  const dmSent = Math.round(simulationComments * 0.95);
  const clicks = Math.round(dmSent * 0.42);
  const sales = Math.round(clicks * 0.08);
  const estimatedCommission = (sales * 3.45).toFixed(2);

  return (
    <section id="funnel" className="py-16 lg:py-24 bg-brand-sand/15 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* ================= SECTION 10: AUTOMATION FUNNEL SYSTEM ================= */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16" id="funnel-header">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              AUTOMATIVE CONVERSION ENGINE
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-brand-dark font-semibold">
              The Comments-to-Sales Automation Funnel
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-dark/70 mt-3">
              Witness how we bypass traditional link-in-bio leaks by automating instant Direct Messages when followers comment key phrases.
            </p>
            <div className="w-12 h-1 bg-brand-blush/80 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="funnel-grid-layout">
            
            {/* Interactive Stepping Diagram UI (Left) */}
            <div className="lg:col-span-4 space-y-3" id="funnel-steps-list">
              {funnelSteps.map((step) => {
                const isActive = activeFunnelStep === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveFunnelStep(step.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      isActive 
                        ? "bg-brand-rose border-transparent text-white shadow-md scale-102" 
                        : "bg-white border-brand-blush/20 text-brand-dark hover:bg-brand-sand/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        isActive ? "bg-white text-brand-rose" : "bg-brand-sand text-brand-rose"
                      }`}>
                        {step.id + 1}
                      </span>
                      <h4 className="font-serif text-sm font-bold uppercase tracking-wider">{step.title}</h4>
                    </div>
                    {isActive && <p className="font-sans text-xs text-white/95 mt-2 leading-relaxed">{step.desc}</p>}
                  </button>
                );
              })}
            </div>

            {/* Simulated Live Action Device Simulator (Middle) */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="w-68 h-[440px] rounded-[36px] bg-white border-4 border-brand-dark/95 shadow-2xl p-4 flex flex-col justify-between text-left select-none relative overflow-visible">
                
                {/* Device Title Header */}
                <div className="border-b border-brand-blush/20 pb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                    <span className="font-mono text-[9px] text-stone-500 font-semibold uppercase tracking-wider">Device Live Simulation</span>
                  </div>
                  <span className="font-sans text-[10px] text-brand-rose font-bold">@blushwithrakhee</span>
                </div>

                {/* Simulated Screens depending on activeFunnelStep */}
                <div className="flex-1 my-3 flex flex-col justify-center relative overflow-hidden bg-brand-sand/15 rounded-2xl p-3">
                  
                  {activeFunnelStep === 0 && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="bg-white p-2 text-[10px] rounded-lg border border-brand-blush/10 prose shadow-sm">
                        <span className="font-bold text-brand-rose">@follower_queen:</span> I need the base cream shade immediately! Comment is <strong className="bg-brand-sand px-1 text-black font-mono">GLOW</strong>
                      </div>
                      <div className="p-2 border border-dashed border-brand-blush/30 rounded-xl bg-white/50 text-center">
                        <p className="font-sans text-[11px] text-stone-500 mb-1.5">Simulate post comment trigger:</p>
                        <div className="flex gap-1.5">
                          <input 
                            type="text" 
                            placeholder="GLOW" 
                            value={inputComment}
                            onChange={(e) => setInputComment(e.target.value)}
                            className="bg-white text-stone-700 text-[10px] px-2 py-1 rounded border border-brand-rose/30 w-full focus:outline-none"
                          />
                          <button 
                            onClick={() => {
                              if (inputComment.trim().toUpperCase() === "GLOW") {
                                setActiveFunnelStep(1);
                              }
                            }}
                            className="bg-brand-rose hover:bg-brand-dark text-white p-1 rounded transition-colors cursor-pointer"
                          >
                            <Send size={11} />
                          </button>
                        </div>
                        <p className="text-[8px] text-stone-400 mt-1">Type GLOW and click send to trigger automation.</p>
                      </div>
                    </div>
                  )}

                  {activeFunnelStep === 1 && (
                    <div className="space-y-3 animate-fadeIn">
                      <p className="font-mono text-[8px] text-stone-400 uppercase tracking-widest text-center">Instagram Direct Message</p>
                      
                      <div className="bg-brand-dark text-white p-3 rounded-lg max-w-[85%] text-[10px] self-start leading-relaxed relative">
                        <span className="absolute -left-1 top-2 w-2 h-2 bg-brand-dark transform rotate-45" />
                        Hey love! Here is my unedited swatch link for the Glow Drops: <strong className="text-brand-blush underline font-bold">shopmy.us/glowdrops</strong>.
                      </div>

                      <div className="text-center pt-2">
                        <button 
                          onClick={() => setActiveFunnelStep(2)}
                          className="font-mono text-[9px] uppercase tracking-wider text-brand-rose font-bold hover:underline"
                        >
                          Step Forward: Open Card &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                  {activeFunnelStep === 2 && (
                    <div className="bg-white p-2.5 rounded-xl border border-brand-blush/20 shadow-md flex items-center gap-2 animate-fadeIn">
                      <img 
                        src="https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&q=80&w=120" 
                        alt="dewy product" 
                        className="w-10 h-10 object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left flex-1 min-w-0">
                        <p className="font-serif text-[10px] font-bold truncate text-brand-dark">Niacinamide Dew Drops</p>
                        <p className="font-sans text-[8px] text-brand-stone-500 line-clamp-1">Glow Recipe • Warm Peach Prep</p>
                        <p className="text-[9px] font-mono font-bold text-brand-rose mt-0.5">$35.00 <span className="text-[7px] text-stone-400 font-light">(10% commission earn)</span></p>
                      </div>
                      <button 
                        onClick={() => setActiveFunnelStep(3)}
                        className="p-1 bg-brand-sand rounded-lg hover:bg-brand-rose hover:text-white transition-all transition-colors"
                      >
                        <ExternalLink size={10} />
                      </button>
                    </div>
                  )}

                  {activeFunnelStep === 3 && (
                    <div className="text-center space-y-2.5 animate-fadeIn">
                      <ShoppingBag size={24} className="text-brand-rose mx-auto animate-bounce" />
                      <p className="font-serif text-[11px] font-bold text-brand-dark">Redirecting Securely...</p>
                      <p className="font-sans text-[8px] text-stone-500">Tracking code <strong className="font-mono">BLUSH_RAKHEE</strong> initialized. Session cookie matches affiliate program rules.</p>
                      <button 
                        onClick={() => setActiveFunnelStep(4)}
                        className="bg-brand-rose text-white text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-wider inline-block"
                      >
                        Complete Order ($35)
                      </button>
                    </div>
                  )}

                  {activeFunnelStep === 4 && (
                    <div className="text-center space-y-3 animate-fadeIn">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto">
                        <DollarSign size={18} />
                      </div>
                      <div>
                        <p className="font-serif text-xs font-bold text-brand-dark">Sale Confirmed!</p>
                        <p className="font-mono text-sm font-bold text-green-600 mt-0.5">+$3.50 Earned</p>
                        <p className="font-sans text-[8px] text-stone-400 mt-1">Affiliate dashboard reports updated successfully in real-time.</p>
                      </div>
                      <button 
                        onClick={() => setActiveFunnelStep(0)}
                        className="text-[8px] font-mono text-brand-rose hover:underline block mx-auto"
                      >
                        Restart Simulation &larr;
                      </button>
                    </div>
                  )}

                </div>

                {/* Device Home control indicator bar */}
                <div className="border-t border-brand-blush/10 pt-2 flex items-center justify-between text-[9px] font-mono text-stone-400">
                  <span>Keyword: <strong className="text-brand-rose">{customKeyword}</strong></span>
                  <div className="flex gap-1">
                    <span className="w-1 h-3 bg-stone-300 rounded" />
                    <span className="w-1 h-3 bg-stone-300 rounded" />
                    <span className="w-1 h-3 bg-stone-300 rounded" />
                  </div>
                </div>

              </div>
            </div>

            {/* Revenue Multiplier Simulator UI (Right) */}
            <div className="lg:col-span-3 bg-brand-dark text-white rounded-3xl p-6 border border-white/5 shadow-2xl text-left flex flex-col justify-between" id="funnel-calculator">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#B76E79] font-bold block mb-1">
                  CALCULATE ROI GAUGE
                </span>
                <h3 className="font-serif text-lg font-bold mb-3">Live Volume Calculator</h3>
                <p className="font-sans text-xs text-stone-300 leading-relaxed mb-4">
                  Adjust simulated comment count to preview the efficiency of direct messaging over standard checkout redirects.
                </p>

                {/* Slider */}
                <div className="space-y-2.5 mb-5 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-stone-300">Simulate Comments:</span>
                    <span className="text-brand-blush font-bold font-mono">{simulationComments}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={simulationComments}
                    onChange={(e) => setSimulationComments(Number(e.target.value))}
                    className="w-full accent-brand-rose bg-white/10 rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] text-stone-400 font-mono">
                    <span>10 Min</span>
                    <span>1,000 Max</span>
                  </div>
                </div>

                {/* Metric results */}
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between font-mono py-1.5 border-b border-white/5">
                    <span className="text-stone-400">DM Deliveries (95%):</span>
                    <span className="font-bold">{dmSent} sent</span>
                  </div>
                  <div className="flex justify-between font-mono py-1.5 border-b border-white/5">
                    <span className="text-stone-400">Affiliate Clicks (42%):</span>
                    <span className="font-bold">{clicks} clicks</span>
                  </div>
                  <div className="flex justify-between font-mono py-1.5 border-b border-white/5">
                    <span className="text-stone-400">Total Sales (8%):</span>
                    <span className="font-bold text-green-400">{sales} sold</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-[9px] text-stone-400 uppercase tracking-widest font-mono font-bold">ESTIMATED AFFILIATE INCOME</p>
                <p className="font-mono text-3xl font-bold text-[#E8C8C8] mt-1">${estimatedCommission}</p>
                <p className="text-[8px] text-stone-400 mt-0.5 leading-relaxed">Based on standard $3.45 commission average per cart item checkout.</p>
              </div>

            </div>

          </div>
        </div>

        {/* ================= SECTION 11: MONETIZATION ROADMAP ================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16" id="roadmap-header">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              VISIONARY GROWTH TIMELINE
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-brand-dark font-semibold">
              The Monetization Roadmap
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-dark/70 mt-3">
              Our structured metrics pipeline tracing from basic organic setup towards long-term digital product scaling and self-owned product lines.
            </p>
            <div className="w-12 h-1 bg-brand-blush/80 mx-auto mt-4 rounded-full" />
          </div>

          {/* Timeline Linear Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative" id="roadmap-cards">
            {roadmapStages.map((stage) => {
              const isActiveLocal = stage.status === "Current";
              const isFutureLocal = stage.status === "Scale Outlook" || stage.status === "Planned";
              return (
                <div 
                  key={stage.id}
                  className={`bg-white rounded-3xl p-6 border relative text-left flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md ${
                    isActiveLocal 
                      ? "border-brand-rose ring-1 ring-brand-rose" 
                      : "border-brand-blush/20"
                  }`}
                  id={`roadmap-node-${stage.id}`}
                >
                  <div>
                    {/* Top line with Node Icon ID / Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        isActiveLocal 
                          ? "bg-brand-rose text-white" 
                          : isFutureLocal ? "bg-blend-lighten bg-[#F5EFE8] text-stone-500" : "bg-brand-sand text-brand-rose"
                      }`}>
                        0{stage.id}
                      </span>

                      <span className={`px-2.5 py-0.5 rounded text-[8px] uppercase font-bold tracking-widest ${
                        isActiveLocal 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : isFutureLocal ? "bg-stone-50 text-stone-400 border border-stone-200" : "bg-brand-rose/10 text-brand-rose"
                      }`}>
                        {stage.status}
                      </span>
                    </div>

                    <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-rose">{stage.target}</p>
                    <h3 className="font-serif text-base font-bold text-brand-dark mt-1 mb-2">
                      {stage.title}
                    </h3>
                    <p className="font-sans text-[11px] text-stone-500 leading-relaxed mb-4">
                      {stage.desc}
                    </p>

                    {/* Milestone details list */}
                    <div className="border-t border-brand-blush/10 pt-3 mt-2">
                       <p className="text-[8px] font-mono uppercase tracking-wider text-stone-400 mb-1.5 font-bold">Priority Objectives</p>
                       <ul className="space-y-1.5">
                         {stage.milestones.map((ms, idx) => (
                           <li key={idx} className="flex items-start gap-1 font-sans text-[10px] text-stone-600 leading-relaxed">
                             <span className="w-1 h-1 rounded-full bg-brand-rose mt-1.5 shrink-0" />
                             <span>{ms}</span>
                           </li>
                         ))}
                       </ul>
                    </div>

                  </div>

                  <div className="mt-5 pt-3 border-t border-brand-blush/10 text-[9px] font-semibold text-brand-rose font-mono uppercase tracking-widest text-right">
                    {stage.status === "Current" ? "Active Now" : "Growth Outlook"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
