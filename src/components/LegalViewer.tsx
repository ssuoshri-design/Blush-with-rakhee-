import { Shield, FileText, RefreshCw, HelpCircle, Mail, Phone, Clock, MapPin, X, Printer } from "lucide-react";

interface LegalViewerProps {
  documentType: string | null;
  onClose: () => void;
}

export default function LegalViewer({ documentType, onClose }: LegalViewerProps) {
  if (!documentType) return null;

  // Real-world high-fidelity Razorpay policies text
  const getDocumentContent = () => {
    switch (documentType) {
      case "privacy":
        return {
          title: "Privacy Policy",
          icon: <Shield className="text-[#B76E79]" size={24} />,
          lastUpdated: "June 5, 2026",
          sections: [
            {
              heading: "1. Overview of Data Collection",
              text: "Blush with Rakhee ('we', 'our', 'us') respects your privacy and is committed to protecting your personal data. This Privacy Policy describes how we collect, use, and process your personal information when you access our website, enroll in our courses, make payments, or interact with our automated systems (including our Instagram DM Assistant)."
            },
            {
              heading: "2. Information We Collect",
              text: "We collect several types of information from and about you, including:\n• Personal Identity Details: Name, email address, WhatsApp numbers, gender, event dates/locations, and student profiles.\n• Billing & Payment Data: Billing address, card details, or UPI IDs which are encrypted and processed securely by our accredited partner, Razorpay. We do not store raw card numbers on our local databases.\n• Usage and Technical Logs: Information about your web browser, IP address, timezone, click streams, and interaction history with our media assets and portfolio."
            },
            {
              heading: "3. Direct Processing & Consent",
              text: "We process your personal information under lawful bases including contract fulfillment (such as registering your mentorship cohort), legitimate business interests, and your explicit consent (such as when subscribing to our 'Join The Beauty Community' newsletter or claiming coupon rewards)."
            },
            {
              heading: "4. Third-Party Sharing",
              text: "We do not sell, trade, or transfer your personal inputs to outside directories. However, we securely share specialized telemetry with third parties that enable our premium platform operational capacities:\n• Payment Processors: Razorpay Software Private Limited is engaged to securely route your course checkout transactions.\n• CRM Analytics: Selected booking dates, phone numbers, and consultation rosters to structure our administrative private databases."
            },
            {
              heading: "5. Data Security & Storage",
              text: "All collected records are transferred through Secure Socket Layer (SSL) channels and kept in highly isolated cloud environments. We implement industry-grade technical and physical guards to prevent unauthorized loss or alteration."
            }
          ]
        };

      case "terms":
        return {
          title: "Terms & Conditions",
          icon: <FileText className="text-[#B76E79]" size={24} />,
          lastUpdated: "June 5, 2026",
          sections: [
            {
              heading: "1. Agreement to Terms",
              text: "By accessing, exploring, or registering for premium courses on blushwithrakhee.com, you agree to comply with and be bound by these unified Terms & Conditions and all applicable laws of regional merchant operations."
            },
            {
              heading: "2. Mentorship Cohort Bookings & Curriculum Rules",
              text: "Our signature makeup courses (e.g., Beauty Foundations, Advanced Artist Program, and Professional Makeup Business Mastery) are structured in strict cohort capacities with limited seating (10 seats). A reservation is considered fully finalized only after successful payment authorization of the prescribed fee via our secure Razorpay terminal."
            },
            {
              heading: "3. User Responsibilities & Rules of Conduct",
              text: "Students must supply truthful, current, and complete details (Full Name, Phone/WhatsApp, and Email) during registration and checkout. Distributing proprietary tutorial recordings, curriculum manuals, or digital bridal swatch sheets to unauthorized peers is strictly prohibited under intellectual copyright safety codes."
            },
            {
              heading: "4. Digital Coupon Claim Usage & Limits",
              text: "Single claims of randomized coupon rewards (from our Beauty Reward System) are licensed strictly to a single individual. The admin preserves absolute rights to modify percentages, limit max claims, disable codes, or prune expired credentials at any structural interval without prior legal notice."
            },
            {
              heading: "5. Intellectual Property Rights",
              text: "All digital tutorials, transformation high-definition portfolios, beauty hacks content drafts, and course curricula are the private media property of Rakhee Chakraborty ('Blush with Rakhee'). Unlicensed duplication is legally liable for audit."
            }
          ]
        };

      case "refund":
        return {
          title: "Refund Policy",
          icon: <RefreshCw className="text-[#B76E79]" size={24} />,
          lastUpdated: "June 5, 2026",
          sections: [
            {
              heading: "1. Direct Course Mentorship Fees",
              text: "We take immense pride in delivering top-tier luxury makeup training programs. To maintain premium quality-pacing, limited cohort seats, and custom material allocations, our signature programs have structural refund policies:\n• If a student requests cancellation of enrollment up to 7 calendar days before the cohort start date, a 100% refund of the paid registration fee will be initiated.\n• If a student cancels between 3 to 6 days before the cohort starts, a 50% partial refund will be processed.\n• No refunds will be granted for cancellations submitted less than 48 hours prior to the cohort's start or after access to active syllabus materials has been assigned."
            },
            {
              heading: "2. Custom Bridal Glam Bookings",
              text: "Personal bridal grums require complex diary holds and material preparation. Booking deposits are non-refundable except in case of verified merchant-side scheduling collisions. Full deposits can be rescheduled to alternate dates if shared with us at least 14 days in advance."
            },
            {
              heading: "3. Refund Processing Framework (Razorpay)",
              text: "Authorized refunds are credited back to the player's original payment mode (Credit Cards, Debit Cards, UPI, Net Banking, or original wallet) via Razorpay automatically. The refund cycle resolves within 5 to 7 banking business days, depending on your institutional banking routing delay."
            }
          ]
        };

      case "cancellation":
        return {
          title: "Cancellation Policy",
          icon: <X className="text-[#B76E79]" size={24} />,
          lastUpdated: "June 5, 2026",
          sections: [
            {
              heading: "1. Subscription & Community Opt-Out",
              text: "You can cancel your 'Join The Beauty Community' subscription at any regular interval. Simply click the 'Unsubscribe' button at the bottom of any automated newsletter dispatch, or contact rakhee.chakraborty1985@gmail.com. Your details will be completely pruned from our active database within 24 hours."
            },
            {
              heading: "2. Course Session Postponement",
              text: "Students can request to transition their live workshop or consultation seat to an upcoming cohort slot due to emergency medical conditions. Postponements will be accommodated without additional compliance fees, subject to a notification sent 48 hours in advance."
            },
            {
              heading: "3. Verification Checks",
              text: "Our administrative desk carries secure verification checks on random discount selections. If a code is detected as fraudulently compiled or duplicated via source hacks, we preserve automated cancellation rights over the associated enrollments."
            }
          ]
        };

      case "cookie":
        return {
          title: "Cookie Policy",
          icon: <HelpCircle className="text-[#B76E79]" size={24} />,
          lastUpdated: "June 5, 2026",
          sections: [
            {
              heading: "1. What are Cookies?",
              text: "Cookies are simple text fragments stored on your device to keep user-experience lightweight. We utilize both session-level cookies and persistent local configurations (via Web LocalStorage) to keep your interactions fast."
            },
            {
              heading: "2. How We Use Cookies",
              text: "We employ cookies to track essential parameters such as:\n• Your selected pricing currency profile (USD vs INR toggled choices).\n• Authentication state and Admin passcodes (maintaining root verification).\n• Beauty Reward claims logs (to prevent spam claims and show active coupon codes).\n• Simulated CRM pipeline progress state so you do not lose your sandbox data upon page refreshes."
            },
            {
              heading: "3. Managing Your Cookies",
              text: "Most web browsers automatically accept cookies. You may toggle, disable, or wipe cookies inside your browser's security settings. Be advised that wiping local storage will reset active rewards claims and CRM simulation tables."
            }
          ]
        };

      case "disclaimer":
        return {
          title: "Disclaimer",
          icon: <HelpCircle className="text-[#B76E79]" size={24} />,
          lastUpdated: "June 5, 2026",
          sections: [
            {
              heading: "1. Skill and Outcomes Swatches",
              text: "Bridal transformations, skin tones dewy swatches, and cosmetic application metrics displayed across blushwithrakhee.com represent results under controlled visual studio conditions. Individual graduation outcomes, skill speeds, and business client acquisition rates vary according to personal practice level, portfolio building, and commercial commitment."
            },
            {
              heading: "2. Hyperlink Redirection Compliance",
              text: "Selected product links on our portfolio pages are secure affiliate swatches. Purchasing cosmetic items through these external platforms yields moderate referral commission metrics for Rakhee's desk, ensuring our educational insights remain open-access for everyone."
            },
            {
              heading: "3. Health & Skin Allergy Safety",
              text: "Our makeup tutorials recommend premium products. However, different skin barriers react differently to makeup active ingredients. We advise students to practice patch swotting prior to major applications."
            }
          ]
        };

      case "contact":
        return {
          title: "Contact Information",
          icon: <Mail className="text-[#B76E79]" size={24} />,
          lastUpdated: "June 5, 2026",
          sections: [
            {
              heading: "Merchant Legal Registry & Support",
              text: "Below are the verified, transparent registered contact details of Blush with Rakhee to support Razorpay integration compliance and provide instantaneous customer inquiry avenues:"
            },
            {
              heading: "Direct Communication Channels",
              text: "• Primary Educator Email: rakhee.chakraborty1985@gmail.com\n• Booking Support Phone Number: +91 98112 55432\n• WhatsApp Desk Support: Join our direct advisory pipeline instantly via the CRM or foot buttons."
            },
            {
              heading: "Physical Location Coordinates",
              text: "• Business Address: DLF Phase 5, Sector 54, Gurgaon, Haryana, 122003, India."
            },
            {
              heading: "Standard SLA Business Hours",
              text: "• Weekdays (Monday to Friday): 10:00 AM to 6:00 PM IST\n• Saturdays: 11:00 AM to 4:00 PM IST (Advisory Support Desk only)\n• Sundays & Public Holidays: Closed"
            },
            {
              heading: "Expected Escalation SLA Response",
              text: "For all support inquiries related to checkout, coupon redemptions, student login access, or course schedule cancellations, our Admissions Desk guarantees a direct email resolution within 24 business hours."
            }
          ]
        };

      default:
        return {
          title: "Legal Policy Document",
          icon: <FileText className="text-[#B76E79]" size={24} />,
          lastUpdated: "2026-06-05",
          sections: []
        };
    }
  };

  const content = getDocumentContent();

  return (
    <div className="fixed inset-0 bg-[#1C1917]/75 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] border border-[#B76E79]/20 p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative animate-fadeIn flex flex-col max-h-[90vh]">
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2F2] flex items-center justify-center shrink-0">
              {content.icon}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2D2A29]">
                {content.title}
              </h3>
              <p className="font-mono text-[9px] text-[#B76E79] uppercase tracking-wider">
                Last Updated: {content.lastUpdated}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              title="Print Document"
              className="p-2 text-stone-400 hover:text-[#B76E79] hover:bg-[#FFF2F2]/40 rounded-lg transition-all cursor-pointer"
            >
              <Printer size={16} />
            </button>
            <button
              onClick={onClose}
              title="Close Panel"
              className="p-2 text-stone-400 hover:text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-full transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Policy Body */}
        <div className="overflow-y-auto py-5 pr-1 space-y-5 text-left flex-grow scrollbar-thin">
          {content.sections.map((sec, i) => (
            <div key={i} className="space-y-2">
              <h4 className="font-serif text-[13px] font-bold text-[#2D2A29] border-l-2 border-[#B76E79] pl-2">
                {sec.heading}
              </h4>
              <p className="font-sans text-xs text-stone-600 leading-relaxed whitespace-pre-line">
                {sec.text}
              </p>
            </div>
          ))}

          {/* Compliance Safe Slogan */}
          <div className="bg-[#FFFBF9] border border-[#B76E79]/10 rounded-2xl p-4 text-[10px] space-y-1.5 mt-6 shrink-0">
            <p className="font-semibold text-[#2D2A29]">Razorpay Merchant Trust Assurance</p>
            <p className="text-stone-500 leading-relaxed">
              These policy materials are maintained in continuous legal congruence with national digital commerce acts. For payment inquiries or verification check support, contact the Desk Coordinator directly at <span className="font-mono text-[#B76E79]">rakhee.chakraborty1985@gmail.com</span>.
            </p>
          </div>
        </div>

        {/* Bottom Lock Info */}
        <div className="pt-4 border-t border-stone-100 shrink-0 text-center flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-stone-400 gap-3">
          <span className="flex items-center gap-1">
            <Shield size={12} className="text-[#B76E79] animate-pulse" /> End-to-end SSL Session Encrypted Protection
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#2D2A29] hover:bg-[#B76E79] text-white font-serif text-[11px] px-5 py-2 rounded-xl transition-all font-bold uppercase tracking-wider cursor-pointer"
          >
            I Acknowledge Rules &amp; Close &times;
          </button>
        </div>

      </div>
    </div>
  );
}
