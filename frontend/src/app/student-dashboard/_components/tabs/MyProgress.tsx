import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Flame, Target, Trophy, BookOpen } from "lucide-react";
import AnimCount from "../ui/AnimCount";
import { CARD_CLS, SUBJECT_PROGRESS } from "../constants";

const RECENT_SCORES = [
  { test: "Calculus Quiz #3",     score: 88, max: 100, date: "Feb 15", grade: "A"  },
  { test: "Physics MCQ Round",    score: 72, max: 100, date: "Feb 12", grade: "B+" },
  { test: "Chemistry Practical",  score: 95, max: 100, date: "Feb 08", grade: "A+" },
  { test: "Biology Unit Test",    score: 61, max: 100, date: "Feb 05", grade: "B"  },
];

const MILESTONES = [
  { label: "First Session",     done: true  },
  { label: "5 Tests Completed", done: true  },
  { label: "7-Day Streak",      done: true  },
  { label: "Score 90%+",        done: false },
  { label: "30 Study Hours",    done: false },
];

const GRADE_COLOR: Record<string, string> = {
  "A+": "bg-emerald-100 text-emerald-700",
  "A":  "bg-sky-100     text-sky-700",
  "B+": "bg-amber-100   text-amber-700",
  "B":  "bg-orange-100  text-orange-700",
};

export default function MyProgress({ go }: { go: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">

      {/* ── KPI strip ─────────────────────────────────────── */}
      {[
        { icon: Flame,   value: 7,   label: "Day Streak",    sub: "Keep it up! 🔥",       accent: "orange"  },
        { icon: Target,  value: 24,  label: "Tests Taken",   sub: "This semester",         accent: "sky"     },
        { icon: Trophy,  value: 79,  label: "Avg. Score",    sub: "79 / 100",  disp: "79", accent: "amber"   },
        { icon: BookOpen,value: 62,  label: "Study Hours",   sub: "Total logged",          accent: "emerald" },
      ].map(({ icon: Ic, value, label, sub, disp, accent }, i) => (
        <Card key={label} className={`${CARD_CLS} lg:col-span-3 group cursor-pointer`}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl bg-${accent}-100 flex items-center justify-center`}>
                <Ic className={`w-4 h-4 text-${accent}-600`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
            </div>
            <p className="text-3xl font-black text-gray-900 tracking-tight leading-none">
              {disp ?? <AnimCount to={value} run={go} />}
            </p>
            <p className="text-xs font-semibold text-gray-600 mt-1">{label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
          </CardContent>
        </Card>
      ))}

      {/* ── Subject progress ──────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-5`}>
        <CardHeader className="flex flex-row items-center justify-between pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Subject Progress</h3>
          <Badge variant="outline" className="rounded-full text-[11px] text-gray-400 border-gray-200">vs. Target</Badge>
        </CardHeader>
        <CardContent className="px-5 pb-5 flex flex-col gap-4">
          {SUBJECT_PROGRESS.map((s, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-semibold text-gray-800">{s.subject}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">Target {s.target}%</span>
                  <span className="text-xs font-bold text-gray-900">{s.progress}%</span>
                </div>
              </div>
              {/* Track */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative">
                {/* Target marker */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-gray-400/40 z-10 rounded-full"
                  style={{ left: `${s.target}%` }} />
                <div className={`h-full ${s.color} rounded-full transition-all duration-1000`}
                  style={{ width: go ? `${s.progress}%` : "0%", transitionDelay: `${i * 120}ms` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Recent test scores ────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-4`}>
        <CardHeader className="pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Recent Test Scores</h3>
        </CardHeader>
        <CardContent className="px-5 pb-5 flex flex-col gap-2">
          {RECENT_SCORES.map((r, i) => (
            <div key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 border border-transparent hover:border-amber-100 transition-all duration-200 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex flex-col items-center justify-center shrink-0">
                <p className="text-sm font-black text-gray-900 leading-none">{r.score}</p>
                <p className="text-[9px] text-gray-400">/{r.max}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{r.test}</p>
                <p className="text-[10px] text-gray-400">{r.date}</p>
              </div>
              <Badge className={`${GRADE_COLOR[r.grade] ?? "bg-gray-100 text-gray-600"} border-0 rounded-full text-xs font-black`}>
                {r.grade}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Milestones ────────────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-3`}>
        <CardHeader className="pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Milestones</h3>
        </CardHeader>
        <CardContent className="px-5 pb-5 flex flex-col gap-3">
          {MILESTONES.map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                ${m.done ? "bg-amber-400 scale-105" : "bg-gray-100 border-2 border-dashed border-gray-300"}`}>
                {m.done
                  ? <span className="text-white text-xs">✓</span>
                  : <span className="text-gray-400 text-xs font-bold">{i + 1}</span>}
              </div>
              <p className={`text-xs font-semibold ${m.done ? "text-gray-900" : "text-gray-400"}`}>
                {m.label}
              </p>
              {m.done && (
                <Trophy className="w-3.5 h-3.5 text-amber-400 ml-auto shrink-0" />
              )}
            </div>
          ))}
          <div className="mt-2 bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
            <p className="text-xs font-bold text-amber-700">3 / 5 completed</p>
            <p className="text-[10px] text-amber-500 mt-0.5">Score 90%+ to unlock next badge</p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}