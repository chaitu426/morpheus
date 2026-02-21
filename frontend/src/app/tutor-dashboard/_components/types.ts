export type NavTab = "Overview" | "Payment" | "Test-Creation" | "Chat" | "Profile";

export interface Student {
  name: string;
  subject: string;
  progress: number;
  avatar: string;
  status: "active" | "pending" | "completed";
}

export interface Lesson {
  title: string;
  time: string;
  students: number;
  type: "live" | "recorded" | "quiz";
}

export interface Message {
  name: string;
  text: string;
  time: string;
  unread: boolean;
  avatar: string;
}

export interface Transaction {
  student: string;
  course: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "refund";
}

export interface BarItem {
  label: string;
  h: number;
  active?: boolean;
}

export interface TestQuestion {
  q: string;
  type: string;
  marks: number;
  done: boolean;
}

export interface ChatMessage {
  from: "tutor" | "student";
  text: string;
  time: string;
}