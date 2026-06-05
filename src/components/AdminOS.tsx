/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Users, DollarSign, Mail, Play, Plus, Trash2, 
  Download, RefreshCw, CheckCircle2, MessageCircle, 
  Send, Instagram, Facebook, Shield, Laptop, Star,
  BookOpen, Calendar, Search, ToggleLeft, ToggleRight,
  Sparkles, Sliders, Check, HelpCircle, Layers, Bell,
  ChevronRight, ArrowUpRight, TrendingUp, Filter, Eye,
  Lock, AlertCircle, Copy, CheckSquare, PlusCircle, CreditCard,
  Hash, Clock, MapPin, Phone, UserPlus, Zap
} from "lucide-react";
import { CollabLead, InstagramReel, AffiliateItem, NewsletterSubscriber, CreatorStats, CreatorMessage } from "../types";

interface AdminOSProps {
  stats: CreatorStats;
  updateStats: (stats: CreatorStats) => void;
  leads: CollabLead[];
  addLead: (lead: CollabLead) => void;
  updateLeadStatus: (id: string, status: CollabLead["status"]) => void;
  updateLeadPayment: (id: string, payment: CollabLead["paymentStatus"]) => void;
  deleteLead: (id: string) => void;
  reels: InstagramReel[];
  addReel: (reel: InstagramReel) => void;
  deleteReel: (id: string) => void;
  affiliates: AffiliateItem[];
  simulateClicks: () => void;
  subscribers: NewsletterSubscriber[];
  downloadCount: number;
  messages: CreatorMessage[];
  setMessages: React.Dispatch<React.SetStateAction<CreatorMessage[]>>;
  currency: "USD" | "INR";
  formatPrice: (usdAmount: number, digits?: number) => string;
}

// Interactive inner types for luxury SaaS Course and Students system
interface CourseItem {
  id: string;
  name: string;
  lessons: string[];
  studentsCount: number;
  revenue: number;
  category: string;
}

interface StudentRecord {
  id: string;
  name: string;
  courseName: string;
  progress: number;
  paymentStatus: "Paid" | "Pending" | "Failed";
  enrollmentDate: string;
}

