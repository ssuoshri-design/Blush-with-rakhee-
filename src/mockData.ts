/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InstagramReel, CollabLead, Testimonial, ContentPillar, AffiliateItem, NewsletterSubscriber, FAQItem, CreatorStats, CreatorMessage } from "./types";

export const initialStats: CreatorStats = {
  followers: 1009,
  reelsCount: 29,
  engagementAvg: 8.8, // 8.8% is phenomenal for micro-creators, making her highly attractive for brands
  brandCollabsToDate: 12,
  monthlyReach: 142500,
  averageViews: 8400,
};

export const initialPillars: ContentPillar[] = [
  {
    id: "pillar-1",
    title: "Makeup Tutorials",
    description: "Step-by-step techniques to achieve flawless everyday glamour, specializing in soft-glam and color blending matching South Asian skin tones.",
    iconName: "Sparkles",
    exampleReelTitle: "Flawless Base Routine",
    count: 8,
  },
  {
    id: "pillar-2",
    title: "Product Reviews",
    description: "Unbiased, deeply honest wear-tests and swatch videos of emerging viral makeup and skincare launches. Cruelty-free brand focus.",
    iconName: "Search",
    exampleReelTitle: "Honest Pink Blush Swatch Fest",
    count: 7,
  },
  {
    id: "pillar-3",
    title: "Beauty Hacks",
    description: "Smart time-saving shortcuts, budget beauty dupes, and professional application shortcuts that change your daily cosmetic rituals.",
    iconName: "Lightbulb",
    exampleReelTitle: "The Instant Brow Lift Trick",
    count: 4,
  },
  {
    id: "pillar-4",
    title: "Skincare Guide",
    description: "Demystifying active ingredients, skin barriers, and AM/PM routines for radiant, balanced, and deeply hydrated skin under makeup.",
    iconName: "Droplet",
    exampleReelTitle: "Dewy Skin Prep Routine",
    count: 5,
  },
  {
    id: "pillar-5",
    title: "GRWM (Get Ready With Me)",
    description: "Immersive chatty transitions pairing lifestyle, relatable daily reflections, and visual makeup styling in authentic continuous flow.",
    iconName: "Video",
    exampleReelTitle: "Coffee and Soft Glam GRWM",
    count: 3,
  },
  {
    id: "pillar-6",
    title: "Transformations",
    description: "Aesthetic, high-impact jump-cut transitions showcasing the artistic power of cosmetic placement and natural feature highlighting.",
    iconName: "RefreshCw",
    exampleReelTitle: "Golden Hour Glow Up Transition",
    count: 2,
  },
];

