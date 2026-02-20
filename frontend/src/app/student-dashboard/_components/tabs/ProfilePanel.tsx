import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Star, BookOpen, Clock, Award, Zap, Target } from "lucide-react";
import { CARD_CLS } from "../constants";

interface ProfilePanelProps {
  onClose: () => void;
}

const BIO_ROWS: [string, string][] = [
  ["Class",      "Grade 12 — Science"],
  ["Target",     "JEE Advanced 2025"],
  ["School",     "Delhi Public School, Pune"],
  ["Language",   "English, Hindi"],
  ["Email",      "aanya.sharma@student.in"],
];

const ACHIEVEMENTS = [
  { Ic: Award,  label: "7-Day Streak",      sub: "Consistency badge",       cls: "bg-amber-50  border-amber-100  text-amber-600"   },
  { Ic: Star,   label: "Top Scorer",        sub: "95% in Chemistry test",   cls: "bg-violet-50 border-violet-100 text-violet-600"  },
  { Ic: Zap,    label: "Exam Mode Pioneer", sub: "First to use Exam Mode",  cls: "bg-sky-100   border-sky-100    text-sky-600"     },
  { Ic: Target, label: "Goal Setter",       sub: "Set 5 study targets",     cls: "bg-emerald-50 border-emerald-100 text-emerald-600"},
];

export default function ProfilePanel({ onClose }: ProfilePanelProps) {
  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      {/* Slide-in panel */}
      <div
        className="relative w-full max-w-sm h-full bg-white/80 backdrop-blur-2xl border-l border-white/60
          shadow-2xl overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ animation: "slideIn .3s cubic-bezier(.4,0,.2,1) both" }}
      >
        <style>{`@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>

        {/* Close */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-black text-gray-900 text-base">My Profile</h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 py-8 px-5">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-300 to-blue-500
              flex items-center justify-center text-3xl font-black text-white shadow-lg ring-4 ring-white">
              AS
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-[9px]">✓</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black text-gray-900">Aanya Sharma</h3>
            <p className="text-sm text-gray-400 mt-0.5">JEE Aspirant · Grade 12</p>
          </div>
          <div className="flex items-center gap-4 text-center">
            {[{ v: "3", l: "Tutors" }, { v: "24", l: "Tests" }, { v: "62h", l: "Studied" }].map(s => (
              <div key={s.l}>
                <p className="text-lg font-black text-gray-900">{s.v}</p>
                <p className="text-[10px] text-gray-400">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 w-full">
            <Button className="flex-1 rounded-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500
              text-gray-900 font-bold border-0 shadow-none h-9 transition-all text-sm">
              Edit Profile
            </Button>
            <Button variant="outline" className="flex-1 rounded-full border-gray-200 text-gray-600
              h-9 shadow-none hover:bg-gray-50 transition-all text-sm">
              Share
            </Button>
          </div>
        </div>

        <Separator />

        {/* Details */}
        <div className="px-5 py-4 flex flex-col">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Details</p>
          {BIO_ROWS.map(([k, v]) => (
            <div key={k} className="flex gap-4 py-2.5 border-b border-dashed border-gray-100 last:border-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 w-16 shrink-0 pt-0.5">{k}</p>
              <p className="text-xs text-gray-700 font-medium">{v}</p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Achievements */}
        <div className="px-5 py-4 flex flex-col gap-2.5 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Achievements</p>
          {ACHIEVEMENTS.map(({ Ic, label, sub, cls }) => (
            <div key={label} className={`flex items-center gap-3 p-3 rounded-xl border ${cls}
              hover:shadow-sm transition-all duration-200`}>
              <div className={`w-8 h-8 rounded-xl border ${cls} flex items-center justify-center shrink-0`}>
                <Ic className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">{label}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="p-5 border-t border-gray-100">
          <Button variant="outline"
            className="w-full rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 shadow-none h-9 text-sm font-semibold transition-all">
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}