interface MakeupBooking {
  id: string;
  name: string;
  phone: string;
  category: "Bridal Makeup" | "Party Makeup" | "Photoshoot Makeup" | "Workshop Inquiry";
  date: string;
  location: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

type MenuSection = "overview" | "courses" | "students" | "bookings" | "content" | "collabs" | "leads" | "automations";

export default function AdminOS({
  stats,
  updateStats,
  leads,
  addLead,
  updateLeadStatus,
  updateLeadPayment,
  deleteLead,
  reels,
  addReel,
  deleteReel,
  affiliates,
  simulateClicks,
  subscribers,
  downloadCount,
  messages,
  setMessages,
  currency,
  formatPrice,
}: AdminOSProps) {
  
  // Luxury dashboard active sub-view
  const [activeTab, setActiveTab] = useState<MenuSection>("overview");

  // Integration Connection simulation switches (removes fake larp statistics dynamically)
  const [stripeConnected, setStripeConnected] = useState<boolean>(() => {
    return localStorage.getItem("blush_sim_stripe_connected") === "true";
  });
  const [instagramConnected, setInstagramConnected] = useState<boolean>(() => {
    return localStorage.getItem("blush_sim_instagram_connected") === "true";
  });
  const [calendarConnected, setCalendarConnected] = useState<boolean>(() => {
    return localStorage.getItem("blush_sim_calendar_connected") === "true";
  });

  // Persistent mock student and booking state stored relative to browser local storage
  const [courses, setCourses] = useState<CourseItem[]>(() => {
    const saved = localStorage.getItem("blush_sim_courses");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "c-foundations",
        name: "Beauty Foundations Course",
        lessons: ["Skin Prep Rituals", "Color Matching Under light", "Flawless Base Sheers", "Symmetrical Line Designing"],
        studentsCount: 0,
        revenue: 0,
        category: "Self Makeup"
      },
      {
        id: "c-advanced",
        name: "Advanced Artist Program",
        lessons: ["Traditional Indian Jewel Styling", "Cut Crease Foil Magic", "Dewy Glass Base Contour", "Waterproof Airbrush Finishes"],
        studentsCount: 0,
        revenue: 0,
        category: "Professional Mastery"
      },
      {
        id: "c-mastery",
        name: "Professional Makeup Business Mastery",
        lessons: ["Luxury Client Pricing Logic", "Polished Bridal Contract Templates", "Demographic Branding Blueprint", "Staging Lighting Setup"],
        studentsCount: 0,
        revenue: 0,
        category: "Business Development"
      }
    ];
  });

  const [students, setStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem("blush_sim_students");
    return saved ? JSON.parse(saved) : [];
  });

  const [makeupBookings, setMakeupBookings] = useState<MakeupBooking[]>(() => {
    const saved = localStorage.getItem("blush_sim_bookings");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "book-1",
        name: "Ananya Banerjee",
        phone: "+91 98300 12345",
        category: "Bridal Makeup",
        date: "2026-11-14",
        location: "ITC Royal Bengal, Kolkata",
        status: "Pending"
      },
      {
        id: "book-2",
        name: "Priyanka Sen",
        phone: "+91 98311 98765",
        category: "Photoshoot Makeup",
        date: "2026-07-22",
        location: "Park Street Studio, Kolkata",
        status: "Confirmed"
      }
    ];
  });

  // Automation Center Toggle Statuses
  const [automations, setAutomations] = useState<{
    instaDm: boolean;
    commentDm: boolean;
    whatsapp: boolean;
    email: boolean;
    leadCapture: boolean;
  }>(() => {
    const saved = localStorage.getItem("blush_sim_automations");
    return saved ? JSON.parse(saved) : {
      instaDm: false,
      commentDm: true,
      whatsapp: false,
      email: true,
      leadCapture: true
    };
  });

  // Local helper UI states
  const [showSetupTray, setShowSetupTray] = useState(false);
  const [showAddLessonModal, setShowAddLessonModal] = useState<string | null>(null);
  const [newLessonName, setNewLessonName] = useState("");
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New Booking Request Form State
  const [bookingFormName, setBookingFormName] = useState("");
  const [bookingFormPhone, setBookingFormPhone] = useState("");
  const [bookingFormCat, setBookingFormCat] = useState<MakeupBooking["category"]>("Bridal Makeup");
  const [bookingFormDate, setBookingFormDate] = useState("");
  const [bookingFormLoc, setBookingFormLoc] = useState("");

  // New Student Manual Setup Form State
  const [studentFormName, setStudentFormName] = useState("");
  const [studentFormCourse, setStudentFormCourse] = useState("Beauty Foundations Course");
  const [studentFormProgress, setStudentFormProgress] = useState(10);
  const [studentFormPayment, setStudentFormPayment] = useState<StudentRecord["paymentStatus"]>("Paid");

  // Brand Deal Setup Local Forms
  const [dealBrandName, setDealBrandName] = useState("");
  const [dealCampaignType, setDealCampaignType] = useState("✨ Sponsored Content");
  const [dealBudget, setDealBudget] = useState(550);
  const [dealContact, setDealContact] = useState("");
  const [dealEmail, setDealEmail] = useState("");
  const [dealNotes, setDealNotes] = useState("");

  // Content library filters state
  const [contentFilter, setContentFilter] = useState<"All" | "Tutorials" | "Reels" | "Product Reviews" | "Transformations" | "Drafts">("All");

  // Auto save to local storage
  useEffect(() => {
    localStorage.setItem("blush_sim_stripe_connected", String(stripeConnected));
  }, [stripeConnected]);

  useEffect(() => {
    localStorage.setItem("blush_sim_instagram_connected", String(instagramConnected));
  }, [instagramConnected]);

  useEffect(() => {
    localStorage.setItem("blush_sim_calendar_connected", String(calendarConnected));
  }, [calendarConnected]);

  useEffect(() => {
    localStorage.setItem("blush_sim_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("blush_sim_students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("blush_sim_bookings", JSON.stringify(makeupBookings));
  }, [makeupBookings]);

  useEffect(() => {
    localStorage.setItem("blush_sim_automations", JSON.stringify(automations));
  }, [automations]);


  // Simulated Connection triggers to safely populate system with realistic data to let user demo
  const triggerStripeSimulatedConnect = () => {
    if (stripeConnected) {
      // Disconnect
      setStripeConnected(false);
      setStudents([]);
      setCourses(courses.map(c => ({ ...c, studentsCount: 0, revenue: 0 })));
    } else {
      // Connect & Populate with premium, clean realistic demo records
      setStripeConnected(true);
      const demoStudents: StudentRecord[] = [
        {
          id: "stud-1",
          name: "Riya Mukherjee",
          courseName: "Beauty Foundations Course",
          progress: 100,
          paymentStatus: "Paid",
          enrollmentDate: "2026-05-10"
        },
        {
          id: "stud-2",
          name: "Tanya Sen",
          courseName: "Advanced Artist Program",
          progress: 45,
          paymentStatus: "Paid",
          enrollmentDate: "2026-05-24"
        },
        {
          id: "stud-3",
          name: "Pooja Malhotra",
          courseName: "Professional Makeup Business Mastery",
          progress: 15,
          paymentStatus: "Paid",
          enrollmentDate: "2026-06-01"
        }
      ];
      setStudents(demoStudents);
      setCourses(courses.map(c => {
        if (c.id === "c-foundations") return { ...c, studentsCount: 1, revenue: 150 };
        if (c.id === "c-advanced") return { ...c, studentsCount: 1, revenue: 300 };
        return { ...c, studentsCount: 1, revenue: 600 };
      }));
    }
  };

  const manualEnrollStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentFormName.trim()) return;

    if (!stripeConnected) {
      alert("Please connect Stripe first to authorize payment verification pipelines and enroll students!");
      return;
    }

    const newStudent: StudentRecord = {
      id: "manual-stud-" + Date.now(),
      name: studentFormName,
      courseName: studentFormCourse,
      progress: Math.min(100, Math.max(0, studentFormProgress)),
      paymentStatus: studentFormPayment,
      enrollmentDate: new Date().toISOString().split("T")[0]
    };

    const courseFeeLookup: { [key: string]: number } = {
      "Beauty Foundations Course": 150,
      "Advanced Artist Program": 300,
      "Professional Makeup Business Mastery": 600
    };

    const courseFee = courseFeeLookup[studentFormCourse] || 150;

    setStudents([newStudent, ...students]);
    setCourses(courses.map(c => {
      if (c.name === studentFormCourse) {
        return {
          ...c,
          studentsCount: c.studentsCount + 1,
          revenue: newStudent.paymentStatus === "Paid" ? c.revenue + courseFee : c.revenue
        };
      }
      return c;
    }));

    setStudentFormName("");
    setShowAddStudentForm(false);
  };

  const addLessonToCourse = (courseId: string) => {
    if (!newLessonName.trim()) return;
    setCourses(courses.map(c => {
      if (c.id === courseId) {
        return { ...c, lessons: [...c.lessons, newLessonName] };
      }
      return c;
    }));
    setNewLessonName("");
    setShowAddLessonModal(null);
  };

  // Makeup Bookings
  const addNewBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFormName || !bookingFormPhone || !bookingFormDate) return;

    const newBooking: MakeupBooking = {
      id: "booking-" + Date.now(),
      name: bookingFormName,
      phone: bookingFormPhone,
      category: bookingFormCat,
      date: bookingFormDate,
      location: bookingFormLoc || "To Be Disclosed",
      status: "Pending"
    };

    setMakeupBookings([newBooking, ...makeupBookings]);
    setBookingFormName("");
    setBookingFormPhone("");
    setBookingFormDate("");
    setBookingFormLoc("");
    setShowAddBookingModal(false);
  };

  const updateBookingStatus = (id: string, status: MakeupBooking["status"]) => {
    setMakeupBookings(makeupBookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBookingRecord = (id: string) => {
    if (confirm("Are you sure you want to delete this booking request?")) {
      setMakeupBookings(makeupBookings.filter(b => b.id !== id));
    }
  };

  // Brand Deal Submits
  const handleCreateBrandDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealBrandName || !dealContact || !dealEmail) return;

    addLead({
      id: "collab-" + Date.now(),
      brandName: dealBrandName,
      contactPerson: dealContact,
      email: dealEmail,
      budget: Number(dealBudget),
      campaignType: dealCampaignType,
      campaignDetails: dealNotes || "Professional partnership draft.",
      status: "New Lead",
      date: new Date().toISOString().split("T")[0],
      paymentStatus: "Unpaid"
    });

    setDealBrandName("");
    setDealContact("");
    setDealEmail("");
    setDealNotes("");
    alert("New custom brand collaboration created beautifully!");
  };

  // Calculations
  const activeStudentsCount = stripeConnected ? students.length : 0;
  const courseTotalRevenue = stripeConnected ? courses.reduce((sum, c) => sum + c.revenue, 0) : 0;

  return (
    <section id="creator-dashboard" className="bg-[#FEFDFB] border-t border-brand-rose/20 relative py-12 text-left min-h-screen">
      
      {/* Absolute elegant visual overlay to look premium & match Dior/Teachable aesthetic */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-rose/5 via-[#FEFBF9] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* TOP LEVEL BEAUTY CONTROL HEADER AND METADATA */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-brand-rose/10 pb-8 mb-8 gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#B76E79] uppercase font-extrabold">
              <Shield size={11} className="text-[#B76E79] shrink-0" />
              <span>Rakhee&apos;s Private Office</span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-500 font-sans">Kajabi &amp; Stripe Powered Business Center</span>
            </div>
            
            <h1 className="font-serif text-3xl font-medium tracking-tight text-neutral-900 animate-fadeIn">
              Creator Operating Desk
            </h1>
            
            <p className="font-sans text-stone-500 text-xs sm:text-sm">
              Role: <span className="text-stone-800 font-bold">Beauty Creator &bull; Makeup Artist &bull; Course Educator &bull; Brand Partner</span>
            </p>
          </div>

          {/* SINGLE LARGE PRIMARY CTA: Complete Business Setup & connection status drawer */}
          <div className="w-full lg:w-auto max-w-md shrink-0 space-y-3">
            <button
              onClick={() => setShowSetupTray(!showSetupTray)}
              className="w-full bg-gradient-to-r from-rose-400 via-pink-500 to-amber-500 text-white font-sans font-extrabold hover:opacity-95 px-7 py-4 rounded-2xl shadow-[0_6px_25px_rgba(183,110,121,0.35)] hover:shadow-[0_8px_30px_rgba(183,110,121,0.5)] transition-all duration-300 text-base flex items-center justify-center gap-2.5 cursor-pointer border-0"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
              id="btn-complete-setup"
            >
              <Zap size={18} className="animate-pulse text-white fill-current" />
              <span>🚀 Complete Business Setup</span>
              <ChevronRight size={18} className="translate-x-0 group-hover:translate-x-1 duration-200" />
            </button>

            {/* STATUS BADGES UNDER THE BUTTON */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 pt-1" id="setup-status-badges">
              <div 
                onClick={() => {
                  triggerStripeSimulatedConnect();
                  setShowSetupTray(true);
                }}
                className={`text-[10.5px] font-sans font-bold px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all cursor-pointer ${
                  stripeConnected 
                    ? "bg-emerald-50 text-emerald-800 border-emerald-250 shadow-xs" 
                    : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-105"
                }`}
                title="Click to toggle Stripe connection"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${stripeConnected ? "bg-emerald-500 animate-pulse" : "bg-stone-400"}`} />
                <span>{stripeConnected ? "✓ Stripe Connected" : "⚠ Stripe Disconnected"}</span>
              </div>

              <div
                onClick={() => {
                  setInstagramConnected(!instagramConnected);
                  setShowSetupTray(true);
                }}
                className={`text-[10.5px] font-sans font-bold px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all cursor-pointer ${
                  instagramConnected 
                    ? "bg-pink-55 text-pink-850 border-pink-200 shadow-xs" 
                    : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-105"
                }`}
                title="Click to toggle Instagram connection"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${instagramConnected ? "bg-pink-500 animate-pulse" : "bg-stone-400"}`} />
                <span>{instagramConnected ? "✓ Instagram Connected" : "⚠ Instagram Disconnected"}</span>
              </div>

              <div
                onClick={() => {
                  setCalendarConnected(!calendarConnected);
                  setShowSetupTray(true);
                }}
                className={`text-[10.5px] font-sans font-bold px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all cursor-pointer ${
                  calendarConnected 
                    ? "bg-purple-55 text-purple-855 border-purple-200 shadow-xs" 
                    : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-105"
                }`}
                title="Click to toggle Calendar connection font-semibold"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${calendarConnected ? "bg-purple-500 animate-pulse" : "bg-amber-550"}`} />
                <span>{calendarConnected ? "✓ Calendar Connected" : "⚠ Calendar Not Connected"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SETUP INTERACTIVE PANEL TRAY (Slide down / reveal to complete setup with beautiful toggles) */}
        {showSetupTray && (
          <div className="bg-gradient-to-br from-white to-[#FEFAF8] border-2 border-[#B76E79]/20 rounded-3xl p-6 mb-8 shadow-md space-y-4 animate-slideDown text-left" id="integration-setting-tray">
            <div className="flex justify-between items-center pb-2 border-b border-[#B76E79]/10">
              <div className="space-y-0.5">
                <h3 className="font-serif text-base font-bold text-[#4A3B32] flex items-center gap-1.5">
                  <Sparkles size={16} className="text-[#B76E79]" />
                  <span>Configure Simulated Accounts Integration</span>
                </h3>
                <p className="text-xs text-stone-500 leading-normal">
                  Turn on simulated Stripe merchant accounts or live Instagram hooks to toggle realistic student cohorts details.
                </p>
              </div>
              <button 
                onClick={() => setShowSetupTray(false)}
                className="text-stone-400 hover:text-stone-900 font-sans text-sm font-bold bg-stone-100 hover:bg-stone-200 p-2 rounded-full w-8 h-8 flex items-center justify-center transition-colors border-0 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs pt-2">
              <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-xs flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-850">Stripe Merchant Hub</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider font-extrabold uppercase ${stripeConnected ? "bg-emerald-50 text-emerald-700" : "bg-stone-105 text-stone-500"}`}>
                      {stripeConnected ? "Active" : "Offline"}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Processes luxury coaching fee invoices and registers new student cohorts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={triggerStripeSimulatedConnect}
                  className={`w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] duration-200 cursor-pointer text-center border-0 ${stripeConnected ? 'bg-stone-100 text-stone-700 hover:bg-stone-200' : 'bg-[#B76E79] text-white hover:bg-[#a35e68]'}`}
                >
                  {stripeConnected ? "Disconnect Stripe Billing" : "Connect Stripe Card Terminal"}
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-xs flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-850">Instagram Feed Sync</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider font-extrabold uppercase ${instagramConnected ? "bg-[#FFF0F5] text-pink-700 font-bold" : "bg-stone-105 text-stone-500"}`}>
                      {instagramConnected ? "Active" : "Offline"}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Fetches dynamic tutorial impressions, swatch views and engagement statistics.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setInstagramConnected(!instagramConnected)}
                  className={`w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] duration-200 cursor-pointer text-center border-0 ${instagramConnected ? 'bg-stone-100 text-stone-700 hover:bg-stone-200' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
                >
                  {instagramConnected ? "Disconnect Instagram Feed" : "Sync Instagram Profile"}
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-xs flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-850">Cal.com Scheduling suite</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider font-extrabold uppercase ${calendarConnected ? "bg-[#FAF5FF] text-purple-750" : "bg-amber-50 text-amber-950 font-bold"}`}>
                      {calendarConnected ? "Synced" : "Disconnected"}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Coordinates dates and locks bridal sessions onto your calendar automatically.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCalendarConnected(!calendarConnected)}
                  className={`w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] duration-200 cursor-pointer text-center border-0 ${calendarConnected ? 'bg-stone-100 text-stone-700 hover:bg-stone-200' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
                >
                  {calendarConnected ? "Disconnect Calendar" : "Hook Calendar Suite"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PREMIUM REDESIGNED NAVIGATION CARD GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5 mb-10 text-stone-800 font-sans" id="premium-bento-navigation">
          
          {/* Dashboard Overall Card */}
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex flex-col items-center justify-between p-4.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
              activeTab === "overview" 
                ? "bg-[#FFF2F2] border-[#B76E79] text-brand-dark ring-3 ring-[#B76E79]/15" 
                : "bg-white/70 backdrop-blur-md border-[#B76E79]/10 hover:border-[#B76E79]/45 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            }`}
            id="nav-tab-overview"
          >
            <div className="bg-[#B76E79]/5 border border-[#B76E79]/15 p-2 rounded-xl text-xl mb-1 group-hover:scale-110 transition-transform">
              📊
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider">
                Dashboard
              </span>
              <span className="block text-[8.5px] font-mono text-stone-400 font-bold">
                Main Operating OS
              </span>
            </div>
          </button>

          {/* Courses Card */}
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex flex-col items-center justify-between p-4.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
              activeTab === "courses" 
                ? "bg-[#FFF2F2] border-[#B76E79] text-brand-dark ring-3 ring-[#B76E79]/15" 
                : "bg-white/70 backdrop-blur-md border-[#B76E79]/10 hover:border-[#B76E79]/45 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            }`}
            id="nav-tab-courses"
          >
            <div className="bg-amber-55 border border-amber-100 p-2 rounded-xl text-xl mb-1 group-hover:scale-110 transition-transform">
              📚
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider">
                Courses
              </span>
              <span className="block text-[9.5px] font-mono text-[#B76E79] font-extrabold">
                {courses.length} Hosted
              </span>
            </div>
          </button>

          {/* Students Card */}
          <button
            onClick={() => setActiveTab("students")}
            className={`flex flex-col items-center justify-between p-4.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
              activeTab === "students" 
                ? "bg-[#FFF2F2] border-[#B76E79] text-brand-dark ring-3 ring-[#B76E79]/15" 
                : "bg-white/70 backdrop-blur-md border-[#B76E79]/10 hover:border-[#B76E79]/45 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            }`}
            id="nav-tab-students"
          >
            <div className="bg-indigo-50 border border-indigo-100 p-2 rounded-xl text-xl mb-1 group-hover:scale-110 transition-transform">
              🎓
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider">
                Students
              </span>
              <span className="block text-[9.5px] font-mono text-[#B76E79] font-extrabold">
                {activeStudentsCount} Active
              </span>
            </div>
          </button>

          {/* Bookings Card */}
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex flex-col items-center justify-between p-4.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
              activeTab === "bookings" 
                ? "bg-[#FFF2F2] border-[#B76E79] text-brand-dark ring-3 ring-[#B76E79]/15" 
                : "bg-white/70 backdrop-blur-md border-[#B76E79]/10 hover:border-[#B76E79]/45 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            }`}
            id="nav-tab-bookings"
          >
            <div className="bg-pink-50 border border-pink-100 p-2 rounded-xl text-xl mb-1 group-hover:scale-110 transition-transform">
              👰
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider">
                Bookings
              </span>
              <span className="block text-[9.5px] font-mono text-[#B76E79] font-extrabold">
                {makeupBookings.length} Requests
              </span>
            </div>
          </button>

          {/* Content Card */}
          <button
            onClick={() => setActiveTab("content")}
            className={`flex flex-col items-center justify-between p-4.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
              activeTab === "content" 
                ? "bg-[#FFF2F2] border-[#B76E79] text-brand-dark ring-3 ring-[#B76E79]/15" 
                : "bg-white/70 backdrop-blur-md border-[#B76E79]/10 hover:border-[#B76E79]/45 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            }`}
            id="nav-tab-content"
          >
            <div className="bg-rose-50 border border-rose-100 p-2 rounded-xl text-xl mb-1 group-hover:scale-110 transition-transform">
              🎥
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider">
                Content
              </span>
              <span className="block text-[9.5px] font-mono text-[#B76E79] font-extrabold">
                {reels.length} Swatches
              </span>
            </div>
          </button>

          {/* Collaborations Card */}
          <button
            onClick={() => setActiveTab("collabs")}
            className={`flex flex-col items-center justify-between p-4.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
              activeTab === "collabs" 
                ? "bg-[#FFF2F2] border-[#B76E79] text-brand-dark ring-3 ring-[#B76E79]/15" 
                : "bg-white/70 backdrop-blur-md border-[#B76E79]/10 hover:border-[#B76E79]/45 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            }`}
            id="nav-tab-collabs"
          >
            <div className="bg-[#ECFDF5] border border-emerald-100 p-2 rounded-xl text-xl mb-1 group-hover:scale-110 transition-transform">
              🤝
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wide">
                Collaborations
              </span>
              <span className="block text-[9.5px] font-mono text-[#B76E79] font-bold">
                {leads.length} Contracts
              </span>
            </div>
          </button>

          {/* Leads Card */}
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex flex-col items-center justify-between p-4.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
              activeTab === "leads" 
                ? "bg-[#FFF2F2] border-[#B76E79] text-brand-dark ring-3 ring-[#B76E79]/15" 
                : "bg-white/70 backdrop-blur-md border-[#B76E79]/10 hover:border-[#B76E79]/45 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            }`}
            id="nav-tab-leads"
          >
            <div className="bg-emerald-55 border border-emerald-100 p-2 rounded-xl text-xl mb-1 group-hover:scale-110 transition-transform">
              💌
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider">
                Leads
              </span>
              <span className="block text-[9.5px] font-mono text-[#B76E79] font-extrabold">
                {subscribers.length} Friends
              </span>
            </div>
          </button>

          {/* Automation Card */}
          <button
            onClick={() => setActiveTab("automations")}
            className={`flex flex-col items-center justify-between p-4.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
              activeTab === "automations" 
                ? "bg-[#FFF2F2] border-[#B76E79] text-brand-dark ring-3 ring-[#B76E79]/15" 
                : "bg-white/70 backdrop-blur-md border-[#B76E79]/10 hover:border-[#B76E79]/45 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            }`}
            id="nav-tab-automations"
          >
            <div className="bg-purple-50 border border-purple-100 p-2 rounded-xl text-xl mb-1 group-hover:scale-110 transition-transform">
              ⚙️
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider">
                Automation
              </span>
              <span className="block text-[9.5px] font-mono text-emerald-600 font-extrabold">
                {Object.values(automations).filter(Boolean).length} Online
              </span>
            </div>
          </button>

        </div>


        {/* ========================================================
            SECTION 1: DASHBOARD OVERVIEW (STAT CARDS & LIVE SUMMARY)
            ======================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Quick Setup Warning banner if not connected */}
            {(!stripeConnected || !instagramConnected) && (
              <div className="bg-amber-50/70 border border-amber-200/50 rounded-2xl p-4 flex flex-start sm:items-center gap-3">
                <AlertCircle className="text-amber-600 shrink-0 mt-0.5 sm:mt-0" size={16} />
                <div className="text-xs text-amber-900 leading-normal font-sans">
                  <span className="font-bold">Sandbox Mode:</span> Real-time course sales and Instagram video metadata metrics are disconnected. Use the simulated toggles above to preview complete, premium operational data instantly.
                </div>
              </div>
            )}

            {/* Standard Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Course Sales */}
              <div className="bg-white p-6 rounded-2xl border border-brand-rose/10 shadow-xs relative overflow-hidden group">
                <div className="flex items-center justify-between text-stone-400 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Course Sales</span>
                  <BookOpen size={14} className="text-brand-rose/80" />
                </div>
                {stripeConnected ? (
                  <div>
                    <h3 className="text-2xl font-bold font-mono text-zinc-900">{formatPrice(courseTotalRevenue)}</h3>
                    <p className="text-[10px] text-zinc-500 mt-1">Live from Stripe payout</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wide">Connect Stripe</h3>
                    <p className="text-[9.5px] text-stone-400 leading-normal">Setup invoice pipelines for students enrollment</p>
                  </div>
                )}
              </div>

              {/* Active Students */}
              <div className="bg-white p-6 rounded-2xl border border-brand-rose/10 shadow-xs relative overflow-hidden group">
                <div className="flex items-center justify-between text-stone-400 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Active Students</span>
                  <Users size={14} className="text-[#B76E79]" />
                </div>
                {stripeConnected ? (
                  <div>
                    <h3 className="text-2xl font-bold font-mono text-zinc-900">{activeStudentsCount}</h3>
                    <p className="text-[10px] text-zinc-500 mt-1">Engaged on lesson portals</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wide">Awaiting First Enrollment</h3>
                    <p className="text-[9.5px] text-stone-400 leading-normal">Enrollments open on Stripe verification</p>
                  </div>
                )}
              </div>

              {/* Upcoming Bookings */}
              <div className="bg-white p-6 rounded-2xl border border-brand-rose/10 shadow-xs relative overflow-hidden group">
                <div className="flex items-center justify-between text-[#B76E79] mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Bookings</span>
                  <Calendar size={14} className="text-brand-rose/80" />
                </div>
                {calendarConnected ? (
                  <div>
                    <h3 className="text-2xl font-bold font-mono text-zinc-900">
                      {makeupBookings.filter(b => b.status === "Confirmed" || b.status === "Pending").length}
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-1">Schedules active</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wide">Connect Calendar</h3>
                    <p className="text-[9.5px] text-stone-400 leading-normal">Cal.com or Google suite hook status</p>
                  </div>
                )}
              </div>

              {/* New Inquiries */}
              <div className="bg-white p-6 rounded-2xl border border-brand-rose/10 shadow-xs relative overflow-hidden group">
                <div className="flex items-center justify-between text-stone-400 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Brand Inquiries</span>
                  <Laptop size={14} className="text-indigo-600/80" />
                </div>
                {leads.length > 0 ? (
                  <div>
                    <h3 className="text-2xl font-bold font-mono text-zinc-900">{leads.filter(l => l.status === "New Lead").length} New</h3>
                    <p className="text-[10px] text-zinc-500 mt-1">{leads.length} total active proposals</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-mono text-stone-400">Awaiting Inquiries</h3>
                    <p className="text-[9.5px] text-stone-400 leading-normal">Organic brand inquiries show up here</p>
                  </div>
                )}
              </div>

              {/* Recent Payments */}
              <div className="bg-white p-6 rounded-2xl border border-[#B76E79]/20 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between text-stone-400 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Payments</span>
                  <CheckCircle2 size={14} className="text-emerald-500/80" />
                </div>
                {stripeConnected ? (
                  <div>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      <span className="text-xs font-mono">Stripe Live</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1">Automatic deposits enabled</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wide">Connect Stripe</h3>
                    <p className="text-[9.5px] text-stone-400 leading-normal">Secure verification portal connection</p>
                  </div>
                )}
              </div>

            </div>

            {/* Quick Stats Summary Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              
              {/* Left Action Box: Direct System Overview */}
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-brand-rose/10 shadow-xs space-y-4">
                <div className="border-b border-stone-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-dark">Business Platform Status</h3>
                    <p className="text-xs text-stone-500">Live operational metrics based on active student registers &amp; campaigns.</p>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-rose bg-brand-rose/5 px-2.5 py-1 rounded-full font-bold">
                    Sync status: OK
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-[#FFFDFB] p-4 rounded-xl border border-brand-rose/5">
                    <span className="text-[10px] font-mono text-stone-400 tracking-wider font-bold uppercase block mb-1">Newsletter base</span>
                    <strong className="text-xl font-bold font-mono text-stone-800">{subscribers.length} Friends</strong>
                    <span className="text-[9.5px] text-stone-400 block mt-1">Double opt-in leads verified</span>
                  </div>
                  <div className="bg-[#FFFDFB] p-4 rounded-xl border border-brand-rose/5">
                    <span className="text-[10px] font-mono text-stone-400 tracking-wider font-bold uppercase block mb-1">Affiliate catalog</span>
                    <strong className="text-xl font-bold font-mono text-stone-800">{affiliates.length} Products</strong>
                    <span className="text-[9.5px] text-stone-400 block mt-1">ShopMy &amp; LTK synced</span>
                  </div>
                  <div className="bg-[#FFFDFB] p-4 rounded-xl border border-brand-rose/5">
                    <span className="text-[10px] font-mono text-stone-400 tracking-wider font-bold uppercase block mb-1">Media-Kit count</span>
                    <strong className="text-xl font-bold font-mono text-stone-800">{downloadCount} Saves</strong>
                    <span className="text-[9.5px] text-stone-400 block mt-1">Downloaded by agencies</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-start text-xs text-stone-600 gap-1 bg-[#FAF8F5] p-3 rounded-xl border border-stone-100">
                  <HelpCircle className="text-[#B76E79] shrink-0" size={14} />
                  <span>
                    To verify Stripe integration, simply toggle <strong className="text-stone-800">⚡ Connect Stripe</strong> at the top right of this dashboard window. It simulates the transaction pipeline perfectly for student catalog demo.
                  </span>
                </div>
              </div>

              {/* Right Box: Setup Quick Brand deal shortcuts */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-brand-rose/10 shadow-xs space-y-4">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-sm font-bold text-brand-dark">Quick Creator Tool</h3>
                  <p className="text-[11px] text-stone-500">Draft upcoming deal negotiations inside your private notebook quickly.</p>
                </div>
                
                <div className="space-y-3.5 pt-1 text-xs">
                  <button
                    onClick={() => setActiveTab("collabs")}
                    className="w-full text-center bg-brand-rose hover:bg-brand-dark text-white rounded-xl py-3 font-semibold text-xs tracking-wider uppercase transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle size={13} />
                    <span>Create Brand Collaboration</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!stripeConnected) {
                        alert("You must connect Stripe first before manually inputting student rosters.");
                        return;
                      }
                      setActiveTab("students");
                      setShowAddStudentForm(true);
                    }}
                    className="w-full text-center bg-[#FAF8F5] hover:bg-stone-100 text-stone-700 border border-brand-rose/20 rounded-xl py-3 font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus size={13} />
                    <span>Manually Record Student</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}


        {/* ========================================================
            SECTION 2: COURSE MANAGEMENT (Kajabi Styled Courses)
            ======================================================== */}
        {activeTab === "courses" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-dark">Makeup Curriculum Directory</h2>
                <p className="text-xs text-stone-500">Host, update and monitor course lesson counts, students progress pipelines and individual revenue catalogs.</p>
              </div>
              
              <button
                onClick={() => alert("Premium tier required to create custom courses beyond foundational curricula. This sandbox has unlimited curriculum editing capabilities on active courses matches below.")}
                className="bg-brand-dark text-white text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Publish New Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {courses.map((cur) => (
                <div
                  key={cur.id}
                  className="bg-white rounded-3xl border border-brand-rose/10 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold bg-brand-rose/5 text-brand-rose px-2.5 py-1 rounded-full border border-brand-rose/10">
                        {cur.category}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">
                        {cur.lessons.length} Lessons Hosted
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-serif text-base font-bold text-brand-dark line-clamp-1">
                        {cur.name}
                      </h3>
                      <p className="font-sans text-xs text-stone-500 leading-normal">
                        Deep comprehensive video modules formatted for {cur.category.toLowerCase()} enthusiasts on remote pipelines.
                      </p>
                    </div>

                    {/* Lesson checklist drawer dropdown */}
                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-100/60 max-h-[140px] overflow-y-auto space-y-1.5">
                      <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">Curriculum Outlines:</p>
                      {cur.lessons.map((les, index) => (
                        <div key={index} className="flex items-center gap-1.5 text-[11px] text-stone-600 font-sans">
                          <CheckCircle2 size={11} className="text-[#B76E79]/80 shrink-0" />
                          <span className="truncate">{les}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core interactive stats requested by user: Students enrolled & Revenue */}
                  <div className="mt-6 pt-5 border-t border-brand-rose/5 space-y-4">
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-left font-sans">
                        <p className="text-[9.5px] text-stone-400 uppercase font-mono tracking-wider font-bold">Students Enrolled</p>
                        {stripeConnected ? (
                          <strong className="text-sm font-bold text-neutral-800 font-mono mt-0.5 block">{cur.studentsCount} Active</strong>
                        ) : (
                          <span className="text-[10.5px] italic text-[#B76E79] font-bold block mt-0.5">Awaiting First Enrollment</span>
                        )}
                      </div>
                      <div className="text-left font-sans">
                        <p className="text-[9.5px] text-stone-400 uppercase font-mono tracking-wider font-bold font-semibold">Revenue Generated</p>
                        {stripeConnected ? (
                          <strong className="text-sm font-bold text-zinc-900 font-mono mt-0.5 block">{formatPrice(cur.revenue)}</strong>
                        ) : (
                          <span className="text-[10.5px] text-stone-400 block mt-0.5">Connect Stripe</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono font-bold uppercase tracking-wider">
                      <button
                        onClick={() => alert(`Course settings for "${cur.name}" updated successfully.`)}
                        className="bg-stone-50 hover:bg-[#FAF8F5] border border-stone-100 hover:border-brand-rose/30 text-stone-600 py-2 rounded-lg text-center cursor-pointer transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (!stripeConnected) {
                            alert("You must connect Stripe first to inspect active student portals.");
                            return;
                          }
                          setActiveTab("students");
                        }}
                        className="bg-stone-50 hover:bg-[#FAF8F5] border border-stone-100 hover:border-brand-rose/30 text-stone-600 py-2 rounded-lg text-center cursor-pointer transition-colors"
                      >
                        Students
                      </button>
                      <button
                        onClick={() => {
                          setShowAddLessonModal(cur.id);
                          setNewLessonName("");
                        }}
                        className="bg-brand-rose hover:bg-brand-dark text-white py-2 rounded-lg text-center cursor-pointer transition-colors"
                      >
                        + Lesson
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Inner Modular Modal to easily simulate adding lesson details */}
            {showAddLessonModal && (
              <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white overflow-hidden rounded-2xl max-w-sm w-full p-6 border border-stone-100 shadow-xl space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                    <h4 className="font-serif text-sm font-bold text-zinc-900">Add Live Module Lesson</h4>
                    <button onClick={() => setShowAddLessonModal(null)} className="text-stone-400 hover:text-zinc-900 font-sans font-bold text-xs">✕</button>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-xs text-stone-500 font-semibold">Lesson Video Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Masterful Correct Placement with Swatches"
                      value={newLessonName}
                      onChange={(e) => setNewLessonName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-rose"
                    />
                  </div>
                  <div className="flex gap-2 justify-end text-xs font-mono font-bold uppercase pt-2">
                    <button onClick={() => setShowAddLessonModal(null)} className="text-stone-400 hover:underline px-3 py-2">Cancel</button>
                    <button
                      onClick={() => {
                        if (showAddLessonModal) addLessonToCourse(showAddLessonModal);
                      }}
                      className="bg-[#2D2A29] text-white px-4 py-2 rounded-lg hover:bg-brand-rose transition-colors"
                    >
                      Save Lesson
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}


        {/* ========================================================
            SECTION 3: STUDENT MANAGEMENT (Student Enrollment Table)
            ======================================================== */}
        {activeTab === "students" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-dark">Course Student Enrollment Directories</h2>
                <p className="text-xs text-stone-500">Track student progress tracking, payment registration status and direct classroom enrollment.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (!stripeConnected) {
                      alert("Please connect Stripe first using simulated toggle buttons above to test adding manual student receipts!");
                      return;
                    }
                    setShowAddStudentForm(!showAddStudentForm);
                  }}
                  className="bg-brand-rose hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                >
                  <Plus size={14} />
                  <span>Manual Enrollment</span>
                </button>
              </div>
            </div>

            {/* Quick manual setup dialog */}
            {showAddStudentForm && stripeConnected && (
              <form onSubmit={manualEnrollStudentSubmit} className="bg-white rounded-2xl p-5 border border-brand-rose/10 shadow-xs max-w-xl text-xs space-y-4">
                <div className="border-b border-stone-100 pb-2">
                  <h3 className="font-serif text-sm font-bold text-zinc-900">Manually Record Student Receipt</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Student Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diya Sengupta"
                      value={studentFormName}
                      onChange={(e) => setStudentFormName(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Select Active Course</label>
                    <select
                      value={studentFormCourse}
                      onChange={(e) => setStudentFormCourse(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2 text-stone-700"
                    >
                      <option value="Beauty Foundations Course">Beauty Foundations Course</option>
                      <option value="Advanced Artist Program">Advanced Artist Program</option>
                      <option value="Professional Makeup Business Mastery">Professional Makeup Business Mastery</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Estimated Course Progress %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      required
                      value={studentFormProgress}
                      onChange={(e) => setStudentFormProgress(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Payment Status Code</label>
                    <select
                      value={studentFormPayment}
                      onChange={(e) => setStudentFormPayment(e.target.value as StudentRecord["paymentStatus"])}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2 text-stone-700"
                    >
                      <option value="Paid">Paid Fully</option>
                      <option value="Pending">Payment Pending</option>
                      <option value="Failed">Failed / Retrying</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2 text-[10px] font-mono uppercase tracking-widest font-extrabold">
                  <button type="button" onClick={() => setShowAddStudentForm(false)} className="text-stone-400 hover:underline px-3 py-2">Close</button>
                  <button type="submit" className="bg-[#2D2A29] text-white px-4 py-2 rounded-lg hover:bg-brand-rose transition-all">Record Student</button>
                </div>
              </form>
            )}

            {/* REALISTIC TABLE OUTPUTS WITH THE REQUIRED STIPULATED ERROR STATES PRECISELY HANDLED */}
            {stripeConnected && students.length > 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200/50 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-sans text-stone-600">
                    <thead>
                      <tr className="bg-stone-50/55 border-b border-stone-100 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                        <th className="p-4 text-left">Student Name</th>
                        <th className="p-4 text-left">Registered Course Course</th>
                        <th className="p-4 text-left">Course Progress</th>
                        <th className="p-4 text-left">Payment Status</th>
                        <th className="p-4 text-right">Enrollment Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {students.map((st) => (
                        <tr key={st.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="p-4">
                            <strong className="text-zinc-900 text-sm font-semibold">{st.name}</strong>
                            <p className="text-[10px] text-stone-400 mt-0.5">UID: {st.id}</p>
                          </td>
                          <td className="p-4 text-[#B76E79] font-medium font-serif">{st.courseName}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 max-w-[140px]">
                              <div className="bg-stone-100 h-2 w-full rounded-full overflow-hidden">
                                <div className="bg-brand-rose h-full" style={{ width: `${st.progress}%` }} />
                              </div>
                              <span className="font-mono text-[10px] text-stone-500">{st.progress}%</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`text-[9.5px] px-2 py-0.5 font-bold rounded-full uppercase ${
                              st.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700" :
                              st.paymentStatus === "Pending" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                            }`}>
                              ● {st.paymentStatus}
                            </span>
                          </td>
                          <td className="p-4 text-right font-mono text-zinc-500">{st.enrollmentDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-brand-rose/10 p-12 text-center max-w-xl mx-auto space-y-4">
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <Users size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-zinc-900">Awaiting First Enrollment</h3>
                  <p className="font-sans text-xs text-stone-500 max-w-sm mx-auto leading-normal">
                    This platform currently has no active student directory entries. Connect Stripe to auto-import students on verified invoice checkouts.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={triggerStripeSimulatedConnect}
                    className="bg-brand-rose hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Simulate Stripe Hook Connection
                  </button>
                </div>
              </div>
            )}

          </div>
        )}


        {/* ========================================================
            SECTION 4: MAKEUP BOOKING REQUESTS
            ======================================================== */}
        {activeTab === "bookings" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-dark">Makeup Appointment Registers</h2>
                <p className="text-xs text-stone-500">Coordinate and verify inquiries across Bridal, Party, photoshoot and masterclass workshops.</p>
              </div>

              <button
                onClick={() => setShowAddBookingModal(!showAddBookingModal)}
                className="bg-brand-rose hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
              >
                <Plus size={14} />
                <span>Log New Booking</span>
              </button>
            </div>

            {/* Simulated interactive booking entry form */}
            {showAddBookingModal && (
              <form onSubmit={addNewBookingSubmit} className="bg-white border border-brand-rose/15 hover:shadow-md p-5 rounded-2xl text-xs space-y-4 max-w-xl">
                <div className="border-b border-stone-100 pb-2">
                  <h3 className="font-serif text-sm font-bold text-zinc-900">Log Makeup Client Booking</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Client Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanjali Sen"
                      value={bookingFormName}
                      onChange={(e) => setBookingFormName(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +91 99030 99010"
                      value={bookingFormPhone}
                      onChange={(e) => setBookingFormPhone(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Service Type</label>
                    <select
                      value={bookingFormCat}
                      onChange={(e) => setBookingFormCat(e.target.value as MakeupBooking["category"])}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-2 py-2 text-stone-700"
                    >
                      <option value="Bridal Makeup">Bridal Makeup</option>
                      <option value="Party Makeup">Party Makeup</option>
                      <option value="Photoshoot Makeup">Photoshoot Makeup</option>
                      <option value="Workshop Inquiry">Workshop Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Appointment Date</label>
                    <input
                      type="date"
                      required
                      value={bookingFormDate}
                      onChange={(e) => setBookingFormDate(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-2 py-2 text-stone-700 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 font-semibold mb-1">Venue Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Elgin Road, Kolkata"
                      value={bookingFormLoc}
                      onChange={(e) => setBookingFormLoc(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-1 text-[10px] font-mono uppercase tracking-widest font-extrabold">
                  <button type="button" onClick={() => setShowAddBookingModal(false)} className="text-stone-400 hover:underline px-3 py-2">Close</button>
                  <button type="submit" className="bg-[#2D2A29] text-white px-5 py-2 rounded-lg hover:bg-brand-rose transition-all">Archive Booking</button>
                </div>
              </form>
            )}

            {/* BOOKINGS LIST */}
            {makeupBookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {makeupBookings.map((b) => {
                  const avatarInitials = b.name
                    ? b.name.split(" ").map(n => n[0]).join("").toUpperCase()
                    : "MC";
                    
                  // Beautiful Unsplash headshots for default bookings, fallback to gorgeous initialized monogram
                  const isDefault1 = b.id === "book-1";
                  const isDefault2 = b.id === "book-2";
                  const imageUrl = isDefault1 
                    ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                    : isDefault2
                      ? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80"
                      : null;

                  return (
                    <div
                      key={b.id}
                      className="bg-white border-2 border-[#B76E79]/10 hover:border-[#B76E79]/35 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group"
                    >
                      {/* Decorative soft side line that lights up when confirmed */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${
                        b.status === "Confirmed" ? "bg-emerald-500" :
                        b.status === "Completed" ? "bg-stone-400" :
                        b.status === "Pending" ? "bg-amber-400" : "bg-rose-400"
                      }`} />

                      <div className="space-y-4 font-sans text-left pl-2">
                        
                        {/* Upper Section: Avatar, Name, Category and Status Badge */}
                        <div className="flex items-start gap-4 justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              {imageUrl ? (
                                <img 
                                  src={imageUrl} 
                                  alt={b.name} 
                                  referrerPolicy="no-referrer"
                                  className="w-14 h-14 rounded-full object-cover border-2 border-[#B76E79]/20 shadow-xs" 
                                />
                              ) : (
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#B76E79] to-amber-100 border-2 border-[#B76E79]/20 shadow-xs flex items-center justify-center font-serif text-stone-800 font-bold uppercase">
                                  {avatarInitials}
                                </div>
                              )}
                              {/* Small luxury dot indicating active state */}
                              <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                                b.status === "Confirmed" ? "bg-emerald-500 animate-pulse" :
                                b.status === "Completed" ? "bg-stone-500" :
                                b.status === "Cancelled" ? "bg-rose-500" : "bg-amber-500 animate-pulse"
                              }`} />
                            </div>

                            <div>
                              <h3 className="font-serif text-lg font-bold text-zinc-900 leading-tight">
                                {b.name}
                              </h3>
                              <span className="inline-block mt-1 font-mono text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded bg-[#B76E79]/5 border border-[#B76E79]/10 text-brand-rose">
                                {b.category}
                              </span>
                            </div>
                          </div>

                          {/* Strong, highly visible Status Badge */}
                          <div className="text-right">
                            <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                              b.status === "Confirmed" ? "bg-emerald-500 text-white border-emerald-600 shadow-xs" :
                              b.status === "Completed" ? "bg-stone-800 text-white border-stone-800 shadow-xs" :
                              b.status === "Pending" ? "bg-amber-500 text-stone-900 border-amber-600 shadow-xs" : 
                              "bg-[#CF3C3C] text-white border-red-750"
                            }`}>
                              {b.status}
                            </span>
                          </div>
                        </div>

                        {/* Middle Section: Booking Details (Date, Location, Phone) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-stone-100 font-semibold text-stone-700 text-xs">
                          <p className="flex items-center gap-2">
                            <Calendar size={13} className="text-[#B76E79]" />
                            <span><strong className="text-stone-400 font-normal">Date:</strong> {b.date}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone size={13} className="text-[#B76E79]" />
                            <span><strong className="text-stone-400 font-normal">Phone:</strong> {b.phone}</span>
                          </p>
                          <p className="flex items-center gap-2 col-span-1 sm:col-span-2">
                            <MapPin size={13} className="text-[#B76E79]" />
                            <span><strong className="text-stone-400 font-normal">Venue:</strong> {b.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Bottom Section: QUICK ACTION BUTTONS */}
                      <div className="pt-3 border-t border-stone-100 pl-2 space-y-2.5">
                        
                        {/* Primary Quick CTA Actions */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-sans font-bold">
                          
                          {/* Confirm Button */}
                          <button
                            type="button"
                            onClick={() => {
                              updateBookingStatus(b.id, "Confirmed");
                              alert(`Booking for ${b.name} is now officially confirmed and calendar blocked!`);
                            }}
                            className={`px-3 py-3.5 rounded-xl duration-200 text-center border-0 cursor-pointer flex items-center justify-center gap-1 shadow-xs font-bold ${
                              b.status === "Confirmed" 
                                ? "bg-emerald-600 text-white hover:bg-emerald-700 font-bold" 
                                : "bg-neutral-900 text-white hover:bg-stone-800 font-bold"
                            }`}
                          >
                            <CheckCircle2 size={13} className="shrink-0" />
                            <span>Confirm</span>
                          </button>

                          {/* WhatsApp Client */}
                          <button
                            type="button"
                            onClick={() => {
                              const cleanPhone = b.phone.replace(/[^0-9]/g, "");
                              const text = `Hi ${b.name}, this is Rakhee regarding your custom ${b.category} makeup consultation slot booked for ${b.date}. Let me know if you would like to run through the skincare checklist!`;
                              window.open(`https://wa.me/${cleanPhone || "919830012345"}?text=${encodeURIComponent(text)}`);
                            }}
                            className="bg-[#25D366] text-white hover:bg-[#20ba59] px-3 py-3.5 rounded-xl text-center cursor-pointer flex items-center justify-center gap-1 font-bold border-0"
                          >
                            <MessageCircle size={13} className="shrink-0" />
                            <span>WhatsApp</span>
                          </button>

                          {/* View Details Toggle */}
                          <button
                            type="button"
                            onClick={() => alert(`Details for booking: \n\nClient Name: ${b.name}\nService: ${b.category}\nVenue Location: ${b.location}\nDate Scheduled: ${b.date}\nContact Info: ${b.phone}\n\nClient has requested a luxury airbrush session. Notes recorded.`)}
                            className="bg-stone-105 hover:bg-stone-200 text-stone-800 px-3 py-3.5 rounded-xl text-center cursor-pointer flex items-center justify-center gap-1 font-bold border-0"
                          >
                            <Eye size={13} className="shrink-0" />
                            <span>Details</span>
                          </button>

                          {/* Edit Details */}
                          <button
                            type="button"
                            onClick={() => {
                              const newName = prompt(`Modify client name for booking:`, b.name);
                              if (newName && newName.trim()) {
                                setMakeupBookings(prev => prev.map(item => item.id === b.id ? { ...item, name: newName } : item));
                              }
                            }}
                            className="bg-stone-105 hover:bg-stone-200 text-stone-800 px-3 py-3.5 rounded-xl text-center cursor-pointer flex items-center justify-center gap-1 font-bold border-0"
                          >
                            <PlusCircle size={13} className="shrink-0 text-[#B76E79]" />
                            <span>Edit</span>
                          </button>
                        </div>

                        {/* Status override picker select dropdown */}
                        <div className="flex items-center justify-between text-stone-500 text-[11px] font-sans pt-1">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 font-extrabold flex items-center gap-1">
                            <Clock size={11} />
                            State Overrides:
                          </span>
                          
                          <select
                            value={b.status}
                            onChange={(e) => {
                              updateBookingStatus(b.id, e.target.value as MakeupBooking["status"]);
                            }}
                            className="bg-stone-50 font-sans border border-stone-205 text-stone-705 font-bold px-2 py-1 rounded-lg focus:outline-none focus:border-[#B76E79] cursor-pointer"
                          >
                            <option value="Pending">Pending Audit</option>
                            <option value="Confirmed">Confirmed Booked</option>
                            <option value="Completed">Completed Job</option>
                            <option value="Cancelled">Cancelled/Pass</option>
                          </select>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-stone-400 py-10 font-medium">No bookings logged yet.</div>
            )}

          </div>
        )}


        {/* ========================================================
            SECTION 5: CONTENT LIBRARY
            ======================================================== */}
        {activeTab === "content" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-dark">Beauty Content &amp; Media Catalogue</h2>
                <p className="text-xs text-stone-500">Draft, configure and categorize visual swatches, cosmetic reviews, bridal recordings and tutorial scripts.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert("Ready-Made templates can be cataloged below. Integration with Instagram drafts is direct once Instagram Live mode is synced.")}
                  className="bg-[#2D2A29] text-white text-[10.5px] uppercase font-bold font-mono tracking-widest px-4 py-2.5 rounded-xl hover:bg-brand-rose duration-300 cursor-pointer"
                >
                  Create Mock Draft
                </button>
              </div>
            </div>

            {/* Quick Filter Swaps */}
            <div className="flex flex-wrap gap-1.5">
              {(["All", "Tutorials", "Reels", "Product Reviews", "Transformations", "Drafts"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setContentFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase cursor-pointer transition-colors ${
                    contentFilter === filter
                      ? "bg-brand-rose text-white shadow-xs"
                      : "bg-[#FAF8F5] text-stone-600 hover:bg-stone-50 border border-brand-rose/5"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* CONTENT GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
              
              {/* Draft Placeholder */}
              {contentFilter === "Drafts" && (
                <div className="bg-[#FAF8F5]/60 border border-dashed border-brand-rose/30 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-3 min-h-[220px]">
                  <Layers className="text-brand-rose/40" size={24} />
                  <div>
                    <h4 className="font-serif text-xs font-bold text-stone-700">No Drafts</h4>
                    <p className="text-[10px] text-stone-400 leading-normal mt-0.5">Prepare upcoming product swatch lists and keep them stored client-side safely.</p>
                  </div>
                </div>
              )}

              {/* Live items map */}
              {contentFilter !== "Drafts" && reels
                .filter(r => {
                  if (contentFilter === "All") return true;
                  if (contentFilter === "Tutorials") return r.category === "Makeup Tutorial";
                  if (contentFilter === "Reels") return r.category === "GRWM" || r.category === "Beauty Hack";
                  if (contentFilter === "Product Reviews") return r.category === "Product Reviews";
                  if (contentFilter === "Transformations") return r.category === "Transformation";
                  return true;
                })
                .map((rl) => (
                  <div
                    key={rl.id}
                    className="bg-white rounded-2xl border border-brand-rose/10 overflow-hidden shadow-xs hover:shadow-sm duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/4] bg-stone-100">
                      <img src={rl.thumbnail} alt={rl.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-2.5 left-2.5 bg-white/95 px-2 py-0.5 rounded-full text-[8.5px] uppercase font-bold tracking-wider font-mono text-[#B76E79] shadow-xs">
                        {rl.category}
                      </div>
                      
                      <div className="absolute bottom-2 left-2 text-[8.5px] text-stone-300 font-mono">
                        Published {rl.publishedDate}
                      </div>
                    </div>

                    <div className="p-3 space-y-2">
                      <h4 className="font-serif text-xs font-bold text-zinc-900 line-clamp-1" title={rl.title}>
                        {rl.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                        <span>👁️ {instagramConnected ? rl.views.toLocaleString() : "No Data Available"}</span>
                        <span>{rl.engagementRate}% ER</span>
                      </div>
                    </div>

                    <div className="p-2 border-t border-stone-50 bg-[#FEFBF9] flex justify-end">
                      <button
                        onClick={() => deleteReel(rl.id)}
                        className="text-stone-300 hover:text-rose-600 font-sans text-[10px] font-bold py-1 px-2.5 rounded hover:bg-rose-50 transition-colors"
                      >
                        Delete Post
                      </button>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}


        {/* ========================================================
            SECTION 6: BRAND COLLABORATIONS (CRM Projects)
            ======================================================== */}
        {activeTab === "collabs" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-dark font-medium">Brand Collaborations &amp; Contracts</h2>
                <p className="text-xs text-stone-500">Track and log campaign deliverables, payment checks, negotiations and content requirements.</p>
              </div>

              <div className="flex gap-2 font-mono text-xs font-bold uppercase">
                <button
                  onClick={simulateClicks}
                  className="bg-brand-sand/55 hover:bg-brand-sand text-brand-rose border border-brand-rose/20 px-3.5 py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={13} />
                  <span>Simulate Affiliate Traffic Click</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Form Box */}
              <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-brand-rose/10 shadow-xs space-y-4">
                <div className="border-b border-stone-100 pb-2.5">
                  <h3 className="font-serif text-sm font-bold text-zinc-900">Record Sponsorship Agreement</h3>
                </div>

                <form onSubmit={handleCreateBrandDealSubmit} className="space-y-3.5 text-xs font-sans">
                  <div>
                    <label className="block text-stone-500 font-bold mb-1">Brand Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rare Beauty India"
                      value={dealBrandName}
                      onChange={(e) => setDealBrandName(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#B76E79]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-400 font-bold mb-1">Price Deal (USD $)</label>
                      <input
                        type="number"
                        required
                        value={dealBudget}
                        onChange={(e) => setDealBudget(Number(e.target.value))}
                        className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 font-bold mb-1">Campaign Goal Style</label>
                      <select
                        value={dealCampaignType}
                        onChange={(e) => setDealCampaignType(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-2 py-2 text-stone-700"
                      >
                        <option value="💄 Dedicated Makeup Tutorial">Instagram Reel</option>
                        <option value="🎥 Authentic Product Review">Product Review</option>
                        <option value="✨ Sponsored Content">Sponsored Post</option>
                        <option value="👰 Bridal Transformation">Bridal Campaign</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-500 font-bold mb-1">Partner PR Agent Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sreya Malhotra"
                      value={dealContact}
                      onChange={(e) => setDealContact(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-500 font-bold mb-1">PR Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. partnerships@rare.com"
                      value={dealEmail}
                      onChange={(e) => setDealEmail(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-500 font-bold mb-1">Campaign Deadlines &amp; Requirements</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Raw drafts upload deadline Nov 10"
                      value={dealNotes}
                      onChange={(e) => setDealNotes(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg p-2 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-rose hover:bg-brand-dark text-white font-bold py-2.5 rounded-xl transition-all cursor-pointer text-xs"
                  >
                    Archive Raw Deal Setup
                  </button>
                </form>
              </div>

              {/* Right Content Table */}
              <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-brand-rose/10 shadow-xs">
                <div className="border-b border-stone-100 pb-3 flex justify-between items-center mb-4">
                  <h3 className="font-serif text-sm font-bold text-zinc-900">Campaign Schedule Ledger</h3>
                  <input
                    type="text"
                    placeholder="Search brand partner..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none text-xs w-48"
                  />
                </div>

                <div className="overflow-x-auto text-xs">
                  <table className="w-full font-sans text-stone-600">
                    <thead>
                      <tr className="border-b border-stone-100 text-[10px] uppercase font-bold text-stone-400">
                        <th className="pb-3 text-left">Brand Partner Info</th>
                        <th className="pb-3 text-right">Offer Budget</th>
                        <th className="pb-3 text-left pl-3">Contract Status</th>
                        <th className="pb-3 text-left">Deliverables Transacted</th>
                        <th className="pb-3 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {leads
                        .filter(l => l.brandName.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((ld) => (
                          <tr key={ld.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                            <td className="py-3">
                              <span className="font-serif text-sm font-bold text-neutral-800 block">{ld.brandName}</span>
                              <span className="text-[10px] text-stone-400 block mt-0.5">Contact: {ld.contactPerson} ({ld.email})</span>
                              {ld.campaignDetails && (
                                <p className="text-[10px] text-[#B76E79] italic mt-1 font-bold pl-1.5 border-l border-brand-rose">
                                  {ld.campaignDetails}
                                </p>
                              )}
                            </td>
                            <td className="py-3 text-right font-mono font-bold text-zinc-800">
                              {formatPrice(ld.budget)}
                            </td>
                            <td className="py-3 pl-3">
                              <select
                                value={ld.status}
                                onChange={(e) => updateLeadStatus(ld.id, e.target.value as CollabLead["status"])}
                                className="bg-stone-50 border border-stone-200 text-[10px] px-2 py-1 rounded text-stone-700 font-semibold cursor-pointer"
                              >
                                <option value="New Lead">1. New Lead Review</option>
                                <option value="Contacted">2. PR Inboxed</option>
                                <option value="Negotiation">3. Negotiation</option>
                                <option value="Approved">4. Approved &amp; Scheduled</option>
                                <option value="Completed">5. Content Live</option>
                                <option value="Rejected">Rejected/Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3">
                              <select
                                value={ld.paymentStatus || "Unpaid"}
                                onChange={(e) => updateLeadPayment(ld.id, e.target.value as CollabLead["paymentStatus"])}
                                className={`text-[10px] px-2 py-0.5 font-bold rounded uppercase ${
                                  ld.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700" :
                                  ld.paymentStatus === "Partial" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-600"
                                }`}
                              >
                                <option value="Unpaid">Unpaid</option>
                                <option value="Partial">Partial Deposit</option>
                                <option value="Paid">Fully Paid</option>
                              </select>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => deleteLead(ld.id)}
                                className="text-stone-300 hover:text-rose-600 transition-colors p-1"
                              >
                                <Trash2 size={12} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

          </div>
        )}


        {/* ========================================================
            SECTION 7: LEAD MANAGEMENT
            ======================================================== */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="border-b border-stone-100 pb-4">
              <h2 className="font-serif text-xl font-bold text-brand-dark">Demographics Inbox Rooms</h2>
              <p className="text-xs text-stone-500">Respond directly to active newsletter feedback and direct Instagram response channels.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              
              {/* website details category lists */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-brand-rose/10 shadow-xs">
                  <h3 className="font-serif text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Audience Origin Panels</h3>
                  
                  <div className="space-y-2 text-xs">
                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-100 flex items-center justify-between">
                      <span className="font-semibold text-zinc-800">Website Leads</span>
                      <span className="font-mono bg-zinc-900 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                        {subscribers.length} Checked
                      </span>
                    </div>

                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-100 flex items-center justify-between">
                      <span className="font-semibold text-zinc-800">Instagram Leads</span>
                      <span className="font-mono bg-pink-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                        {instagramConnected ? "Sync enabled" : "Awaiting sync"}
                      </span>
                    </div>

                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-100 flex items-center justify-between">
                      <span className="font-semibold text-zinc-800">Course Inquiries</span>
                      <span className="font-mono bg-[#B76E79] text-white font-bold px-2 py-0.5 rounded text-[10px]">
                        {stripeConnected ? "3 Active" : "No Data Available"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-brand-rose/5 text-xs text-stone-500">
                  <HelpCircle className="text-brand-rose inline mr-1" size={13} />
                  <span>Website Leads display emails and interests submitted by readers under your website footer registry.</span>
                </div>
              </div>

              {/* Subscribed mailing roster list */}
              <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-brand-rose/10 shadow-xs">
                <div className="border-b border-stone-100 pb-3 flex justify-between items-center mb-4">
                  <h3 className="font-serif text-sm font-bold text-zinc-900">Mailing &amp; Newsletter Opt-ins</h3>
                  <button
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8,Name,Email,JoinDate\n" + 
                        subscribers.map(s => `"${s.name}","${s.email}","${s.dateJoined}"`).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", "Roster_leads.csv");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="bg-stone-50 hover:bg-[#FAF8F5] border border-stone-100 border text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Download size={11} />
                    <span>Export CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto text-xs font-sans text-stone-600">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-stone-100 text-[10px] uppercase font-bold text-stone-400">
                        <th className="pb-3 text-left">Subscriber Identity</th>
                        <th className="pb-3 text-left">Opt-in Email Address</th>
                        <th className="pb-3 text-left pl-3">Opt-in Date</th>
                        <th className="pb-3 text-right">Action Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {subscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-stone-50/50">
                          <td className="py-3">
                            <span className="font-semibold text-zinc-900">{sub.name}</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {sub.beautyInterests.map((interest, idx) => (
                                <span key={idx} className="bg-stone-100 text-[8.5px] uppercase font-bold text-stone-500 px-1.5 py-0.5 rounded font-mono">
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 font-mono text-zinc-700">{sub.email}</td>
                          <td className="py-3 text-stone-400 pl-3 font-mono">{sub.dateJoined}</td>
                          <td className="py-3 text-right font-mono text-[9px] text-[#4F7942] font-semibold">
                            ● Double Verified
                          </td>
                        </tr>
                      ))}
                      {subscribers.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-stone-400">No newsletter registrations archived yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

          </div>
        )}


        {/* ========================================================
            SECTION 8: AUTOMATION CENTER (Clean Toggle Switches)
            ======================================================== */}
        {activeTab === "automations" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="border-b border-stone-100 pb-4">
              <h2 className="font-serif text-xl font-bold text-brand-dark">Automation Center</h2>
              <p className="text-xs text-stone-500">Deploy background rules, immediate Comment-to-DM triggers, automatic WhatsApp notifications, and email schedules.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              
              {/* Instagram DM Automation */}
              <div className="bg-white p-6 rounded-2xl border border-brand-rose/10 shadow-xs flex items-center justify-between">
                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-1.5">
                    <Instagram size={15} className="text-pink-600" />
                    <h4 className="font-serif text-sm font-bold text-[#2D2A29]">Instagram DM Automation</h4>
                  </div>
                  <p className="font-sans text-[11px] text-stone-500 leading-relaxed">
                    Trigger customized welcoming, FAQ reviews, and direct product recommendation responses inside Instagram DMs whenever customers message.
                  </p>
                </div>
                
                <button
                  onClick={() => setAutomations({ ...automations, instaDm: !automations.instaDm })}
                  className="text-stone-400 hover:text-brand-rose focus:outline-none cursor-pointer"
                >
                  {automations.instaDm ? (
                    <ToggleRight size={40} className="text-[#B76E79]" />
                  ) : (
                    <ToggleLeft size={40} className="text-stone-300" />
                  )}
                </button>
              </div>

              {/* Comment To DM Automation */}
              <div className="bg-white p-6 rounded-2xl border border-[#B76E79]/20 shadow-xs flex items-center justify-between">
                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-1.5">
                    <Zap size={15} className="text-amber-500" />
                    <h4 className="font-serif text-sm font-bold text-[#2D2A29]">Comment To DM Automation</h4>
                  </div>
                  <p className="font-sans text-[11px] text-stone-500 leading-relaxed">
                    Send immediate affiliate lists, store links, or course coupon codes directly into comments-triggering client chats automatically.
                  </p>
                </div>

                <button
                  onClick={() => setAutomations({ ...automations, commentDm: !automations.commentDm })}
                  className="text-stone-400 hover:text-brand-rose focus:outline-none cursor-pointer"
                >
                  {automations.commentDm ? (
                    <ToggleRight size={40} className="text-[#B76E79]" />
                  ) : (
                    <ToggleLeft size={40} className="text-stone-300" />
                  )}
                </button>
              </div>

              {/* WhatsApp Automation */}
              <div className="bg-white p-6 rounded-2xl border border-brand-rose/10 shadow-xs flex items-center justify-between">
                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={15} className="text-emerald-500" />
                    <h4 className="font-serif text-sm font-bold text-[#2D2A29]">WhatsApp Automation</h4>
                  </div>
                  <p className="font-sans text-[11px] text-stone-500 leading-relaxed">
                    Send automated booking confirmations and payment updates directly to bridal customers and photoshoot clients on WhatsApp.
                  </p>
                </div>

                <button
                  onClick={() => setAutomations({ ...automations, whatsapp: !automations.whatsapp })}
                  className="text-stone-400 hover:text-zinc-650 focus:outline-none cursor-pointer"
                >
                  {automations.whatsapp ? (
                    <ToggleRight size={40} className="text-[#B76E79]" />
                  ) : (
                    <ToggleLeft size={40} className="text-stone-300" />
                  )}
                </button>
              </div>

              {/* Email Automation */}
              <div className="bg-white p-6 rounded-2xl border border-brand-rose/10 shadow-xs flex items-center justify-between">
                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-1.5">
                    <Mail size={15} className="text-indigo-500" />
                    <h4 className="font-serif text-sm font-bold text-[#2D2A29]">Email Automation</h4>
                  </div>
                  <p className="font-sans text-[11px] text-stone-500 leading-relaxed">
                    Welcome double opt-in subscribers automatically with beautiful beauty hacks and luxury product swatches directly through custom bulletins.
                  </p>
                </div>

                <button
                  onClick={() => setAutomations({ ...automations, email: !automations.email })}
                  className="text-stone-400 hover:text-zinc-650 focus:outline-none cursor-pointer"
                >
                  {automations.email ? (
                    <ToggleRight size={40} className="text-[#B76E79]" />
                  ) : (
                    <ToggleLeft size={40} className="text-stone-300" />
                  )}
                </button>
              </div>

              {/* Lead Capture Automation */}
              <div className="bg-white p-6 rounded-2xl border border-brand-rose/10 shadow-xs flex items-center justify-between">
                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-1.5">
                    <Users size={15} className="text-rose-500" />
                    <h4 className="font-serif text-sm font-bold text-[#2D2A29]">Lead Capture Automation</h4>
                  </div>
                  <p className="font-sans text-[11px] text-stone-500 leading-relaxed">
                    Auto-record newly transacted student listings and save them straight to Stripe + Kajabi platforms with double-verified receipts.
                  </p>
                </div>

                <button
                  onClick={() => setAutomations({ ...automations, leadCapture: !automations.leadCapture })}
                  className="text-stone-400 hover:text-zinc-650 focus:outline-none cursor-pointer"
                >
                  {automations.leadCapture ? (
                    <ToggleRight size={40} className="text-[#B76E79]" />
                  ) : (
                    <ToggleLeft size={40} className="text-stone-300" />
                  )}
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}
