import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight, TrendingUp, Users, Star, BookOpen,
  FlaskConical, Play, Video, Plus,
} from "lucide-react";
import AnimCount from "../ui/AnimCount";
import Avatar from "../ui/Avatar";
import { CARD_CLS, STATUS_PILL, STUDENTS, LESSONS, MESSAGES, BAR_DATA } from "../constants";

interface OverviewProps {
  go: boolean;
}

const KPI_CARDS = [
  { icon: Users,      value: 128,   label: "Total Students", sub: "+12 this month",       accent: "amber",   display: null   },
  { icon: BookOpen,   value: 14,    label: "Active Courses", sub: "3 launching soon",     accent: "sky",     display: null   },
  { icon: Star,       value: 47,    label: "Avg. Rating",    sub: "Based on 312 reviews", accent: "violet",  display: "4.7"  },
  { icon: TrendingUp, value: 89200, label: "Revenue (₹)",   sub: "↑ 18% vs last month",  accent: "emerald", display: null   },
];

const COURSES = [
  { label: "Advanced Mathematics", students: 42, rating: 4.9, revenue: 125958 },
  { label: "Physics Crash Course",  students: 31, rating: 4.7, revenue: 61969  },
  { label: "Chemistry Complete",    students: 28, rating: 4.8, revenue: 97972  },
];

export default function Overview({ go }: OverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">

      {/* ── KPI Cards ─────────────────────────────────────── */}
      {KPI_CARDS.map(({ icon: Ic, value, label, sub, accent, display }) => (
        <Card key={label} className={`${CARD_CLS} lg:col-span-3 border border-${accent}-100 bg-${accent}-50/40 group cursor-pointer`}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl bg-${accent}-100 flex items-center justify-center`}>
                <Ic className={`w-4 h-4 text-${accent}-600`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </div>
            <p className="text-3xl font-black text-gray-900 tracking-tight leading-none">
              {display ?? <AnimCount to={value} run={go} />}
            </p>
            <p className="text-xs font-semibold text-gray-600 mt-1">{label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
          </CardContent>
        </Card>
      ))}

      {/* ── Weekly Sessions bar chart ──────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-5`}>
        <CardHeader className="flex flex-row items-center justify-between pt-5 pb-0 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Weekly Sessions</h3>
          <Badge variant="outline" className="rounded-full text-[11px] text-gray-400 border-gray-200">This Week</Badge>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-4">
          <div className="flex items-end gap-2 h-28">
            {BAR_DATA.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1 group/bar cursor-pointer">
                {d.active && (
                  <span className="text-[9px] font-bold text-gray-700 bg-amber-300 px-1.5 py-0.5 rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {d.h}%
                  </span>
                )}
                <div
                  className={`w-full rounded-lg transition-all ease-out ${d.active ? "bg-amber-400" : "bg-gray-100 group-hover/bar:bg-gray-200"}`}
                  style={{ height: go ? `${d.h}%` : "4px", transitionDuration: "800ms", transitionDelay: `${i * 70}ms` }}
                />
                <span className={`text-[10px] font-medium ${d.active ? "text-gray-700" : "text-gray-400"}`}>{d.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Today's Schedule ──────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-4`}>
        <CardHeader className="flex flex-row items-center justify-between pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Today's Schedule</h3>
          <Button variant="ghost" size="icon" className="w-7 h-7 rounded-full hover:bg-amber-50 hover:text-amber-600">
            <Plus className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="px-4 pb-5 flex flex-col gap-1">
          {LESSONS.map((l, i) => (
            <div key={i} className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/80 transition-all duration-200 cursor-pointer group/row">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/row:scale-110 ${l.type === "live" ? "bg-red-100" : l.type === "quiz" ? "bg-violet-100" : "bg-sky-100"}`}>
                {l.type === "live"    ? <Video        className="w-3.5 h-3.5 text-red-600"    /> :
                 l.type === "quiz"    ? <FlaskConical className="w-3.5 h-3.5 text-violet-600" /> :
                                        <Play         className="w-3.5 h-3.5 text-sky-600"    />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{l.title}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{l.time} · {l.students} students</p>
              </div>
              <Badge className={`${STATUS_PILL[l.type]} border-0 text-[10px] rounded-full capitalize font-medium`}>{l.type}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Top Students ──────────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-3`}>
        <CardHeader className="flex flex-row items-center justify-between pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Top Students</h3>
          <ArrowUpRight className="w-4 h-4 text-gray-300" />
        </CardHeader>
        <CardContent className="px-5 pb-5 flex flex-col gap-3">
          {STUDENTS.slice(0, 4).map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 group/st cursor-pointer">
              <Avatar initials={s.avatar} ci={i} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-semibold text-gray-800 truncate group-hover/st:text-amber-700 transition-colors">{s.name}</p>
                  <span className="text-[10px] text-gray-400 ml-1 shrink-0">{s.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
                    style={{ width: go ? `${s.progress}%` : "0%", transition: `width 1s cubic-bezier(.4,0,.2,1) ${i * 120}ms` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Recent Messages ───────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-4`}>
        <CardHeader className="flex flex-row items-center justify-between pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Recent Messages</h3>
          <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
        </CardHeader>
        <CardContent className="px-4 pb-5 flex flex-col gap-0.5">
          {MESSAGES.slice(0, 4).map((m, i) => (
            <div key={i} className={`flex items-start gap-2.5 px-2 py-2 rounded-xl cursor-pointer transition-all duration-200 ${m.unread ? "bg-amber-50/70 hover:bg-amber-50" : "hover:bg-white/70"}`}>
              <Avatar initials={m.avatar} ci={i} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-semibold truncate ${m.unread ? "text-gray-900" : "text-gray-500"}`}>{m.name}</p>
                  <span className="text-[10px] text-gray-400 ml-1 shrink-0">{m.time}</span>
                </div>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">{m.text}</p>
              </div>
              {m.unread && <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Course Performance ────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-5`}>
        <CardHeader className="pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Course Performance</h3>
        </CardHeader>
        <CardContent className="px-5 pb-5 flex flex-col gap-2">
          {COURSES.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 cursor-pointer group/cp border border-transparent hover:border-amber-100">
              <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 group-hover/cp:scale-110 transition-transform duration-200">
                <BookOpen className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{c.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{c.students} students · ⭐ {c.rating}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-black text-gray-900">₹{(c.revenue / 1000).toFixed(0)}k</p>
                <p className="text-[10px] text-gray-400">revenue</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}