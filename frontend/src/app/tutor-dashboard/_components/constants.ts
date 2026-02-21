import {
  BarChart3, CreditCard, FlaskConical, MessageSquare, UserCircle,
} from "lucide-react";
import type { NavTab, Student, Lesson, Message, Transaction, BarItem, TestQuestion, ChatMessage } from "./types";

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_TABS: { label: NavTab; icon: React.ElementType }[] = [
  { label: "Overview",      icon: BarChart3     },
  { label: "Payment",       icon: CreditCard    },
  { label: "Test-Creation", icon: FlaskConical  },
  { label: "Chat",          icon: MessageSquare },
  { label: "Profile",       icon: UserCircle    },
];

export const PAGE_META: Record<NavTab, { title: string; sub: string }> = {
  "Overview":      { title: "Good morning, Rahul 👋",   sub: "Here's what's happening with your students today."  },
  "Payment":       { title: "Payments & Earnings",      sub: "Track your earnings and manage payouts."             },
  "Test-Creation": { title: "Test Creation Studio",     sub: "Build, assign and publish tests for your students."  },
  "Chat":          { title: "Student Messages",         sub: "Respond to your students' questions."               },
  "Profile":       { title: "My Profile",               sub: "Manage your tutor profile and credentials."          },
};

// ─── Styling helpers ─────────────────────────────────────────────────────────

export const AVATAR_COLORS = [
  "bg-amber-300",
  "bg-rose-300",
  "bg-sky-300",
  "bg-emerald-300",
  "bg-violet-300",
];

export const STATUS_PILL: Record<string, string> = {
  active:    "bg-emerald-100 text-emerald-700",
  pending:   "bg-amber-100  text-amber-700",
  completed: "bg-sky-100    text-sky-700",
  paid:      "bg-emerald-100 text-emerald-700",
  refund:    "bg-red-100    text-red-600",
  live:      "bg-red-100    text-red-600",
  quiz:      "bg-violet-100 text-violet-700",
  recorded:  "bg-sky-100    text-sky-700",
};

// Shared glassmorphism card class
export const CARD_CLS =
  "bg-white/65 backdrop-blur-xl border border-white/70 shadow-sm hover:shadow-md rounded-2xl transition-shadow duration-300";
export const CARD_CLS_DARK =
  "bg-white/5 backdrop-blur-xl border border-white/10 shadow-sm hover:shadow-md rounded-2xl transition-shadow duration-300";
export const cardCls = (isDark: boolean) => isDark ? CARD_CLS_DARK : CARD_CLS;

// ─── Data ─────────────────────────────────────────────────────────────────────

export const STUDENTS: Student[] = [
  { name: "Aanya Sharma", subject: "Mathematics", progress: 82, avatar: "AS", status: "active"    },
  { name: "Rohan Mehta",  subject: "Physics",     progress: 65, avatar: "RM", status: "active"    },
  { name: "Priya Nair",   subject: "Chemistry",   progress: 91, avatar: "PN", status: "completed" },
  { name: "Dev Kapoor",   subject: "Biology",     progress: 48, avatar: "DK", status: "pending"   },
  { name: "Sneha Iyer",   subject: "Mathematics", progress: 74, avatar: "SI", status: "active"    },
];

export const LESSONS: Lesson[] = [
  { title: "Calculus — Integrals",   time: "10:00 AM", students: 12, type: "live"     },
  { title: "Quantum Basics",         time: "12:30 PM", students: 8,  type: "live"     },
  { title: "Organic Chemistry Quiz", time: "2:00 PM",  students: 15, type: "quiz"     },
  { title: "Cell Biology Recap",     time: "4:00 PM",  students: 6,  type: "recorded" },
];

export const MESSAGES: Message[] = [
  { name: "Aanya Sharma", text: "Sir, I didn't understand Q4 from today's test.", time: "2m",  unread: true,  avatar: "AS" },
  { name: "Rohan Mehta",  text: "Can we reschedule Thursday's session?",          time: "15m", unread: true,  avatar: "RM" },
  { name: "Priya Nair",   text: "Thank you for the notes! Really helpful 🙏",     time: "1h",  unread: false, avatar: "PN" },
  { name: "Dev Kapoor",   text: "Submitted the assignment. Please check.",        time: "3h",  unread: false, avatar: "DK" },
  { name: "Sneha Iyer",   text: "What topics will be covered next week?",         time: "5h",  unread: false, avatar: "SI" },
];

export const TRANSACTIONS: Transaction[] = [
  { student: "Aanya Sharma", course: "Advanced Mathematics", amount: 2999, date: "Feb 15", status: "paid"    },
  { student: "Rohan Mehta",  course: "Physics Crash Course", amount: 1999, date: "Feb 14", status: "paid"    },
  { student: "Priya Nair",   course: "Chemistry Complete",   amount: 3499, date: "Feb 13", status: "paid"    },
  { student: "Dev Kapoor",   course: "Biology Basics",       amount: 1499, date: "Feb 12", status: "pending" },
  { student: "Sneha Iyer",   course: "Advanced Mathematics", amount: 2999, date: "Feb 10", status: "refund"  },
];

export const BAR_DATA: BarItem[] = [
  { label: "Mon", h: 55 }, { label: "Tue", h: 80 }, { label: "Wed", h: 45 },
  { label: "Thu", h: 90, active: true }, { label: "Fri", h: 70 },
  { label: "Sat", h: 30 }, { label: "Sun", h: 20 },
];

export const TEST_QUESTIONS: TestQuestion[] = [
  { q: "What is the derivative of sin(x)?", type: "MCQ",         marks: 2,  done: true  },
  { q: "Explain Newton's Second Law",       type: "Short Answer", marks: 5,  done: true  },
  { q: "Balance the equation: H₂ + O₂",    type: "MCQ",         marks: 2,  done: false },
  { q: "Define mitosis with a diagram",     type: "Long Answer",  marks: 10, done: false },
];

export const INITIAL_CHAT_HISTORY: ChatMessage[] = [
  { from: "student", text: "Sir, I didn't understand Q4 from today's test.",                                                               time: "2:30 PM" },
  { from: "tutor",   text: "Sure Aanya! Q4 was about limits. When x → 0, sin(x)/x approaches 1. It's the foundational limit in calculus.", time: "2:32 PM" },
  { from: "student", text: "Oh I see! So it's always 1?",                                                                                  time: "2:33 PM" },
  { from: "tutor",   text: "Yes, specifically when x → 0 in radians. One of the most important limits 😊",                                 time: "2:34 PM" },
  { from: "student", text: "Thank you so much sir! Can you share some practice problems?",                                                  time: "2:35 PM" },
];