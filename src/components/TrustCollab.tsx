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
      desc: "Create authentic, creator-style videos that feel natural, engaging, and relatable.",
      deliverables: "Product demonstrations • Beauty tutorials • Product application videos • Lifestyle beauty content • Short-form vertical videos. Perfect For: Social media advertising, product launches, and brand awareness campaigns.",
      badge: "UGC Content"
    },
    {
      id: "reels",
      icon: <Sparkles size={18} className="text-brand-rose" />,
      title: "Sponsored Instagram Reels",
      desc: "Feature your product naturally within beauty tutorials, GRWM videos, product reviews, or transformation content.",
      deliverables: "1 Instagram Reel • Product tagging • Brand mention • Optional story support",
      badge: "Sponsored Post"
    },
    {
      id: "reviews",
      icon: <ShoppingBag size={18} className="text-brand-rose" />,
      title: "Honest Product Reviews",
      desc: "Share genuine experiences with products while maintaining transparency and audience trust.",
      deliverables: "Review Reel • Product demonstration • Beauty-focused feedback • Optional story coverage",
      badge: "Product Review"
    },
    {
      id: "affiliate",
      icon: <Radio size={18} className="text-brand-rose" />,
      title: "Affiliate Partnerships",
      desc: "For brands interested in long-term collaboration opportunities, affiliate partnerships allow product recommendations to be shared through trusted content and authentic experiences.",
      deliverables: "Affiliate content integration • Product recommendations • Long-term promotional opportunities",
      badge: "Affiliate Collaboration"
    },
    {
      id: "ambassador",
      icon: <Milestone size={18} className="text-brand-rose" />,
      title: "Long-Term Brand Partnerships",
      desc: "Build consistent visibility through recurring collaborations and ongoing content integration.",
      deliverables: "Beauty Brands • Skincare Companies • Cosmetics Launches • Product Campaigns",
      badge: "Brand Ambassadorship"
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
              BRAND COLLABORATIONS
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-brand-dark font-semibold">
              Let&apos;s Create Something Beautiful Together
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-dark/70 mt-3">
              I love discovering products that genuinely add value to my audience. Whether you&apos;re launching a new beauty product, looking for authentic creator content, or looking for a long-term partnership, I&apos;d love to explore how we can work together.
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
                
                <h3 className="font-serif text-base font-bold mb-4 font-normal">Why Brands Choose To Work With Me</h3>
                
                <ul className="space-y-4 text-xs text-stone-200 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-rose font-bold shrink-0">✓</span>
                    <span>Authentic content creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-rose font-bold shrink-0">✓</span>
                    <span>Beauty-focused audience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-rose font-bold shrink-0">✓</span>
                    <span>Honest recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-rose font-bold shrink-0">✓</span>
                    <span>Consistent content publishing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-rose font-bold shrink-0">✓</span>
                    <span>Professional communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-rose font-bold shrink-0">✓</span>
                    <span>Long-term collaboration mindset</span>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-stone-400">Collaboration Status</span>
                  <span className="text-brand-blush bg-brand-rose/25 px-2 py-0.5 rounded font-bold uppercase tracking-wider">OPEN</span>
                </div>
              </div>

              {/* Instant proposal info card */}
              <div className="bg-white p-6 rounded-3xl text-left border border-brand-blush/25 shadow-sm">
                <span className="font-mono text-[9px] uppercase font-bold text-brand-rose tracking-widest block mb-1">
                  COLLABORATION INQUIRY
                </span>
                <p className="font-serif text-md font-semibold text-brand-dark mb-2">Ready to work together?</p>
                <p className="font-sans text-xs text-brand-dark/70 leading-relaxed mb-4">
                  Select a category on the left. The custom details will fill in our contact form below so we can discuss a customized proposal.
                </p>
                <div className="w-full bg-brand-sand py-2 px-3 rounded-xl border border-brand-blush/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-brand-dark/60 font-bold">Standard response turnaround</span>
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
