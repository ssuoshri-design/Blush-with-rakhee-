/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { Sparkles, Search, Lightbulb, Droplet, Video, RefreshCw, Layers } from "lucide-react";
import { initialPillars } from "../mockData";

// Helper to resolve icon from string
const iconMap: Record<string, ReactNode> = {
  Sparkles: <Sparkles className="text-brand-rose" size={20} />,
  Search: <Search className="text-brand-rose" size={20} />,
  Lightbulb: <Lightbulb className="text-brand-rose" size={20} />,
  Droplet: <Droplet className="text-brand-rose" size={20} />,
  Video: <Video className="text-brand-rose" size={20} />,
  RefreshCw: <RefreshCw className="text-brand-rose" size={20} />,
};

interface PillarsProps {
  onFilterCategory?: (category: string) => void;
}

export default function Pillars({ onFilterCategory }: PillarsProps) {
  return (
    <section id="pillars" className="py-16 lg:py-24 bg-brand-sand/30 relative">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="pillars-title-block">
          <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
            DESIGNED FOR ENGAGEMENT
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-brand-dark font-semibold">
            Beauty Content Pillars
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-dark/70 mt-3 max-w-lg mx-auto">
            These six focal areas structure all visual outputs, engineered specifically to trigger viral saves, shares, and high comments-to-sales ratios.
          </p>
          <div className="w-12 h-1 bg-brand-blush/80 mx-auto mt-4 rounded-full" />
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="pillars-container">
          {initialPillars.map((pillar) => {
            const icon = iconMap[pillar.iconName] || <Layers size={20} />;
            return (
              <div
                key={pillar.id}
                className="group relative bg-white rounded-2xl p-6 border border-brand-blush/15 hover:border-brand-rose shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                id={`pillar-card-${pillar.id}`}
              >
                <div>
                  {/* Top line with Icon and Post Count */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-brand-sand group-hover:bg-brand-rose/10 transition-colors flex items-center justify-center">
                      {icon}
                    </div>
                    <span className="font-mono text-[10px] uppercase font-bold text-brand-rose/80 px-2.5 py-1 rounded-full bg-brand-sand/50">
                      {pillar.count} Reels Posted
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-lg font-bold text-brand-dark group-hover:text-brand-rose transition-colors mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-dark/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Interactive Footer element */}
                <div className="mt-6 pt-4 border-t border-brand-blush/10 flex items-center justify-between">
                  <span className="font-sans text-[11px] text-brand-dark/50 italic">
                    Example: &quot;{pillar.exampleReelTitle}&quot;
                  </span>
                  {onFilterCategory && (
                    <button
                      onClick={() => {
                        const catMapped = 
                          pillar.title === "Skincare Tips" ? "Skincare" :
                          pillar.title === "Makeup Tutorials" ? "Makeup Tutorial" :
                          pillar.title === "Beauty Hacks" ? "Beauty Hack" :
                          pillar.title === "GRWM Content" ? "GRWM" :
                          pillar.title === "Beauty Transformations" ? "Transformation" : "Product Reviews";
                        onFilterCategory(catMapped);
                      }}
                      className="font-mono text-[9px] uppercase tracking-wider text-brand-rose font-bold group-hover:underline cursor-pointer"
                    >
                      View Live Reels &rarr;
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Callout Badge below pillars */}
        <div className="mt-12 text-center" id="pillars-disclaimer">
          <p className="font-sans text-xs text-brand-dark/60 italic inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-blush/10 bg-white/50">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold" />
            Designed specifically to align with premium luxury beauty cosmetics and organic skincare campaigns.
          </p>
        </div>

      </div>
    </section>
  );
}
