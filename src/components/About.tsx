/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Quote, Sparkles, Heart, Zap, FileSpreadsheet } from "lucide-react";

export default function About() {
  const socialProofPoints = [
    {
      icon: <Heart size={16} className="text-brand-rose" />,
      title: "Community First",
      text: "Every follower isn't just a number—they represent a woman seeking realistic, filter-free makeup guidance that suits her context."
    },
    {
      icon: <Zap size={16} className="text-brand-rose" />,
      title: "100% Reels Native",
      text: "Creating engaging reels with natural pacing, honest swatches, and clear closeups tailored specifically for beauty enthusiasts."
    },
    {
      icon: <FileSpreadsheet size={16} className="text-brand-rose" />,
      title: "Transparent & Professional",
      text: "Providing brands with reliable, honest reviews and professional communication to build long-term, trusted collaborations."
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="about-heading">
          <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
            THE CREATOR BEHIND THE GLOW
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-brand-dark font-semibold">
            Meet Rakhee
          </h2>
          <div className="w-12 h-1 bg-brand-blush/80 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Image Collage & Portrait */}
          <div className="lg:col-span-5 flex justify-center relative" id="about-left-image">
            <div className="relative">
              {/* Primary Photo represent luxury skincare setup */}
              <div className="w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl border border-brand-blush/20">
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600"
                  alt="Rakhee swatching products with luxury skincare"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Offset secondary layout photo */}
              <div className="absolute -bottom-8 -right-8 w-44 h-48 rounded-xl overflow-hidden shadow-2xl border border-white hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=400"
                  alt="High quality close up makeup setup swatches"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Decorative design badge */}
              <div className="absolute -top-6 -left-6 bg-brand-sand font-mono text-[9px] font-bold py-2 px-3 rounded-xl border border-brand-blush/30 text-brand-rose uppercase tracking-widest flex items-center gap-1 shadow-sm">
                <Sparkles size={11} /> Est. 2026
              </div>
            </div>
          </div>

          {/* Right Block: Biography & Story Elements */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left" id="about-right-text">
            
            <div className="relative pl-6 border-l-2 border-brand-rose/30 py-1" id="creative-quote-container border">
              <span className="absolute -left-2 top-0 text-3xl text-brand-rose/20 font-serif leading-none">“</span>
              <h3 className="font-serif text-2xl md:text-3xl text-brand-rose italic font-medium tracking-tight leading-snug">
                Beauty isn't about hiding. It's about enhancing what makes you memorable.
              </h3>
            </div>

            <p className="font-sans text-sm text-brand-dark/85 leading-relaxed">
              I launched <span className="font-semibold text-brand-rose">Blush With Rakhee</span> as a dedicated, welcoming space in the beauty community. Realizing that many beauty reviews are heavily filtered or feel out of reach, I set out to share real, everyday makeup tips and honest skincare experiences that anyone can try.
            </p>

            <p className="font-sans text-sm text-brand-dark/85 leading-relaxed">
              With <span className="font-semibold text-brand-rose">100% video-based content</span> on Instagram, I focus on helping women find both high-end premium cosmetics and accessible drugstore alternatives. Every Reel I publish features real skin texture, step-by-step techniques, and friendly advice that empowers my community to feel their best.
            </p>

            {/* Exclusive Quote Box */}
            <div className="bg-brand-sand/50 border-l-4 border-brand-rose p-5 rounded-r-2xl relative" id="about-quote-box">
              <Quote className="absolute right-4 top-4 text-brand-blush/30" size={36} />
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-rose mb-1">
                My Core Mission
              </p>
              <p className="font-serif text-sm lg:text-base text-brand-dark italic leading-relaxed">
                To offer honest, authentic, and realistic beauty content—helping women build self-confidence, understand their skin, and find products that genuinely work for their daily lives.
              </p>
            </div>

            {/* Social Proof Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4" id="about-proof-cards">
              {socialProofPoints.map((point, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white border border-brand-blush/20 hover:border-brand-rose hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-sand flex items-center justify-center mb-3">
                    {point.icon}
                  </div>
                  <h4 className="font-sans text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">
                    {point.title}
                  </h4>
                  <p className="font-sans text-[11px] text-brand-dark/70 leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
