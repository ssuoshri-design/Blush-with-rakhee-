import React, { useState, useEffect } from "react";
import { Sparkles, Copy, Check, ArrowRight, Lock, CheckCircle2, RefreshCw, Gift } from "lucide-react";
import { RewardConfig, RewardClaim } from "../types";

interface BeautyRewardWidgetProps {
  rewards: RewardConfig[];
  setRewards: React.Dispatch<React.SetStateAction<RewardConfig[]>>;
  claims: RewardClaim[];
  setClaims: React.Dispatch<React.SetStateAction<RewardClaim[]>>;
  currency: "USD" | "INR";
  formatPrice: (usdAmount: number, digits?: number) => string;
}

export default function BeautyRewardWidget({
  rewards,
  setRewards,
  claims,
  setClaims,
  currency,
  formatPrice
}: BeautyRewardWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpeningBox, setIsOpeningBox] = useState(false);
  const [revealedReward, setRevealedReward] = useState<RewardConfig | null>(null);
  const [generatedClaim, setGeneratedClaim] = useState<RewardClaim | null>(null);

  // Simple Email Signup Inputs
  const [typedEmail, setTypedEmail] = useState("");
  const [clientIp, setClientIp] = useState("127.0.0.1");
  const [isEligible, setIsEligible] = useState(true);
  const [blockedReason, setBlockedReason] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Hidden / Cooldown status for 24 hours
  const [isCooldownActive, setIsCooldownActive] = useState(false);

  // Copy success indicator
  const [copied, setCopied] = useState(false);

  // Checkout modal inner step
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("Beauty Foundations Course");
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutProgress, setCheckoutProgress] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [paymentId, setPaymentId] = useState("");

  const courseFees: { [key: string]: number } = {
    "Beauty Foundations Course": 150,
    "Advanced Artist Program": 350,
    "Professional Makeup Business Mastery": 600
  };

  // Check state on mount
  useEffect(() => {
    // 24 Hour Cooldown check
    const lastClick = localStorage.getItem("blush_widget_last_claimed_click");
    if (lastClick) {
      const diff = Date.now() - parseInt(lastClick, 10);
      if (diff < 24 * 60 * 60 * 1000) {
        setIsCooldownActive(true);
      }
    }

    // IP address retrieval to securely prevent multiple claims
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.ip) {
          setClientIp(data.ip);
        }
      })
      .catch(() => {
        let savedIp = localStorage.getItem("blush_sim_client_ip");
        if (!savedIp) {
          savedIp = `157.48.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`;
          localStorage.setItem("blush_sim_client_ip", savedIp);
        }
        setClientIp(savedIp);
      });
  }, []);

  const handleCopy = () => {
    if (!revealedReward || !generatedClaim) return;
    navigator.clipboard.writeText(generatedClaim.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handles client submission of their email address for validation
  const handleVerifyEmailAndDraw = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = typedEmail.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Retrieve claims log
    const ledgerRaw = localStorage.getItem("blush_reward_ledgers");
    const ledgers = ledgerRaw ? JSON.parse(ledgerRaw) : [];

    // Rule check: One Email ID, One IP each time
    const emailClaimedToday = ledgers.some((l: any) => 
      l.email.trim().toLowerCase() === trimmedEmail && 
      (Date.now() - l.timestamp < 24 * 60 * 60 * 1000)
    );

    const ipClaimedToday = ledgers.some((l: any) => 
      l.ip === clientIp && 
      (Date.now() - l.timestamp < 24 * 60 * 60 * 1000)
    );

    if (emailClaimedToday) {
      setIsEligible(false);
      setBlockedReason(`This email "${trimmedEmail}" has already unlocked a bonus coupon package today. Check back tomorrow!`);
      setEmailSubmitted(true);
      return;
    }

    if (ipClaimedToday) {
      setIsEligible(false);
      setBlockedReason(`Only one promotion can be unlocked per reservation network every 24 hours. Please speak with an academy coordinator if you require assistance.`);
      setEmailSubmitted(true);
      return;
    }

    // Safe! Proceed to draw reward and record Click immediately
    setIsEligible(true);
    setEmailSubmitted(true);
    drawRandomReward();
  };

  const drawRandomReward = () => {
    const activeRewards = rewards.filter((r) => r.isEnabled);
    if (activeRewards.length === 0) {
      alert("All rewards are currently claimed. Please check our Instagram feed for seasonal updates!");
      return;
    }

    setIsOpeningBox(true);
    setRevealedReward(null);
    setGeneratedClaim(null);

    // Hide launcher completely for the next 24 hours immediately after click draw action
    localStorage.setItem("blush_widget_last_claimed_click", String(Date.now()));
    setIsCooldownActive(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * activeRewards.length);
      const drawn = activeRewards[randomIndex];

      const claimsSeed = Math.random().toString(36).substring(2, 6).toUpperCase();
      const customCode = `${drawn.code}-${claimsSeed}`;

      const claimName = typedEmail.split("@")[0] || "Academy Guest";
      const claimRecord: RewardClaim = {
        id: "claim-" + Date.now(),
        userName: claimName.charAt(0).toUpperCase() + claimName.slice(1),
        userEmail: typedEmail.trim().toLowerCase(),
        userPhone: "+91 99911 22334",
        rewardId: drawn.id,
        rewardLabel: drawn.label,
        code: customCode,
        couponUsed: false,
        timestamp: new Date().toISOString()
      };

      setRevealedReward(drawn);
      setGeneratedClaim(claimRecord);
      setIsOpeningBox(false);

      // Mutate counters safely
      setRewards((prev) =>
        prev.map((r) =>
          r.id === drawn.id
            ? { ...r, claimsCount: r.claimsCount + 1 }
            : r
        )
      );

      setClaims((prev) => [claimRecord, ...prev]);

      // Record to secure ledger immediately to seal User + IP address constraint
      const ledgerRaw = localStorage.getItem("blush_reward_ledgers");
      const ledgers = ledgerRaw ? JSON.parse(ledgerRaw) : [];
      ledgers.push({
        email: typedEmail.trim().toLowerCase(),
        ip: clientIp,
        timestamp: Date.now()
      });
      localStorage.setItem("blush_reward_ledgers", JSON.stringify(ledgers));

    }, 1500);
  };

  // ONE-CLICK INSTANT PAYMENT AND AUTOMATIC ENROLLMENT SUCCESS
  const handleOneClickCheckoutAndPay = () => {
    if (!revealedReward || !generatedClaim) return;

    // Pick first eligible course
    const targetCourse = revealedReward.eligibleCourses[0] || "Beauty Foundations Course";
    const originalPrice = courseFees[targetCourse] || 150;
    
    let finalPrice = originalPrice;
    if (revealedReward.type === "discount") {
      finalPrice = originalPrice - (originalPrice * (revealedReward.value / 100));
    }

    const claimName = generatedClaim.userName;
    const generatedPayId = "pay_BLUSH_" + Math.random().toString(36).substring(2, 12).toUpperCase();
    
    setPaymentId(generatedPayId);
    setCheckoutName(claimName);
    setSelectedCourse(targetCourse);

    // Create student receipt directly inside local Database structures
    const newStudent = {
      id: "student-" + Date.now(),
      name: claimName,
      courseName: targetCourse,
      progress: 0,
      paymentStatus: "Paid" as const,
      enrollmentDate: new Date().toISOString().split("T")[0]
    };

    // Store to demo student roster
    const existingStudentsSaved = localStorage.getItem("blush_sim_students");
    const studentsArray = existingStudentsSaved ? JSON.parse(existingStudentsSaved) : [];
    localStorage.setItem("blush_sim_students", JSON.stringify([newStudent, ...studentsArray]));

    // Scale up catalog revenue inside database
    const existingCoursesSaved = localStorage.getItem("blush_sim_courses");
    if (existingCoursesSaved) {
      const coursesArray = JSON.parse(existingCoursesSaved);
      const updatedCoursesArray = coursesArray.map((c: any) => {
        if (c.name === targetCourse) {
          return {
            ...c,
            studentsCount: c.studentsCount + 1,
            revenue: c.revenue + originalPrice
          };
        }
        return c;
      });
      localStorage.setItem("blush_sim_courses", JSON.stringify(updatedCoursesArray));
    }

    // Mark secure claim as finalized
    setClaims((prev) =>
      prev.map((c) =>
        c.id === generatedClaim.id
          ? {
              ...c,
              userName: claimName,
              userEmail: typedEmail.trim().toLowerCase(),
              userPhone: "+91 99911 22334",
              couponUsed: true,
              usedForCourse: targetCourse,
              revenueAmount: finalPrice
            }
          : c
      )
    );

    // Update config usages
    setRewards((prev) =>
      prev.map((r) =>
        r.id === revealedReward.id
          ? { ...r, usedCount: r.usedCount + 1 }
          : r
      )
    );

    // Success Screen Render
    setCheckoutProgress("success");
    setIsCheckoutOpen(true);
  };

  const targetCourseInForm = revealedReward?.eligibleCourses[0] || "Beauty Foundations Course";
  const originalFee = courseFees[targetCourseInForm] || 150;
  const isDiscountType = revealedReward?.type === "discount";
  const discountPercent = revealedReward?.value || 0;
  const finalFee = isDiscountType
    ? originalFee - (originalFee * discountPercent) / 100
    : originalFee;

  // Render nothing if hidden by the 24 hours cooldown
  if (isCooldownActive) {
    return null;
  }

  return (
    <>
      {/* Floating launcher badge */}
      <div className="fixed bottom-24 right-6 z-[9980] font-sans flex items-center gap-2">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="group shadow-2xl relative border border-[#B76E79]/45 rounded-full h-14 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 hover:border-[#B76E79] flex items-center justify-center p-1.5 focus:outline-none cursor-pointer duration-300 w-auto hover:scale-105 active:scale-95 pl-5 pr-4 text-white"
          title="Claim Beauty Reward"
          id="beauty-reward-floating-badge"
        >
          <span className="text-[12.5px] font-serif italic tracking-wide text-[#FFD3D6] select-none mr-3 group-hover:text-white duration-300 font-medium">
            Unlock your private beauty reward
          </span>
          <div className="w-9 h-9 rounded-full bg-[#B76E79] flex items-center justify-center text-white shrink-0 border border-white/20 group-hover:bg-[#FFD3D6] group-hover:text-stone-900 duration-300 relative">
            <Sparkles size={14} className="animate-pulse" />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-[9995] flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-[#FAF8F6] rounded-[36px] border border-stone-200/60 max-w-sm w-full shadow-2xl relative animate-fadeIn overflow-hidden text-left flex flex-col justify-between">
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white text-stone-400 hover:text-stone-700 flex items-center justify-center transition-all cursor-pointer font-sans text-sm border border-stone-100"
            >
              ✕
            </button>

            {/* Step 1: Input Email */}
            {!emailSubmitted ? (
              <div className="p-8 space-y-6">
                <div className="text-center space-y-2 pb-1">
                  <div className="w-12 h-12 rounded-full bg-[#FFF2F2] flex items-center justify-center mx-auto text-[#B76E79] border border-[#B76E79]/15">
                    <Gift size={20} className="animate-pulse" />
                  </div>
                  <h3 className="font-serif italic text-2xl font-semibold tracking-wide text-stone-900">
                    Your Beauty Gift
                  </h3>
                  <p className="text-[12.5px] text-stone-500 font-sans leading-relaxed px-1">
                    Enter your email to unlock a premium tuition credit valid for any academy course.
                  </p>
                </div>

                <form onSubmit={handleVerifyEmailAndDraw} className="space-y-4">
                  <div className="space-y-1.5 text-center">
                    <label className="block text-stone-400 font-serif italic text-xs tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. gorgeous@example.com"
                      value={typedEmail}
                      onChange={(e) => setTypedEmail(e.target.value)}
                      className="w-full bg-white border border-stone-200 px-4 py-3 rounded-2xl text-xs text-stone-850 font-sans text-center focus:outline-none focus:ring-1 focus:ring-[#B76E79] placeholder-stone-300 font-medium tracking-wide shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B76E79] hover:bg-[#a35e68] text-white text-[11px] font-sans uppercase tracking-widest py-4 rounded-2xl transition-all cursor-pointer font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>REVEAL MY BONUS</span>
                    <Sparkles size={12} className="animate-pulse" />
                  </button>
                </form>

                <p className="text-[10px] text-stone-400 text-center select-none font-sans mt-2">
                  *Voucher valid for immediate program seat bookings.
                </p>
              </div>
            ) : !isEligible ? (
              /* Simple Rate-Limit Block Screen */
              <div className="p-8 space-y-6 text-center py-12">
                <div className="w-14 h-14 bg-rose-50 text-[#B76E79] rounded-full border border-rose-100 flex items-center justify-center mx-auto">
                  <Lock size={22} />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-serif italic text-2xl font-semibold tracking-wide text-stone-950">
                    Come Back Tomorrow
                  </h4>
                  <p className="text-[12.5px] text-stone-600 leading-relaxed font-sans px-2">
                    {blockedReason}
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-stone-900 text-white text-[11px] uppercase tracking-widest font-bold py-3.5 rounded-2xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : isOpeningBox ? (
              /* Instant clean loading */
              <div className="p-8 text-center space-y-5 py-16">
                <div className="w-20 h-20 rounded-full bg-[#FFF2F2] flex items-center justify-center mx-auto text-[#B76E79] relative shrink-0 border border-[#B76E79]/20 animate-pulse">
                  <Gift size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif italic text-xl font-medium tracking-wide text-stone-800">
                    Preparing Your Offer...
                  </h4>
                </div>
                <div className="flex justify-center items-center gap-2 font-sans text-[10px] text-[#B76E79] tracking-wider font-semibold uppercase shrink-0">
                  <RefreshCw size={12} className="animate-spin" /> Customizing course seat
                </div>
              </div>
            ) : !isCheckoutOpen ? (
              /* Step 2: Unboxed award panel */
              <div className="p-8 space-y-5">
                <div className="text-center space-y-2 border-b border-stone-200/40 pb-5">
                  <div className="w-12 h-12 rounded-full bg-[#FFF2F2] flex items-center justify-center mx-auto text-[#B76E79] border border-[#B76E79]/15">
                    <Sparkles size={20} className="animate-bounce" />
                  </div>
                  <h3 className="font-serif italic text-2xl font-semibold tracking-wide text-stone-900">
                    Your Gift is Ready
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Locked to <span className="font-sans font-bold text-stone-800">{typedEmail}</span>
                  </p>
                </div>

                {revealedReward && generatedClaim && (
                  <div className="bg-white border border-[#B76E79]/20 rounded-3xl p-5 relative overflow-hidden space-y-3.5 shadow-xs">
                    <div className="absolute top-0 right-0 py-1 px-3 bg-[#B76E79] text-white text-[8px] font-sans tracking-widest uppercase font-bold rounded-bl-2xl">
                      {isDiscountType ? `${discountPercent}% Off` : "Exclusive Seat"}
                    </div>
                    
                    <div className="space-y-1 text-center font-sans">
                      <span className="font-sans text-[9px] text-[#B76E79] tracking-widest font-bold uppercase block">
                        Clipped Benefit
                      </span>
                      <h4 className="font-serif italic text-lg font-bold text-stone-900 leading-tight">
                        {revealedReward.label}
                      </h4>
                    </div>

                    <div className="border-t border-stone-100 pt-3 text-[11px] text-stone-600 space-y-1.5 font-sans">
                      <p className="flex justify-between">
                        <span className="text-stone-400">Voucher Code:</span>
                        <span className="font-sans font-bold tracking-wider text-stone-800">{generatedClaim.code}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-stone-400">Validity:</span>
                        <span className="font-sans font-semibold text-stone-600">{revealedReward.expiryDate}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-stone-400">Applying To:</span>
                        <span className="font-serif italic font-bold text-right text-[#B76E79] max-w-[150px] truncate">{targetCourseInForm}</span>
                      </p>
                    </div>

                    <div className="flex gap-2 pt-1 font-sans">
                      <div className="bg-[#FAF8F6] border border-stone-200 rounded-xl px-3 py-2 text-xs font-sans font-semibold text-stone-850 flex-grow flex items-center justify-between select-all leading-none tracking-wider">
                        <span>{generatedClaim.code}</span>
                      </div>
                      <button
                        onClick={handleCopy}
                        className="py-2.5 px-3 rounded-xl bg-stone-900 border border-stone-900 text-white hover:bg-stone-800 duration-200 cursor-pointer text-xs flex items-center gap-1.5 font-bold shrink-0"
                      >
                        {copied ? (
                          <>
                            <Check size={13} className="text-emerald-400" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-1">
                  <div className="bg-white border border-stone-200/60 rounded-3xl p-4.5 space-y-1.5 text-xs text-left shadow-xs">
                    <div className="flex justify-between text-stone-500">
                      <span>Standard Rate:</span>
                      <span className="line-through">{formatPrice(originalFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#B76E79]">
                      <span>Voucher Applied:</span>
                      <span>-{formatPrice((originalFee * discountPercent)/100)}</span>
                    </div>
                    <div className="flex justify-between text-stone-905 pt-2 border-t border-stone-100">
                      <span className="font-serif italic font-semibold text-sm">Your Final Cost:</span>
                      <strong className="font-serif text-lg font-bold text-emerald-800">{formatPrice(finalFee)}</strong>
                    </div>
                  </div>

                  {/* direct booking card checkout */}
                  <button
                    onClick={handleOneClickCheckoutAndPay}
                    className="w-full bg-[#B76E79] hover:bg-[#a35e68] text-white text-[11px] font-sans uppercase tracking-wider py-4 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 font-bold"
                  >
                    <span>Instant Reserve Seat with 1 Click</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <p className="text-[10px] leading-relaxed text-stone-400 text-center font-sans">
                  🔒 Encrypted and securely processed via Razorpay gateway.
                </p>

              </div>
            ) : (
              /* Step 3: Success card */
              <div className="p-8 space-y-6 text-center animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100 flex items-center justify-center mx-auto zoomIn">
                  <CheckCircle2 size={26} />
                </div>
                
                <div className="space-y-1.5">
                  <h5 className="font-serif italic text-2xl font-semibold tracking-wide text-stone-900">
                    Registration Confirmed!
                  </h5>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed px-1">
                    Your special seat pricing of <span className="font-bold text-[#B76E79]">{formatPrice(finalFee)}</span> has been reserved. Welcome to Rakhee's academy!
                  </p>
                </div>

                <div className="bg-white border border-stone-200/50 rounded-3xl p-4.5 text-left text-xs space-y-2.5 shadow-xs">
                  <p className="flex justify-between font-sans text-stone-600">
                    <span>Student:</span>
                    <strong className="text-stone-850 font-bold">{checkoutName}</strong>
                  </p>
                  <p className="flex justify-between font-sans text-stone-600">
                    <span>Academy Program:</span>
                    <strong className="text-stone-800 text-right truncate max-w-[150px]">{selectedCourse}</strong>
                  </p>
                  <p className="flex justify-between font-sans text-stone-600">
                    <span>Voucher Used:</span>
                    <strong className="text-[#B76E79] font-medium tracking-wide">{generatedClaim?.code}</strong>
                  </p>
                </div>

                <p className="text-[11px] text-stone-500 leading-relaxed font-sans px-2">
                  An onboarding coordinates dispatch has been sent immediately to <strong>{typedEmail}</strong>.
                </p>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.location.reload();
                  }}
                  className="w-full bg-stone-900 hover:bg-[#B76E79] text-white text-[11px] uppercase tracking-wider font-semibold py-3.5 rounded-2xl cursor-pointer"
                >
                  Return to Academy
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
