"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, CheckCircle2 } from "lucide-react";
import { CARD_CLS, VIDEO_LECTURES } from "../constants";

const SUBJECT_FILTERS = ["All", "Mathematics", "Physics", "Chemistry", "Biology"];

const SUBJECT_COLOR: Record<string, string> = {
  Mathematics: "bg-amber-100  text-amber-700",
  Physics:     "bg-sky-100    text-sky-700",
  Chemistry:   "bg-violet-100 text-violet-700",
  Biology:     "bg-emerald-100 text-emerald-700",
};

export default function VideoLectures() {
  const [filter,   setFilter]   = useState("All");
  const [playing,  setPlaying]  = useState<number | null>(null);

  const lectures = filter === "All" ? VIDEO_LECTURES : VIDEO_LECTURES.filter(v => v.subject === filter);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      {/* ── Video player area ─────────────────────────────── */}
      <div className="lg:col-span-8 flex flex-col gap-4">

        {/* Player */}
        <Card className={CARD_CLS}>
          <CardContent className="p-0 overflow-hidden rounded-2xl">
            <div className="relative bg-gray-900 rounded-t-2xl flex items-center justify-center"
              style={{ aspectRatio: "16/9" }}>
              {playing !== null ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
                  <div className="text-6xl">{VIDEO_LECTURES[playing].thumbnail}</div>
                  <p className="text-lg font-bold">{VIDEO_LECTURES[playing].title}</p>
                  <p className="text-sm text-gray-400">{VIDEO_LECTURES[playing].tutor}</p>
                  <div className="w-64 h-1.5 bg-gray-700 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-violet-500 rounded-full w-1/3
                      transition-all" />
                  </div>
                  <p className="text-xs text-gray-500">Live preview — click a lecture to play</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-white/70">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <Play className="w-8 h-8 fill-white/70" />
                  </div>
                  <p className="text-sm font-medium">Select a lecture to watch</p>
                </div>
              )}
            </div>
            {playing !== null && (
              <div className="p-4 bg-white/60 backdrop-blur-sm">
                <p className="text-sm font-bold text-gray-900">{VIDEO_LECTURES[playing].title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-gray-500">{VIDEO_LECTURES[playing].tutor}</p>
                  <span className="text-gray-300">·</span>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{VIDEO_LECTURES[playing].duration}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Filter pills */}
        <div className="flex gap-1.5 flex-wrap">
          {SUBJECT_FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                ${filter === f ? "bg-violet-600 text-white shadow-sm" : "bg-white/60 text-gray-500 border border-gray-200 hover:bg-white"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Lecture grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {lectures.map((v, i) => {
            const idx = VIDEO_LECTURES.indexOf(v);
            return (
              <button key={i} onClick={() => setPlaying(idx)}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 w-full
                  ${playing === idx
                    ? "bg-violet-50 border-violet-200 shadow-sm"
                    : "bg-white/60 border-gray-100 hover:border-violet-100 hover:bg-white/80 hover:shadow-sm"}`}>

                {/* Thumbnail */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0
                  ${playing === idx ? "bg-violet-100" : "bg-gray-100"}`}>
                  {v.thumbnail}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">{v.title}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{v.tutor}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge className={`${SUBJECT_COLOR[v.subject] ?? "bg-gray-100 text-gray-600"} border-0 text-[9px] rounded-full px-1.5`}>
                      {v.subject}
                    </Badge>
                    <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />{v.duration}
                    </span>
                    {v.watched === 100 && <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto" />}
                  </div>
                  {/* Watch progress */}
                  {v.watched > 0 && v.watched < 100 && (
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-violet-400 rounded-full" style={{ width: `${v.watched}%` }} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right sidebar ─────────────────────────────────── */}
      <div className="lg:col-span-4 flex flex-col gap-4">

        {/* Stats */}
        <Card className={CARD_CLS}>
          <CardContent className="p-5 flex flex-col gap-3">
            <h3 className="font-semibold text-gray-800 text-sm">My Progress</h3>
            {[
              { label: "Lectures Watched", value: `${VIDEO_LECTURES.filter(v => v.watched === 100).length}/${VIDEO_LECTURES.length}` },
              { label: "In Progress",      value: `${VIDEO_LECTURES.filter(v => v.watched > 0 && v.watched < 100).length}` },
              { label: "Not Started",      value: `${VIDEO_LECTURES.filter(v => v.watched === 0).length}` },
            ].map(s => (
              <div key={s.label} className="flex justify-between">
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-sm font-black text-gray-900">{s.value}</p>
              </div>
            ))}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-violet-500 rounded-full"
                style={{ width: `${(VIDEO_LECTURES.filter(v => v.watched === 100).length / VIDEO_LECTURES.length) * 100}%` }} />
            </div>
          </CardContent>
        </Card>

        {/* Next up */}
        <Card className={CARD_CLS}>
          <CardHeader className="pt-5 pb-2 px-5">
            <h3 className="font-semibold text-gray-800 text-sm">Up Next</h3>
          </CardHeader>
          <CardContent className="px-4 pb-4 flex flex-col gap-2">
            {VIDEO_LECTURES.filter(v => v.watched < 100).slice(0, 3).map((v, i) => (
              <div key={i}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-200 group/up">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-lg shrink-0 group-hover/up:scale-110 transition-transform">
                  {v.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{v.title}</p>
                  <p className="text-[10px] text-gray-400">{v.duration}</p>
                </div>
                <Play className="w-3.5 h-3.5 text-violet-400 shrink-0 opacity-0 group-hover/up:opacity-100 transition-opacity" />
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}