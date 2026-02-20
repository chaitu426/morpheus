import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Video, ArrowUpRight } from "lucide-react";
import Avatar from "../ui/Avatar";
import AnimCount from "../ui/AnimCount";
import { CARD_CLS, AVATAR_COLORS, TUTORS, UPCOMING_SESSIONS, STATUS_PILL } from "../constants";

const SUBJECTS = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "CS"];

const BADGE_COLOR: Record<string, string> = {
  "Top Tutor": "bg-amber-100 text-amber-700",
  "Popular":   "bg-rose-100  text-rose-700",
  "New":       "bg-sky-100   text-sky-700",
  "Verified":  "bg-emerald-100 text-emerald-700",
};

export default function Tutors({ go }: { go: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">

      {/* ── KPI strip ─────────────────────────────────────── */}
      {[
        { label: "My Tutors",        value: 3,   sub: "Active subscriptions" },
        { label: "Sessions Done",    value: 24,  sub: "This month"           },
        { label: "Avg. Tutor Rating",value: 48,  sub: "4.8 / 5.0", display: "4.8" },
        { label: "Study Hours",      value: 62,  sub: "Total logged"         },
      ].map(({ label, value, sub, display }, i) => (
        <Card key={label} className={`${CARD_CLS} lg:col-span-3 group cursor-pointer`}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-amber-600" />
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

      {/* ── Tutor cards ───────────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-8`}>
        <CardHeader className="flex flex-row items-center justify-between pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Browse Tutors</h3>
          {/* Subject filter pills */}
          <div className="flex gap-1 flex-wrap justify-end">
            {SUBJECTS.slice(0, 4).map((s, i) => (
              <button key={s}
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all duration-200
                  ${i === 0 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                {s}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TUTORS.map((t, i) => (
            <div key={i}
              className="flex items-start gap-3 p-3.5 rounded-2xl border border-gray-100 bg-white/60
                hover:border-amber-200 hover:bg-white/90 hover:shadow-sm transition-all duration-200 cursor-pointer group/tc">
              <div className="relative">
                <Avatar initials={t.avatar} ci={i} size="md" />
                {t.available && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-xs font-bold text-gray-900 truncate group-hover/tc:text-amber-700 transition-colors">
                    {t.name}
                  </p>
                  <Badge className={`${BADGE_COLOR[t.badge]} border-0 text-[9px] rounded-full px-1.5 shrink-0`}>
                    {t.badge}
                  </Badge>
                </div>
                <p className="text-[10px] text-gray-400 truncate">{t.subject}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-0.5 text-[10px] text-amber-600 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{t.rating}
                  </span>
                  <span className="text-[10px] text-gray-400">{t.students} students</span>
                  <span className="ml-auto text-xs font-black text-gray-900">₹{t.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Upcoming sessions ─────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-4`}>
        <CardHeader className="flex flex-row items-center justify-between pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Upcoming Sessions</h3>
          <Badge variant="outline" className="rounded-full text-[11px] text-gray-400 border-gray-200">Today</Badge>
        </CardHeader>
        <CardContent className="px-4 pb-5 flex flex-col gap-1">
          {UPCOMING_SESSIONS.map((s, i) => (
            <div key={i}
              className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/80 transition-all duration-200 cursor-pointer group/sess">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/sess:scale-110
                ${s.type === "live" ? "bg-red-100" : s.type === "quiz" ? "bg-violet-100" : "bg-sky-100"}`}>
                {s.type === "live"    ? <Video className="w-3.5 h-3.5 text-red-600"    /> :
                 s.type === "quiz"    ? <span className="text-violet-600 text-xs font-black">Q</span> :
                                        <span className="text-sky-600 text-xs font-black">▶</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{s.title}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{s.tutor} · {s.time}</p>
              </div>
              <Badge className={`${STATUS_PILL[s.type]} border-0 text-[10px] rounded-full capitalize font-medium`}>
                {s.type}
              </Badge>
            </div>
          ))}

          <Button className="mt-2 w-full rounded-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500
            text-gray-900 font-bold border-0 shadow-none h-9 transition-all duration-200 text-sm">
            Book a Session
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
