// ───────────── Styling ─────────────

export const CARD_CLS =
  "rounded-xl border bg-white/10 backdrop-blur-md shadow-lg p-6";

export const STATUS_PILL =
  "px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700";

// ───────────── Avatar Colors ─────────────

export const AVATAR_COLORS = [
  "bg-amber-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-rose-500",
];

// ───────────── Tabs ─────────────

export const REGULAR_TABS = [
  "Tutors",
  "Billings",
  "My Progress",
  "Chat",
] as const;

export const EXAM_TABS = [
  "Community",
  "Flashcards",
  "Video Lectures",
  "AI Tutor",
] as const;

// ───────────── Billing / Invoices ─────────────

export const INVOICES = [
  {
    id: "INV-001",
    tutor: "Dr. Sharma",
    subject: "Physics",
    amount: "₹2,000",
    status: "Paid",
    date: "12 Jan 2026",
  },
  {
    id: "INV-002",
    tutor: "Ms. Kapoor",
    subject: "Mathematics",
    amount: "₹1,800",
    status: "Pending",
    date: "28 Jan 2026",
  },
];

// ───────────── Flashcards ─────────────

export const FLASHCARDS = [
  {
    id: 1,
    subject: "Mathematics",
    question: "What is the derivative of x²?",
    answer: "2x",
  },
  {
    id: 2,
    subject: "Physics",
    question: "State Newton’s First Law.",
    answer:
      "An object remains at rest or in uniform motion unless acted upon by an external force.",
  },
];

// ───────────── Community ─────────────

export const COMMUNITY_POSTS = [
  {
    id: 1,
    user: "Aarav",
    subject: "Math",
    content: "Any tips for mastering calculus integrals?",
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    user: "Diya",
    subject: "Physics",
    content: "Can someone explain quantum superposition simply?",
    likes: 18,
    comments: 6,
  },
  
];
// ───────────── Progress Data ─────────────

export const SUBJECT_PROGRESS = [
  {
    subject: "Mathematics",
    progress: 78,
    streak: 5,
    target: "Complete Calculus Module",
  },
  {
    subject: "Physics",
    progress: 64,
    streak: 3,
    target: "Revise Mechanics",
  },
  {
    subject: "Chemistry",
    progress: 52,
    streak: 2,
    target: "Practice Organic Reactions",
  },
];

// ───────────── Chat ─────────────

export const CHAT_HISTORY = [
  { role: "assistant", content: "Hey! How can I help you today?" },
  { role: "user", content: "Explain Newton's Laws." },
];

export const TUTOR_MESSAGES = [
  {
    name: "Dr. Sharma",
    subject: "Physics",
    lastMessage: "Let's revise motion today.",
    time: "2h ago",
  },
  {
    name: "Ms. Kapoor",
    subject: "Math",
    lastMessage: "Practice integration problems.",
    time: "5h ago",
  },
];

// ───────────── AI Tutor ─────────────

export const AI_CHAT_HISTORY = [
  {
    role: "assistant",
    content: "Hi! I’m your AI Tutor. What topic would you like help with?",
  },
];

// ───────────── Tutors Data ─────────────

// ───────────── Tutors Data ─────────────

export const TUTORS = [
  {
    id: 1,
    name: "Dr. Sharma",
    subject: "Physics",
    avatar: "DS",
    rating: 4.8,
    students: 120,
    price: 1500,
    badge: "Top Tutor",
    available: true,
  },
  {
    id: 2,
    name: "Ms. Kapoor",
    subject: "Mathematics",
    avatar: "MK",
    rating: 4.6,
    students: 95,
    price: 1200,
    badge: "Popular",
    available: true,
  },
  {
    id: 3,
    name: "Mr. Verma",
    subject: "Chemistry",
    avatar: "MV",
    rating: 4.7,
    students: 110,
    price: 1300,
    badge: "Verified",
    available: false,
  },
];

export const UPCOMING_SESSIONS = [
  {
    id: 1,
    title: "Physics Live Session",
    tutor: "Dr. Sharma",
    time: "5:00 PM",
    type: "live",
  },
  {
    id: 2,
    title: "Math Practice Quiz",
    tutor: "Ms. Kapoor",
    time: "6:30 PM",
    type: "quiz",
  },
  {
    id: 3,
    title: "Chemistry Revision",
    tutor: "Mr. Verma",
    time: "7:30 PM",
    type: "video",
  },
];

// ───────────── Video Lectures ─────────────

export const VIDEO_LECTURES = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Understanding Derivatives",
    duration: "18 min",
    completed: true,
  },
  {
    id: 2,
    subject: "Physics",
    title: "Newton’s Laws Explained",
    duration: "22 min",
    completed: false,
  },
  {
    id: 3,
    subject: "Chemistry",
    title: "Organic Chemistry Basics",
    duration: "15 min",
    completed: false,
  },
];

// ───────────── Types ─────────────

export type AppMode = "regular" | "exam";

export type RegularTab = (typeof REGULAR_TABS)[number];
export type ExamTab = (typeof EXAM_TABS)[number];

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// ───────────── Page Meta (Heading Info) ─────────────

export const PAGE_META: Record<
  string,
  { title: string; subtitle: string; badge?: string }
> = {
  Tutors: {
    title: "Your Tutors",
    subtitle: "Manage and connect with your tutors",
    badge: "Learning",
  },
  Billings: {
    title: "Billing & Payments",
    subtitle: "Track payments and invoices",
    badge: "Finance",
  },
  "My Progress": {
    title: "Progress Tracker",
    subtitle: "Monitor your academic growth",
    badge: "Growth",
  },
  Chat: {
    title: "Live Chat",
    subtitle: "Talk with tutors in real-time",
    badge: "Support",
  },
  Community: {
    title: "Student Community",
    subtitle: "Engage with fellow learners",
    badge: "Exam Mode",
  },
  Flashcards: {
    title: "Smart Flashcards",
    subtitle: "Revise key concepts efficiently",
    badge: "Exam Mode",
  },
  "Video Lectures": {
    title: "Video Lectures",
    subtitle: "Watch curated learning videos",
    badge: "Exam Mode",
  },
  "AI Tutor": {
    title: "AI Tutor",
    subtitle: "Get instant AI-powered help",
    badge: "AI",
  },
};