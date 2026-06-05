import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Instagram, Phone, Calendar, MapPin, Sparkles, Check, UserPlus, CheckCircle2 } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
  isOptionList?: boolean;
}

const parseAnswerDetails = (text: string) => {
  const lower = text.toLowerCase();
  
  // Date detection helper
  const months = /january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec/i;
  const dateRegex = /\d{1,2}[\/\-\.]\d{1,2}/;
  const yearRegex = /\b202[6-9]\b/;
  const hasDate = dateRegex.test(text) || yearRegex.test(text) || months.test(lower) || /today|tomorrow|next week|this weekend|next month/i.test(lower);
  
  // Guest count helper: digits or words representing guest count
  const guestCountRegex = /\b(100|[1-9]\d?)\b/;
  const hasGuestCount = guestCountRegex.test(text) || /\b(one|two|three|four|five|six|seven|eight|nine|ten|only\s+me|myself|alone|person|people|guest|guests)\b/i.test(lower);
  
  // Event type helper: wedding, marriage, etc.
  const hasEventType = /wedding|bride|bridal|marriage|marrige|engagement|reception|haldi|sangeet|mehendi|photoshoot|shoot|party|anniversary|birthday|corporate|gathering/i.test(lower);

  // Time helper (for party)
  const hasTime = /\b\d{1,2}\s*(am|pm)\b/i.test(lower) || /\b\d{1,2}:\d{2}\b/.test(text) || /morning|afternoon|evening|night|noon|early|clock|o'clock/i.test(lower);

  // Location helper: we check that they didn't just type a tiny filler/affirmation word, and that there is some substantive text
  const filler = /^(hi|hello|hey|yes|no|ok|okay|sure|thanks|thank you|fine|pricing|cost|rates|please)$/i.test(lower.trim());
  
  const locationKeywords = /hotel|hall|resort|venue|home|house|temple|place|city|address|at\s+[a-zA-Z]+|in\s+[a-zA-Z]+/i.test(lower);
  const hasLocation = !filler && (locationKeywords || (text.split(/\s+/).length >= 2 && lower.length > 5));

  return { hasDate, hasGuestCount, hasEventType, hasTime, hasLocation };
};

interface InstagramDMAssistantProps {
  onLeadCaptured?: (lead: {
    name: string;
    date?: string;
    location?: string;
    eventType?: string;
    guestCount?: string;
    time?: string;
    desiredPackage?: string;
    whatsapp?: string;
    status: "Completed" | "Closed Mid-Way";
  }) => void;
}

