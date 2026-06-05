import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Instagram, Phone, Calendar, MapPin, Sparkles, Check, UserPlus } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
  isOptionList?: boolean;
}

export default function InstagramDMAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Current session conversational flow state:
  // "welcome", "bridal_collecting", "bridal_phone", "party_collecting", "party_event_type", "party_service_type", "party_phone", "general"
  const [flowState, setFlowState] = useState<
    "welcome" | "bridal_collecting" | "bridal_phone" | "party_collecting" | "party_event_type" | "party_service_type" | "party_phone" | "general"
  >("welcome");

  // Collected lead information values
  const [leadDetails, setLeadDetails] = useState<{
    date?: string;
    location?: string;
    eventType?: string;
    guestCount?: string;
    time?: string;
    desiredPackage?: string;
    whatsapp?: string;
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
        simulateTypingThenReply(
          "Congratulations on your upcoming event! 💕\n\nTo help us check availability and provide the best package, please share:\n\n📅 Event Date\n📍 Event Location\n💍 Type of Event (Wedding, Engagement, Reception, etc.)\n👤 Number of People Requiring Makeup",
          "bridal_collecting"
        );
        break;

      case 2: // Party Makeup
        simulateTypingThenReply(
          "Wonderful! ✨\n\nPlease share:\n\n📅 Event Date\n📍 Event Location\n⏰ Event Time\n👤 Number of People Requiring Makeup",
          "party_collecting"
        );
        break;

      case 3: // Check Availability
        simulateTypingThenReply(
          "I'd be happy to check availability ✨\n\nPlease share:\n\n📅 Event Date\n📍 Event Location\n💄 Service Required\n\nThen we will finalize checking my open diary!",
          "general"
        );
        break;

      case 4: // Pricing & Packages
        simulateTypingThenReply(
          "Pricing depends on several factors including:\n\n📅 Event Date\n📍 Location\n💄 Type of Makeup Service\n👤 Number of Clients\n\nPlease share these details and we'll provide the most suitable package options.\n\n*(Please note we do not provide fixed pricing upfront as each makeup package is customized to create the perfect dream look!)*",
          "general"
        );
        break;

      case 5: // Portfolio & Previous Work
        simulateTypingThenReply(
          "You can view our latest makeup transformations, bridal looks, and client results on our Instagram profile and highlights 💕\n\nIf you're interested in a particular style, feel free to share a reference image and we'll be happy to discuss it.",
          "general"
        );
        break;

      default:
        break;
    }
  };

  const handleEventTypeSelect = (type: string) => {
    addMessage("user", `Event Type: ${type}`);
    setLeadDetails(prev => ({ ...prev, eventType: type }));
    
    simulateTypingThenReply(
      "Perfect! Next, would you like:\n\n💄 Makeup Only\n💇 Hair Styling + Makeup\n✨ Complete Glam Package",
      "party_service_type"
    );
  };

  const handleServiceTypeSelect = (service: string) => {
    addMessage("user", `Desired Service: ${service}`);
    setLeadDetails(prev => ({ ...prev, desiredPackage: service }));

    simulateTypingThenReply(
      "Thank you 💕\n\nPlease share your WhatsApp number so we can confirm availability and provide package details.",
      "party_phone"
    );
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userText = inputText.trim();
    addMessage("user", userText);
    setInputText("");

    // Conversational flow tree parser
    const lowerText = userText.toLowerCase();

    // Reset indicator on toggle
    setHasNewMessage(false);

    // Flow State: BRIDAL COLLECTING
    if (flowState === "bridal_collecting") {
      simulateTypingThenReply(
        "Thank you ✨\n\nOur team will review your details and get back to you shortly with availability and package options.\n\nMay I also have your WhatsApp number for faster communication?",
        "bridal_phone"
      );
      return;
    }

    // Flow State: PARTY COLLECTING
    if (flowState === "party_collecting") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage("assistant", "What type of event is this?", true);
        setFlowState("party_event_type");
      }, 1000);
      return;
    }

    // Checking for telephone numbers inside strings to save lead
    const phoneRegex = /(\+?\d[\d\s-]{7,15}\d)/;
    const matchedPhone = userText.match(phoneRegex);

    if ((flowState === "bridal_phone" || flowState === "party_phone" || matchedPhone) && 
        (lowerText.includes("whatsapp") || lowerText.includes("phone") || matchedPhone || flowState.includes("phone"))) {
      
      const num = matchedPhone ? matchedPhone[0] : userText;
      setLeadDetails(prev => ({ ...prev, whatsapp: num }));

      simulateTypingThenReply(
        "Wonderful! Thank you so much 💕 I've saved your phone number, and Rakhee or someone from our team will personal-chat you on WhatsApp very soon to wrap up pricing and book your slot! ✨ Have a beautiful day!",
        "welcome"
      );
      return;
    }

    // Keyword detection fallback for natural language input
    if (lowerText.includes("bridal") || lowerText.includes("wedding") || lowerText.includes("bride") || lowerText.includes("marrige") || lowerText.includes("marriage")) {
      simulateTypingThenReply(
        "Congratulations on your upcoming event! 💕\n\nTo help us check availability and provide the best package, please share:\n\n📅 Event Date\n📍 Event Location\n💍 Type of Event (Wedding, Engagement, Reception, etc.)\n👤 Number of People Requiring Makeup",
        "bridal_collecting"
      );
    } 
    else if (lowerText.includes("party") || lowerText.includes("makeup for guest") || lowerText.includes("hair styling") || lowerText.includes("reception") || lowerText.includes("engagement")) {
      simulateTypingThenReply(
        "Wonderful! ✨\n\nPlease share:\n\n📅 Event Date\n📍 Event Location\n⏰ Event Time\n👤 Number of People Requiring Makeup",
        "party_collecting"
      );
    } 
    else if (lowerText.includes("price") || lowerText.includes("pricing") || lowerText.includes("packages") || lowerText.includes("rate") || lowerText.includes("how much") || lowerText.includes("cost")) {
      simulateTypingThenReply(
        "Pricing depends on several factors including:\n\n📅 Event Date\n📍 Location\n💄 Type of Makeup Service\n👤 Number of Clients\n\nPlease share these details and we'll provide the most suitable package options.\n\n*(Please note we do not provide fixed pricing upfront as each glammed look is custom tailored to suit you beautifully!)*",
        "general"
      );
    } 
    else if (lowerText.includes("availability") || lowerText.includes("available") || lowerText.includes("free") || lowerText.includes("book")) {
      simulateTypingThenReply(
        "I'd be happy to check availability for you ✨\n\nPlease share:\n\n📅 Event Date\n📍 Event Location\n💄 Service Required\n\nAnd I'll check Rakhee's schedule immediately!",
        "general"
      );
    } 
    else if (lowerText.includes("portfolio") || lowerText.includes("work") || lowerText.includes("gallery") || lowerText.includes("photo") || lowerText.includes("transformation")) {
      simulateTypingThenReply(
        "You can view our latest makeup transformations, bridal looks, and client results on our Instagram profile and highlights 💕\n\nIf you're interested in a particular style, feel free to share a reference image and we'll be happy to discuss it.",
        "general"
      );
    } 
    else {
      // General conversational flow fallback
      simulateTypingThenReply(
        "I'd love to help you book your custom beauty look! 💄✨\n\nPlease select one of our main options below or reply with your event details so I can check dates for you:",
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
        text: "Hi 👋\n\nThank you for contacting Blush With Rakhee 💄✨\n\nHow may we help you today?",
        timestamp: new Date(),
      }
    ]);
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

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom text typing area mimicking real social apps */}
            <div className="p-3 bg-white border-t border-stone-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type event details, date, or hit options..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-1 bg-stone-50 border border-stone-150 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-rose focus:border-brand-rose text-stone-800"
              />
              <button
                onClick={handleSendMessage}
                className="w-9 h-9 rounded-full bg-brand-rose text-white flex items-center justify-center hover:bg-brand-dark transition-colors cursor-pointer shrink-0"
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