export const initialReels: InstagramReel[] = [
  {
    id: "reel-1",
    title: "South Asian Soft Glam: Warm Gold Eye & Dewy Blush",
    thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    category: "Makeup Tutorial",
    views: 12400,
    likes: 1280,
    engagementRate: 11.2,
    instagramUrl: "https://placeholder-instagram.com/reel/1",
    duration: "0:45",
    publishedDate: "2026-05-28",
  },
  {
    id: "reel-2",
    title: "Skincare Prep: Secrets for a Crease-Free Under-Eye",
    thumbnail: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600",
    category: "Skincare",
    views: 9800,
    likes: 840,
    engagementRate: 9.1,
    instagramUrl: "https://placeholder-instagram.com/reel/2",
    duration: "0:30",
    publishedDate: "2026-05-24",
  },
  {
    id: "reel-3",
    title: "Honest Wear Test: Viral Hydrating Tinted Moisturizer",
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    category: "Product Reviews",
    views: 15100,
    likes: 1650,
    engagementRate: 11.9,
    instagramUrl: "https://placeholder-instagram.com/reel/3",
    duration: "1:00",
    publishedDate: "2026-05-18",
  },
  {
    id: "reel-4",
    title: "3 Essential Concealer Placements for Instant Face-Lift",
    thumbnail: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600",
    category: "Beauty Hack",
    views: 22400,
    likes: 2420,
    engagementRate: 12.5,
    instagramUrl: "https://placeholder-instagram.com/reel/4",
    duration: "0:35",
    publishedDate: "2026-05-10",
  },
  {
    id: "reel-5",
    title: "GRWM: Chatty Monochromatic Peach Makeup & Life Update",
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600",
    category: "GRWM",
    views: 8100,
    likes: 620,
    engagementRate: 7.9,
    instagramUrl: "https://placeholder-instagram.com/reel/5",
    duration: "1:30",
    publishedDate: "2026-05-02",
  },
  {
    id: "reel-6",
    title: "Dull to Radiant Base: Under 15 Minutes Transformation",
    thumbnail: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=600",
    category: "Transformation",
    views: 18900,
    likes: 1910,
    engagementRate: 10.5,
    instagramUrl: "https://placeholder-instagram.com/reel/6",
    duration: "0:50",
    publishedDate: "2026-04-26",
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    author: "Elena Vasquez",
    role: "Influencer Campaign Lead @ Glow Cosmetics",
    origin: "Brand Representative",
    text: "Working with Rakhee was one of our highest-converting small creator collaborations. Her GRWM video generated 40+ immediate coupon code activations because her community genuinely hangs on and trusts her product reviews. Extremely professional communication!",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    brandLogo: "Glow Cosmetics",
  },
  {
    id: "test-2",
    author: "Prisha Sharma",
    role: "Passionate Supporter",
    origin: "Follower Feedback",
    text: "Rakhee's concealer hack changed how I prepare for work! I always thought makeup was too complex for South Asian hyperpigmentation, but she breaks it down so simply without making us cover our natural skin beauty.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    rating: 5,
  },
  {
    id: "test-3",
    author: "Marcus Chen",
    role: "Brand Director @ Aurora Skincare",
    origin: "Brand Representative",
    text: "Rakhee's focus on authentic sound integration and rapid pacing meant high retention on our sponsored Reel. She delivered the raw files 3 days ahead of schedule. Highly recommend her for any UGC beauty project!",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    brandLogo: "Aurora Skin",
  },
  {
    id: "test-4",
    author: "Meera Patel",
    role: "Follower since Reel #3",
    origin: "Instagram Comment",
    text: "Your reviews are the only ones on IG that don't look artificially filtered! That peach swatch wear-test post saved me $40 on that viral toner that actually dries out oily skin. Love your transparency!",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5,
  },
];

export const initialLeads: CollabLead[] = [
  {
    id: "lead-1",
    brandName: "Glow Recipe Co.",
    contactPerson: "Amara Lin",
    email: "amara@glowrecipemock.com",
    phone: "+1 (555) 304-4903",
    website: "glowrecipe.com",
    budget: 850,
    campaignType: "UGC Video & Sponsored Reel",
    campaignDetails: "Looking for an aesthetic, high-pushed GRWM transition highlighting our new Watermelon Niacinamide Hue Drops. Requires 30 days of usage rights.",
    status: "Negotiation",
    date: "2026-06-02",
    attachmentName: "watermelon_brief.pdf",
    notes: "Offered $750 at first; we requested $850 due to 30 days ad rights. Agreeable to sound synched paced edit.",
    deliverablesTransacted: ["1x Instagram Reel", "Raw UGC Video Footage"],
    paymentStatus: "Unpaid",
  },
  {
    id: "lead-2",
    brandName: "Rare Beauty PR Team",
    contactPerson: "Giselle Moreau",
    email: "collabs@rarebeautymock.com",
    phone: "+1 (555) 923-0193",
    website: "rarebeauty.com",
    budget: 600,
    campaignType: "Product Wear-Test & IG Story",
    campaignDetails: "Send Blush Selection package for honest review. If she likes it, showcase our new luminous blushes in 1 targeted Instagram Reel with custom link in bio.",
    status: "Approved",
    date: "2026-05-29",
    notes: "Products received on June 1. Post scheduled for production next week.",
    deliverablesTransacted: ["1x Instagram Reel", "2x Stories"],
    paymentStatus: "Paid",
  },
  {
    id: "lead-3",
    brandName: "Laneige Lip Labs",
    contactPerson: "Sarah K.",
    email: "partnerships@laneigemock.com",
    budget: 450,
    campaignType: "Sponsored Reel Insert",
    campaignDetails: "Feature our nighttime lip sleeping mask as part of a bedtime de-puffing beauty routine Reel.",
    status: "Completed",
    date: "2026-05-15",
    notes: "Reel achieved 15,100 views (exceeded expectations!). Payment processed.",
    deliverablesTransacted: ["1x Bedtime Reel Integration"],
    paymentStatus: "Paid",
  },
  {
    id: "lead-4",
    brandName: "Fenty Beauty",
    contactPerson: "Evelyn Carter",
    email: "evelyn@fentyprmock.com",
    budget: 1200,
    campaignType: "Long-Form Brand Ambassadorship",
    campaignDetails: "Looking for dedicated South Asian beauty ambassadors to test new shades of Eaze Drop Blurring Tint across 3 separate months.",
    status: "New Lead",
    date: "2026-06-03",
    notes: "Awaiting formal brief from their PR agency.",
    deliverablesTransacted: ["3x Reels over 90 days"],
    paymentStatus: "Unpaid",
  },
];

