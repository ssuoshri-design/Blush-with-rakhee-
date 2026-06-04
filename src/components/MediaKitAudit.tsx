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
              Creator Media Kit
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl text-brand-dark font-semibold">
              Creator Media Kit
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-dark/70 mt-3">
              A growing beauty creator focused on authentic recommendations, beauty education, and building trust with a beauty-focused audience.
            </p>
            <div className="w-12 h-1 bg-brand-blush/80 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="mediakit-container">
            
            {/* Visual Media Kit Presentation Slide Deck (Left) */}
            <div className="lg:col-span-6 bg-brand-sand/45 rounded-3xl p-6 lg:p-8 border border-brand-blush/20 text-left flex flex-col justify-between" id="mediakit-viewport">
              <div>
                <div className="flex items-center justify-between border-b border-brand-blush/25 pb-4 mb-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-dark">About My Content</h3>
                    <p className="text-[11px] font-mono text-brand-rose uppercase tracking-widest font-bold">Blush With Rakhee</p>
                  </div>
                  <span className="font-sans text-[11px] text-brand-rose bg-white border border-brand-blush/30 px-3 py-1 rounded-full font-bold">
                    Growing Community
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-serif text-xs font-bold text-brand-dark uppercase tracking-wider mb-3">Beauty Content Categories</h4>
                    <ul className="space-y-2 text-xs text-brand-dark/80 font-sans">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Makeup Tutorials</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Product Reviews</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Beauty Hacks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Skincare Recommendations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>GRWM Content</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Beauty Transformations</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-serif text-xs font-bold text-brand-dark uppercase tracking-wider mb-3">Audience Interests</h4>
                    <ul className="space-y-2 text-xs text-brand-dark/80 font-sans">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Beauty Products</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Makeup</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Skincare</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Product Recommendations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Beauty Tutorials</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <span>Lifestyle Content</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-blush/15 text-xs text-brand-dark/60 font-sans italic">
                Detailed audience insights and collaboration information available upon request.
              </div>
            </div>

            {/* Price Lists Rate Sheets (Right) */}
            <div className="lg:col-span-6 bg-brand-dark text-white rounded-3xl p-6 lg:p-8 border border-white/5 shadow-2xl flex flex-col justify-between" id="rates-sheet">
              <div>
                <h3 className="font-serif text-xl font-bold mb-2">Collaboration Requests</h3>
                <p className="text-[11px] text-brand-blush font-mono uppercase tracking-widest font-semibold mb-6">Custom Campaign Inquiry</p>
                
                <p className="font-sans text-xs text-stone-200 mb-4 leading-relaxed">
                  Every campaign is unique. Collaboration pricing depends on:
                </p>

                <ul className="space-y-3.5 text-xs text-stone-200 font-sans">
                  <li className="flex items-center gap-2.5">
                    <span className="text-brand-rose font-bold text-sm">•</span>
                    <span>Content format</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-brand-rose font-bold text-sm">•</span>
                    <span>Deliverables required</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-brand-rose font-bold text-sm">•</span>
                    <span>Usage rights</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-brand-rose font-bold text-sm">•</span>
                    <span>Campaign duration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-brand-rose font-bold text-sm">•</span>
                    <span>Brand requirements</span>
                  </li>
                </ul>

                <p className="font-sans text-xs text-stone-300 mt-6 leading-relaxed">
                  Please submit your collaboration request and campaign details to receive a customized proposal.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={onRequestCollab}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-rose hover:bg-brand-dark text-white px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-102"
                  id="request-collab-btn"
                >
                  Request Collaboration
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
