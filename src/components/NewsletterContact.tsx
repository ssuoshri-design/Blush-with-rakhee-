/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Mail, Star, Send, ChevronDown, ChevronUp, Check, 
  MessageSquare, HelpCircle, Instagram, Sparkles, Plus, Trash2, CheckCircle2, Facebook 
} from "lucide-react";
import { initialFAQs } from "../mockData";
import { CollabLead, NewsletterSubscriber } from "../types";

interface NewsletterContactProps {
  onNewsletterSubmit: (subscriber: Omit<NewsletterSubscriber, "id" | "dateJoined">) => void;
  onContactSubmit: (lead: Omit<CollabLead, "id" | "date" | "status">) => void;
  selectedCampaignType?: string;
  setSelectedCampaignType?: (type: string) => void;
  currency?: "USD" | "INR";
}

export default function NewsletterContact({ 
  onNewsletterSubmit, 
  onContactSubmit, 
  selectedCampaignType = "", 
  setSelectedCampaignType,
  currency = "USD"
}: NewsletterContactProps) {
  
  // Newsletter state
  const [newsName, setNewsName] = useState("");
  const [newsEmail, setNewsEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Skincare Tips", "Makeup Tutorials"]);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // FAQ state
  const [activeFaq, setActiveFaq] = useState<string | null>("faq-1");

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactBrand, setContactBrand] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactWebsite, setContactWebsite] = useState("");
  const [contactBudget, setContactBudget] = useState(500);
  const [contactDetails, setContactDetails] = useState("");
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [contactSuccess, setContactSuccess] = useState(false);

  const interestOptions = [
    "Makeup Tutorials",
    "Beauty Hacks",
    "Skincare Tips",
    "GRWM Content"
  ];

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsName || !newsEmail) return;

    onNewsletterSubmit({
      name: newsName,
      email: newsEmail,
      beautyInterests: selectedInterests
    });

    setNewsletterSuccess(true);
    setNewsName("");
    setNewsEmail("");
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactBrand || !contactEmail) return;

    // Convert to USD base representation if submitted in INR
    const finalBudget = currency === "INR" 
      ? Math.round(Number(contactBudget) / 83) 
      : Number(contactBudget);

    onContactSubmit({
      brandName: contactBrand,
      contactPerson: contactName,
      email: contactEmail,
      phone: contactPhone,
      website: contactWebsite,
      budget: finalBudget,
      campaignType: selectedCampaignType || "Sponsored Reel & Story Integration",
      campaignDetails: contactDetails,
      attachmentName: attachedFile || undefined
    });

    setContactSuccess(true);
    setContactName("");
    setContactBrand("");
    setContactEmail("");
    setContactPhone("");
    setContactWebsite("");
    setContactDetails("");
    setAttachedFile(null);
    if (setSelectedCampaignType) {
      setSelectedCampaignType("");
    }
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachedFile(e.dataTransfer.files[0].name);
    }
  };

  return (
    <div id="newsletter-contact-section" className="relative">
      
      {/* ================= SECTION 12: NEWSLETTER & BEAUTY COMMUNITY ================= */}
      <section id="newsletter" className="py-16 bg-brand-sand/35 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="bg-white rounded-[32px] p-8 lg:p-12 border border-brand-blush/25 shadow-xl text-center relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Ambient gold glow decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose/10 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-6 text-left" id="newsletter-left">
              <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
                FOLLOW MY BEAUTY JOURNEY
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl text-brand-dark font-semibold leading-tight">
                Join our Authentic &amp; <br />
                Real Beauty Community
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                Receive curated, high-integrity product cheat sheets, shade-matching alerts matching South Asian undertones, and exclusive drugstore cosmetics coupon reviews directly in your inbox.
              </p>

              <div className="space-y-2 mt-6">
                <div className="flex items-start gap-2.5 text-xs text-brand-dark/85">
                  <span className="w-5 h-5 rounded-full bg-brand-sand flex items-center justify-center text-brand-rose shrink-0 font-mono text-[9px] font-bold">✓</span>
                  <span><strong>Deep Skincare Prep Routines:</strong> AM/PM guidelines before makeup.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-brand-dark/85">
                  <span className="w-5 h-5 rounded-full bg-brand-sand flex items-center justify-center text-brand-rose shrink-0 font-mono text-[9px] font-bold">✓</span>
                  <span><strong>Coupon Code Sweeps:</strong> Save up to 25% on boutique skin actives.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6" id="newsletter-right">
              {newsletterSuccess ? (
                <div className="bg-brand-sand/50 p-8 rounded-2xl border border-brand-rose/30 text-center animate-fadeIn">
                  <CheckCircle2 className="text-brand-rose mx-auto mb-3" size={32} />
                  <h4 className="font-serif text-lg font-bold text-brand-dark">Welcome to the Club!</h4>
                  <p className="font-sans text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Check your inbox. Your first dewy skin prep checklist guide has been dispatched!
                  </p>
                </div>
              ) : (
                <form onSubmit={submitNewsletter} className="text-left space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-bold">Your First name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ananya" 
                        value={newsName}
                        onChange={(e) => setNewsName(e.target.value)}
                        className="w-full bg-white border border-brand-blush/20 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-rose focus:border-brand-rose focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-bold">Direct Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="ananya@k-style.com" 
                        value={newsEmail}
                        onChange={(e) => setNewsEmail(e.target.value)}
                        className="w-full bg-white border border-brand-blush/20 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-rose focus:border-brand-rose focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Interests selectors checklist */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-bold">Beauty Interests (Select multi):</label>
                    <div className="flex flex-wrap gap-1.5">
                      {interestOptions.map((interest) => {
                        const selected = selectedInterests.includes(interest);
                        return (
                          <button
                            type="button"
                            key={interest}
                            onClick={() => handleInterestToggle(interest)}
                            className={`px-3 py-1.5 rounded-full text-[9px] font-sans font-semibold transition-all cursor-pointer border ${
                              selected 
                                ? "bg-brand-rose border-transparent text-white shadow-sm" 
                                : "bg-white border-brand-blush/20 text-stone-600 hover:bg-brand-sand/50"
                            }`}
                          >
                            <span>{interest}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-dark hover:bg-brand-rose text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Subscribe &amp; Get Glam Guide
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>



      {/* ================= SECTION 14 & 15: FAQ AND CONTACT FORM ================= */}
      <section id="contact" className="py-16 lg:py-24 bg-brand-sand/15 scroll-mt-20 border-t border-brand-blush/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* FAQ Accordion block (Left lg:col-span-5) */}
            <div className="lg:col-span-5" id="faq-section-block">
              <div className="text-left mb-8">
                <span className="font-mono text-xs text-brand-rose uppercase tracking-[0.25em] font-bold block mb-2">
                  HAVE QUESTIONS?
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl text-brand-dark font-bold">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {initialFAQs.map((faq) => {
                  const isOpen = activeFaq === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      className="bg-white rounded-2xl border border-brand-blush/20 overflow-hidden text-left shadow-sm transition-all"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                        className="w-full p-4 flex items-center justify-between gap-4 font-serif text-sm font-bold text-brand-dark hover:text-brand-rose transition-colors cursor-pointer text-left"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle size={14} className="text-brand-rose shrink-0" />
                          <span>{faq.question}</span>
                        </span>
                        <span>{isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-0 border-t border-brand-sand/50">
                          <p className="font-sans text-xs text-stone-600 leading-relaxed pt-3">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Instant Social Integrations icons below FAQ */}
              <div className="mt-8 bg-white p-5 rounded-2xl border border-brand-blush/25 text-left">
                <p className="font-serif text-xs font-bold text-brand-dark">Direct Live Connections</p>
                <p className="font-sans text-[11px] text-stone-500 mt-0.5">Prefer direct chat channels over proposals? Tap below:</p>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <a 
                    href="https://www.instagram.com/blushwithrakhee?igsh=MXBjMGFxZjN1cWR0OQ==" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-brand-sand hover:bg-brand-rose hover:text-white rounded-xl text-xs font-semibold text-brand-rose transition-all cursor-pointer border border-brand-blush/20"
                  >
                    <Instagram size={13} />
                    <span>Instagram</span>
                  </a>
                  <a 
                    href="https://www.facebook.com/share/1CmrEHVJgH/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-semibold text-blue-600 transition-all cursor-pointer border border-blue-200"
                  >
                    <Facebook size={13} />
                    <span>Facebook</span>
                  </a>
                  <a 
                    href="mailto:rakhee.chakraborty1985@gmail.com" 
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-50 hover:bg-stone-600 hover:text-white rounded-xl text-xs font-semibold text-stone-600 transition-all cursor-pointer border border-stone-200"
                  >
                    <Mail size={13} />
                    <span>Email Me</span>
                  </a>
                </div>
              </div>

            </div>

            {/* High-Impact Brands Section Approach (Right lg:col-span-7) */}
            <div className="lg:col-span-7" id="campaign-form-block">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-blush/25 shadow-xl text-left" id="collab-proposal-card">
                
                <div className="flex items-center justify-between border-b border-brand-blush/15 pb-4 mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-dark">Brands: Let's Collaborate!</h3>
                    <p className="text-[10.5px] text-stone-400 font-sans tracking-wide mt-0.5 font-medium">Ready to feature your products? Reach out directly here!</p>
                  </div>
                  <span className="font-sans text-[10px] text-brand-rose bg-brand-sand border border-brand-blush/35 px-2.5 py-0.5 rounded-full font-bold">
                    Reply inside 24h
                  </span>
                </div>

                {contactSuccess ? (
                  <div className="bg-brand-sand/50 p-8 rounded-2xl border border-brand-rose/30 text-center animate-fadeIn space-y-3">
                    <CheckCircle2 className="text-brand-rose mx-auto" size={36} />
                    <h4 className="font-serif text-lg font-bold text-brand-dark">Pitch Sent Successfully!</h4>
                    <p className="font-sans text-xs text-stone-600 leading-relaxed max-w-lg mx-auto">
                      Thank you so much! Your product campaign request has been sent directly to Rakhee's private planning notes. She will review it during her afternoon break today and get back to you via email within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submitContact} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-semibold">Your full name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Contact Person (e.g. Elena)" 
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-stone-50 border border-brand-blush/20 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-rose focus:border-brand-rose focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-semibold">Brand / Company Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Fenty Beauty Co." 
                          value={contactBrand}
                          onChange={(e) => setContactBrand(e.target.value)}
                          className="w-full bg-stone-50 border border-brand-blush/20 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-rose focus:border-brand-rose focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-semibold">Email address</label>
                        <input 
                          type="email" 
                          required
                          placeholder="elena@fentybeauty.com" 
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-stone-50 border border-brand-blush/20 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-rose focus:border-brand-rose focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-semibold">Phone (or Whatsapp ID)</label>
                        <input 
                          type="text" 
                          placeholder="+1 (555) 902-1203" 
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full bg-stone-50 border border-brand-blush/20 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-rose focus:border-brand-rose focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-semibold">Campaign model type</label>
                        <select 
                          value={selectedCampaignType}
                          onChange={(e) => setSelectedCampaignType && setSelectedCampaignType(e.target.value)}
                          className="w-full bg-stone-50 border border-brand-blush/20 rounded-xl px-3.5 py-2.5 text-xs text-stone-700 focus:outline-none"
                        >
                          <option value="UGC Video Product Wear-Test (Raw)">UGC Video Product Wear-Test (Raw)</option>
                          <option value="Dedicated Instagram Sponsored Reel">Dedicated Instagram Sponsored Reel</option>
                          <option value="1x Reel + 2x IG Story Injections">1x Reel + 2x IG Story Injections</option>
                          <option value="IG Story Product Swatch Blast (3x Stories)">IG Story Product Swatch Blast (3x Stories)</option>
                          <option value="Long-Term Brand Ambassadorship">Long-Term Brand Ambassadorship</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-semibold">Campaign Budget ({currency})</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-xs text-stone-500">{currency === "INR" ? "₹" : "$"}</span>
                          <input 
                            type="number" 
                            min={currency === "INR" ? "5000" : "100"} 
                            step={currency === "INR" ? "1000" : "50"}
                            placeholder={currency === "INR" ? "50000" : "600"}
                            value={contactBudget}
                            onChange={(e) => setContactBudget(Number(e.target.value))}
                            className="w-full bg-stone-50 border border-brand-blush/20 rounded-xl pl-6 pr-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-rose focus:border-brand-rose focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-semibold">Website (Optional)</label>
                      <input 
                        type="url" 
                        placeholder="fentybeauty.com" 
                        value={contactWebsite}
                        onChange={(e) => setContactWebsite(e.target.value)}
                        className="w-full bg-stone-50 border border-brand-blush/20 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-rose focus:border-brand-rose focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-semibold">Campaign details &amp; Deliverables requests</label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="Detail your product ship date, requested usage rights duration (standard is 30 days), and preferred transition styles..." 
                        value={contactDetails}
                        onChange={(e) => setContactDetails(e.target.value)}
                        className="w-full bg-stone-50 border border-brand-blush/20 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-rose focus:border-brand-rose focus:outline-none"
                      />
                    </div>

                    {/* Drag and Drop File Upload Area */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1.5 font-semibold">Attach Product Brief / Campaign Moodboard (Drag &amp; Drop)</label>
                      <div 
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="border border-dashed border-brand-blush/40 hover:border-brand-rose/60 bg-stone-50 rounded-2xl p-4 text-center cursor-pointer transition-colors"
                        onClick={() => {
                          // Standard mock trigger
                          const files = ["campaign_moodboard.pdf", "fenty_brief.docx", "swatch_inspiration.png"];
                          setAttachedFile(files[Math.floor(Math.random() * files.length)]);
                        }}
                      >
                        {attachedFile ? (
                          <div className="flex items-center justify-center gap-2 text-brand-rose text-xs font-semibold font-mono animate-fadeIn">
                            <span>✓ Attached: <strong>{attachedFile}</strong></span>
                            <button 
                              type="button" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setAttachedFile(null);
                              }} 
                              className="text-stone-400 hover:text-red-500 transition-colors cursor-pointer ml-1"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ) : (
                          <p className="font-sans text-[11px] text-stone-400">
                            Drag &amp; Drop file here, or <span className="text-brand-rose font-bold underline">Click reference brief</span> to mock upload
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-rose hover:bg-brand-dark text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Send Collaboration Request
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
