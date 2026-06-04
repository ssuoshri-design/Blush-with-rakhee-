/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight, Instagram, CheckCircle2, Award, Heart, MessageSquare } from "lucide-react";

interface HeroProps {
  onWorkWithMe: () => void;
  onExploreContent: () => void;
}

export default function Hero({ onWorkWithMe, onExploreContent }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden luxury-gradient pt-8 pb-16 lg:py-24">
      {/* Soft Animated Background Glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-brand-blush/25 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-brand-sand/50 blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Brand Statement & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left" id="hero-left-content">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 bg-brand-sand/70 border border-brand-blush/40 px-3.5 py-1.5 rounded-full" id="hero-badge">
            <Sparkles size={13} className="text-brand-rose animate-spin-slow" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-brand-rose">
              CREATING TRUST IN BEAUTY
            </span>
          </div>

          {/* Majestic Typography Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark leading-[1.1] tracking-tight" id="hero-headline">
            Beauty, Confidence <br />
            &amp; <span className="text-brand-rose italic font-medium">Honest</span> Recommendations
          </h1>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base text-brand-dark/80 leading-relaxed max-w-2xl" id="hero-subheadline">
            Helping women discover beauty products, makeup techniques, skincare secrets, and trusted recommendations through authentic, reel-based transformations. Let's peel back the filters and focus on honest cosmetic utility.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto" id="hero-cta-group">
            <button
              onClick={onWorkWithMe}
              className="flex items-center justify-center gap-2 bg-brand-dark text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-brand-rose hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg transition-all cursor-pointer group"
              id="hero-cta-work"
            >
              <span>Work With Me</span>
              <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={onExploreContent}
              className="flex items-center justify-center gap-2 bg-white/40 hover:bg-brand-sand/60 text-brand-rose border border-brand-blush/30 hover:border-brand-blush px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              id="hero-cta-explore"
            >
              <span>Explore Content</span>
            </button>
          </div>

          {/* Social Count & Trust Badges */}
          <div className="pt-6 border-t border-brand-blush/15 w-full grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8" id="hero-trust-indicators">
            <div className="flex items-center gap-2.5">
              <div className="bg-brand-rose/10 p-2 rounded-full text-brand-rose">
                <Instagram size={14} />
              </div>
              <div>
                <p className="font-mono text-xs font-bold text-brand-dark">1,009+</p>
                <p className="text-[10px] font-medium text-brand-dark/65 uppercase tracking-wider">IG Followers</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="bg-brand-gold/10 p-2 rounded-full text-brand-gold">
                <Award size={14} />
              </div>
              <div>
                <p className="font-mono text-xs font-bold text-brand-dark">100% Reels</p>
                <p className="text-[10px] font-medium text-brand-dark/65 uppercase tracking-wider">Content Engine</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="bg-green-50 p-2 rounded-full text-green-600">
                <CheckCircle2 size={14} />
              </div>
              <div>
                <p className="font-mono text-xs font-bold text-brand-dark">Active</p>
                <p className="text-[10px] font-medium text-brand-dark/65 uppercase tracking-wider">Collab Open</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Creator Portrait Frame with Micro-Widgets */}
        <div className="lg:col-span-5 flex justify-center relative mt-8 lg:mt-0" id="hero-right-visual">
          
          {/* Abstract Circle Grid */}
          <div className="absolute -top-6 -left-6 text-brand-rose/25 font-serif text-3xl font-extralight select-none tracking-widest leading-none">
            ••••<br />••••<br />••••
          </div>

          {/* Main Portrait Frame with Luxury Outline */}
          <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] rounded-[30px] p-2 bg-gradient-to-b from-brand-rose/30 to-brand-sand shadow-2xl overflow-visible">
            <div className="w-full h-full rounded-[24px] bg-white overflow-hidden relative border border-white">
              
              {/* Representing beautiful artistic South Asian creator vibe content thumbnail */}
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=700"
                alt="Blush With Rakhee beauty look"
                className="w-full h-full object-cover object-top scale-102 hover:scale-105 duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Bottom tag indicator on portrait */}
              <div className="absolute bottom-4 left-4 right-4 glass-effect px-4 py-2.5 rounded-xl border border-white/20 shadow-sm">
                <span className="font-mono text-[9px] tracking-widest text-brand-rose font-bold block uppercase">
                  ACTIVE BEAUTY REVIEW
                </span>
                <span className="font-serif text-xs text-brand-dark italic block">
                  &quot;Finding elegance in natural textures.&quot;
                </span>
              </div>
            </div>

            {/* Float Widget 1: Engagement Rate Pop-up */}
            <div className="absolute -left-12 top-10 glass-effect p-3 rounded-2xl border border-brand-blush/35 shadow-lg flex items-center gap-2.5 animate-bounce-slow">
              <div className="w-8 h-8 rounded-full bg-brand-rose/15 flex items-center justify-center text-brand-rose">
                <Heart size={14} fill="currentColor" />
              </div>
              <div className="text-left">
                <p className="font-mono text-xs font-bold leading-none text-brand-dark">8.8%</p>
                <p className="text-[9px] text-brand-dark/60 font-semibold uppercase tracking-wider mt-0.5">IG Engagement</p>
              </div>
            </div>

            {/* Float Widget 2: Real-time Comments simulation */}
            <div className="absolute -right-10 bottom-24 bg-brand-dark text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-sand/15 flex items-center justify-center text-brand-blush">
                <MessageSquare size={14} fill="currentColor" />
              </div>
              <div className="text-left">
                <p className="font-mono text-xs font-bold leading-none">Instant DM</p>
                <p className="text-[9px] text-brand-sand/70 font-medium uppercase tracking-widest mt-0.5">Comment-to-Link active</p>
              </div>
            </div>

          </div>

          {/* Accent Gold Circle */}
          <div className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
            <Sparkles size={18} className="animate-pulse" />
          </div>

        </div>

      </div>
    </section>
  );
}