export default function InstagramDMAssistant({ onLeadCaptured }: InstagramDMAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Current session conversational flow state:
  // "welcome", "collecting_name", "collecting_date", "collecting_location", "collecting_guests", "collecting_source", "collecting_phone", "general", "ended"
  const [flowState, setFlowState] = useState<
    "welcome" | "collecting_name" | "collecting_date" | "collecting_location" | "collecting_guests" | "collecting_source" | "collecting_phone" | "general" | "ended"
  >("welcome");

  // Collected lead information values
  const [leadDetails, setLeadDetails] = useState<{
    name?: string;
    date?: string;
    location?: string;
    eventType?: string;
    guestCount?: string;
    time?: string;
    desiredPackage?: string;
    whatsapp?: string;
    source?: string;
  }>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial welcome message setup
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-1",
          sender: "assistant",
          text: "Hi 👋\n\nThank you for contacting Blush With Rakhee 💄✨\n\nHow may we help you today?",
          timestamp: new Date(),
        }
      ]);
    }
  }, []);

  // Sync and end conversation when the chat is closed / minimized
  useEffect(() => {
    if (!isOpen && flowState !== "welcome" && flowState !== "ended") {
      // If we have some partial details, capture them as "Closed Mid-Way"
      if (leadDetails.date || leadDetails.location || leadDetails.whatsapp || leadDetails.name) {
        if (onLeadCaptured) {
          onLeadCaptured({
            ...leadDetails,
            name: leadDetails.name || "Anonymous Guest",
            status: "Closed Mid-Way"
          });
        }
      }
      setFlowState("ended");
    }
  }, [isOpen, flowState, leadDetails, onLeadCaptured]);

  // Set up custom event listener to handle course inquiries
  useEffect(() => {
    const handleCourseInquiry = (e: Event) => {
      const customEvent = e as CustomEvent;
      const packageName = customEvent.detail?.packageSelected || "Premium Course";
      setIsOpen(true);
      setHasNewMessage(false);
      
      // Add user message inquiring about this course
      const userMsgId = "course-user-" + Date.now();
      const userText = `Hello! I would love to join and book a spot in your: "${packageName}"! 💄🎓`;
      
      setMessages(prev => [
        ...prev.filter(m => m.id !== "welcome-option-list"), // filter out welcome options if any
        {
          id: userMsgId,
          sender: "user",
          text: userText,
          timestamp: new Date()
        }
      ]);

      // Initialize info
      setLeadDetails({ desiredPackage: packageName, eventType: "Course Mentorship" });
      setFlowState("collecting_name");
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: "course-reply-" + Date.now(),
            sender: "assistant",
            text: `Wonderful choice! You've selected our elite training program: ${packageName}. To help us verify availability, reserve your mentorship seat, and customize your orientation, could you please share your full name? 💕`,
            timestamp: new Date()
          }
        ]);
      }, 1200);
    };

    window.addEventListener("open-dm-assistant", handleCourseInquiry);
    return () => window.removeEventListener("open-dm-assistant", handleCourseInquiry);
  }, []);

  const addMessage = (sender: "user" | "assistant", text: string, isOptionList = false) => {
    setMessages(prev => [
      ...prev,
      {
        id: "msg-" + Date.now() + Math.random().toString(36).substr(2, 5),
        sender,
        text,
        timestamp: new Date(),
        isOptionList
      }
    ]);
  };

  const simulateTypingThenReply = (replyText: string, updatedState?: typeof flowState, nextAction?: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage("assistant", replyText);
      if (updatedState) {
        setFlowState(updatedState);
      }
      if (nextAction) {
        nextAction();
      }
    }, 1200);
  };

  // Pre-configured Flow trigger functions
  const handleSelectOption = (optionId: number, label: string) => {
    addMessage("user", label);

    switch (optionId) {
      case 1: // Bridal Makeup
        setLeadDetails({ desiredPackage: "Complete Bridal Glam", eventType: "Bridal wedding" }); // reset state for new flow
        simulateTypingThenReply(
          "We would love to make you look unforgettable on your special day! To help check availability and prepare a custom bridal quote, could you please share your full name?",
          "collecting_name"
        );
        break;

      case 2: // Party Makeup
        setLeadDetails({ desiredPackage: "Party / Engagement Glam", eventType: "Special Party Glam" }); // reset state for new flow
        simulateTypingThenReply(
          "We would love to help you get glammed up! To get started and check our bookings schedule, could you please share your full name?",
          "collecting_name"
        );
        break;

      case 3: // Check Availability
        setLeadDetails({});
        simulateTypingThenReply(
          "I will be glad to check availability for you. Please select either Bridal Makeup or Party Makeup from the options menu to specify your target details.",
          "welcome"
        );
        break;

      case 4: // Pricing & Packages
        simulateTypingThenReply(
          "Bridal and Party Makeup pricing is fully customized based on your event date, type of service, venue location, and total guests. To get your custom packages proposal, please select either Bridal Makeup or Party Makeup from the options above.",
          "welcome"
        );
        break;

      case 5: // Portfolio & Previous Work
        simulateTypingThenReply(
          "You can see our latest makeup transformations and live client portfolios right here on our website showcases, or on our Instagram feed and highlights. Let me know if there's a specific look you love!",
          "welcome"
        );
        break;

      default:
        break;
    }
  };

  const handleSourceSelect = (sourceText: string) => {
    addMessage("user", sourceText);
    setLeadDetails(prev => ({ ...prev, source: sourceText }));

    simulateTypingThenReply(
      "Thank you! Almost done. Could you please share your WhatsApp or phone number so Rakhee or our bookings manager can message you directly with personalized packages?",
      "collecting_phone"
    );
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userText = inputText.trim();
    addMessage("user", userText);
    setInputText("");

    // Reset indicator on toggle
    setHasNewMessage(false);

    // Dynamic Step Sequence State Machine
    if (flowState === "collecting_name") {
      setLeadDetails(prev => ({ ...prev, name: userText }));
      simulateTypingThenReply(
        `Nice to connect with you, ${userText}! When is the date of your event? (e.g., November 28th, or 12/28/2026)`,
        "collecting_date"
      );
      return;
    }

    if (flowState === "collecting_date") {
      setLeadDetails(prev => ({ ...prev, date: userText }));
      simulateTypingThenReply(
        "Perfect. What venue, hotel, or location are you planning for?",
        "collecting_location"
      );
      return;
    }

    if (flowState === "collecting_location") {
      setLeadDetails(prev => ({ ...prev, location: userText }));
      simulateTypingThenReply(
        "That sounds like a beautiful location. How many people in total will be needing makeup services including yourself?",
        "collecting_guests"
      );
      return;
    }

    if (flowState === "collecting_guests") {
      setLeadDetails(prev => ({ ...prev, guestCount: userText }));
      
      // Prompt for "How did you hear about us?" and show interactive option list
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage("assistant", "We appreciate you helping us trace our readers! How did you hear about Blush with Rakhee?", true);
        setFlowState("collecting_source");
      }, 1000);
      return;
    }

    if (flowState === "collecting_source") {
      setLeadDetails(prev => ({ ...prev, source: userText }));
      simulateTypingThenReply(
        "Thank you! Almost done. Could you please share your WhatsApp or phone number so Rakhee or our bookings manager can message you directly with personalized packages?",
        "collecting_phone"
      );
      return;
    }

    if (flowState === "collecting_phone") {
      const phoneRegex = /(\+?\d[\d\s-]{7,15}\d)/;
      const matchedPhone = userText.match(phoneRegex);
      const isPlainNumber = /^\d{10,13}$/.test(userText.replace(/[\s-().+]/g, ""));

      if (matchedPhone || isPlainNumber) {
        const num = matchedPhone ? matchedPhone[0] : userText;
        
        setLeadDetails(prev => {
          const finalDetails = { ...prev, whatsapp: num };
          
          if (onLeadCaptured) {
            onLeadCaptured({
              ...finalDetails,
              name: finalDetails.name || "Anonymous Guest",
              status: "Completed"
            });
          }

          simulateTypingThenReply(
            `Thank you so much, ${finalDetails.name || "dear"}! I have saved all of your preferences. Rakhee or our bookings coordinator will reach out to you on WhatsApp very shortly to wrap up scheduling! Have an absolutely beautiful day!`,
            "ended"
          );

          return finalDetails;
        });

      } else {
        simulateTypingThenReply(
          "Could you please share a valid WhatsApp or phone number so our booking coordinator can contact you directly?",
          "collecting_phone"
        );
      }
      return;
    }

    // Keyword detection fallback for natural language input
    const lowerText = userText.toLowerCase();
    if (lowerText.includes("bridal") || lowerText.includes("wedding") || lowerText.includes("bride") || lowerText.includes("marrige") || lowerText.includes("marriage")) {
      setLeadDetails({ desiredPackage: "Complete Bridal Glam", eventType: "Bridal wedding" }); // reset state
      simulateTypingThenReply(
        "We would love to help make you look unforgettable on your special day! To help check eligibility, could you please share your full name?",
        "collecting_name"
      );
    } 
    else if (lowerText.includes("party") || lowerText.includes("makeup for guest") || lowerText.includes("hair styling") || lowerText.includes("reception") || lowerText.includes("engagement")) {
      setLeadDetails({ desiredPackage: "Party / Engagement Glam", eventType: "Special Party Glam" }); // reset state
      simulateTypingThenReply(
        "We would love to help you get glammed up! To get started and check our bookings schedule, could you please share your full name?",
        "collecting_name"
      );
    } 
    else if (lowerText.includes("price") || lowerText.includes("pricing") || lowerText.includes("packages") || lowerText.includes("rate") || lowerText.includes("how much") || lowerText.includes("cost")) {
      simulateTypingThenReply(
        "Rates are customized depending on your date, venue location, and total guest count. Please select either Bridal Makeup or Party Makeup from the options above so we can guide you step-by-step.",
        "welcome"
      );
    } 
    else if (lowerText.includes("availability") || lowerText.includes("available") || lowerText.includes("free") || lowerText.includes("book")) {
      simulateTypingThenReply(
        "We would be glad to check availability for you. Please select either Bridal Makeup or Party Makeup from our options menu to specify your target details.",
        "welcome"
      );
    } 
    else if (lowerText.includes("portfolio") || lowerText.includes("work") || lowerText.includes("gallery") || lowerText.includes("photo") || lowerText.includes("transformation")) {
      simulateTypingThenReply(
        "You can view our latest client transformations, bridal portfolios, and real results right here on our website portfolio. Let us know if there is a particular style you love!",
        "general"
      );
    } 
    else {
      // General conversational flow fallback
      simulateTypingThenReply(
        "We would love to help you book your custom beauty look! Please select one of our main options below or reply with your event details so we can check dates for you:",
        "welcome"
      );
    }
  };

  const handleRestart = () => {
    setFlowState("welcome");
    setLeadDetails({});
    setMessages([
      {
        id: "restart-msg",
        sender: "assistant",
        text: "Hi! Thanks for reaching out to Blush With Rakhee. How can we help you today?",
        timestamp: new Date(),
      }
    ]);
  };

  const handleEventTypeSelect = (type: string) => {
    addMessage("user", `Event Type: ${type}`);
    setLeadDetails(prev => ({ ...prev, eventType: type }));
    
    simulateTypingThenReply(
      "Perfect! Next, which style of service are you looking for?\n\n💄 Makeup Only\n💇 Hair Styling + Makeup\n✨ Complete Glam Package",
      "party_service_type"
    );
  };

  const handleServiceTypeSelect = (service: string) => {
    addMessage("user", `Desired Service: ${service}`);
    setLeadDetails(prev => ({ ...prev, desiredPackage: service }));

    simulateTypingThenReply(
      "Thank you! Our team will review your details and get back to you shortly with availability and custom options. May we have your WhatsApp or phone number so we can message you directly?",
      "party_phone"
    );
  };



  return (
    <div className="fixed bottom-6 right-6 z-[9990] font-sans">
      {/* Floating Messenger Action Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewMessage(false);
        }}
        id="dm-assistant-toggle-btn"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
        title="Instagram DM Chat Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {hasNewMessage && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 border-2 border-white text-[8px] font-bold text-white flex items-center justify-center animate-bounce">
            1
          </span>
        )}
      </button>

      {/* Expanded Direct Message Chat Box Mockup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.95 }}
            transition={{ duration: 0.23, ease: "easeOut" }}
            id="ig-dm-chat-panel"
            className="absolute bottom-16 right-0 w-[350px] sm:w-[380px] h-[550px] bg-white rounded-3xl border border-stone-100 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* High-Fidelity Instagram Header Bar mockup */}
            <div className="bg-gradient-to-r from-[#FAF8F5] to-white border-b border-stone-100 px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-purple-500 to-pink-500">
                    <img 
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=150" 
                      alt="Rakhee profile illustration" 
                      className="w-full h-full rounded-full object-cover border-2 border-white"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="font-serif text-sm font-bold text-brand-dark">Blush With Rakhee</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#1877F2] text-white text-[7px] font-bold flex items-center justify-center" title="Verified Creator Professional">✓</span>
                  </div>
                  <p className="text-[10px] text-stone-400 font-mono tracking-wide">Instagram DM Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleRestart}
                  className="text-[10px] text-brand-rose bg-brand-sand px-2 py-1 rounded-full font-bold hover:bg-brand-rose hover:text-white transition-all cursor-pointer font-mono"
                  title="Reset Chatbot Conversation Instance"
                >
                  Restart
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-stone-400 hover:text-brand-dark p-1 rounded-full hover:bg-stone-50"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Simulated Chat Message Streams */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
              {messages.map((message) => {
                const isAssistant = message.sender === "assistant";
                return (
                  <div
                    key={message.id}
                    className={`flex ${isAssistant ? "justify-start" : "justify-end"} items-end gap-2`}
                  >
                    {isAssistant && (
                      <img 
                        src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=150" 
                        alt="avatar" 
                        className="w-6 h-6 rounded-full object-cover mb-1 border border-brand-blush/25"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="flex flex-col max-w-[80%]">
                      <div
                        className={`px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap text-left ${
                          isAssistant
                            ? "bg-white border border-stone-100 text-stone-800 rounded-bl-none shadow-sm"
                            : "bg-brand-dark text-white rounded-br-none"
                        }`}
                      >
                        {message.text}
                      </div>
                      <span className="text-[9px] text-stone-400 mt-1 self-start font-mono px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Dynamic Interactive Response Options Widgets based on state */}
              {isTyping && (
                <div className="flex justify-start items-center gap-2">
                  <img 
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=150" 
                    alt="avatar" 
                    className="w-6 h-6 rounded-full object-cover border border-brand-blush/25"
                    referrerPolicy="no-referrer"
                  />
                  <div className="bg-white border border-stone-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}

              {/* WELCOME options template selection */}
              {flowState === "welcome" && !isTyping && (
                <div className="pl-8 space-y-2 text-left animate-fadeIn">
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1.5 flex items-center gap-1">
                    <Sparkles size={10} className="text-brand-rose" /> Select inquiry option:
                  </p>
                  <button
                    onClick={() => handleSelectOption(1, "1️⃣ Bridal Makeup")}
                    className="block w-full text-left py-2 px-3.5 bg-white hover:bg-brand-sand/50 text-stone-700 hover:text-brand-dark rounded-xl text-xs font-semibold border border-stone-150 transition-all shadow-sm cursor-pointer hover:border-brand-blush"
                  >
                    💍 Bridal Makeup Application
                  </button>
                  <button
                    onClick={() => handleSelectOption(2, "2️⃣ Party Makeup")}
                    className="block w-full text-left py-2 px-3.5 bg-white hover:bg-brand-sand/50 text-stone-700 hover:text-brand-dark rounded-xl text-xs font-semibold border border-stone-150 transition-all shadow-sm cursor-pointer hover:border-brand-blush"
                  >
                    🎉 Party / Engagement Makeup
                  </button>
                  <button
                    onClick={() => handleSelectOption(3, "3️⃣ Check Availability")}
                    className="block w-full text-left py-2 px-3.5 bg-white hover:bg-brand-sand/50 text-stone-700 hover:text-brand-dark rounded-xl text-xs font-semibold border border-stone-150 transition-all shadow-sm cursor-pointer hover:border-brand-blush"
                  >
                    📅 Check Diary Availability
                  </button>
                  <button
                    onClick={() => handleSelectOption(4, "4️⃣ Pricing & Packages")}
                    className="block w-full text-left py-2 px-3.5 bg-white hover:bg-brand-sand/50 text-stone-700 hover:text-brand-dark rounded-xl text-xs font-semibold border border-stone-150 transition-all shadow-sm cursor-pointer hover:border-brand-blush"
                  >
                    💰 Get Custom Pricing Packages
                  </button>
                  <button
                    onClick={() => handleSelectOption(5, "5️⃣ Portfolio & Previous Work")}
                    className="block w-full text-left py-2 px-3.5 bg-white hover:bg-brand-sand/50 text-stone-700 hover:text-brand-dark rounded-xl text-xs font-semibold border border-stone-150 transition-all shadow-sm cursor-pointer hover:border-brand-blush"
                  >
                    📸 View Recent Makeovers
                  </button>
                </div>
              )}

              {/* TRAFFIC SOURCE selector panel */}
              {flowState === "collecting_source" && !isTyping && (
                <div className="pl-8 space-y-2 text-left animate-fadeIn">
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">
                    Select marketing source:
                  </p>
                  {[
                    "Google Search / Ads 🔍",
                    "Instagram Feed / Reel 📱",
                    "Friend / Family Referral 👭",
                    "Other Source ✨"
                  ].map((src) => (
                    <button
                      key={src}
                      onClick={() => handleSourceSelect(src)}
                      className="block w-full text-left py-2 px-3 bg-white hover:bg-brand-sand/55 text-stone-700 hover:text-brand-rose rounded-lg text-xs font-semibold border border-stone-150 transition-all cursor-pointer"
                    >
                      {src}
                    </button>
                  ))}
                </div>
              )}

              {/* PARTY EVENT TYPE selector panel */}
              {flowState === "party_event_type" && !isTyping && (
                <div className="pl-8 space-y-2 text-left animate-fadeIn">
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">
                    Select Event Type:
                  </p>
                  {["Birthday Party", "Engagement Ceremony", "Reception Soiree", "Editorial Photoshoot", "Corporate Event", "Other Special Glam"].map((evt) => (
                    <button
                      key={evt}
                      onClick={() => handleEventTypeSelect(evt)}
                      className="block w-full text-left py-1.5 px-3 bg-white hover:bg-brand-sand/55 text-stone-700 hover:text-brand-rose rounded-lg text-xs font-semibold border border-stone-150 transition-all cursor-pointer"
                    >
                      • {evt}
                    </button>
                  ))}
                </div>
              )}

              {/* PARTY SERVICE PACKAGE options */}
              {flowState === "party_service_type" && !isTyping && (
                <div className="pl-8 space-y-2 text-left animate-fadeIn">
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">
                    Select Glam Style:
                  </p>
                  <button
                    onClick={() => handleServiceTypeSelect("💄 Makeup Only")}
                    className="block w-full text-left py-2 px-3 bg-white hover:bg-brand-sand/55 text-stone-700 hover:text-brand-rose rounded-lg text-xs font-semibold border border-stone-150 transition-all cursor-pointer"
                  >
                    💄 Makeup Only
                  </button>
                  <button
                    onClick={() => handleServiceTypeSelect("💇 Hair Styling + Makeup")}
                    className="block w-full text-left py-2 px-3 bg-white hover:bg-brand-sand/55 text-stone-700 hover:text-brand-rose rounded-lg text-xs font-semibold border border-stone-150 transition-all cursor-pointer"
                  >
                    💇 Hair Styling + Makeup
                  </button>
                  <button
                    onClick={() => handleServiceTypeSelect("✨ Complete Glam Package")}
                    className="block w-full text-left py-2 px-3 bg-white hover:bg-brand-sand/55 text-stone-700 hover:text-brand-rose rounded-lg text-xs font-semibold border border-stone-150 transition-all cursor-pointer"
                  >
                    ✨ Complete Glam Package (Outfit Drape, Lashes & Hair)
                  </button>
                </div>
              )}

              {flowState === "ended" && !isTyping && (
                <div className="p-4 bg-[#FFF2F2] border border-brand-rose/10 rounded-2xl text-center text-xs text-stone-700 space-y-2 animate-fadeIn mx-2.5">
                  <p className="font-semibold text-brand-dark flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500 animate-pulse" />
                    <span>Inquiry Captured</span>
                  </p>
                  <p className="text-[10.5px] leading-relaxed text-stone-500">Your preferences have been securely logged in Rakhee's Private Desk. Our Admissions Coordinator will personal-chat you very shortly on WhatsApp!</p>
                  <button
                    onClick={handleRestart}
                    className="mt-1 px-3 py-1.5 bg-brand-rose hover:bg-brand-dark text-white text-[9.5px] font-bold tracking-wider uppercase rounded-xl transition-all border-0 cursor-pointer w-full"
                  >
                    Start New Glam Consultation
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom text typing area mimicking real social apps */}
            <div className="p-3 bg-white border-t border-stone-100 flex items-center gap-2">
              <input
                type="text"
                placeholder={flowState === "ended" ? "Consultation session has ended." : "Type event details, date, or hit options..."}
                value={inputText}
                disabled={flowState === "ended"}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className={`flex-1 border rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose ${
                  flowState === "ended" 
                    ? "bg-stone-50 border-stone-100 text-stone-400 cursor-not-allowed font-mono" 
                    : "bg-stone-50 border-stone-150 text-stone-800"
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={flowState === "ended"}
                className={`w-9 h-9 rounded-full text-white flex items-center justify-center transition-colors shrink-0 ${
                  flowState === "ended"
                    ? "bg-stone-200 cursor-not-allowed text-stone-400"
                    : "bg-brand-rose hover:bg-brand-dark cursor-pointer"
                }`}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
