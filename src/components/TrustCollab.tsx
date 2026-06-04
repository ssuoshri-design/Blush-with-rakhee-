/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  HeartHandshake, ShieldCheck, Stars, BookOpen, Users2, Layers, 
  Video, Sparkles, ShoppingBag, Radio, Milestone, ArrowRight, DollarSign 
} from "lucide-react";

interface TrustCollabProps {
  onSelectService: (serviceName: string) => void;
}

export default function TrustCollab({ onSelectService }: TrustCollabProps) {
  // Section 6 Points
  const trustPoints = [
    {
      icon: <ShieldCheck className="text-brand-rose" size={20} />,
      title: "Authentic Swatching",
      desc: "Every product swatch is filmed under standard daylight and studio bulb rings. Highlighting natural skin pores, textures, and neutral color tones without falsified camera filters."
    },
    {
      icon: <HeartHandshake className="text-brand-rose" size={20} />,
      desc: "If a formula creases, pills, or underperforms during our 8-hour wear test, we describe exactly why and who the product actually suits, retaining absolute follower trust.",
      title: "Honest Diagnostics"
    },
    {
      icon: <Stars className="text-brand-rose" size={20} />,
      desc: "Prioritizing cosmetic chemistry basics, skin barrier prep, and accurate structural blending tips instead of temporary trends. Giving long-term confidence to the viewer.",
      title: "Actionable Knowledge"
    },
    {
      icon: <Users2 className="text-brand-rose" size={20} />,
      desc: "Promptly engaging with comments and swifty responding to product inquiries, creating an active and intimate micro-hub of organic beauty consumers.",
      title: "Deeply Nested Community"
    },
  ];

  // Section 7 Services
  const services = [
    {
      id: "ugc",
      icon: <Video size={18} className="text-brand-rose" />,
      title: "UGC Content Creation",
      desc: "Crisp, raw, or fully edited vertical video footage of wear tests or applications. Engineered specifically to convert when deployed as social media advertisement creatives.",
      deliverables: "1x raw video + edited variants, standard 30-day social ad rights.",
      badge: "High Conversion rate"
    },
    {
      id: "reels",
      icon: <Sparkles size={18} className="text-brand-rose" />,
      title: "Sponsored Instagram Reel",
      desc: "A fully custom or seamless product integration inside a highly stylized transition tutorial, a detailed GRWM chat, or a dedicated swatching video.",
      deliverables: "1x Published Reel, 3x custom story prompts, permanent post archiving.",
      badge: "High Engagement rate"
    },
    {
      id: "reviews",
      icon: <ShoppingBag size={18} className="text-brand-rose" />,
      title: "Unbiased Wear-Tests & Reviews",
      desc: "An elaborate, unedited showcase of your product. Detailing ingredient feel, skin texture settling, water resistance, and natural transfer tests over 8 hours.",
      deliverables: "1x structured Reel review, high-res swatch photographs.",
      badge: "Pure Follower Trust"
    },
    {
      id: "affiliate",
      icon: <Radio size={18} className="text-brand-rose" />,
      title: "Comment-to-Link Campaigns",
      desc: "Utilize built-in DM automation. Followers who comment a specific keyword automatically receive your brand's affiliate link & checkout discount codes in seconds.",
      deliverables: "Custom keywords, tracking dashboard setup, direct link-clicks.",
      badge: "Instant ROI Funnel"
    },
    {
      id: "ambassador",
      icon: <Milestone size={18} className="text-brand-rose" />,
      title: "Long-Term Ambassadorship",
      desc: "Elevate your brand with consistent monthly coverage. Features recurring skincare prep insertions, product empties updates, and premium placement across season campaigns.",
      deliverables: "3x dedicated Reels, 12x Stories over 90 days, exclusive industry exclusivity.",
      badge: "Premium Authority"
    }
  ];

  return (
    <section id="collaborations" className="py-16 lg:py-24 bg-brand-sand/15 relative overflow-hidden">
      
      {/* Decorative gradient stripes */}
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-brand-blush/20 blur-3xl" />
      <div className="absolute left-10 bottom-10 w-80 h-80 rounded-full bg-brand-sand/60 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* ================= SECTION 6: WHY PEOPLE TRUST RAKHEE ================= */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16" id="trust-header">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              THE VALUE OF AUTHENTICITY
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-brand-dark font-semibold">
              Why Brands &amp; Followers Trust Rakhee
            </h2>
            <div className="w-12 h-1 bg-brand-blush/80 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="trust-cards-grid">
            {trustPoints.map((pt, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-2xl border border-brand-blush/20 hover:border-brand-rose hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-left flex flex-col justify-between"
                id={`trust-card-${i}`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-sand/65 flex items-center justify-center mb-4 text-brand-rose">
                    {pt.icon}
                  </div>
                  <h3 className="font-serif text-base font-bold text-brand-dark mb-2">
                    {pt.title}
                  </h3>
                  <p className="font-sans text-[11px] text-brand-dark/75 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-blush/10 text-[9px] font-mono uppercase tracking-widest text-brand-rose font-bold">
                  Guaranteed Standard
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 7: BRAND COLLABORATION HUB ================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16" id="collab-header">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              BRAND COLLABORATION HUB
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-brand-dark font-semibold">
              Let&apos;s Create Something Beautiful Together
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-dark/70 mt-3">
              Explore custom deliverables engineered to fit into modern creator marketing channels. Select an option to configure a custom campaign proposal.
            </p>
            <div className="w-12 h-1 bg-brand-blush/80 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="collab-hub-content">
            {/* Left services list */}
            <div className="lg:col-span-8 space-y-4" id="services-grid">
              {services.map((srv) => (
                <div 
                  key={srv.id}
                  className="bg-white p-5 rounded-2xl border border-brand-blush/20 hover:border-brand-rose/60 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left group hover:shadow-md"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-brand-sand border border-brand-blush/20 flex items-center justify-center shrink-0">
                      {srv.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-base font-bold text-brand-dark group-hover:text-brand-rose transition-colors">
                          {srv.title}
                        </h3>
                        <span className="bg-brand-rose/10 text-brand-rose font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                          {srv.badge}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-brand-dark/75 mt-1 leading-relaxed max-w-xl">
                        {srv.desc}
                      </p>
                      <p className="font-sans text-[11px] text-brand-rose font-medium mt-2">
                        <strong>Standard Deliverables:</strong> {srv.deliverables}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 w-full sm:w-auto self-end sm:self-center">
                    <button
                      onClick={() => onSelectService(srv.title)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1 bg-brand-rose hover:bg-brand-dark text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer group-hover:scale-102"
                    >
                      <span>Select</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right micro media kit cards / Trust indicator */}
            <div className="lg:col-span-4 space-y-6" id="collab-sidebar">
              <div className="bg-brand-dark text-white p-6 rounded-3xl text-left border border-white/5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blush/10 rounded-full blur-2xl" />
                
                <h3 className="font-serif text-lg font-bold mb-3">Our Campaign Standards</h3>
                
                <ul className="space-y-4 text-xs text-stone-200 font-sans">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-rose mt-1.5 shrink-0" />
                    <span><strong>Paced &amp; Sound-Synced:</strong> We map target sounds and pacing to maintain retention indexes past the vital 3-second mark.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-rose mt-1.5 shrink-0" />
                    <span><strong>Complete Transparency:</strong> Follows FTC labeling requirements while presenting product utility beautifully.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-rose mt-1.5 shrink-0" />
                    <span><strong>UGC Expertise:</strong> Deliver clean file variations suited for social vertical ad grids.</span>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-stone-400">Collaboration Status</span>
                  <span className="text-brand-blush bg-brand-rose/25 px-2 py-0.5 rounded font-bold uppercase tracking-wider">OPEN</span>
                </div>
              </div>

              {/* Instant proposal trust card */}
              <div className="bg-white p-6 rounded-3xl text-left border border-brand-blush/25 shadow-sm">
                <span className="font-mono text-[9px] uppercase font-bold text-brand-rose tracking-widest block mb-1">
                  SECURE BOOKING GAUGE
                </span>
                <p className="font-serif text-md font-semibold text-brand-dark mb-2">Ready to align your brand?</p>
                <p className="font-sans text-xs text-brand-dark/70 leading-relaxed mb-4">
                  Select a category or campaign framework on the left. The custom details will auto-fill in our contact form below so we can generate a prompt contract proposal.
                </p>
                <div className="w-full bg-brand-sand py-2 px-3 rounded-xl border border-brand-blush/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-brand-dark/60 font-bold">Standard Contact turnaround</span>
                  <span className="text-brand-rose font-bold uppercase">&lt; 24 HOURS</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