export const initialAffiliateProducts: AffiliateItem[] = [
  {
    id: "aff-1",
    name: "Lip Glowy Balm - Sweet Peach",
    brand: "Laneige Lip Labs",
    category: "Makeup",
    price: 19,
    commissionRate: 0.12, // 12% commission
    clicks: 420,
    salesCount: 48,
    revenueGenerated: 109.44, // 48 * 19 * 0.12 = 109.44 commission
    thumbnail: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=600",
    affiliateUrl: "https://shopmy.us/blushwithrakhee/laneigepreach",
    rating: 4.8,
    rakheeReview: "Literally never sticky. It leaves this ultra-sheer juicy coral hue that looks gorgeous on warm undertones. Keep it in your handbag always!",
  },
  {
    id: "aff-2",
    name: "Soft Pinch Liquid Blush - Encourage",
    brand: "Rare Beauty",
    category: "Makeup",
    price: 23,
    commissionRate: 0.15, // 15%
    clicks: 742,
    salesCount: 89,
    revenueGenerated: 307.05, // 89 * 23 * 0.15 = 307.05
    thumbnail: "https://images.unsplash.com/photo-1631730359575-38e4755d772b?auto=format&fit=crop&q=80&w=600",
    affiliateUrl: "https://shopmy.us/blushwithrakhee/rareblush",
    rating: 5.0,
    rakheeReview: "One single dot is all you need. Encourage is that perfect dusty neutral rose that makes South Asian features pop with elegance. Blend with a damp sponge!",
  },
  {
    id: "aff-3",
    name: "Watermelon Glow Niacinamide Dew Drops",
    brand: "Glow Recipe Co.",
    category: "Skincare",
    price: 35,
    commissionRate: 0.10, // 10%
    clicks: 580,
    salesCount: 37,
    revenueGenerated: 129.50, // 37 * 35 * 0.10 = 129.50
    thumbnail: "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&q=80&w=600",
    affiliateUrl: "https://shopmy.us/blushwithrakhee/glowwatermelon",
    rating: 4.7,
    rakheeReview: "The magic step before makeup. It's a highlight-serum hybrid that gives instant glass skin without using heavy microglitters. It breathes hydration.",
  },
  {
    id: "aff-4",
    name: "Hollywood Flawless Filter Shade 4.5",
    brand: "Charlotte Tilbury",
    category: "Makeup",
    price: 49,
    commissionRate: 0.10, // 10%
    clicks: 310,
    salesCount: 19,
    revenueGenerated: 93.10, // 19 * 49 * 0.10 = 93.10
    thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    affiliateUrl: "https://shopmy.us/blushwithrakhee/char-filter",
    rating: 4.9,
    rakheeReview: "There is nothing like this glow. I wear Shade 4.5 on high points of my face under cream foundation. It makes the camera love you immediately.",
  },
];

export const initialNewsletterSubscribers: NewsletterSubscriber[] = [
  { id: "sub-1", name: "Ananya Kapoor", email: "ananya@k-style.com", beautyInterests: ["Skincare Tips", "Makeup Tutorials"], dateJoined: "2026-06-03" },
  { id: "sub-2", name: "Janice Miller", email: "janice.m@gmaildemo.com", beautyInterests: ["Product Reviews", "Beauty Hacks"], dateJoined: "2026-06-01" },
  { id: "sub-3", name: "Radhika Sengupta", email: "radhika93@outlookmock.com", beautyInterests: ["Makeup Tutorials", "GRWM Content"], dateJoined: "2026-05-28" },
  { id: "sub-4", name: "Chloe Dupont", email: "chloe.b@beauty-talk.com", beautyInterests: ["Skincare Tips", "Beauty Transformations"], dateJoined: "2026-05-25" },
];

