import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, Award, Zap, Users } from "lucide-react";
import { CARD_CLS } from "../constants";

const BIO_ROWS: [string, string][] = [
  ["Subjects",  "Mathematics, Physics, Chemistry"],
  ["Classes",   "Grade 9–12, JEE, NEET"],
  ["Language",  "English, Hindi"],
  ["Location",  "Pune, Maharashtra"],
  ["Email",     "rahul.kumar@edumentor.in"],
];

const STAT_PILLS = [
  { v: "128", l: "Students"   },
  { v: "14",  l: "Courses"    },
  { v: "3yr", l: "Experience" },
];

const ACHIEVEMENTS = [
  { Ic: Award, label: "Top Tutor Feb 2025",  sub: "Platform award",         cls: "bg-amber-50  border-amber-100  text-amber-600"   },
  { Ic: Star,  label: "5-Star Educator",     sub: "Rated by 100+ students", cls: "bg-violet-50 border-violet-100 text-violet-600"  },
  { Ic: Zap,   label: "Quick Responder",     sub: "<10 min avg reply",      cls: "bg-sky-50    border-sky-100    text-sky-600"     },
  { Ic: Users, label: "100+ Students",       sub: "Milestone reached",      cls: "bg-emerald-50 border-emerald-100 text-emerald-600" },
];

export default function Profile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      {/* ── Profile card ──────────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-4`}>
        <CardContent className="p-6 flex flex-col items-center text-center gap-3">
          {/* Avatar with online badge */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 to-orange-400
              flex items-center justify-center text-3xl font-black text-white shadow-lg ring-4 ring-white">
              RK
            </div>
            <div className="absolute bottom-0.5 right-0.5 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-[9px]">✓</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900">Rahul Kumar</h2>
            <p className="text-sm text-gray-400 mt-0.5">Mathematics & Physics Tutor</p>
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
            ))}
            <span className="text-sm font-bold text-gray-800 ml-1">4.7</span>
            <span className="text-xs text-gray-400 ml-0.5">(312)</span>
          </div>

          <div className="flex gap-2 w-full mt-1">
            <Button className="flex-1 rounded-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-gray-900 font-bold border-0 shadow-none h-9 transition-all">
              Edit Profile
            </Button>
            <Button variant="outline" className="flex-1 rounded-full border-gray-200 text-gray-600 h-9 shadow-none hover:bg-gray-50 transition-all">
              Share
            </Button>
          </div>

          <Separator />

          <div className="grid grid-cols-3 w-full gap-1">
            {STAT_PILLS.map((s) => (
              <div key={s.l} className="text-center py-1">
                <p className="text-lg font-black text-gray-900">{s.v}</p>
                <p className="text-[10px] text-gray-400">{s.l}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── About & details ───────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-5`}>
        <CardHeader className="pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">About</h3>
        </CardHeader>
        <CardContent className="px-5 pb-5 flex flex-col gap-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            IIT Delhi graduate with 3+ years of teaching experience. Specialised in making
            complex mathematical concepts accessible. 128 students taught across JEE, NEET,
            and board prep.
          </p>
          <div className="flex flex-col">
            {BIO_ROWS.map(([key, val]) => (
              <div key={key} className="flex gap-4 py-2.5 border-b border-dashed border-gray-100 last:border-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 w-16 shrink-0 pt-0.5">{key}</p>
                <p className="text-xs text-gray-700 font-medium">{val}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Achievements ──────────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-3`}>
        <CardHeader className="pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Achievements</h3>
        </CardHeader>
        <CardContent className="px-5 pb-5 flex flex-col gap-2.5">
          {ACHIEVEMENTS.map(({ Ic, label, sub, cls }) => (
            <div key={label} className={`flex items-center gap-3 p-3 rounded-xl border ${cls} hover:shadow-sm transition-all duration-200 cursor-default group/ach`}>
              <div className={`w-8 h-8 rounded-xl border ${cls} flex items-center justify-center shrink-0 group-hover/ach:scale-110 transition-transform duration-200`}>
                <Ic className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">{label}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}