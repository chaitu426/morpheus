"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { CARD_CLS, STATUS_PILL, FLASHCARDS } from "../constants";

const SUBJECT_FILTERS = ["All", "Mathematics", "Physics", "Chemistry", "Biology"];

export default function Flashcards() {
  const [filter,    setFilter]   = useState("All");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped,   setFlipped]   = useState(false);
  const [known,     setKnown]     = useState<Set<number>>(new Set());
  const [skipped,   setSkipped]   = useState<Set<number>>(new Set());

  const cards = filter === "All" ? FLASHCARDS : FLASHCARDS.filter(c => c.subject === filter);
  const card  = cards[cardIndex % cards.length];
  const total = cards.length;

  const next = (mark?: "known" | "skip") => {
    if (mark === "known")  setKnown(p   => new Set(p).add(cardIndex));
    if (mark === "skip")   setSkipped(p => new Set(p).add(cardIndex));
    setFlipped(false);
    setTimeout(() => setCardIndex(i => (i + 1) % total), 150);
  };

  const reset = () => { setCardIndex(0); setFlipped(false); setKnown(new Set()); setSkipped(new Set()); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      {/* ── Main flashcard area ───────────────────────────── */}
      <div className="lg:col-span-8 flex flex-col gap-4">

        {/* Filters + progress */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-1.5 flex-wrap">
            {SUBJECT_FILTERS.map(f => (
              <button key={f} onClick={() => { setFilter(f); setCardIndex(0); setFlipped(false); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                  ${filter === f ? "bg-violet-600 text-white shadow-sm" : "bg-white/60 text-gray-500 border border-gray-200 hover:bg-white"}`}>
                {f}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 font-medium">{cardIndex + 1} / {total}</p>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${((cardIndex + 1) / total) * 100}%` }} />
        </div>

        {/* Card flip area */}
        <div className="relative" style={{ perspective: "1000px", minHeight: 280 }}>
          <div
            onClick={() => setFlipped(f => !f)}
            className="cursor-pointer w-full"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform .5s cubic-bezier(.4,0,.2,1)",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              minHeight: 280,
              position: "relative",
            }}
          >
            {/* Front */}
            <div style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              className="absolute inset-0 bg-white/75 backdrop-blur-xl border border-white/70 rounded-3xl shadow-sm
                flex flex-col items-center justify-center p-8 text-center">
              <Badge className={`${STATUS_PILL[card.difficulty]} border-0 rounded-full text-[10px] mb-4 capitalize`}>
                {card.difficulty}
              </Badge>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-500 mb-3">{card.subject}</p>
              <p className="text-xl font-bold text-gray-900 leading-snug">{card.question}</p>
              <p className="text-xs text-gray-400 mt-6">Tap to reveal answer</p>
            </div>

            {/* Back */}
            <div style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              className="absolute inset-0 bg-violet-600 rounded-3xl shadow-lg
                flex flex-col items-center justify-center p-8 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-300 mb-3">Answer</p>
              <p className="text-2xl font-black text-white leading-snug">{card.answer}</p>
              <p className="text-xs text-violet-300 mt-6">Tap to flip back</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon"
            className="w-10 h-10 rounded-full border-gray-200 shadow-none hover:bg-gray-50"
            onClick={() => { setFlipped(false); setTimeout(() => setCardIndex(i => (i - 1 + total) % total), 150); }}>
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </Button>

          <Button onClick={() => next("skip")}
            className="flex-1 h-10 rounded-full bg-red-100 hover:bg-red-200 text-red-600 border-0 shadow-none font-bold text-sm gap-2 transition-all">
            <XCircle className="w-4 h-4" /> Still Learning
          </Button>
          <Button onClick={() => next("known")}
            className="flex-1 h-10 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border-0 shadow-none font-bold text-sm gap-2 transition-all">
            <CheckCircle2 className="w-4 h-4" /> Got It!
          </Button>

          <Button variant="outline" size="icon"
            className="w-10 h-10 rounded-full border-gray-200 shadow-none hover:bg-gray-50"
            onClick={() => { setFlipped(false); setTimeout(() => setCardIndex(i => (i + 1) % total), 150); }}>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* ── Right: stats + list ───────────────────────────── */}
      <div className="lg:col-span-4 flex flex-col gap-4">

        {/* Session stats */}
        <Card className={CARD_CLS}>
          <CardContent className="p-5 flex flex-col gap-3">
            <h3 className="font-semibold text-gray-800 text-sm">Session Stats</h3>
            {[
              { label: "Total Cards",   value: total,           color: "text-gray-900"    },
              { label: "Known ✓",       value: known.size,      color: "text-emerald-600" },
              { label: "Still Learning",value: skipped.size,    color: "text-red-500"     },
              { label: "Remaining",     value: total - cardIndex - 1, color: "text-violet-600" },
            ].map(s => (
              <div key={s.label} className="flex justify-between items-center">
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className={`text-sm font-black ${s.color}`}>{Math.max(0, s.value)}</p>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={reset}
              className="rounded-full border-gray-200 shadow-none hover:bg-gray-50 h-8 text-xs gap-1.5 mt-1">
              <RotateCcw className="w-3 h-3" /> Reset Session
            </Button>
          </CardContent>
        </Card>

        {/* Card list */}
        <Card className={`${CARD_CLS} flex-1`}>
          <CardHeader className="pt-5 pb-2 px-5">
            <h3 className="font-semibold text-gray-800 text-sm">All Cards</h3>
          </CardHeader>
          <CardContent className="px-4 pb-4 flex flex-col gap-1 max-h-64 overflow-y-auto">
            {cards.map((c, i) => (
              <button key={i} onClick={() => { setCardIndex(i); setFlipped(false); }}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all duration-200 w-full
                  ${cardIndex === i ? "bg-violet-50 border border-violet-100" : "hover:bg-white/70 border border-transparent"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold
                  ${known.has(i) ? "bg-emerald-500 text-white" : skipped.has(i) ? "bg-red-400 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {known.has(i) ? "✓" : skipped.has(i) ? "✕" : i + 1}
                </div>
                <p className="text-[11px] text-gray-700 font-medium leading-snug line-clamp-2">{c.question}</p>
              </button>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