export const initialFAQs: FAQItem[] = [
  {
    id: "faq-1",
    category: "Brands",
    question: "What is your standard turnaround time for deliverables?",
    answer: "For dedicated sponsored Reels or UGC video concepts, our typical turnaround time is 7-10 business days from the date of physical product delivery. We provide high-fidelity video draft links with synchronized sounds, clear zoom hooks, and retention pacing beforehand.",
  },
  {
    id: "faq-2",
    category: "Brands",
    question: "Do you create RAW UGC (User Generated Content) without posting?",
    answer: "Absolutely! Many brands collaborate for raw video content (such as wear-tests, dewy skincare routines, or tutorial overlays) to run as paid advertisements. We offer options with 30-day, 90-day, or perpetual social media ad usage rights.",
  },
  {
    id: "faq-3",
    category: "Followers",
    question: "How do you pick products to review? Do you do paid-positive reviews?",
    answer: "Never. Unbiased honesty is the absolute core of Blush With Rakhee. Even for sponsored campaigns, my community always gets a real wear-test showing how products settle under daylight and natural textures. If a product creases, I highlight why and suggest hacks to adjust.",
  },
  {
    id: "faq-4",
    category: "General",
    question: "What makes your engagement level so high at 1,009 followers?",
    answer: "We focus 100% on Reels and direct-to-camera conversation. Rather than uploading static flat-lays, every post features high-pushed pacing, zoom highlights for closeups, and helpful tutorials that teach, creating strong comment-to-DM interactions and authentic shelf-saves.",
  },
  {
    id: "faq-5",
    category: "Brands",
    question: "How do you handle product links and tracking?",
    answer: "We use a premium affiliate tracking portal. For brand sponsorships, we activate Instagram Automations (e.g., commenting 'GLOW' automatically DMs the tracking link directly to the follower), yielding click-through-rates up to 4x higher than standard link-in-bio clicks.",
  },
];

export const initialCreatorMessages: CreatorMessage[] = [
  {
    id: "msg-1",
    senderName: "Pooja Sharma",
    senderHandle: "@pooja_beautyglow",
    messageText: "Where did you get that warm gold eye shade crease? In love with this transition!",
    platform: "Instagram Comment",
    targetPost: "South Asian Soft Glam: Warm Gold Eye & Dewy Blush",
    date: "2026-06-04",
    replied: true,
    replyText: "Thank you Pooja! That is indeed the Charlotte Tilbury Eyes to Mesmerise in Amber Gold. Link in my ShopMy page under Glow Favorites!"
  },
  {
    id: "msg-2",
    senderName: "Nisha Patel",
    senderHandle: "@nisha_nyc",
    messageText: "GLOW",
    platform: "Instagram Comment",
    targetPost: "Honest Wear Test: Viral Hydrating Tinted Moisturizer",
    keywordTriggered: "GLOW",
    date: "2026-06-03",
    replied: false // Will trigger automatic DM automation
  },
  {
    id: "msg-3",
    senderName: "Sarah Al-Thani",
    senderHandle: "@sarah.althani",
    messageText: "Hi Rakhee! Love your dewy prep tutorials. Do you think the Laneige tint holds up in humid gulf weather?",
    platform: "Instagram DM",
    date: "2026-06-03",
    replied: false
  },
  {
    id: "msg-4",
    senderName: "Deepa Nair",
    senderHandle: "Deepa Nair (FB)",
    messageText: "Loved the soft peach glams of yours. Keep sharing these honest tutorials for South Asian women, we really appreciate you!",
    platform: "Facebook Message",
    date: "2026-06-02",
    replied: true,
    replyText: "Deepa, thank you so much! Comments like yours keep me going. I promise to keep tests 100% honest always!"
  },
  {
    id: "msg-5",
    senderName: "Kriti Verma",
    senderHandle: "@kriti_v",
    messageText: "GLOW",
    platform: "Instagram Comment",
    targetPost: "3 Essential Concealer Placements for Instant Face-Lift",
    keywordTriggered: "GLOW",
    date: "2026-06-01",
    replied: true,
    replyText: "Automated DM Dispatched: 'Hey beautiful! Here is my exact concealer placement layout sheet + my ShopMy products link: shopmy.us/blushwithrakhee/concealer-glow'"
  }
];

