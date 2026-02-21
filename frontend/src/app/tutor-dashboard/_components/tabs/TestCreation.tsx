"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MoreHorizontal, Plus } from "lucide-react";
import Avatar from "../ui/Avatar";
import { CARD_CLS, STUDENTS, TEST_QUESTIONS } from "../constants";

const SETTINGS_LABELS = [
  "Shuffle Questions",
  "Show Results Instantly",
  "Allow Reattempt",
  "Webcam Proctoring",
];

export default function TestCreation() {
  const [title, setTitle]       = useState("Calculus Mid-Term Test");
  const [duration, setDuration] = useState("60");
  const [toggles, setToggles]   = useState([true, true, false, false]);

  const totalMarks = TEST_QUESTIONS.reduce((a, q) => a + q.marks, 0);

  const flipToggle = (i: number) =>
    setToggles((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      {/* ── Test Builder ──────────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-8`}>
        <CardHeader className="flex flex-row items-center justify-between pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Test Builder</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full text-xs h-7 border-gray-200 shadow-none hover:bg-gray-50">
              Preview
            </Button>
            <Button size="sm" className="rounded-full text-xs h-7 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-gray-900 border-0 shadow-none font-bold transition-all">
              Publish Test
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-5 flex flex-col gap-4">
          {/* Meta fields */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Test Title",      value: title,    setter: setTitle    },
              { label: "Duration (mins)", value: duration, setter: setDuration },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  {f.label}
                </label>
                <input
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white/80
                    focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent
                    transition-all duration-200 placeholder-gray-300"
                />
              </div>
            ))}
          </div>

          {/* Question list */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-600">Questions ({TEST_QUESTIONS.length})</p>
              <p className="text-xs text-gray-400">Total: {totalMarks} marks</p>
            </div>

            {TEST_QUESTIONS.map((q, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                  q.done
                    ? "bg-emerald-50/60 border-emerald-100"
                    : "bg-white/60 border-gray-100 hover:border-gray-200 hover:bg-white/80"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${q.done ? "bg-emerald-500 scale-110" : "bg-gray-100"}`}>
                  {q.done
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    : <span className="text-[10px] font-bold text-gray-500">{i + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-snug">{q.q}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="outline" className="text-[10px] rounded-full px-2 border-gray-200 text-gray-500 font-medium">
                      {q.type}
                    </Badge>
                    <span className="text-[10px] text-gray-400">{q.marks} marks</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="w-7 h-7 rounded-full hover:bg-gray-100 shrink-0">
                  <MoreHorizontal className="w-3.5 h-3.5 text-gray-400" />
                </Button>
              </div>
            ))}

            <button className="w-full rounded-xl border border-dashed border-gray-300 text-gray-400
              hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/50
              transition-all duration-200 h-10 text-sm flex items-center justify-center gap-2 font-medium">
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </div>
        </CardContent>
      </Card>

      {/* ── Right column ──────────────────────────────────── */}
      <div className="lg:col-span-4 flex flex-col gap-4">

        {/* Settings */}
        <Card className={CARD_CLS}>
          <CardHeader className="pt-5 pb-2 px-5">
            <h3 className="font-semibold text-gray-800 text-sm">Settings</h3>
          </CardHeader>
          <CardContent className="px-5 pb-5 flex flex-col gap-1">
            {SETTINGS_LABELS.map((label, i) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <p className="text-sm text-gray-700">{label}</p>
                <button
                  onClick={() => flipToggle(i)}
                  className={`w-10 h-5 rounded-full transition-all duration-300 flex items-center px-0.5 ${toggles[i] ? "bg-amber-400" : "bg-gray-200"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${toggles[i] ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Assign to students */}
        <Card className={CARD_CLS}>
          <CardHeader className="pt-5 pb-2 px-5">
            <h3 className="font-semibold text-gray-800 text-sm">Assign To</h3>
          </CardHeader>
          <CardContent className="px-5 pb-5 flex flex-col gap-2.5">
            {STUDENTS.map((s, i) => (
              <div key={i} className="flex items-center gap-2.5 cursor-pointer group/as">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${i < 3 ? "border-amber-400 bg-amber-400" : "border-gray-300 group-hover/as:border-amber-300"}`}>
                  {i < 3 && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <Avatar initials={s.avatar} ci={i} size="sm" />
                <p className="text-xs text-gray-700 font-medium group-hover/as:text-amber-700 transition-colors">{s.name}</p>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}