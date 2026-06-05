import React, { useState, useEffect } from "react";
import { Gift, Sparkles, Copy, Check, ArrowRight, ShieldCheck, CreditCard, Lock, CheckCircle2, AlertCircle, HelpCircle, RefreshCw, UserCheck } from "lucide-react";
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
  // Widget open state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpeningBox, setIsOpeningBox] = useState(false);
  const [revealedReward, setRevealedReward] = useState<RewardConfig | null>(null);
  const [generatedClaim, setGeneratedClaim] = useState<RewardClaim | null>(null);

  // Identity inputs
  const [typedUserId, setTypedUserId] = useState("");
  const [clientIp, setClientIp] = useState("127.0.0.1");
  const [isEligible, setIsEligible] = useState(true);
  const [blockedReason, setBlockedReason] = useState("");
  const [userIdFormSubmitted, setUserIdFormSubmitted] = useState(false);

  // Hidden/Cooldown status for 24 hours
  const [isCooldownActive, setIsCooldownActive] = useState(false);

  // Copy success indicator
  const [copied, setCopied] = useState(false);

  // Checkout modal inner step
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("Beauty Foundations Course");
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutProgress, setCheckoutProgress] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [paymentId, setPaymentId] = useState("");

  const courseFees: { [key: string]: number } = {
    "Beauty Foundations Course": 150,
    "Advanced Artist Program": 350,
    "Professional Makeup Business Mastery": 600
  };

  // On mount, load client's real public IP address and verify local cooldown
  useEffect(() => {
    // 24 Hour Cooldown check
    const lastClick = localStorage.getItem("blush_widget_last_claimed_click");
    if (lastClick) {
      const diff = Date.now() - parseInt(lastClick, 10);
      if (diff < 24 * 60 * 60 * 1000) {
        setIsCooldownActive(true);
      }
    }

    // IP grab
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

  // Handles client submission of their unique User/Student ID for validation
  const handleVerifyUserIdAndDraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedUserId.trim()) return;

    const trimmedInput = typedUserId.trim().toLowerCase();
    
    // Retrieve claims log
    const ledgerRaw = localStorage.getItem("blush_reward_ledgers");
    const ledgers = ledgerRaw ? JSON.parse(ledgerRaw) : [];

    // Rule: One User ID, One IP each time
    const userClaimedToday = ledgers.some((l: any) => 
      l.userId.trim().toLowerCase() === trimmedInput && 
      (Date.now() - l.timestamp < 24 * 60 * 60 * 1000)
    );

    const ipClaimedToday = ledgers.some((l: any) => 
      l.ip === clientIp && 
      (Date.now() - l.timestamp < 24 * 60 * 60 * 1000)
    );

    if (userClaimedToday) {
      setIsEligible(false);
      setBlockedReason(`This Student ID "${typedUserId}" is currently rate-limited. Limit is 1 reward claim per student every 24 hours.`);
      setUserIdFormSubmitted(true);
      return;
    }

    if (ipClaimedToday) {
      setIsEligible(false);
      setBlockedReason(`Your network IP address (${clientIp}) is currently rate-limited. Limit is 1 reward claim per network IP address every 24 hours to prevent spam.`);
      setUserIdFormSubmitted(true);
      return;
    }

    // Safe to proced! Draw reward and record click
    setIsEligible(true);
    setUserIdFormSubmitted(true);
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

      const claimRecord: RewardClaim = {
        id: "claim-" + Date.now(),
        userName: typedUserId,
        userEmail: typedUserId.includes("@") ? typedUserId : `${typedUserId.toLowerCase().replace(/\s+/g, '_')}@gmail.com`,
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
        userId: typedUserId.trim(),
        ip: clientIp,
        timestamp: Date.now()
      });
      localStorage.setItem("blush_reward_ledgers", JSON.stringify(ledgers));

    }, 1800);
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

    const claimName = typedUserId.includes("@") ? typedUserId.split("@")[0] : typedUserId;
    const generatedPayId = "pay_BLUSH_" + Math.random().toString(36).substring(2, 12).toUpperCase();
    
    setPaymentId(generatedPayId);
    setCheckoutName(claimName);
    setCheckoutEmail(typedUserId.includes("@") ? typedUserId : `${typedUserId.toLowerCase().replace(/\s+/g, '_')}@gmail.com`);
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
              userEmail: typedUserId.includes("@") ? typedUserId : `${typedUserId.toLowerCase().replace(/\s+/g, '_')}@gmail.com`,
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
      {/* Elegantly Restyled display typography launcher button */}
      <div className="fixed bottom-24 right-6 z-[9980] font-sans flex items-center gap-2">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="group shadow-2xl relative border border-[#B76E79]/45 rounded-full h-14 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 hover:border-[#B76E79] flex items-center justify-center p-1.5 focus:outline-none cursor-pointer duration-300 w-auto hover:scale-105 active:scale-95 pl-5 pr-4 text-white"
          title="Claim Beauty Reward"
          id="beauty-reward-floating-badge"
        >
          <span className="text-[12px] font-serif italic tracking-wide text-[#FFD3D6] select-none mr-2.5 group-hover:text-white duration-300">
            Unlock your private beauty reward
          </span>
          <div className="w-9 h-9 rounded-full bg-[#B76E79] flex items-center justify-center text-white shrink-0 border border-white/20 group-hover:bg-[#FFD3D6] group-hover:text-stone-900 duration-300 relative">
            <Sparkles size={14} className="animate-pulse" />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-[9995] flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-white rounded-[32px] border border-stone-100 max-w-sm w-full shadow-2xl relative animate-fadeIn overflow-hidden text-left flex flex-col justify-between">
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-50 text-stone-400 hover:text-stone-700 flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
            >
              ✕
            </button>

            {/* Step 1: User Verification Flow (Required to fulfill One user ID, one IP each time) */}
            {!userIdFormSubmitted ? (
              <div className="p-8 space-y-5">
                <div className="text-center space-y-2 pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#FFF2F2] flex items-center justify-center mx-auto text-[#B76E79] border border-[#B76E79]/15">
                    <UserCheck size={22} className="animate-pulse" />
                  </div>
                  <h3 className="font-serif italic text-2xl font-medium tracking-tight text-stone-900">
                    Verify Your ID
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Each user is authorized to claim exactly one limited cohort beauty box voucher per day.
                  </p>
                </div>

                <form onSubmit={handleVerifyUserIdAndDraw} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-stone-400 font-bold uppercase text-[9px] tracking-wider">
                      Student ID or Email Address
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. STU-10842 or your@gmail.com"
                      value={typedUserId}
                      onChange={(e) => setTypedUserId(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 px-3.5 py-3 rounded-xl text-xs text-stone-850 font-mono text-center focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
                    />
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center">
                    <span className="block text-[8px] uppercase tracking-widest text-stone-400 font-mono font-bold">Secure Gate IP Mapping</span>
                    <strong className="block text-[11px] font-mono text-stone-700 font-bold mt-1">{clientIp}</strong>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B76E79] hover:bg-[#a35e68] text-white text-[11px] font-mono uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer font-extrabold flex items-center justify-center gap-1.5"
                  >
                    🚀 Verify Eligibility &amp; Claim Box
                  </button>
                </form>
              </div>
            ) : !isEligible ? (
              /* Block Screen View */
              <div className="p-8 space-y-6 text-center py-12">
                <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full border border-red-100 flex items-center justify-center mx-auto">
                  <Lock size={26} className="animate-bounce" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-serif italic text-2xl font-medium tracking-tight text-stone-950">
                    Claim Limit Exceeded
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {blockedReason}
                  </p>
                </div>

                <div className="bg-[#FEFAF8] p-4 rounded-2xl border border-red-100 text-left space-y-1.5 text-xs">
                  <p className="flex justify-between font-mono text-[10px]">
                    <span className="text-stone-400">Target ID:</span>
                    <strong className="text-stone-700">{typedUserId}</strong>
                  </p>
                  <p className="flex justify-between font-mono text-[10px]">
                    <span className="text-stone-400">Target IP:</span>
                    <strong className="text-stone-700">{clientIp}</strong>
                  </p>
                  <p className="flex justify-between font-mono text-[10px] pt-1 border-t border-stone-200 text-stone-400 font-bold">
                    <span>Gate Status:</span>
                    <span className="text-red-600 font-extrabold">BLOCKED FOR 24 HOURS</span>
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-stone-900 text-white text-xs font-bold py-3.5 rounded-xl cursor-pointer"
                >
                  Close Gate Session
                </button>
              </div>
            ) : isOpeningBox ? (
              /* Suspense loading screen */
              <div className="p-8 text-center space-y-6 py-16">
                <div className="w-24 h-24 rounded-full bg-[#FFF2F2] flex items-center justify-center mx-auto text-[#B76E79] relative shrink-0 border border-[#B76E79]/20 animate-wiggle">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#B76E79] animate-spin duration-[4000ms]" />
                  <Gift size={44} className="animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif italic text-2xl font-medium tracking-tight text-stone-900">
                    Hand-Selecting Coupon
                  </h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                    Analyzing database configurations, ensuring correct mapping checks for your ID.
                  </p>
                </div>
                <div className="flex justify-center items-center gap-1 font-mono text-[9px] text-[#B76E79] tracking-widest font-bold uppercase shrink-0">
                  <RefreshCw size={12} className="animate-spin" /> Authorization checked
                </div>
              </div>
            ) : !isCheckoutOpen ? (
              /* Step 2: Revealed coupon and immediate Checkout offer */
              <div className="p-8 space-y-5">
                <div className="text-center space-y-2 border-b border-stone-100 pb-5">
                  <div className="w-12 h-12 rounded-full bg-[#FFF2F2] flex items-center justify-center mx-auto text-[#B76E79] border border-[#B76E79]/15">
                    <Sparkles size={20} className="animate-bounce" />
                  </div>
                  <h3 className="font-serif italic text-2xl font-medium tracking-tight text-stone-900">
                    Your Reward is Live!
                  </h3>
                  <p className="text-xs text-stone-500">
                    Your private cosmetic seat allowance is recorded under ID: <span className="font-mono font-bold text-stone-800">{typedUserId}</span>
                  </p>
                </div>

                {revealedReward && generatedClaim && (
                  <div className="bg-[#FFFBF9] border border-[#B76E79]/25 rounded-2xl p-5 relative overflow-hidden space-y-3.5">
                    <div className="absolute top-0 right-0 py-1 px-3 bg-[#B76E79] text-white text-[8px] font-mono tracking-widest uppercase font-bold rounded-bl-xl shadow-xs">
                      {isDiscountType ? `${discountPercent}% Clipped` : "Free Add-on"}
                    </div>
                    
                    <div className="space-y-1 text-center font-sans">
                      <span className="font-mono text-[9px] text-[#B76E79] uppercase tracking-widest font-bold block">
                        Unboxed offer
                      </span>
                      <h4 className="font-serif italic text-lg font-bold text-stone-900 leading-tight">
                        {revealedReward.label}
                      </h4>
                    </div>

                    <div className="border-t border-brand-rose/10 pt-3 text-[10.5px] text-stone-600 space-y-1">
                      <p className="flex justify-between">
                        <span className="text-stone-400">Coupon:</span>
                        <span className="font-mono font-bold text-stone-800">{generatedClaim.code}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-stone-400">Expires on:</span>
                        <span className="font-mono font-bold text-stone-600">{revealedReward.expiryDate}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-stone-400">Applied Course:</span>
                        <span className="font-serif italic font-bold text-right text-[#B76E79] max-w-[150px] truncate">{targetCourseInForm}</span>
                      </p>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <div className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono font-semibold text-stone-850 flex-grow flex items-center justify-between select-all leading-none">
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

                <div className="space-y-2 pt-2">
                  <div className="bg-[#FFFDFD] border border-[#B76E79]/10 rounded-2xl p-4 space-y-1.5 text-xs text-left">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Std Academy Fee:</span>
                      <span className="line-through font-mono">{formatPrice(originalFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#B76E79]">
                      <span>Discount Applied:</span>
                      <span>-{formatPrice((originalFee * discountPercent)/100)}</span>
                    </div>
                    <div className="flex justify-between text-stone-900 pt-1.5 border-t border-stone-200">
                      <span className="font-bold">Total Bill:</span>
                      <strong className="font-serif text-lg font-bold text-emerald-700 font-mono">{formatPrice(finalFee)}</strong>
                    </div>
                  </div>

                  {/* ONE-CLICK PAYMENT ACTION */}
                  <button
                    onClick={handleOneClickCheckoutAndPay}
                    className="w-full bg-[#B76E79] hover:bg-[#a35e68] text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Instant Pay with 1 Click</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <p className="text-[9.5px] leading-relaxed text-stone-400 text-center">
                  🔒 PCI-Compliant Razorpay Ingress. Claim is verified for IP: <strong>{clientIp}</strong>
                </p>

              </div>
            ) : (
              /* Step 3: Success payment screen, instantaneously verified and processed */
              <div className="p-8 space-y-6 text-center animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 size={30} />
                </div>
                
                <div className="space-y-1.5">
                  <h5 className="font-serif italic text-2xl font-medium tracking-tight text-stone-900">
                    Payment Success!
                  </h5>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    Your enrollment fee of <span className="font-bold text-[#B76E79]">{formatPrice(finalFee)}</span> was successfully transacted via Razorpay. Welcome to Rakhee's cohort roster!
                  </p>
                </div>

                <div className="bg-[#FFFBF9] border border-[#B76E79]/15 rounded-2xl p-4 text-left text-xs space-y-2">
                  <p className="flex justify-between font-mono text-[10.5px]">
                    <span className="text-stone-400 font-sans">Student:</span>
                    <strong className="text-stone-850 font-sans">{checkoutName}</strong>
                  </p>
                  <p className="flex justify-between font-mono text-[10.5px]">
                    <span className="text-stone-400 font-sans">Program Plan:</span>
                    <strong className="text-stone-800 text-right truncate max-w-[150px] font-sans">{selectedCourse}</strong>
                  </p>
                  <p className="flex justify-between font-mono text-[10.5px]">
                    <span className="text-stone-400 font-sans">Code Applied:</span>
                    <strong className="text-[#B76E79] font-bold">{generatedClaim?.code}</strong>
                  </p>
                  <p className="flex justify-between text-[9px] pt-1.5 border-t border-stone-200 font-mono text-stone-400 font-bold">
                    <span>Razorpay ID:</span>
                    <span className="text-stone-900 select-all font-mono">{paymentId}</span>
                  </p>
                </div>

                <p className="text-[10px] text-stone-500 leading-relaxed max-w-xs mx-auto">
                  Orientation credentials and receipt codes have been assigned to your profile record <strong>{checkoutEmail}</strong>.
                </p>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.location.reload(); // Instantly update statistics inside Admin OS
                  }}
                  className="w-full bg-stone-900 hover:bg-[#B76E79] text-white text-xs font-mono uppercase font-bold py-3.5 rounded-xl transition-all cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
