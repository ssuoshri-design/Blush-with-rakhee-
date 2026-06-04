/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Instagram, Heart, Play, Eye, TrendingUp, Sparkles, Film, 
  MessageCircle, Bookmark, Share2, Volume2, Maximize2, RefreshCw 
} from "lucide-react";
import { initialReels, initialStats } from "../mockData";
import { InstagramReel } from "../types";

export default function Showcase() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeReel, setActiveReel] = useState<InstagramReel | null>(initialReels[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<"editorial" | "timeline">("editorial");

  const categories = ["All", "Makeup Tutorial", "Skincare", "Product Reviews", "Beauty Hack", "GRWM", "Transformation"];

  const filteredReels = selectedFilter === "All"
    ? initialReels
    : initialReels.filter(r => r.category === selectedFilter);

  // Engagement calculator helper
  const totalViews = initialReels.reduce((sum, r) => sum + r.views, 0);
  const totalLikes = initialReels.reduce((sum, r) => sum + r.likes, 0);

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-white relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-blush/10 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="portfolio-header">
          <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
            INSTAGRAM WORK SHOWCASE
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-brand-dark font-semibold">
            Featured Content Portfolio
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-dark/70 mt-3">
            Interact with actual published reels to inspect metrics, watch dewy transitions, and review specific color placements.
          </p>
          <div className="w-12 h-1 bg-brand-blush/80 mx-auto mt-4 rounded-full" />
        </div>

        {/* Statistical Metrics Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-brand-sand/35 rounded-3xl border border-brand-blush/20 mb-12" id="portfolio-stats-bar">
          <div className="text-center p-4">
            <p className="font-mono text-2xl lg:text-3xl font-bold text-brand-dark">{initialStats.followers.toLocaleString()}</p>
            <p className="text-[10px] text-brand-dark/60 font-bold uppercase tracking-wider mt-1">Followers Count</p>
          </div>
          <div className="text-center p-4 border-l border-brand-blush/15">
            <p className="font-mono text-2xl lg:text-3xl font-bold text-brand-rose">{initialStats.reelsCount}</p>
            <p className="text-[10px] text-brand-dark/60 font-bold uppercase tracking-wider mt-1">Reels Published</p>
          </div>
          <div className="text-center p-4 border-l border-brand-blush/15">
            <p className="font-mono text-2xl lg:text-3xl font-bold text-brand-dark">{initialStats.engagementAvg}%</p>
            <p className="text-[10px] text-brand-dark/60 font-bold uppercase tracking-wider mt-1">Avg Engagement</p>
          </div>
          <div className="text-center p-4 border-l border-brand-blush/15">
            <p className="font-mono text-2xl lg:text-3xl font-bold text-brand-gold">{(initialStats.monthlyReach / 1000).toFixed(1)}k</p>
            <p className="text-[10px] text-brand-dark/60 font-bold uppercase tracking-wider mt-1">Monthly Reach</p>
          </div>
        </div>

        {/* Categories Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" id="portfolio-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedFilter === cat
                  ? "bg-brand-rose text-white shadow-sm"
                  : "bg-brand-sand/40 text-brand-dark/75 hover:bg-brand-blush/25"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Video Simulator (Top Spotlight) */}
        {activeReel && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12 p-6 bg-brand-dark text-white rounded-[32px] overflow-hidden shadow-2xl relative" id="reels-simulator-block">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-brand-rose/20 rounded-full blur-3xl pointer-events-none" />

            {/* Simulated Mobile Mockup Video Player */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-64 h-[440px] rounded-[36px] bg-black p-3 border-4 border-brand-dark/95 shadow-inner overflow-hidden flex flex-col justify-end">
                
                {/* Active Backdrop Thumbnail / Simulated Playing Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={activeReel.thumbnail}
                    alt={activeReel.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105 saturate-110 brightness-105' : 'scale-100'}`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle color adjustment layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                </div>

                {/* Simulated Overlay Interface */}
                <div className="relative z-10 w-full text-left flex flex-col justify-between h-full p-2">
                  <div className="flex items-center justify-between text-[11px] font-medium text-white/80">
                    <span className="flex items-center gap-1 font-mono">
                      <Film size={11} /> Reels Playback
                    </span>
                    <span className="bg-brand-rose px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold">
                      {activeReel.category}
                    </span>
                  </div>

                  {/* Large central play trigger */}
                  <div className="flex items-center justify-center my-auto">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-14 h-14 bg-white/15 hover:bg-white/25 active:scale-95 border border-white/25 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
                      id="simulator-play-btn"
                    >
                      {isPlaying ? (
                        <div className="flex gap-1 justify-center items-center">
                          <span className="w-1.5 h-6 bg-white rounded-full animate-pulse" />
                          <span className="w-1.5 h-6 bg-white rounded-full animate-pulse [animation-delay:0.2s]" />
                        </div>
                      ) : (
                        <Play fill="currentColor" size={20} className="translate-x-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Bottom User Description & Actions */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-brand-rose/40 border border-white/30 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-[11px] font-bold">@blushwithrakhee</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-white/20 rounded text-stone-200">Follows</span>
                    </div>

                    <p className="text-[11px] text-white/90 line-clamp-2 leading-relaxed font-sans mb-3">
                      {activeReel.title} #skincareprep #dewymakeup #microcreator #blushwithrakhee
                    </p>

                    {/* Progress tracking line */}
                    <div className="w-full bg-white/20 h-1 rounded-full mb-3 overflow-hidden">
                      <div 
                        className={`h-full bg-brand-rose transition-all ${isPlaying ? 'w-full duration-[45000ms] ease-linear' : 'w-1/4'}`} 
                      />
                    </div>

                    {/* Sim Action Metrics */}
                    <div className="flex items-center justify-between text-xs text-white/80 font-mono">
                      <span className="flex items-center gap-1">
                        <Heart size={12} fill="#B76E79" className="text-brand-rose" /> {activeReel.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={12} fill="currentColor" /> {Math.round(activeReel.likes * 0.14)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bookmark size={12} /> {Math.round(activeReel.views * 0.05)}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Right edge absolute floating tools (Self-contained in player) */}
                <div className="absolute right-2.5 top-1/3 flex flex-col gap-4 text-white z-20">
                  <div className="flex flex-col items-center gap-0.5">
                    <button className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full transition-all cursor-pointer"><Heart size={15} /></button>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <button className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full transition-all cursor-pointer"><MessageCircle size={15} /></button>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <button className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full transition-all cursor-pointer"><Share2 size={15} /></button>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <button className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full transition-all cursor-pointer"><Volume2 size={15} /></button>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Side: Reel Statistical Performance & Retention Blueprint */}
            <div className="lg:col-span-7 flex flex-col justify-between py-2 text-left" id="simulator-specs">
              
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-brand-blush tracking-wider font-bold">Selected Reel Analysis</span>
                    <h3 className="font-serif text-xl font-bold mt-1 leading-snug">{activeReel.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-2xl font-bold text-brand-blush">{activeReel.views.toLocaleString()}</p>
                    <p className="text-[9px] text-white/50 uppercase font-bold tracking-wider">Total Impressions</p>
                  </div>
                </div>

                {/* Tabs to toggle details */}
                <div className="flex gap-2 mb-4 bg-white/5 p-1 rounded-lg w-fit">
                  <button
                    onClick={() => setActiveSimulatorTab("editorial")}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeSimulatorTab === "editorial" ? 'bg-brand-rose text-white' : 'text-stone-300 hover:text-white'}`}
                  >
                    Editorial Details
                  </button>
                  <button
                    onClick={() => setActiveSimulatorTab("timeline")}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeSimulatorTab === "timeline" ? 'bg-brand-rose text-white' : 'text-stone-300 hover:text-white'}`}
                  >
                    Pacing &amp; Retention Blueprint
                  </button>
                </div>

                {activeSimulatorTab === "editorial" ? (
                  <div className="space-y-4">
                    <p className="font-sans text-xs text-white/80 leading-relaxed">
                      This video is optimized for maximum educational payout. By overlaying close-up macro brush angles with an active voiceover rather than standard elevator music, viewers consume the tutorial as &quot;skin-prep curriculum.&quot; 
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="font-mono text-sm font-bold text-brand-blush">{activeReel.engagementRate}%</p>
                        <p className="text-[9px] text-stone-400 mt-0.5 uppercase tracking-wider font-semibold">Engagement</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="font-mono text-sm font-bold text-brand-blush">{activeReel.likes.toLocaleString()}</p>
                        <p className="text-[9px] text-stone-400 mt-0.5 uppercase tracking-wider font-semibold">Likes</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="font-mono text-sm font-bold text-brand-blush">{activeReel.duration}</p>
                        <p className="text-[9px] text-stone-400 mt-0.5 uppercase tracking-wider font-semibold">Duration</p>
                      </div>
                    </div>

                    <div className="bg-brand-sand/10 border-l-2 border-brand-blush p-3 rounded-r-xl">
                      <p className="font-sans text-[11px] text-stone-200">
                        <strong>Creator Insight:</strong> &quot;To secure high affiliate conversions, I mention in the audio that I have color swatches for each pigment tone available inside my Direct Message link. Followers comment to get immediate affiliate recommendations.&quot;
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {/* Retention map timelines */}
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2">
                        <span className="font-mono text-[10px] text-brand-blush bg-brand-rose/20 px-1.5 py-0.5 rounded mt-0.5">0-5s</span>
                        <div>
                          <p className="text-[11px] font-bold">The Hook Overlay</p>
                          <p className="text-[10px] text-stone-300">Fast zoom transition showing completed radiant glow. Immediately asks a problem statement to retain interest.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 border-t border-white/5 pt-2">
                        <span className="font-mono text-[10px] text-brand-blush bg-brand-rose/20 px-1.5 py-0.5 rounded mt-0.5">5-25s</span>
                        <div>
                          <p className="text-[11px] font-bold">Zoom-In Swatch Wear-Test</p>
                          <p className="text-[10px] text-stone-300">Macro focus showing raw, unedited blush/toner blending directly over skin pores. Solidifies real-world proof.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 border-t border-white/5 pt-2">
                        <span className="font-mono text-[10px] text-brand-blush bg-brand-rose/20 px-1.5 py-0.5 rounded mt-0.5">25-45s</span>
                        <div>
                          <p className="text-[11px] font-bold">Comment-to-DM Trigger Callout</p>
                          <p className="text-[10px] text-stone-300">Points to the affiliate button in the caption. Triggers our automated Instagram-to-WhatsApp pipeline.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <p className="font-sans text-xs text-stone-300 italic">
                  Currently playing simulator: <strong>{activeReel.category} Channel</strong>
                </p>
                <a
                  href="https://www.instagram.com/blushwithrakhee?igsh=MXBjMGFxZjN1cWR0OQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-rose hover:text-white font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <Instagram size={13} />
                  <span>Verify on Instagram Live &rarr;</span>
                </a>
              </div>

            </div>
          </div>
        )}

        {/* Reels Thumbnails Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="reels-grid-content">
          {filteredReels.map((reel) => {
            const isSpotlit = activeReel?.id === reel.id;
            return (
              <div
                key={reel.id}
                onClick={() => {
                  setActiveReel(reel);
                  setIsPlaying(false);
                  // Ensure window scrolls up slightly to player spotlight
                  const element = document.getElementById("reels-simulator-block");
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`group relative bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                  isSpotlit ? "ring-2 ring-brand-rose border-transparent" : "border-brand-blush/20 hover:border-brand-rose"
                }`}
                id={`reel-card-${reel.id}`}
              >
                {/* Visual Thumbnail Area */}
                <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category overlay */}
                  <span className="absolute top-3 left-3 bg-white/90 text-brand-rose border border-brand-blush/30 backdrop-blur-md px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold rounded-full">
                    {reel.category}
                  </span>

                  {/* Play Indicator on Hover */}
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-11 h-11 rounded-full bg-white text-brand-rose flex items-center justify-center shadow-md">
                      <Play fill="currentColor" size={16} className="translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-4 text-left">
                  <span className="font-mono text-[9px] text-stone-400 uppercase font-medium">Published: {reel.publishedDate}</span>
                  <p className="font-serif text-sm font-semibold text-brand-dark group-hover:text-brand-rose transition-colors line-clamp-1 mt-1">
                    {reel.title}
                  </p>

                  <div className="flex items-center justify-between border-t border-brand-blush/10 mt-3 pt-3 text-[11px] font-mono text-stone-500">
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {reel.views.toLocaleString()} views
                    </span>
                    <span className="flex items-center gap-1 font-bold text-brand-dark bg-brand-sand/40 px-2 py-0.5 rounded">
                      <TrendingUp size={11} className="text-brand-rose" /> {reel.engagementRate}% ER
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
