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
  ChevronRight, ChevronLeft, ArrowUpRight, TrendingUp, Filter, Eye,
  Lock, AlertCircle, Copy, CheckSquare, PlusCircle, CreditCard,
  Hash, Clock, MapPin, Phone, UserPlus, Zap, Gift, Ticket
} from "lucide-react";
import { CollabLead, InstagramReel, AffiliateItem, NewsletterSubscriber, CreatorStats, CreatorMessage, InstagramLibraryItem, RewardConfig, RewardClaim } from "../types";

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
  instagramChatLeads?: any[];
  setInstagramChatLeads?: React.Dispatch<React.SetStateAction<any[]>>;
  rewards: RewardConfig[];
  setRewards: React.Dispatch<React.SetStateAction<RewardConfig[]>>;
  claims: RewardClaim[];
  setClaims: React.Dispatch<React.SetStateAction<RewardClaim[]>>;
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

type MenuSection = "overview" | "courses" | "students" | "bookings" | "content" | "collabs" | "leads" | "automations" | "rewards" | "razorpay";

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
  instagramChatLeads = [],
  setInstagramChatLeads,
  rewards,
  setRewards,
  claims,
  setClaims
}: AdminOSProps) {
  
  // Luxury dashboard active sub-view
  const [activeTab, setActiveTab] = useState<MenuSection>("overview");

  // Reward generation panel inner hooks
  const [newRewardLabel, setNewRewardLabel] = useState("");
  const [newRewardType, setNewRewardType] = useState<"discount" | "freebie">("discount");
  const [newRewardValue, setNewRewardValue] = useState(15);
  const [newRewardExpiry, setNewRewardExpiry] = useState("Dec 31, 2026");
  const [newRewardCode, setNewRewardCode] = useState("GLAM15");
  const [selectedEligibleCourses, setSelectedEligibleCourses] = useState<string[]>([
    "Beauty Foundations Course",
    "Advanced Artist Program",
    "Professional Makeup Business Mastery"
  ]);

  // Custom non-blocking visual feedback state (replaces raw browser alert overlays)
  const [toast, setToast] = useState<string | null>(null);

  const alert = (msg: string) => {
    setToast(msg);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Integration Connection switches (Razorpay and Instagram synchronized to Express databases)
  const [razorpayConnected, setRazorpayConnected] = useState<boolean>(false);
  const [razorpayKeyId, setRazorpayKeyId] = useState<string>("");
  const [razorpayKeySecret, setRazorpayKeySecret] = useState<string>("");
  const [rzpTransactions, setRzpTransactions] = useState<any[]>([]);
  const [rzpOrders, setRzpOrders] = useState<any[]>([]);
  const [rzpEnrollments, setRzpEnrollments] = useState<any[]>([]);
  const [isRefreshingRzp, setIsRefreshingRzp] = useState<boolean>(false);

  const [instagramConnected, setInstagramConnected] = useState<boolean>(() => {
    return localStorage.getItem("blush_sim_instagram_connected") === "true";
  });
  
  // High fidelity Instagram Integrated State & Default Core Content
  const DEFAULT_INSTAGRAM_LIBRARY: InstagramLibraryItem[] = [
    {
      id: "ig_post_1",
      caption: "✨ Soft Glam Mastery ✨\nCreating the ultimate radiant skin structure with our seamless warm gold eye shadow blend. Ideal for bridal and reception nights! #SouthAsianBeauty #MakeupArtistKolkata",
      media_type: "IMAGE",
      media_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
      permalink: "https://www.instagram.com/p/C_softglam_1/",
      timestamp: "2026-06-01T14:30:00Z",
      username: "blushwithrakhee"
    },
    {
      id: "ig_reel_2",
      caption: "🎬 Dewy Skin Prep Reel\nMy step-by-step secret for that flawless, crease-free under-eye area. Sound on for all product listings! #SkincarePrep #DewyGlow #BeautyHacks",
      media_type: "VIDEO",
      media_url: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-applying-makeup-44415-large.mp4",
      permalink: "https://www.instagram.com/reel/C_dewyskin_2/",
      thumbnail_url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800",
      timestamp: "2026-05-28T09:15:00Z",
      username: "blushwithrakhee"
    },
    {
      id: "ig_carousel_3",
      caption: "🎨 Traditional Bridal Airbrush Transition 🎨\nA complete slide-by-slide guide on matching hyperpigmented undertones with traditional gold jewelry. #BridalTransformation #AirbrushMakeup",
      media_type: "CAROUSEL_ALBUM",
      media_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
      permalink: "https://www.instagram.com/p/C_traditional_3/",
      timestamp: "2026-05-25T11:45:00Z",
      username: "blushwithrakhee"
    },
    {
      id: "ig_video_4",
      caption: "💄 3-Step Brow Lift Hack 💄\nNo fillers, no complex threading—just 3 precise strokes of our micro-brow tip for an instant eye lift. Watch it wear for 12 hours! #BrowLift #BeautyHacks",
      media_type: "VIDEO",
      media_url: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-applying-eyeshadow-with-brush-44413-large.mp4",
      permalink: "https://www.instagram.com/reel/C_browlift_4/",
      thumbnail_url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800",
      timestamp: "2026-05-20T17:00:00Z",
      username: "blushwithrakhee"
    },
    {
      id: "ig_post_5",
      caption: "🌸 Monochromatic Peach Glow 🌸\nSangeet look goals! Fresh skin, apricot-flushed cheeks, and a juicy velvet lip to finish. What do you think? 👇 #SangeetMakeup #PeachGlow",
      media_type: "IMAGE",
      media_url: "https://images.unsplash.com/photo-1595959183075-c1d09e37b19c?auto=format&fit=crop&q=80&w=800",
      permalink: "https://www.instagram.com/p/C_peachglow_5/",
      timestamp: "2026-05-18T12:00:00Z",
      username: "blushwithrakhee"
    },
    {
      id: "ig_reel_6",
      caption: "🎥 Live Student Practice Session!\nWatch Priyanka nail this Royal Red lip contour during her final practical exam under my guidance. Proud teacher moment! #BridalAcademy #MUAInspirations",
      media_type: "VIDEO",
      media_url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-artist-using-powder-brush-on-woman-44165-large.mp4",
      permalink: "https://www.instagram.com/reel/C_student_6/",
      thumbnail_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
      timestamp: "2026-05-15T08:30:00Z",
      username: "blushwithrakhee"
    },
    {
      id: "ig_carousel_7",
      caption: "🌟 Absolute Favorite Drugstore Dupes 🌟\nWhy pay $45 for high-end powder when this $9 luxury alternative performs EXACTLY the same? Swatch slides attached! #BudgetBeauty #HonestSwatch",
      media_type: "CAROUSEL_ALBUM",
      media_url: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=800",
      permalink: "https://www.instagram.com/p/C_drugstore_7/",
      timestamp: "2026-05-10T16:20:00Z",
      username: "blushwithrakhee"
    },
    {
      id: "ig_video_8",
      caption: "✨ Glass Skin Foundation Routine ✨\nAchieving that transparent, ultra-dewy glass skin base structure that stands up to humid weather. Genuinely unfiltered! #GlassSkin #MakeupTutorial",
      media_type: "VIDEO",
      media_url: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-gently-applying-face-powder-makeup-44418-large.mp4",
      permalink: "https://www.instagram.com/reel/C_glassskin_8/",
      thumbnail_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
      timestamp: "2026-05-05T10:00:00Z",
      username: "blushwithrakhee"
    }
  ];

  const [instagramUsername, setInstagramUsername] = useState<string>(() => {
    return localStorage.getItem("blush_sim_instagram_username") || "blushwithrakhee";
  });
  const [instagramToken, setInstagramToken] = useState<string>(() => {
    return localStorage.getItem("blush_sim_instagram_token") || "";
  });
  const [instagramLibrary, setInstagramLibrary] = useState<InstagramLibraryItem[]>(() => {
    const saved = localStorage.getItem("blush_sim_instagram_library");
    return saved ? JSON.parse(saved) : DEFAULT_INSTAGRAM_LIBRARY;
  });
  const [assignedContainers, setAssignedContainers] = useState<Record<string, InstagramLibraryItem>>(() => {
    const saved = localStorage.getItem("blush_instagram_containers");
    return saved ? JSON.parse(saved) : {};
  });
  const [activeAssignContainer, setActiveAssignContainer] = useState<string | null>(null);
  const [libraryFilter, setLibraryFilter] = useState<string>("All");
  const [librarySearch, setLibrarySearch] = useState<string>("");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [showTokenInput, setShowTokenInput] = useState<boolean>(false);

  // Synchronize state with our full-stack server APIs on load
  const fetchRazorpayData = async () => {
    try {
      setIsRefreshingRzp(true);
      const res = await fetch("/api/razorpay/data");
      const d = await res.json();
      if (d.keys) {
        setRazorpayKeyId(d.keys.keyId);
        setRazorpayConnected(d.keys.isConnected);
      }
      if (d.transactions) setRzpTransactions(d.transactions);
      if (d.orders) setRzpOrders(d.orders);
      if (d.enrollments) {
        setRzpEnrollments(d.enrollments);
        // Map enrolled students into roster list
        if (d.enrollments.length > 0) {
          const mapped = d.enrollments.map((en: any, idx: number) => ({
            id: en.id,
            name: en.studentName,
            courseName: en.courseTitle,
            progress: 100,
            paymentStatus: "Paid" as const,
            enrollmentDate: en.date
          }));
          setStudents(mapped);
        }
      }
    } catch (err) {
      console.error("Failed fetching Razorpay details:", err);
    } finally {
      setIsRefreshingRzp(false);
    }
  };

  const fetchInstagramConfig = async () => {
    try {
      const res = await fetch("/api/instagram/config");
      const d = await res.json();
      if (d.instagramAccount) {
        setInstagramConnected(d.instagramAccount.connected);
        setInstagramUsername(d.instagramAccount.username);
        setInstagramToken(d.instagramAccount.accessToken);
      }
      if (d.assignedContainers) {
        setAssignedContainers(d.assignedContainers);
      }
      if (d.instagramLibrary) {
        setInstagramLibrary(d.instagramLibrary);
      }
    } catch (err) {
      console.error("Failed fetching Instagram configs:", err);
    }
  };

  useEffect(() => {
    fetchRazorpayData();
    fetchInstagramConfig();
  }, []);

  // Listen for popup callback events for successful Instagram OAuth
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        fetchInstagramConfig();
        alert("Success! Instagram connected. Media content imported directly from Meta Graph.");
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Handle saving containers to node server side as well
  const handleSaveContainerMedia = async (newVal: any) => {
    try {
       setAssignedContainers(newVal);
       localStorage.setItem("blush_instagram_containers", JSON.stringify(newVal));
       window.dispatchEvent(new Event("instagram-containers-updated"));
       
       await fetch("/api/instagram/containers", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ assigned: newVal })
       });
    } catch (err) {
       console.error("Could not sync media containers server side", err);
    }
  };

  const logoSlotName = (key: string) => {
    switch (key) {
      case "container_01": return "Transformation Slot 01";
      case "container_02": return "Transformation Slot 02";
      case "container_03": return "Transformation Slot 03";
      case "container_04": return "Transformation Slot 04";
      case "container_05": return "Tutorial Slot 01";
      case "container_06": return "Tutorial Slot 02";
      case "container_07": return "Tutorial Slot 03";
      case "container_08": return "Tutorial Slot 04";
      case "container_09": return "Gallery Slot 01";
      case "container_10": return "Gallery Slot 02";
      case "container_11": return "Gallery Slot 03";
      case "container_12": return "Gallery Slot 04";
      default: return key;
    }
  };

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
    localStorage.setItem("blush_sim_razorpay_connected", String(razorpayConnected));
  }, [razorpayConnected]);

  useEffect(() => {
    localStorage.setItem("blush_sim_instagram_connected", String(instagramConnected));
  }, [instagramConnected]);

  useEffect(() => {
    localStorage.setItem("blush_sim_instagram_username", instagramUsername);
    localStorage.setItem("blush_sim_instagram_token", instagramToken);
  }, [instagramUsername, instagramToken]);

  useEffect(() => {
    localStorage.setItem("blush_sim_instagram_library", JSON.stringify(instagramLibrary));
  }, [instagramLibrary]);

  useEffect(() => {
    localStorage.setItem("blush_instagram_containers", JSON.stringify(assignedContainers));
    window.dispatchEvent(new Event("instagram-containers-updated"));
  }, [assignedContainers]);

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
  const triggerRazorpaySimulatedConnect = () => {
    if (razorpayConnected) {
      // Disconnect
      setRazorpayConnected(false);
      setStudents([]);
      setCourses(courses.map(c => ({ ...c, studentsCount: 0, revenue: 0 })));
    } else {
      // Connect & Populate with premium, clean realistic demo records
      setRazorpayConnected(true);
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

    if (!razorpayConnected) {
      alert("Please connect Razorpay first to authorize payment verification pipelines and enroll students!");
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
  const activeStudentsCount = razorpayConnected ? (rzpEnrollments.length > 0 ? rzpEnrollments.length : students.length) : 0;
  const courseTotalRevenue = razorpayConnected 
    ? (rzpTransactions.length > 0 
        ? rzpTransactions.filter(tx => tx.status === "captured" || tx.status === "successful").reduce((sum, tx) => sum + (tx.amountPaid || (tx.amount)), 0)
        : courses.reduce((sum, c) => sum + c.revenue, 0))
    : 0;

  return (
    <section id="creator-dashboard" className="bg-[#FEFDFB] border-t border-brand-rose/20 relative py-12 text-left min-h-screen">
      
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] bg-zinc-950 border border-brand-rose/35 text-white text-xs font-semibold px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 animate-slideDown font-sans">
          <Sparkles size={14} className="text-[#B76E79] shrink-0 animate-pulse" />
          <span>{toast}</span>
          <button 
            onClick={() => setToast(null)}
            className="text-stone-400 hover:text-white ml-2.5 font-bold font-sans text-xs border-0 bg-transparent cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

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
              <span className="text-stone-500 font-sans">Kajabi &amp; Razorpay Secured Business Center</span>
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
                  setActiveTab("razorpay");
                  setShowSetupTray(true);
                }}
                className={`text-[10.5px] font-sans font-bold px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all cursor-pointer ${
                  razorpayConnected 
                    ? "bg-emerald-55 text-emerald-850 border-emerald-200 shadow-xs" 
                    : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-105"
                }`}
                title="Click to view Razorpay configuration details"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${razorpayConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-450"}`} />
                <span>{razorpayConnected ? "✓ Razorpay Connected" : "⚠ Razorpay Setup Incomplete"}</span>
              </div>

              <div
                onClick={() => {
                  if (instagramConnected) {
                     setInstagramConnected(false);
                     localStorage.setItem("blush_sim_instagram_connected", "false");
                     alert("Instagram account disconnected successfully.");
                  } else {
                     // trigger oauth flow
                     fetch("/api/auth/instagram/url")
                       .then(res => res.json())
                       .then(d => {
                          if (d.url) {
                            window.open(d.url, "instagram_oauth", "width=600,height=700");
                          } else {
                            alert("Meta credentials missing in env. Connecting sandbox mode.");
                            setInstagramConnected(true);
                            localStorage.setItem("blush_sim_instagram_connected", "true");
                          }
                       })
                       .catch(() => {
                          setInstagramConnected(true);
                          localStorage.setItem("blush_sim_instagram_connected", "true");
                       });
                  }
                }}
                className={`text-[10.5px] font-sans font-bold px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all cursor-pointer ${
                  instagramConnected 
                    ? "bg-pink-55 text-pink-850 border-pink-200 shadow-xs" 
                    : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-105"
                }`}
                title="Click to authenticate or disconnect Instagram account"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${instagramConnected ? "bg-pink-500 animate-pulse" : "bg-stone-400"}`} />
                <span>{instagramConnected ? `✓ Joined as @${instagramUsername}` : "⚠ Connect Instagram"}</span>
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
                  <span>Configure Live API Integration Channels</span>
                </h3>
                <p className="text-xs text-stone-500 leading-normal">
                  Toggle production credentials or synchronize live feeds with meta graph servers and Razorpay payments verification webhooks.
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
                    <span className="font-semibold text-stone-850">Razorpay Payment Hub</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider font-extrabold uppercase ${razorpayConnected ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>
                      {razorpayConnected ? "Live" : "Sandbox"}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Processes luxury student mentorship program checkout orders and handles refunds securely.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("razorpay");
                    setShowSetupTray(false);
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] duration-200 cursor-pointer text-center border-0 ${razorpayConnected ? 'bg-stone-100 text-stone-700 hover:bg-stone-200' : 'bg-[#B76E79] text-white hover:bg-[#a35e68]'}`}
                >
                  {razorpayConnected ? "Configure Razorpay" : "Connect Razorpay Gateway"}
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
                    Fetches dynamic tutorial impressions, high-fidelity portfolio uploads, and engagement statistics.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (instagramConnected) {
                      setInstagramConnected(false);
                      localStorage.setItem("blush_sim_instagram_connected", "false");
                      alert("Instagram disconnected.");
                    } else {
                       fetch("/api/auth/instagram/url")
                         .then(res => res.json())
                         .then(d => {
                           if (d.url) {
                             window.open(d.url, "instagram_oauth", "width=600,height=700");
                           } else {
                             setInstagramConnected(true);
                             localStorage.setItem("blush_sim_instagram_connected", "true");
                             alert("Meta Client Credentials missing in env. Connected demo profile.");
                           }
                         })
                         .catch(() => {
                           setInstagramConnected(true);
                           localStorage.setItem("blush_sim_instagram_connected", "true");
                         });
                    }
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] duration-200 cursor-pointer text-center border-0 ${instagramConnected ? 'bg-stone-100 text-stone-700 hover:bg-stone-200' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
                >
                  {instagramConnected ? "Disconnect Instagram Profile" : "Sync Instagram Profile"}
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
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 mb-10 text-stone-800 font-sans" id="premium-bento-navigation">
          
          {/* Dashboard Overall Card */}
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex flex-col items-center justify-between p-3.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
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
              <span className="block text-[11px] font-bold uppercase tracking-wider">
                Dashboard
              </span>
              <span className="block text-[8px] font-mono text-stone-400 font-bold">
                Main Operating OS
              </span>
            </div>
          </button>

          {/* Courses Card */}
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex flex-col items-center justify-between p-3.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
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
              <span className="block text-[11px] font-bold uppercase tracking-wider">
                Courses
              </span>
              <span className="block text-[8px] font-mono text-[#B76E79] font-extrabold">
                {courses.length} Hosted
              </span>
            </div>
          </button>

          {/* Students Card */}
          <button
            onClick={() => setActiveTab("students")}
            className={`flex flex-col items-center justify-between p-3.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
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
              <span className="block text-[11px] font-bold uppercase tracking-wider">
                Students
              </span>
              <span className="block text-[8px] font-mono text-[#B76E79] font-extrabold">
                {activeStudentsCount} Active
              </span>
            </div>
          </button>

          {/* Bookings Card */}
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex flex-col items-center justify-between p-3.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
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
              <span className="block text-[11px] font-bold uppercase tracking-wider">
                Bookings
              </span>
              <span className="block text-[8px] font-mono text-[#B76E79] font-extrabold">
                {makeupBookings.length} Requests
              </span>
            </div>
          </button>

          {/* Content Card */}
          <button
            onClick={() => setActiveTab("content")}
            className={`flex flex-col items-center justify-between p-3.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
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
              <span className="block text-[11px] font-bold uppercase tracking-wider">
                Content
              </span>
              <span className="block text-[8px] font-mono text-[#B76E79] font-extrabold">
                Containers
              </span>
            </div>
          </button>

          {/* Razorpay Card */}
          <button
            onClick={() => setActiveTab("razorpay")}
            className={`flex flex-col items-center justify-between p-3.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
              activeTab === "razorpay" 
                ? "bg-[#FFF2F2] border-[#B76E79] text-brand-dark ring-3 ring-[#B76E79]/15" 
                : "bg-white/70 backdrop-blur-md border-[#B76E79]/10 hover:border-[#B76E79]/45 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            }`}
            id="nav-tab-razorpay"
          >
            <div className="bg-emerald-50 border border-emerald-150 p-2 rounded-xl text-xl mb-1 group-hover:scale-110 transition-transform">
              💳
            </div>
            <div className="space-y-0.5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-900">
                Razorpay
              </span>
              <span className="block text-[8px] font-mono text-emerald-600 font-extrabold">
                {razorpayConnected ? "Live Hub" : "Sandbox"}
              </span>
            </div>
          </button>

          {/* Collaborations Card */}
          <button
            onClick={() => setActiveTab("collabs")}
            className={`flex flex-col items-center justify-between p-3.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
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
              <span className="block text-[11px] font-bold uppercase tracking-wide">
                Brands
              </span>
              <span className="block text-[8px] font-mono text-[#B76E79] font-bold">
                {leads.length} Contracts
              </span>
            </div>
          </button>

          {/* Leads Card */}
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex flex-col items-center justify-between p-3.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
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
              <span className="block text-[11px] font-bold uppercase tracking-wider">
                Leads
              </span>
              <span className="block text-[8px] font-mono text-[#B76E79] font-extrabold">
                {subscribers.length} Friends
              </span>
            </div>
          </button>

          {/* Automation Card */}
          <button
            onClick={() => setActiveTab("automations")}
            className={`flex flex-col items-center justify-between p-3.5 rounded-2xl text-center transition-all duration-300 group cursor-pointer border shadow-xs min-h-[110px] ${
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
              <span className="block text-[11px] font-bold uppercase tracking-wider">
                Automation
              </span>
              <span className="block text-[8px] font-mono text-emerald-600 font-extrabold">
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
            {(!razorpayConnected || !instagramConnected) && (
              <div className="bg-amber-50/70 border border-amber-200/50 rounded-2xl p-4 flex flex-start sm:items-center gap-3">
                <AlertCircle className="text-amber-600 shrink-0 mt-0.5 sm:mt-0" size={16} />
                <div className="text-xs text-amber-900 leading-normal font-sans">
                  <span className="font-bold">Notice:</span> Some active payment and media metrics are running in local sandbox fallback mode. Configure live keys inside the <span className="font-bold">Razorpay Manager</span> or authenticate your <span className="font-bold">Instagram Account</span> for live synchronization.
                </div>
              </div>
            )}

            {/* Standard Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Course Sales */}
              <div className="bg-white p-6 rounded-2xl border border-brand-rose/10 shadow-xs relative overflow-hidden group">
                <div className="flex items-center justify-between text-stone-400 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Course Sales</span>
                  <BookOpen size={14} className="text-[#B76E79]" />
                </div>
                {razorpayConnected ? (
                  <div>
                    <h3 className="text-2xl font-bold font-mono text-zinc-900">{formatPrice(courseTotalRevenue)}</h3>
                    <p className="text-[10px] text-zinc-500 mt-1">Live Razorpay Revenue</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wide">Connect Razorpay</h3>
                    <p className="text-[9.5px] text-stone-400 leading-normal">Configure checkout credentials for courses</p>
                  </div>
                )}
              </div>

              {/* Active Students */}
              <div className="bg-white p-6 rounded-2xl border border-brand-rose/10 shadow-xs relative overflow-hidden group">
                <div className="flex items-center justify-between text-stone-400 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Active Students</span>
                  <Users size={14} className="text-[#B76E79]" />
                </div>
                {razorpayConnected ? (
                  <div>
                    <h3 className="text-2xl font-bold font-mono text-zinc-900">{activeStudentsCount}</h3>
                    <p className="text-[10px] text-zinc-500 mt-1">Enrolled on portals</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wide">Awaiting Enrollments</h3>
                    <p className="text-[9.5px] text-stone-400 leading-normal">Connect Razorpay to launch mentorship</p>
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
                    <p className="text-[9.5px] text-stone-400 leading-normal">Cal.com scheduling channel status</p>
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
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Payments Channels</span>
                  <CheckCircle2 size={14} className="text-emerald-500/80" />
                </div>
                {razorpayConnected ? (
                  <div>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      <span className="text-xs font-mono">Razorpay Live</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1">Automatic INR deposits</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wide">Credentials Missing</h3>
                    <p className="text-[9.5px] text-stone-400 leading-normal">Secure payment sheet offline</p>
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
                    To verify payment structures, toggle simulator checkouts directly inside the <strong className="text-stone-850">Razorpay Manager</strong> or simulate credentials securely.
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
                      if (!razorpayConnected) {
                        alert("Please configure Razorpay credentials first using simulated or live access tokens.");
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
                        {razorpayConnected ? (
                          <strong className="text-sm font-bold text-neutral-800 font-mono mt-0.5 block">{cur.studentsCount} Active</strong>
                        ) : (
                          <span className="text-[10.5px] italic text-[#B76E79] font-bold block mt-0.5">Awaiting First Enrollment</span>
                        )}
                      </div>
                      <div className="text-left font-sans">
                        <p className="text-[9.5px] text-stone-400 uppercase font-mono tracking-wider font-bold font-semibold">Revenue Generated</p>
                        {razorpayConnected ? (
                          <strong className="text-sm font-bold text-zinc-900 font-mono mt-0.5 block">{formatPrice(cur.revenue)}</strong>
                        ) : (
                          <span className="text-[10.5px] text-stone-400 block mt-0.5">Awaiting Checkout</span>
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
                          if (!razorpayConnected) {
                            alert("Please configure Razorpay credentials to view classroom and student registrations.");
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
                    if (!razorpayConnected) {
                      alert("Please configure Razorpay credentials or toggle simulation first to register manual student cohorts.");
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
            {showAddStudentForm && razorpayConnected && (
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
            {razorpayConnected && students.length > 0 ? (
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
                    This platform currently has no active student directory entries. Connect Razorpay to auto-import students on verified invoice checkouts.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={triggerRazorpaySimulatedConnect}
                    className="bg-brand-rose hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Simulate Razorpay Hook Connection
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
            SECTION 5: INTEGRATED INSTAGRAM CONTENT MANAGER & CONTAINER ASSIGNMENT
            ======================================================== */}
        {activeTab === "content" && (
          <div className="space-y-8 animate-fadeIn" id="instagram-content-manager-section">
            
            {/* Header Block with Meta Authenticator */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b border-stone-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E1306C] animate-pulse"></span>
                  <h2 className="font-serif text-2xl font-bold text-brand-dark">Instagram Content Manager</h2>
                </div>
                <p className="text-xs text-stone-500 mt-1 max-w-xl">
                  Connect Rakhee's official Instagram account, fetch Reels & Posts from the Meta Graph API, and map them directly into dynamic frontend container slots without touching code.
                </p>
              </div>

              {/* AUTH BUTTONS BLOCK */}
              <div className="flex flex-wrap items-center gap-3">
                {instagramConnected ? (
                  <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl" id="ig-connected-badge">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 relative flex items-center justify-center">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-800">
                      Connected as @{instagramUsername}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 bg-stone-50 border border-stone-100 px-4 py-2 rounded-xl" id="ig-disconnected-badge">
                    <span className="font-sans text-xs text-stone-400 font-medium">Instagram Disconnected</span>
                  </div>
                )}

                <div className="flex gap-2">
                  {!instagramConnected ? (
                    <button
                      onClick={() => {
                        const client_id = "138092837264821";
                        const rUri = `${window.location.origin}/`;
                        const authorize_url = `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(rUri)}&scope=user_profile,user_media&response_type=code`;
                        
                        const width = 600;
                        const height = 700;
                        const left = window.screenX + (window.outerWidth - width) / 2;
                        const top = window.screenY + (window.outerHeight - height) / 2;
                        
                        const popup = window.open(authorize_url, "instagram_oauth", `width=${width},height=${height},left=${left},top=${top}`);
                        if (popup) {
                          alert("Opened Instagram App Authorization Portal. Approve the consent form or input a token below.");
                          setInstagramConnected(true);
                          setInstagramUsername("blushwithrakhee");
                          setShowTokenInput(true);
                        } else {
                          // Fallback to state change
                          setInstagramConnected(true);
                          setInstagramUsername("blushwithrakhee");
                          setShowTokenInput(true);
                        }
                      }}
                      className="bg-[#2D2A29] hover:bg-[#E1306C] text-white text-[11px] uppercase font-bold font-mono tracking-wider px-4 py-2.5 rounded-xl duration-300 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Instagram size={14} />
                      Connect Instagram Account
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setShowTokenInput(true);
                          alert("Enter your updated Long-Lived User Access Token below to refresh connection endpoints.");
                        }}
                        className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-[11px] uppercase font-bold font-mono tracking-wider px-3.5 py-2.5 rounded-xl duration-300 transition-all cursor-pointer"
                      >
                        Reconnect Account
                      </button>
                      
                      <button
                        onClick={() => {
                          setInstagramConnected(false);
                          setInstagramUsername("blushwithrakhee");
                          setInstagramToken("");
                          localStorage.setItem("blush_sim_instagram_connected", "false");
                          localStorage.setItem("blush_sim_instagram_username", "blushwithrakhee");
                          localStorage.setItem("blush_sim_instagram_token", "");
                          setAssignedContainers({});
                          localStorage.removeItem("blush_instagram_containers");
                          window.dispatchEvent(new Event("instagram-containers-updated"));
                          alert("Disconnected Instagram account successfully. Homepage visual slots reverted to default styling.");
                        }}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] uppercase font-bold font-mono tracking-wider px-3.5 py-2.5 rounded-xl duration-300 transition-all cursor-pointer"
                      >
                        Disconnect
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* INSTAGRAM SETTINGS / TOKEN DRAWER */}
            {showTokenInput && (
              <div className="bg-[#FAF8F5] border border-brand-rose/25 rounded-2xl p-5 space-y-4 animate-slideDown" id="instagram-token-panel">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-brand-dark">Meta API Credentials Override</h4>
                    <p className="text-[11px] text-stone-500">Provide an authentic system long-lived Instagram Token to query the real Graph API. Keep empty to work with high-fidelity template presets.</p>
                  </div>
                  <button 
                    onClick={() => setShowTokenInput(false)}
                    className="text-stone-400 hover:text-stone-700 font-mono text-xs"
                  >
                    Close [x]
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold font-mono tracking-wider text-stone-500">Connected Handle</label>
                    <input 
                      type="text" 
                      value={instagramUsername}
                      onChange={(e) => setInstagramUsername(e.target.value.replace("@", ""))}
                      placeholder="e.g. blushwithrakhee"
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-brand-dark focus:outline-none focus:border-brand-rose font-mono"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-[10px] uppercase font-bold font-mono tracking-wider text-stone-500">Long-Lived Access Token (User Media Scoped)</label>
                    <div className="flex gap-2">
                      <input 
                        type="password" 
                        value={instagramToken}
                        onChange={(e) => setInstagramToken(e.target.value)}
                        placeholder="IGQVJ..."
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-brand-dark focus:outline-none focus:border-brand-rose"
                      />
                      <button
                        onClick={() => {
                          setShowTokenInput(false);
                          alert(`Configured token successfully for username @${instagramUsername}! Try syncing latest posts now.`);
                        }}
                        className="bg-brand-rose hover:bg-brand-rose/85 text-white text-[10px] font-bold tracking-wider font-mono uppercase px-4 py-2 rounded-xl duration-200"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 rounded-xl p-3 border border-stone-150 text-[10px] sm:text-xs text-stone-600 space-y-1">
                  <p className="font-bold text-stone-700">📋 Setup Step Instructions:</p>
                  <ol className="list-decimal list-inside space-y-0.5 leading-relaxed pl-1 text-stone-500">
                    <li>Create or register an Instagram Test App in your Meta Developer Console inside <a href="https://developers.facebook.com" target="_blank" rel="noreferrer" className="text-brand-rose underline">developers.facebook.com</a></li>
                    <li>Add the designated authorization Redirect URI: <span className="font-mono bg-stone-100 p-0.5 rounded text-[10px] selection:bg-brand-blush">{window.location.origin}/</span> in your basic settings</li>
                    <li>Generate a User Token inside the User Token Generator section or copy-paste it directly to bypass App Review.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* SYNC ENGINE STATUS CARD */}
            <div className="bg-white p-5 rounded-2xl border border-brand-rose/10 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm" id="instagram-sync bg-card">
              <div className="flex items-center gap-3.5 text-left">
                <div className="p-3 bg-[#FFF2F2] rounded-2xl text-[#E1306C]">
                  <RefreshCw className={isSyncing ? "animate-spin" : ""} size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-stone-850">Instagram Auto-Sync Pipeline</h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">Loads the latest media, likes, comment rates, and permalinks from the connected Meta profile directly.</p>
                </div>
              </div>

              <div>
                <button
                  onClick={async () => {
                    setIsSyncing(true);
                    alert("Calling Meta Graph integration endpoints... Please wait.");
                    
                    setTimeout(() => {
                      if (instagramToken && instagramToken.length > 8) {
                        fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${instagramToken}`)
                          .then(r => r.json())
                          .then(res => {
                            if (res.data) {
                              const list = res.data.map((item: any) => ({
                                id: item.id,
                                caption: item.caption || "Live Instagram Publication",
                                media_type: item.media_type,
                                media_url: item.media_url,
                                permalink: item.permalink,
                                thumbnail_url: item.thumbnail_url || item.media_url,
                                timestamp: item.timestamp,
                                username: item.username || instagramUsername
                              }));
                              setInstagramLibrary(list);
                              setIsSyncing(false);
                              alert(`Successfully synchronized ${list.length} live publications from your official @${instagramUsername} Meta Profile!`);
                            } else {
                              setInstagramLibrary(DEFAULT_INSTAGRAM_LIBRARY);
                              setIsSyncing(false);
                              alert("Notice: Meta API returned empty dataset. Preloaded beauty templates added to library instead.");
                            }
                          })
                          .catch(() => {
                            setInstagramLibrary(DEFAULT_INSTAGRAM_LIBRARY);
                            setIsSyncing(false);
                            alert("Synced beauty template presets successfully! Connect a real developer token to override with live feeds.");
                          });
                      } else {
                        setInstagramLibrary(DEFAULT_INSTAGRAM_LIBRARY);
                        setIsSyncing(false);
                        alert(`Successfully synchronized 8 beautiful beauty publications for the account @${instagramUsername}!`);
                      }
                    }, 1500);
                  }}
                  disabled={isSyncing}
                  className="bg-[#2D2A29] hover:bg-brand-rose disabled:bg-stone-300 text-white font-mono text-[11px] font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSyncing ? "Syncing..." : "Sync Latest Instagram Content"}
                </button>
              </div>
            </div>


            {/* ==================== CONTAINER ASSIGNMENT SLOTS ==================== */}
            <div className="space-y-5 text-left" id="container-assignment-deck">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-dark">Dynamic Container Slots</h3>
                <p className="text-xs text-stone-500">Bind your synced Instagram items to these specific visual areas on the homepage.</p>
              </div>

              {/* THREE DYNAMIC GROUPS OF SLOTS */}
              <div className="space-y-8">
                
                {/* GROUP 1: Before & After transformations */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-105">
                    <span className="text-sm font-bold text-stone-700">🎨 Section Group 01: Transformations & Results</span>
                    <span className="text-[10px] font-mono text-brand-rose font-bold uppercase bg-brand-sand px-2 py-0.5 rounded-full">Replaces Before &amp; After cards</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { key: "container_01", label: "Transformation Slot 01", desc: "Aarohi's Sangeet Glam Card" },
                      { key: "container_02", label: "Transformation Slot 02", desc: "Meera's Royal Bridal Card" },
                      { key: "container_03", label: "Transformation Slot 03", desc: "Ritika's Glass Skin Card" },
                      { key: "container_04", label: "Transformation Slot 04", desc: "Elena's Crimson card" }
                    ].map((slot) => {
                      const item = assignedContainers[slot.key];
                      return (
                        <div key={slot.key} className="bg-white rounded-2xl border border-[#B76E79]/15 overflow-hidden flex flex-col justify-between min-h-[224px] shadow-xs group hover:border-[#B76E79]">
                          <div className="p-3 bg-stone-50/70 border-b border-stone-100 flex items-center justify-between">
                            <div>
                              <span className="block font-mono text-[10px] uppercase font-bold text-[#B76E79]">{slot.key.toUpperCase().replace("_", " ")}</span>
                              <span className="block text-[9px] text-stone-400 font-medium">{slot.desc}</span>
                            </div>
                            <span className="text-xs">📺</span>
                          </div>

                          {item ? (
                            <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                              <div className="flex gap-2.5 items-start">
                                <div className="w-14 h-14 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                                  <img 
                                    src={item.media_type === "VIDEO" && item.thumbnail_url ? item.thumbnail_url : item.media_url} 
                                    className="w-full h-full object-cover" 
                                    alt="Thumbnail" 
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="space-y-0.5 text-left">
                                  <span className="inline-block text-[8px] bg-brand-sand font-mono uppercase font-extrabold px-1.5 py-0.5 rounded text-[#B76E79]">{item.media_type}</span>
                                  <p className="text-[10.5px] text-stone-600 line-clamp-2 leading-tight">{item.caption}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 pt-2 border-t border-stone-50">
                                <button
                                  onClick={() => {
                                    const win = window.open(item.permalink, "_blank");
                                    if (!win) alert("Link opened! Check browser blocker settings.");
                                  }}
                                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[9px] uppercase font-bold font-mono py-1.5 rounded-lg text-center"
                                >
                                  Preview
                                </button>
                                <button
                                  onClick={() => setActiveAssignContainer(slot.key)}
                                  className="flex-1 bg-brand-sand hover:bg-[#FFF2F2] text-[#B76E79] text-[9px] uppercase font-bold font-mono py-1.5 rounded-lg text-center"
                                >
                                  Replace
                                </button>
                                <button
                                  onClick={() => {
                                    const next = { ...assignedContainers };
                                    delete next[slot.key];
                                    setAssignedContainers(next);
                                    alert(`Removed item from ${logoSlotName(slot.key)}.`);
                                  }}
                                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg"
                                  title="Unassign Slot"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="p-6 flex-1 flex flex-col justify-center items-center text-center space-y-3.5">
                              <span className="text-xl">📸</span>
                              <div>
                                <span className="block text-xs font-bold text-stone-700">{slot.label}</span>
                                <span className="block text-[9px] text-stone-400 mt-0.5">Empty Static Fallback in operation</span>
                              </div>
                              <button
                                onClick={() => setActiveAssignContainer(slot.key)}
                                className="bg-brand-sand hover:bg-brand-rose hover:text-white text-[#B76E79] text-[9.5px] font-mono tracking-wider font-extrabold uppercase py-1.5 px-3 rounded-lg duration-200 cursor-pointer"
                              >
                                Assign Media
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* GROUP 2: Video Testimonials & Tutorials */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-105">
                    <span className="text-sm font-bold text-stone-700">🎬 Section Group 02: Featured Tutorials &amp; Highlights</span>
                    <span className="text-[10px] font-mono text-brand-rose font-bold uppercase bg-brand-sand px-2 py-0.5 rounded-full">Replaces Showcase Tutorials Grid</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { key: "container_05", label: "Tutorial Slot 01", desc: "Main Soft Glam Class" },
                      { key: "container_06", label: "Tutorial Slot 02", desc: "Bridal Masterclass Course" },
                      { key: "container_07", label: "Tutorial Slot 03", desc: "Party Makeup Course" },
                      { key: "container_08", label: "Tutorial Slot 04", desc: "Accessibility Dupes Class" }
                    ].map((slot) => {
                      const item = assignedContainers[slot.key];
                      return (
                        <div key={slot.key} className="bg-white rounded-2xl border border-[#B76E79]/15 overflow-hidden flex flex-col justify-between min-h-[224px] shadow-xs group hover:border-[#B76E79]">
                          <div className="p-3 bg-stone-50/70 border-b border-stone-100 flex items-center justify-between">
                            <div>
                              <span className="block font-mono text-[10px] uppercase font-bold text-[#B76E79]">{slot.key.toUpperCase().replace("_", " ")}</span>
                              <span className="block text-[9px] text-stone-400 font-medium">{slot.desc}</span>
                            </div>
                            <span className="text-xs">🎥</span>
                          </div>

                          {item ? (
                            <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                              <div className="flex gap-2.5 items-start">
                                <div className="w-14 h-14 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                                  <img 
                                    src={item.media_type === "VIDEO" && item.thumbnail_url ? item.thumbnail_url : item.media_url} 
                                    className="w-full h-full object-cover" 
                                    alt="Thumbnail" 
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="space-y-0.5 text-left">
                                  <span className="inline-block text-[8px] bg-brand-sand font-mono uppercase font-extrabold px-1.5 py-0.5 rounded text-[#B76E79]">{item.media_type}</span>
                                  <p className="text-[10.5px] text-stone-600 line-clamp-2 leading-tight">{item.caption}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 pt-2 border-t border-stone-50">
                                <button
                                  onClick={() => {
                                    const win = window.open(item.permalink, "_blank");
                                    if (!win) alert("Link opened! Check browser blocker settings.");
                                  }}
                                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[9px] uppercase font-bold font-mono py-1.5 rounded-lg text-center"
                                >
                                  Preview
                                </button>
                                <button
                                  onClick={() => setActiveAssignContainer(slot.key)}
                                  className="flex-1 bg-brand-sand hover:bg-[#FFF2F2] text-[#B76E79] text-[9px] uppercase font-bold font-mono py-1.5 rounded-lg text-center"
                                >
                                  Replace
                                </button>
                                <button
                                  onClick={() => {
                                    const next = { ...assignedContainers };
                                    delete next[slot.key];
                                    setAssignedContainers(next);
                                    alert(`Removed item from ${logoSlotName(slot.key)}.`);
                                  }}
                                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg"
                                  title="Unassign Slot"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="p-6 flex-1 flex flex-col justify-center items-center text-center space-y-3.5">
                              <span className="text-xl">🎥</span>
                              <div>
                                <span className="block text-xs font-bold text-stone-700">{slot.label}</span>
                                <span className="block text-[9px] text-stone-400 mt-0.5">Empty Static Fallback in operation</span>
                              </div>
                              <button
                                onClick={() => setActiveAssignContainer(slot.key)}
                                className="bg-brand-sand hover:bg-brand-rose hover:text-white text-[#B76E79] text-[9.5px] font-mono tracking-wider font-extrabold uppercase py-1.5 px-3 rounded-lg duration-200 cursor-pointer"
                              >
                                Assign Media
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* GROUP 3: Home Live Instagram Feed & Reels Gallery */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-105">
                    <span className="text-sm font-bold text-stone-700">📸 Section Group 03: Live Instagram Portfolio Gallery &amp; Reels</span>
                    <span className="text-[10px] font-mono text-brand-rose font-bold uppercase bg-brand-sand px-2 py-0.5 rounded-full">Display Live Grid on Landing page</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { key: "container_09", label: "Gallery Slot 01", desc: "Aesthetic Grid item 1" },
                      { key: "container_10", label: "Gallery Slot 02", desc: "Aesthetic Grid item 2" },
                      { key: "container_11", label: "Gallery Slot 03", desc: "Aesthetic Grid item 3" },
                      { key: "container_12", label: "Gallery Slot 04", desc: "Aesthetic Grid item 4" }
                    ].map((slot) => {
                      const item = assignedContainers[slot.key];
                      return (
                        <div key={slot.key} className="bg-white rounded-2xl border border-[#B76E79]/15 overflow-hidden flex flex-col justify-between min-h-[224px] shadow-xs group hover:border-[#B76E79]">
                          <div className="p-3 bg-stone-50/70 border-b border-stone-100 flex items-center justify-between">
                            <div>
                              <span className="block font-mono text-[10px] uppercase font-bold text-[#B76E79]">{slot.key.toUpperCase().replace("_", " ")}</span>
                              <span className="block text-[9px] text-stone-400 font-medium">{slot.desc}</span>
                            </div>
                            <span className="text-xs">📸</span>
                          </div>

                          {item ? (
                            <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                              <div className="flex gap-2.5 items-start">
                                <div className="w-14 h-14 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                                  <img 
                                    src={item.media_type === "VIDEO" && item.thumbnail_url ? item.thumbnail_url : item.media_url} 
                                    className="w-full h-full object-cover" 
                                    alt="Thumbnail" 
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="space-y-0.5 text-left">
                                  <span className="inline-block text-[8px] bg-brand-sand font-mono uppercase font-extrabold px-1.5 py-0.5 rounded text-[#B76E79]">{item.media_type}</span>
                                  <p className="text-[10.5px] text-stone-600 line-clamp-2 leading-tight">{item.caption}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 pt-2 border-t border-stone-50">
                                <button
                                  onClick={() => {
                                    const win = window.open(item.permalink, "_blank");
                                    if (!win) alert("Link opened! Check browser blocker settings.");
                                  }}
                                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[9px] uppercase font-bold font-mono py-1.5 rounded-lg text-center"
                                >
                                  Preview
                                </button>
                                <button
                                  onClick={() => setActiveAssignContainer(slot.key)}
                                  className="flex-1 bg-brand-sand hover:bg-[#FFF2F2] text-[#B76E79] text-[9px] uppercase font-bold font-mono py-1.5 rounded-lg text-center"
                                >
                                  Replace
                                </button>
                                <button
                                  onClick={() => {
                                    const next = { ...assignedContainers };
                                    delete next[slot.key];
                                    setAssignedContainers(next);
                                    alert(`Removed item from ${logoSlotName(slot.key)}.`);
                                  }}
                                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg"
                                  title="Unassign Slot"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="p-6 flex-1 flex flex-col justify-center items-center text-center space-y-3.5">
                              <span className="text-xl">📸</span>
                              <div>
                                <span className="block text-xs font-bold text-stone-700">{slot.label}</span>
                                <span className="block text-[9px] text-stone-400 mt-0.5">Empty Static Fallback in operation</span>
                              </div>
                              <button
                                onClick={() => setActiveAssignContainer(slot.key)}
                                className="bg-brand-sand hover:bg-brand-rose hover:text-white text-[#B76E79] text-[9.5px] font-mono tracking-wider font-extrabold uppercase py-1.5 px-3 rounded-lg duration-200 cursor-pointer"
                              >
                                Assign Media
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* CONTENT LIBRARY OVERLAY MODAL FOR ASSIGNMENT */}
            {activeAssignContainer && (
              <div className="fixed inset-0 bg-[#2D2A29]/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn" id="content-library-assign-modal">
                <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-brand-rose/20 shadow-2xl">
                  
                  {/* Modal Header */}
                  <div className="p-5 border-b border-stone-100 flex justify-between items-center bg-[#FAF8F5]">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-brand-dark">Assign to {logoSlotName(activeAssignContainer)}</h4>
                      <p className="text-xs text-stone-500">Pick any connected reel, post or carousel album from the library below.</p>
                    </div>
                    <button 
                      onClick={() => setActiveAssignContainer(null)}
                      className="w-8 h-8 rounded-full bg-stone-150 hover:bg-brand-blush/20 text-[#2D2A29] flex items-center justify-center text-sm font-bold duration-200 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Filter and Search rail */}
                  <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {(["All", "Reels", "Posts / Carousels", "Videos"] as const).map((filt) => (
                        <button
                          key={filt}
                          onClick={() => setLibraryFilter(filt)}
                          className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer duration-200 ${
                            libraryFilter === filt
                              ? "bg-[#B76E79] text-white shadow-xs"
                              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                          }`}
                        >
                          {filt}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-2.5 text-stone-400" size={14} />
                      <input 
                        type="text" 
                        value={librarySearch}
                        onChange={(e) => setLibrarySearch(e.target.value)}
                        placeholder="Search captions..."
                        className="w-full bg-white border border-stone-200 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#B76E79]"
                      />
                    </div>
                  </div>

                  {/* Library Grid List */}
                  <div className="p-5 overflow-y-auto flex-1 bg-[#FDFCFB]" id="catalog-media-scroller">
                    {instagramLibrary.filter(item => {
                      // Apply Media filters
                      if (libraryFilter === "Reels") {
                        return item.media_type === "VIDEO" && item.caption.toLowerCase().includes("reel");
                      }
                      if (libraryFilter === "Videos") {
                        return item.media_type === "VIDEO" && !item.caption.toLowerCase().includes("reel");
                      }
                      if (libraryFilter === "Posts / Carousels") {
                        return item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM";
                      }
                      return true;
                    }).filter(item => {
                      // Apply Search filter
                      return item.caption.toLowerCase().includes(librarySearch.toLowerCase());
                    }).length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-left">
                        {instagramLibrary.filter(item => {
                          if (libraryFilter === "Reels") {
                            return item.media_type === "VIDEO" && item.caption.toLowerCase().includes("reel");
                          }
                          if (libraryFilter === "Videos") {
                            return item.media_type === "VIDEO" && !item.caption.toLowerCase().includes("reel");
                          }
                          if (libraryFilter === "Posts / Carousels") {
                            return item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM";
                          }
                          return true;
                        }).filter(item => {
                          return item.caption.toLowerCase().includes(librarySearch.toLowerCase());
                        }).map((item) => (
                          <div 
                            key={item.id}
                            className="bg-white rounded-xl border border-stone-150 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                          >
                            <div className="relative aspect-[4/5] bg-stone-100">
                              <img 
                                src={item.media_type === "VIDEO" && item.thumbnail_url ? item.thumbnail_url : item.media_url} 
                                alt="Instagram item" 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2 left-2 bg-[#2D2A29]/90 text-white font-mono text-[8.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md">
                                {item.media_type}
                              </div>
                            </div>

                            <div className="p-3 flex-1 flex flex-col justify-between space-y-3">
                              <p className="text-[10px] text-stone-600 line-clamp-3 leading-snug">{item.caption}</p>
                              
                              <button
                                onClick={() => {
                                  const next = { ...assignedContainers, [activeAssignContainer]: item };
                                  setAssignedContainers(next);
                                  setActiveAssignContainer(null);
                                  alert(`Successfully mapped item to ${logoSlotName(activeAssignContainer)}!`);
                                }}
                                className="w-full bg-[#B76E79] hover:bg-brand-rose text-white font-mono text-[9.5px] font-bold uppercase tracking-wider py-1.5 rounded-lg duration-200 cursor-pointer"
                              >
                                Select &amp; Assign
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-16 text-center space-y-2 text-stone-400">
                        <p className="text-sm font-medium">No files match the active filter options.</p>
                        <p className="text-xs">Try selecting 'All' or clearing your caption search keywords.</p>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 border-t border-stone-100 bg-[#FAF8F5] flex justify-end gap-2">
                    <button
                      onClick={() => setActiveAssignContainer(null)}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono text-[10px] uppercase font-bold px-4 py-2 rounded-xl duration-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                      <span className="font-mono bg-pink-600 text-white font-bold px-2.5 py-0.5 rounded text-[10px]">
                        {instagramChatLeads.length} Captured
                      </span>
                    </div>

                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-100 flex items-center justify-between">
                      <span className="font-semibold text-zinc-800">Course Inquiries</span>
                      <span className="font-mono bg-[#B76E79] text-white font-bold px-2 py-0.5 rounded text-[10px]">
                        {razorpayConnected ? "3 Active" : "No Data Available"}
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

              {/* Instagram chat leads roster list */}
              <div className="lg:col-span-12 bg-white p-5 rounded-3xl border border-brand-rose/10 shadow-xs">
                <div className="border-b border-stone-100 pb-3 flex justify-between items-center mb-4">
                  <div className="space-y-0.5">
                    <h3 className="font-serif text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                      <Instagram size={15} className="text-pink-650" />
                      <span>Captured Instagram DM Leads</span>
                    </h3>
                    <p className="text-[11px] text-stone-450">Complete bookings and date inquiries registered through your automated Instagram DM conversational assistant.</p>
                  </div>
                  <button
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8,ID,User,Phone,EventDate,Venue,Guests,Service,HowHeard,FlowStatus,Timestamp\n" + 
                        instagramChatLeads.map(l => `"${l.id}","${l.name}","${l.whatsapp}","${l.date}","${l.location}","${l.guestCount}","${l.desiredPackage}","${l.source || "Direct link"}","${l.status}","${l.timestamp}"`).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", "instagram_captured_leads.csv");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="bg-stone-50 hover:bg-[#FAF8F5] border border-stone-100 text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Download size={11} />
                    <span>Export CSV</span>
                  </button>
                </div>

                {/* Horizontal Card Slider Deck for Leads */}
                {instagramChatLeads && instagramChatLeads.length > 0 && (
                  <div className="mb-6 relative group/deck">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Slide or swipe to inspect profiles:</p>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            const container = document.getElementById("leads-snap-deck");
                            if (container) {
                              container.scrollBy({ left: -280, behavior: "smooth" });
                            }
                          }}
                          className="w-6 h-6 rounded-full bg-stone-50 border border-stone-150 flex items-center justify-center text-stone-500 hover:bg-brand-rose hover:text-white transition-all cursor-pointer shadow-2xs"
                        >
                          <ChevronLeft size={12} />
                        </button>
                        <button
                          onClick={() => {
                            const container = document.getElementById("leads-snap-deck");
                            if (container) {
                              container.scrollBy({ left: 280, behavior: "smooth" });
                            }
                          }}
                          className="w-6 h-6 rounded-full bg-stone-50 border border-stone-150 flex items-center justify-center text-stone-500 hover:bg-brand-rose hover:text-white transition-all cursor-pointer shadow-2xs"
                        >
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>

                    <div 
                      id="leads-snap-deck"
                      className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 px-1 no-scrollbar"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {instagramChatLeads.map((item) => (
                        <div 
                          key={`slide-${item.id}`}
                          className="flex-shrink-0 w-[280px] sm:w-[310px] snap-start bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-stone-150 hover:border-brand-blush/35 rounded-2xl p-4 transition-all duration-200"
                        >
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="space-y-0.5 min-w-0">
                              <span className="font-bold text-zinc-900 text-[12px] block truncate">{item.name}</span>
                              <span className="text-[9px] text-stone-400 font-mono block">
                                Captured: {new Date(item.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <span className={`text-[8.5px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono border whitespace-nowrap ${
                              item.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-250"
                                : "bg-amber-50 text-amber-600 border-amber-250"
                            }`}>
                              {item.status}
                            </span>
                          </div>

                          <div className="space-y-1.5 text-[11px] text-stone-600 mb-3">
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Phone size={9} /></span>
                              <span className="font-mono font-bold text-stone-850">{item.whatsapp || "No Phone"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-rose-50 text-[#B76E79] flex items-center justify-center shrink-0"><Calendar size={9} /></span>
                              <span className="font-semibold text-brand-rose">{item.date || "Not Provided"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center shrink-0"><MapPin size={9} /></span>
                              <span className="truncate" title={item.location}>{item.location || "Not Provided"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center shrink-0"><Sparkles size={9} /></span>
                              <span className="font-medium text-[10px] truncate">{item.desiredPackage || "Standard"} ({item.guestCount || 1} Guests)</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-stone-200/50 flex justify-between items-center bg-stone-100/30 -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl">
                            {item.source ? (
                              <span className={`inline-block text-[8px] px-2 py-0.5 rounded font-extrabold tracking-wider uppercase border whitespace-nowrap ${
                                item.source.toLowerCase().includes("google")
                                  ? "bg-blue-50 text-blue-700 border-blue-200/60"
                                  : item.source.toLowerCase().includes("instagram")
                                  ? "bg-pink-50 text-pink-700 border-pink-200/60"
                                  : "bg-purple-50 text-purple-700 border-purple-200/60"
                              }`}>
                                {item.source}
                              </span>
                            ) : (
                              <span className="text-[9px] text-stone-400 font-mono">Organic</span>
                            )}
                            <button
                              onClick={() => {
                                if (setInstagramChatLeads) {
                                  setInstagramChatLeads(prev => prev.filter(p => p.id !== item.id));
                                }
                              }}
                              className="text-stone-300 hover:text-rose-600 transition-colors p-1 rounded-full hover:bg-stone-200/50 cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto text-xs font-sans text-stone-600">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-stone-100 text-[10px] uppercase font-bold text-stone-400">
                        <th className="pb-3 text-left pl-3 min-w-[200px]">User Identity</th>
                        <th className="pb-3 text-left pl-3 min-w-[150px]">WhatsApp / Phone</th>
                        <th className="pb-3 text-left pl-3 min-w-[120px]">Inquiry Date</th>
                        <th className="pb-3 text-left pl-3 min-w-[180px]">Target Venue / Location</th>
                        <th className="pb-3 text-left pl-3 min-w-[180px]">Guests &amp; Service</th>
                        <th className="pb-3 text-center min-w-[100px]">Status</th>
                        <th className="pb-3 text-right pr-3 min-w-[60px]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {instagramChatLeads.map((item) => (
                        <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                          <td className="py-4 pl-3 pr-2">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-zinc-900 text-[12px]">{item.name}</span>
                              <span className="text-[9.5px] text-stone-400 font-mono">
                                Captured: {new Date(item.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 pl-3 pr-2">
                            <span className="font-mono text-stone-850 font-bold bg-neutral-100 px-2 py-1 rounded text-[11px] border border-neutral-200/50 inline-block whitespace-nowrap">
                              {item.whatsapp || "No Phone"}
                            </span>
                          </td>
                          <td className="py-4 pl-3 pr-2">
                            <span className="font-sans font-bold text-[#B76E79] bg-rose-50/50 border border-brand-blush/20 px-2 py-1 rounded text-[11.5px] inline-block whitespace-nowrap">
                              {item.date || "Not Provided"}
                            </span>
                          </td>
                          <td className="py-4 pl-3 pr-2">
                            <span className="text-stone-700 text-[11.5px] block truncate max-w-[170px]" title={item.location}>
                              {item.location || "Not Provided"}
                            </span>
                          </td>
                          <td className="py-4 pl-3 pr-2">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-bold text-stone-800 text-[11.5px]">{item.desiredPackage || "Standard"}</span>
                              <span className="text-[9.5px] text-stone-500 font-mono">Guests: {item.guestCount || "N/A"}</span>
                              {item.source && (
                                <span className={`inline-block text-[8.5px] px-1.5 py-0.5 mt-1 rounded font-bold tracking-wide uppercase max-w-max border ${
                                  item.source.toLowerCase().includes("google")
                                    ? "bg-blue-50 text-blue-700 border-blue-200/60"
                                    : item.source.toLowerCase().includes("instagram")
                                    ? "bg-pink-50 text-pink-700 border-pink-200/60"
                                    : "bg-purple-50 text-purple-700 border-purple-200/60"
                                }`}>
                                  ⭐ {item.source}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-2 text-center">
                            <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono border inline-block whitespace-nowrap ${
                              item.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-600 border-amber-200"
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 pr-3 text-right">
                            <button
                              onClick={() => {
                                if (setInstagramChatLeads) {
                                  setInstagramChatLeads(prev => prev.filter(p => p.id !== item.id));
                                }
                              }}
                              className="text-stone-300 hover:text-rose-600 transition-colors border-0 bg-transparent cursor-pointer p-1 rounded-full hover:bg-stone-100 inline-block"
                              title="Delete Lead"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {instagramChatLeads.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-stone-400 font-medium">
                            <div className="text-xl mb-1.5 opacity-65">💬</div>
                            <div>No Instagram lead conversations recorded yet.</div>
                          </td>
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
                    Auto-record newly transacted student listings and save them straight to Razorpay + Kajabi platforms with double-verified receipts.
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

        {/* ========================================================
            SECTION 9: PREMIUM BEAUTY REWARDS & LIVE CAMPAIGN OFFERS MANAGER
            ======================================================== */}
        {activeTab === "rewards" && (
          <div className="space-y-8 animate-fadeIn text-stone-850 font-sans">
            
            {/* Page Header */}
            <div className="border-b border-stone-200 pb-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <Gift className="text-[#B76E79]" size={24} />
                    <span>Premium Beauty Rewards Manager</span>
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Toggle active cosmetic discount rules, manage brand launch codes, deploy complimentary guides, and audit SSL transactions securely processed via Razorpay.
                  </p>
                </div>
                
                {/* Integration Status Indicators block */}
                <div className="flex gap-2.5">
                  <div className="px-3.5 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 tracking-wider">Razorpay Node Active</span>
                  </div>
                  <div className="px-3.5 py-1.5 bg-[#FFF2F2] rounded-full border border-[#B76E79]/20 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B76E79]" />
                    <span className="text-[10px] uppercase font-mono font-bold text-[#B76E79] tracking-wider">PCI-DSS Compliant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metric KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-xs space-y-1">
                <span className="text-stone-400 text-[10px] uppercase font-mono tracking-wider font-bold">Total Drawn Tickets</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif font-extrabold text-[#2D2A29]">{claims.length}</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">Unique codes</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-xs space-y-1">
                <span className="text-stone-400 text-[10px] uppercase font-mono tracking-wider font-bold">Redeemed Enrollees</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif font-extrabold text-[#2D2A29]">
                    {claims.filter(c => c.couponUsed).length}
                  </span>
                  <span className="text-[10px] text-[#B76E79] font-mono font-bold">
                    {claims.length > 0 
                      ? `${Math.round((claims.filter(c => c.couponUsed).length / claims.length) * 100)}% Conversion` 
                      : "0% Conversion"
                    }
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-xs space-y-1">
                <span className="text-stone-400 text-[10px] uppercase font-mono tracking-wider font-bold">Offer Conversion SLA</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif font-extrabold text-stone-900">100%</span>
                  <span className="text-[10px] text-[#B76E79] font-mono font-bold">Fraud-checked</span>
                </div>
              </div>

              <div className="bg-[#FFFBF9] p-5 rounded-2xl border border-[#B76E79]/20 shadow-xs space-y-1">
                <span className="text-stone-400 text-[10px] uppercase font-mono tracking-wider font-bold">Rewards Direct Revenue</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-serif font-extrabold text-emerald-700">
                    {formatPrice(claims.filter(c => c.couponUsed).reduce((sum, c) => sum + (c.revenueAmount || 0), 0))}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono font-bold">Net processed</span>
                </div>
              </div>

            </div>

            {/* Split layout: Rules on left, claims logs on right */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: Rewards Offers Rules & Generation Portal */}
              <div className="xl:col-span-7 space-y-6">
                
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Ticket size={18} className="text-[#B76E79]" />
                  <span>Configure Offers and Incentives Campaign</span>
                </h3>

                {/* Offer cards row */}
                <div className="space-y-4">
                  {rewards.map((r) => (
                    <div 
                      key={r.id} 
                      className={`bg-white p-5 rounded-2xl border transition-all ${r.isEnabled ? "border-stone-200/90 shadow-sm" : "border-stone-200/40 opacity-70 bg-stone-50/50"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-base text-stone-800">{r.label}</span>
                            <span className="font-mono text-[9px] uppercase tracking-wider bg-stone-100 font-extrabold px-2 py-0.5 rounded text-stone-600 border border-stone-200">
                              Prefix: {r.code}
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-stone-500 leading-relaxed font-sans font-medium">
                            Holds <span className="font-serif font-extrabold text-[#B76E79]">{r.type === "discount" ? `${r.value}% OFF` : r.type}</span> discount properties. Applies exclusively to: <strong className="text-stone-800">{r.eligibleCourses.join(", ")}</strong>.
                          </p>

                          <div className="flex gap-4 pt-1 text-[10px] font-mono text-stone-400 font-medium">
                            <span className="flex items-center gap-1">🎟️ {r.claimsCount} claimed</span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1 text-[#B76E79]">💰 {r.usedCount} checkouts</span>
                            <span>&bull;</span>
                            <span>⏰ Expiry: {r.expiryDate}</span>
                          </div>
                        </div>

                        {/* Switch block */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setRewards(prev => prev.map(item => item.id === r.id ? { ...item, isEnabled: !item.isEnabled } : item));
                              alert(`Successfully toggled offer: "${r.label}"`);
                            }}
                            className="bg-transparent border-0 cursor-pointer p-1"
                            title={r.isEnabled ? "Disable Offer" : "Enable Offer"}
                          >
                            {r.isEnabled ? (
                              <ToggleRight size={38} className="text-[#B76E79]" />
                            ) : (
                              <ToggleLeft size={38} className="text-stone-300" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Create offer bento layout card */}
                <div className="bg-[#FFFBF9]/40 border border-[#B76E79]/20 rounded-3xl p-6 space-y-4">
                  <div className="border-b border-[#B76E79]/10 pb-3 flex items-center gap-1.5">
                    <PlusCircle size={18} className="text-[#B76E79]" />
                    <h4 className="font-serif text-sm font-extrabold text-stone-800">Create New Custom Campaign Reward</h4>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newRewardLabel || !newRewardCode) {
                        alert("Please specify a public label and discount code prefix.");
                        return;
                      }

                      const newOffer: RewardConfig = {
                        id: "offer-" + Date.now(),
                        name: newRewardLabel,
                        label: newRewardLabel,
                        type: newRewardType,
                        value: Number(newRewardValue),
                        code: newRewardCode.toUpperCase().replace(/\s+/g, ""),
                        expiryDate: newRewardExpiry,
                        eligibleCourses: selectedEligibleCourses,
                        isEnabled: true,
                        maxClaims: 100,
                        claimsCount: 0,
                        usedCount: 0
                      };

                      setRewards(prev => [...prev, newOffer]);
                      alert(`New dynamic campaign "${newRewardLabel}" successfully deployed live!`);
                      
                      // Clear forms
                      setNewRewardLabel("");
                      setNewRewardCode("");
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs text-stone-700"
                  >
                    <div className="sm:col-span-2">
                      <label className="block text-stone-400 font-mono text-[9px] uppercase font-bold mb-1">Public Offer Title Campaign</label>
                      <input 
                        type="text" 
                        required
                        value={newRewardLabel}
                        onChange={(e) => setNewRewardLabel(e.target.value)}
                        placeholder="Bridal Advanced cohort discount - 15% off"
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 font-mono text-[9px] uppercase font-bold mb-1">Offer Category</label>
                      <select 
                        value={newRewardType}
                        onChange={(e) => setNewRewardType(e.target.value as any)}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                      >
                        <option value="discount">Pct Discount Offer</option>
                        <option value="freebie">Complimentary eBook Pack</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-400 font-mono text-[9px] uppercase font-bold mb-1">Discount % Value (if category of discount)</label>
                      <input 
                        type="number"
                        min="5"
                        max="100"
                        value={newRewardValue}
                        onChange={(e) => setNewRewardValue(Number(e.target.value))}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 font-mono text-[9px] uppercase font-bold mb-1">Code Prefix (All caps)</label>
                      <input 
                        type="text" 
                        required
                        value={newRewardCode}
                        onChange={(e) => setNewRewardCode(e.target.value)}
                        placeholder="GLAM15"
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#B76E79] font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 font-mono text-[9px] uppercase font-bold mb-1">Expiry Date string</label>
                      <input 
                        type="text" 
                        required
                        value={newRewardExpiry}
                        onChange={(e) => setNewRewardExpiry(e.target.value)}
                        placeholder="Dec 31, 2026"
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-stone-400 font-mono text-[9px] uppercase font-bold mb-1">Eligible Courses (Select checkboxes)</label>
                      <div className="space-y-2 bg-white rounded-xl border border-stone-200 p-3 mt-1">
                        {[
                          "Beauty Foundations Course",
                          "Advanced Artist Program",
                          "Professional Makeup Business Mastery"
                        ].map((cName) => (
                          <label key={cName} className="flex items-center gap-2 cursor-pointer text-[11px] font-sans font-medium text-stone-700">
                            <input 
                              type="checkbox"
                              checked={selectedEligibleCourses.includes(cName)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedEligibleCourses([...selectedEligibleCourses, cName]);
                                } else {
                                  setSelectedEligibleCourses(selectedEligibleCourses.filter(name => name !== cName));
                                }
                              }}
                              className="accent-[#B76E79]"
                            />
                            <span>{cName}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="sm:col-span-2 w-full mt-2 bg-stone-900 hover:bg-[#B76E79] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest py-3.5 rounded-xl cursor-pointer duration-350"
                    >
                      Authenticate and Deploy Campaign Offer &rarr;
                    </button>

                  </form>
                </div>

              </div>

              {/* RIGHT: User Claiming History & Live transaction audits */}
              <div className="xl:col-span-5 space-y-6">
                
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Users size={18} className="text-[#B76E79]" />
                  <span>Claim Registries and Razorpay Audits</span>
                </h3>

                {/* Claims items scrolling log panel */}
                <div className="bg-white border border-stone-200/60 rounded-3xl p-5.5 space-y-4 max-h-[700px] overflow-y-auto">
                  {claims.length === 0 ? (
                    <div className="text-center py-10 text-stone-400 font-sans space-y-2">
                      <Gift size={32} className="mx-auto text-stone-200 animate-bounce" />
                      <p className="text-xs">No reward tickets have been generated in the current caching queue yet.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-stone-100 divide-dashed space-y-4">
                      {claims.map((claim, idx) => (
                        <div key={claim.id} className={`pt-4 first:pt-0 space-y-2.5 font-sans`}>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-serif font-bold text-xs text-stone-800">
                                {claim.userName || "Anonymous Visitor"}
                              </p>
                              <p className="text-[10px] text-stone-400 font-mono">
                                {claim.userEmail || "No credentials yet"} &bull; {claim.userPhone || "No Whatsapp"}
                              </p>
                            </div>

                            {/* Coupon status badges */}
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide ${claim.couponUsed ? "bg-emerald-50 text-emerald-805" : "bg-slate-50 text-slate-500"}`}>
                              {claim.couponUsed ? "Redeemed" : "Drawn Only"}
                            </span>
                          </div>

                          {/* Details line */}
                          <div className="bg-stone-50 border border-stone-200/40 rounded-xl p-3 text-[10.5px] text-stone-500 space-y-1">
                            <p className="flex justify-between font-mono">
                              <span>Assigned code:</span>
                              <span className="font-bold text-[#B76E79] select-all uppercase">{claim.code}</span>
                            </p>
                            <p className="flex justify-between">
                              <span>Incentive:</span>
                              <strong className="text-stone-700">{claim.rewardLabel}</strong>
                            </p>
                            
                            {claim.couponUsed && claim.usedForCourse && (
                              <p className="flex justify-between pt-1 border-t border-stone-100 font-mono text-[10px] text-stone-400">
                                <span>Used For / Paid:</span>
                                <span className="font-bold text-emerald-600 truncate max-w-[170px]">
                                  {claim.usedForCourse} ({formatPrice(claim.revenueAmount || 0)})
                                </span>
                              </p>
                            )}

                            <p className="flex justify-between font-mono text-[9px] text-stone-400">
                              <span>Recorded SLA:</span>
                              <span>{new Date(claim.timestamp).toLocaleString("en-US", { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            SECTION 10: RAZORPAY PAYMENT GATEWAY MANAGER
            ======================================================== */}
        {activeTab === "razorpay" && (
          <div className="space-y-8 animate-fadeIn text-left font-sans" id="razorpay-admin-hub">
            
            {/* Header description card */}
            <div className="bg-gradient-to-r from-[#1A1A24] to-[#12121A] text-white p-7 rounded-3xl relative overflow-hidden shadow-xl border border-stone-850">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                      Official Meta-Secure Portal
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                    💳 Razorpay Operations Console
                  </h2>
                  <p className="text-stone-400 text-xs max-w-xl leading-relaxed">
                    Review incoming course program checkouts, manage custom order webhooks, process instantaneous tuition refunds, and toggle Live/Simulated payment credentials securely.
                  </p>
                </div>
                
                {/* Connection check stats */}
                <div className="flex items-center gap-4 bg-stone-900/60 p-4 rounded-2xl border border-stone-800 shrink-0">
                  <div className="space-y-1">
                    <span className="block text-[10px] text-stone-500 font-mono uppercase font-bold">Terminal Connection Balance</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${razorpayConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                      <span className="font-mono text-lg font-bold">
                        {razorpayConnected ? "Captured (INR Live)" : "Sandbox / Offline"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Action Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Config credentials & Simulated payment portal */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Configure Keys block */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="font-serif text-md font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2.5">
                    🔑 Gateway Access Tokens
                  </h3>
                  
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsRefreshingRzp(true);
                      try {
                        const res = await fetch("/api/razorpay/config", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ keyId: razorpayKeyId, keySecret: razorpayKeySecret })
                        });
                        const data = await res.json();
                        if (data.success) {
                          setRazorpayConnected(true);
                          setToast({ message: "Excellent! Razorpay live keys recorded on the server successfully.", type: "success" });
                          fetchRazorpayData();
                        } else {
                          alert(data.error || "Failed to update API configurations.");
                        }
                      } catch {
                        alert("Network connection error updating backend secrets.");
                      } finally {
                        setIsRefreshingRzp(false);
                      }
                    }}
                    className="space-y-3 text-xs"
                  >
                    <div>
                      <label className="block text-stone-500 font-mono text-[9px] uppercase font-bold mb-1">Razorpay Key ID</label>
                      <input 
                        type="text"
                        required
                        placeholder="rzp_test_..."
                        value={razorpayKeyId}
                        onChange={(e) => setRazorpayKeyId(e.target.value)}
                        className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3.5 py-3 text-stone-850 font-mono text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-500 font-mono text-[9px] uppercase font-bold mb-1">Razorpay Secret Key</label>
                      <input 
                        type="password"
                        required
                        placeholder="••••••••••••••••••••••••"
                        value={razorpayKeySecret}
                        onChange={(e) => setRazorpayKeySecret(e.target.value)}
                        className="w-full bg-stone-50/50 border border-stone-200 rounded-xl px-3.5 py-3 text-stone-850 font-mono text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        type="submit"
                        disabled={isRefreshingRzp}
                        className="w-full bg-stone-900 border-0 hover:bg-emerald-600 text-white py-3 rounded-xl font-mono text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
                      >
                        {isRefreshingRzp ? "Verifying..." : "✓ Store live credentials"}
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          setIsRefreshingRzp(true);
                          try {
                            const res = await fetch("/api/razorpay/test-connection", { method: "POST" });
                            const d = await res.json();
                            if (d.success) {
                              alert(d.message);
                            } else {
                              alert(d.error || "Cryptographic test failed. Key combos are incorrect.");
                            }
                          } catch {
                            alert("Failed to reach gateway testing services.");
                          } finally {
                            setIsRefreshingRzp(false);
                          }
                        }}
                        className="w-full bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 py-2.5 rounded-xl font-mono text-[9px] uppercase font-bold transition-colors cursor-pointer"
                      >
                        ⚡ Cryptographically Test Connection
                      </button>

                      {razorpayConnected && (
                        <button
                          type="button"
                          onClick={async () => {
                            if (!confirm("Are you sure you want to disconnect live payments gateway? This transitions operational checkouts back to sandbox mode.")) return;
                            try {
                              const res = await fetch("/api/razorpay/disconnect", { method: "POST" });
                              const d = await res.json();
                              if (d.success) {
                                setRazorpayConnected(false);
                                setRazorpayKeyId("");
                                setRazorpayKeySecret("");
                                alert("Gateway secrets deleted successfully. Reverted to Local Sandbox.");
                                fetchRazorpayData();
                              }
                            } catch {
                              alert("Failed to disconnect backend credentials.");
                            }
                          }}
                          className="w-full text-[#B76E79] hover:bg-rose-50 border border-transparent py-2.5 rounded-xl font-mono text-[9.5px] uppercase font-bold transition-colors cursor-pointer bg-transparent"
                        >
                          ✕ Disconnect and Purge API Keys
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Simulated Order Sandbox */}
                <div className="bg-[#FEFAF8] border border-[#B76E79]/20 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-md font-bold text-stone-900 flex items-center gap-2">
                      🛠️ Simulated Payments Terminal
                    </h3>
                    <p className="text-[10px] text-stone-500 leading-normal">
                      Simulate new captured student enrollment cycles to preview dashboard statistics, transaction logging lists, and student rosters instantaneously.
                    </p>
                  </div>

                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const payload = {
                        studentName: formData.get("simName"),
                        studentEmail: formData.get("simEmail"),
                        studentPhone: formData.get("simPhone"),
                        courseTitle: formData.get("simCourse"),
                        amountPaid: Number(formData.get("simAmount")),
                        razorpay_payment_id: "pay_sim_" + Math.random().toString(36).substr(2, 9),
                        razorpay_order_id: "order_sim_" + Math.random().toString(36).substr(2, 9),
                      };

                      try {
                        const res = await fetch("/api/razorpay/verify-payment", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload)
                        });
                        const d = await res.json();
                        if (d.success) {
                          setToast({ message: `Successfully simulated captured enrollment of ${payload.studentName}!`, type: "success" });
                          form.reset();
                          fetchRazorpayData();
                        } else {
                          alert(d.error || "Simulation submission failed.");
                        }
                      } catch {
                        alert("Network connection failure submitting simulation.");
                      }
                    }}
                    className="space-y-2.5 text-xs text-stone-700"
                  >
                    <div>
                      <label className="block text-stone-500 font-mono text-[8px] uppercase font-bold mb-0.5">Mock Student Name</label>
                      <input type="text" name="simName" required placeholder="Aarav Sharma" className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs" />
                    </div>

                    <div>
                      <label className="block text-stone-500 font-mono text-[8px] uppercase font-bold mb-0.5">Mock Student Email</label>
                      <input type="email" name="simEmail" required placeholder="aarav@gmail.com" className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs" />
                    </div>

                    <div>
                      <label className="block text-stone-500 font-mono text-[8px] uppercase font-bold mb-0.5">Mock Student Whatsapp</label>
                      <input type="text" name="simPhone" required placeholder="+91 9876543210" className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-stone-500 font-mono text-[8px] uppercase font-bold mb-0.5">Selected Program</label>
                        <select name="simCourse" className="w-full bg-white border border-stone-200 rounded-xl px-2 py-2 text-[11px]">
                          <option value="Beauty Foundations Course">Beauty Foundations</option>
                          <option value="Advanced Artist Program">Advanced Program</option>
                          <option value="Professional Makeup Business Mastery">Business Mastery</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-500 font-mono text-[8px] uppercase font-bold mb-0.5">Tuition (Amount INR)</label>
                        <input type="number" name="simAmount" min="1" defaultValue="14999" className="w-full bg-white border border-stone-200 rounded-xl px-2 py-2 text-[11px]" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#B76E79] hover:bg-[#a35e68] text-white py-3 rounded-xl font-mono text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer border-0 mt-1"
                    >
                      🚀 Instant Simulator Checkout Order &rarr;
                    </button>
                  </form>
                </div>

              </div>

              {/* Right Column: Dynamic database tables with search and logs */}
              <div className="lg:col-span-8 space-y-6 text-left">
                
                {/* Captured transactions log panel */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-3">
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-md font-bold text-stone-850 flex items-center gap-1.5">
                        📂 Razorpay Captured Transactions Ledger
                      </h3>
                      <p className="text-[10px] text-stone-500 leading-normal">
                        Database records verifying order authorization, client profiles, and payment signatures.
                      </p>
                    </div>
                    
                    <button
                      onClick={fetchRazorpayData}
                      disabled={isRefreshingRzp}
                      className="bg-stone-50 border border-stone-200 hover:bg-stone-100 text-stone-700 text-[10px] px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer font-bold font-mono uppercase"
                    >
                      🔄 Synchronize Logs
                    </button>
                  </div>

                  {/* Transaction list element */}
                  {rzpTransactions.length === 0 ? (
                    <div className="text-center py-16 text-stone-400 space-y-2">
                      <span className="text-4xl block">💳</span>
                      <p className="text-xs font-sans">No secure captured transactions recorded. Configure tokens or run the Simulated sandbox checkout tools to populate charts.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-sans text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-stone-200 text-stone-400 font-mono uppercase tracking-wider text-[9px] font-bold">
                            <th className="py-2.5 pb-2 font-bold select-none text-left">Recipient</th>
                            <th className="py-2.5 pb-2 font-bold select-none text-left">Program Title</th>
                            <th className="py-2.5 pb-2 font-bold select-none text-left">Reference Numbers</th>
                            <th className="py-2.5 pb-2 font-bold select-none text-left">Tuition Paid</th>
                            <th className="py-2.5 pb-2 font-bold select-none text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 font-medium">
                          {rzpTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-stone-50">
                              <td className="py-3">
                                <p className="font-bold text-stone-850">{tx.studentName || "Client Member"}</p>
                                <p className="text-[10px] text-stone-400 font-mono">{tx.studentEmail}</p>
                              </td>
                              <td className="py-3 align-middle font-serif font-bold text-[#B76E79]">
                                {tx.courseTitle || "Individual Mentorship Class"}
                              </td>
                              <td className="py-3 font-mono text-[10px] text-stone-500">
                                <span className="block" title="Payment ID">Payment: <strong className="select-all text-stone-700">{tx.id}</strong></span>
                                <span className="block text-[9px] text-stone-400" title="Order ID">Order: {tx.orderId}</span>
                              </td>
                              <td className="py-3">
                                <div className="space-y-0.5">
                                  <span className="font-mono font-bold text-zinc-900 block">{formatPrice(tx.amount)}</span>
                                  <span className={`inline-block px-1.5 py-0.5 rounded text-[8.5px] font-mono font-extrabold uppercase ${
                                    tx.status === "Refunded" 
                                      ? "bg-red-50 text-red-700" 
                                      : "bg-emerald-50 text-emerald-800"
                                  }`}>
                                    {tx.status}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 text-right">
                                {tx.status !== "Refunded" ? (
                                  <button
                                    onClick={async () => {
                                      const notes = prompt("Enter a brief justification for processing this tuition refund query:");
                                      if (notes === null) return;
                                      if (!confirm(`Are you sure you want to process a full refund of ${formatPrice(tx.amount)} for this client?`)) return;

                                      try {
                                        const res = await fetch("/api/razorpay/issue-refund", {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify({ paymentId: tx.id, amount: tx.amount, notes })
                                        });
                                        const d = await res.json();
                                        if (d.success) {
                                          alert("Tuition refund settled successfully! The transaction status has been updated in database.");
                                          fetchRazorpayData();
                                        } else {
                                          alert(d.error || "Failed to process refund query.");
                                        }
                                      } catch {
                                        alert("Network failure initiating API refund sequence.");
                                      }
                                    }}
                                    className="bg-transparent text-stone-400 hover:text-red-600 font-bold font-mono text-[9.5px] uppercase border-0 cursor-pointer p-1.5 hover:bg-stone-100 rounded"
                                    title="Process full refund"
                                  >
                                    ↩ Refund tuition
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-stone-400 font-mono italic block">Refund finalized</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Subscriptions / Enrollments check matrix */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="border-b border-stone-100 pb-2.5">
                    <h3 className="font-serif text-md font-bold text-stone-850 flex items-center gap-1.5">
                      🎓 Live Registered Mentorship Cohorts
                    </h3>
                    <p className="text-[10px] text-stone-500 font-sans mt-0.5">
                      Roster showing classroom sync from authenticated payment checkouts.
                    </p>
                  </div>

                  {rzpEnrollments.length === 0 ? (
                    <div className="py-8 text-center text-stone-400 text-xs">
                      No active enrollments synced with current session. Complete simulations or checkouts to load records.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {rzpEnrollments.map((enr) => (
                        <div key={enr.id} className="border border-stone-200/80 p-4 rounded-2xl bg-stone-50/40 relative overflow-hidden space-y-2">
                          <span className="absolute top-0 right-0 py-0.5 px-2 bg-emerald-50 text-emerald-900 border-l border-b border-stone-200 text-[10px] font-mono font-bold uppercase rounded-bl">
                            Active Sync
                          </span>
                          
                          <div className="space-y-0.5">
                            <h4 className="font-serif font-extrabold text-stone-800 text-xs">{enr.studentName}</h4>
                            <p className="text-[10px] text-stone-400 font-mono mb-1">{enr.studentEmail} &bull; {enr.studentPhone}</p>
                          </div>

                          <div className="bg-white border border-stone-200/40 p-2.5 rounded-xl text-[10.5px] space-y-1 font-sans">
                            <p className="flex justify-between">
                              <span className="text-stone-400">Tuition course:</span>
                              <strong className="text-stone-800 text-right max-w-[150px] truncate">{enr.courseTitle}</strong>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-stone-400">Linked Payment Ref:</span>
                              <span className="font-mono text-[9px] font-bold text-stone-700">{enr.paymentId}</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-stone-400">Linked Order Ref:</span>
                              <span className="font-mono text-[9px] text-[#B76E79]">{enr.orderId}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
              
            </div>

          </div>
        )}

      </div>

    </section>
  );
}
