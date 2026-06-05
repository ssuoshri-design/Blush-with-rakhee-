/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InstagramReel {
  id: string;
  title: string;
  thumbnail: string;
  category: "Skincare" | "Makeup Tutorial" | "Beauty Hack" | "GRWM" | "Transformation" | "Product Reviews";
  views: number;
  likes: number;
  engagementRate: number;
  instagramUrl: string;
  videoUrl?: string; // Simulator video placeholder or direct loop
  duration?: string;
  publishedDate: string;
}

export interface CollabLead {
  id: string;
  brandName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  website?: string;
  budget: number;
  campaignType: string;
  campaignDetails: string;
  status: "New Lead" | "Contacted" | "Negotiation" | "Approved" | "Rejected" | "Completed";
  date: string;
  attachmentName?: string;
  notes?: string;
  deliverablesTransacted?: string[];
  paymentStatus?: "Unpaid" | "Partial" | "Paid";
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  origin: "Instagram Comment" | "Brand Representative" | "Follower Feedback";
  text: string;
  avatarUrl: string;
  rating: number;
  brandLogo?: string;
}

export interface ContentPillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
  exampleReelTitle: string;
  count: number;
}

export interface AffiliateItem {
  id: string;
  name: string;
  brand: string;
  category: "Skincare" | "Makeup" | "Tools";
  price: number;
  commissionRate: number; // e.g., 15% -> 0.15
  clicks: number;
  salesCount: number;
  revenueGenerated: number;
  thumbnail: string;
  affiliateUrl: string;
  rating: number;
  rakheeReview: string;
}

export interface NewsletterSubscriber {
  id: string;
  name: string;
  email: string;
  beautyInterests: string[];
  dateJoined: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Brands" | "Followers" | "General";
}

export interface CreatorStats {
  followers: number;
  reelsCount: number;
  engagementAvg: number;
  brandCollabsToDate: number;
  monthlyReach: number;
  averageViews: number;
}

export interface CreatorMessage {
  id: string;
  senderName: string;
  senderHandle: string;
  messageText: string;
  platform: "Instagram Comment" | "Instagram DM" | "Facebook Message" | "WhatsApp Chat";
  targetPost?: string;
  keywordTriggered?: string;
  date: string;
  replied: boolean;
  replyText?: string;
}

export interface InstagramLibraryItem {
  id: string;
  caption: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  username?: string;
}

export interface RewardConfig {
  id: string;
  name: string;
  type: "discount" | "freebie";
  value: number; // percentage value e.g. 5, 10, 15, 20 or 0 for freebies
  label: string;
  code: string;
  isEnabled: boolean;
  expiryDate: string;
  maxClaims: number;
  claimsCount: number;
  usedCount: number;
  eligibleCourses: string[];
}

export interface RewardClaim {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  rewardId: string;
  rewardLabel: string;
  code: string;
  couponUsed: boolean;
  usedForCourse?: string;
  timestamp: string;
  revenueAmount?: number;
}



