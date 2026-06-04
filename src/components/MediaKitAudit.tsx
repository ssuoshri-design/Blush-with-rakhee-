/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Download, FileText, ChevronRight, Eye, RefreshCw, BarChart3, 
  HelpCircle, Sparkles, CheckCircle2, ShieldCheck, Mail, AlertTriangle 
} from "lucide-react";
import { initialStats } from "../mockData";

interface MediaKitAuditProps {
  onRequestCollab: () => void;
  incrementDownloads: () => void;
  downloadCount: number;
  formatPrice: (usdAmount: number, digits?: number) => string;
}

export default function MediaKitAudit({ onRequestCollab, incrementDownloads, downloadCount, formatPrice }: MediaKitAuditProps) {
  const [activeRateTab, setActiveRateTab] = useState<"standard" | "packages">("standard");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Rate card details
  const standardRates = [
    { deliverable: "UGC Video Product Wear-Test (Raw)", price: 450, timeline: "5-7 Days" },
    { deliverable: "Dedicated Instagram Sponsored Reel", price: 600, timeline: "7-10 Days", popular: true },
    { deliverable: "1x Reel + 2x IG Story Injections", price: 750, timeline: "7-10 Days" },
    { deliverable: "IG Story Product Swatch Blast (3x Stories)", price: 300, timeline: "3-5 Days" },
  ];

  const packagesRates = [
    { deliverable: "The Glass Skin UGC Pack (3x Videos)", price: 1200, timeline: "14 Days" },
    { deliverable: "Social Launch Booster (2x Reels + 4x Stories)", price: 1500, timeline: "14 Days", popular: true },
    { deliverable: "90-Day Beauty Partnership (3x Reels/month + 10x Stories)", price: 3200, timeline: "Ongoing" },
  ];

  const handleDownload = () => {
    incrementDownloads();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);

    // Mock PDF download file trigger
    const link = document.createElement("a");
    link.href = "#";
    // We can simulate an actual file behavior or alert
  };

  return (
    <section id="mediakit" className="py-16 lg:py-24 bg-white relative">
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-brand-sand/40 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* ================= SECTION 8: MEDIA KIT CENTER ================= */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16" id="mediakit-header">
            <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
              CREATOR MEDIA PACK
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-brand-dark font-semibold">
              Media Kit &amp; Rate Cards
            </h2>
            <div className="w-12 h-1 bg-brand-blush/80 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="mediakit-container">
            
            {/* Visual Media Kit Presentation Slide Deck (Left) */}
            <div className="lg:col-span-7 bg-brand-sand/45 rounded-3xl p-6 lg:p-8 border border-brand-blush/20 text-left flex flex-col justify-between" id="mediakit-viewport">
              <div>
                <div className="flex items-center justify-between border-b border-brand-blush/25 pb-4 mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-dark">Media Kit Presentation</h3>
                    <p className="text-[11px] font-mono text-brand-rose uppercase tracking-widest font-bold">Blush With Rakhee Est. 2026</p>
                  </div>
                  <span className="font-sans text-[11px] text-brand-rose bg-white border border-brand-blush/30 px-3 py-1 rounded-full font-bold">
                    Official Active Version
                  </span>
                </div>

                {/* Slides content preview */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl border border-brand-blush/10 flex items-start gap-3.5">
                    <span className="font-mono text-sm text-brand-rose font-bold">Slide 1.</span>
                    <div>
                      <p className="font-serif text-sm font-bold text-brand-dark">Platform Demographics</p>
                      <p className="font-sans text-xs text-brand-dark/75 mt-0.5">84% Female audience, ages 18-34, concentrated heavily in South-Asian makeup preferences, premium cosmetics, organic hydration remedies, and transition wear-tests.</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-brand-blush/10 flex items-start gap-3.5">
                    <span className="font-mono text-sm text-brand-rose font-bold">Slide 2.</span>
                    <div>
                      <p className="font-serif text-sm font-bold text-brand-dark">Reels Performance Logs</p>
                      <p className="font-sans text-xs text-brand-dark/75 mt-0.5">Average views clocking at 8,400+ per asset. Engagement rate peaking at 8.8%, placing our micro-channel in the top 5% bracket for micro beauty creators.</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-brand-blush/10 flex items-start gap-3.5">
                    <span className="font-mono text-sm text-brand-rose font-bold">Slide 3.</span>
                    <div>
                      <p className="font-serif text-sm font-bold text-brand-dark">Integrity Pledge</p>
                      <p className="font-sans text-xs text-brand-dark/75 mt-0.5">Strict zero-bot assurance, zero comment group optimization, real active clicks, and full Google Analytics Campaign tracking spreadsheets shared upon proposal acceptance.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download CTA Bar */}
              <div className="mt-8 pt-6 border-t border-brand-blush/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <p className="font-sans text-xs text-brand-dark/65">
                    Downloaded <strong className="font-mono text-brand-rose">{downloadCount} times</strong> this week
                  </p>
                  <p className="text-[10px] text-brand-dark/50">Format: High-Res Interactive PDF</p>
                </div>

                <div className="flex gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={handleDownload}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-rose hover:bg-brand-dark text-white px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-102"
                    id="download-media-kit-btn"
                  >
                    <Download size={13} />
                    <span>{downloadSuccess ? "Downloaded!" : "Download Media Kit"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Price Lists Rate Sheets with Tabs (Right) */}
            <div className="lg:col-span-5 bg-brand-dark text-white rounded-3xl p-6 lg:p-8 border border-white/5 shadow-2xl flex flex-col justify-between" id="rates-sheet">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold">Campaign Rates</h3>
                    <p className="text-[10px] text-brand-blush font-mono uppercase tracking-widest font-semibold mt-0.5">Rates updated June 2026</p>
                  </div>

                  <div className="flex gap-1.5 bg-white/5 p-1 rounded-lg">
                    <button
                      onClick={() => setActiveRateTab("standard")}
                      className={`px-2.5 py-1 rounded text-[9px] uppercase tracking-wider font-bold cursor-pointer transition-colors ${activeRateTab === "standard" ? "bg-brand-rose text-white" : "text-stone-300 hover:text-white"}`}
                    >
                      Single
                    </button>
                    <button
                      onClick={() => setActiveRateTab("packages")}
                      className={`px-2.5 py-1 rounded text-[9px] uppercase tracking-wider font-bold cursor-pointer transition-colors ${activeRateTab === "packages" ? "bg-brand-rose text-white" : "text-stone-300 hover:text-white"}`}
                    >
                      Packages
                    </button>
                  </div>
                </div>

                {/* Vertical rate lines */}
                <div className="space-y-4 text-left">
                  {(activeRateTab === "standard" ? standardRates : packagesRates).map((rate, ind) => (
                    <div 
                      key={ind} 
                      className={`p-3.5 rounded-2xl relative border transition-all ${rate.popular ? 'bg-brand-rose/10 border-brand-rose' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                    >
                      {rate.popular && (
                        <span className="absolute -top-2 right-4 bg-brand-rose text-white font-mono text-[7px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">
                          Most Requested
                        </span>
                      )}

                      <div className="flex justify-between items-start">
                        <p className="font-serif text-sm font-bold pr-12 line-clamp-1">{rate.deliverable}</p>
                        <p className="font-mono text-sm font-bold text-brand-blush shrink-0">{formatPrice(rate.price)}</p>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-stone-300 mt-2 font-sans-serif border-t border-white/5 pt-2">
                        <span>Turnaround time: <strong>{rate.timeline}</strong></span>
                        <button
                          onClick={onRequestCollab}
                          className="text-brand-blush hover:underline uppercase tracking-wider font-bold font-mono text-[8px] cursor-pointer"
                        >
                          Book deliverable &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              <div className="mt-8 pt-4 border-t border-white/10 text-left text-xs bg-white/5 p-4 rounded-2xl">
                <p className="font-sans text-[11px] text-stone-300 leading-relaxed font-light">
                  *All prices list baseline estimates and include physical product receipt. Standard usage rights last 30 days unless specified otherwise. We operate secure contracts via digital agreements.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
