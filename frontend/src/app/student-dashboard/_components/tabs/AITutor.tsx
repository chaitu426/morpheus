"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, RefreshCw, BookOpen, FlaskConical, Atom } from "lucide-react";
import { CARD_CLS, AI_CHAT_HISTORY } from "../constants";
import type { ChatMessage } from "../../constants";

const QUICK_PROMPTS = [
  { label: "Explain integration by parts", icon: BookOpen    },
  { label: "What is quantum entanglement?", icon: Atom       },
  { label: "How do catalysts work?",        icon: FlaskConical },
  { label: "Give me 5 JEE Maths tips",      icon: Sparkles   },
];

export default function AITutor() {
  const [messages, setMessages] = useState<ChatMessage[]>(AI_CHAT_HISTORY);
  const [input,    setInput]    = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || thinking) return;
    const userMsg: ChatMessage = { from: "user", text: text.trim(), time: "Just now" };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setThinking(true);

    // Simulate AI thinking delay then respond
    setTimeout(() => {
      const aiReply = generateAIReply(text.trim());
      setMessages(m => [...m, { from: "ai", text: aiReply, time: "Just now" }]);
      setThinking(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      {/* ── Chat area ─────────────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-8 flex flex-col`} style={{ minHeight: 560 }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/60">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl
            flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">AI Tutor</p>
            <p className="text-[10px] text-violet-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full inline-block animate-pulse" />
              Ready to help
            </p>
          </div>
          <Button variant="ghost" size="icon"
            className="w-8 h-8 rounded-full hover:bg-violet-50 hover:text-violet-600 transition-all"
            onClick={() => setMessages(AI_CHAT_HISTORY)}>
            <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
              style={{ animation: "msgIn .25s ease-out both", animationDelay: `${i * 40}ms` }}>

              {m.from === "ai" && (
                <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full
                  flex items-center justify-center shrink-0 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              )}

              <div className={`max-w-[82%] px-4 py-3 text-sm leading-relaxed rounded-2xl
                ${m.from === "user"
                  ? "bg-gray-900 text-white rounded-br-sm"
                  : "bg-violet-50 border border-violet-100 text-gray-800 rounded-bl-sm"}`}>
                {m.text}
                <p className="text-[10px] mt-1.5 opacity-40">{m.time}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {thinking && (
            <div className="flex items-end gap-2 justify-start">
              <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full
                flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-violet-50 border border-violet-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                {[0, 1, 2].map(d => (
                  <span key={d} className="w-2 h-2 bg-violet-400 rounded-full inline-block"
                    style={{ animation: `bounce 1s ease-in-out infinite`, animationDelay: `${d * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        <div className="px-4 pt-1 pb-2 flex gap-2 overflow-x-auto">
          {QUICK_PROMPTS.map(({ label, icon: Ic }, i) => (
            <button key={i} onClick={() => sendMessage(label)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 hover:bg-violet-100 border border-violet-100
                rounded-full text-[11px] font-semibold text-violet-700 whitespace-nowrap transition-all duration-200 shrink-0">
              <Ic className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 pb-4 flex items-center gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask me anything — maths, science, concepts…"
            disabled={thinking}
            className="flex-1 bg-white/70 border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-800
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent
              transition-all duration-200 disabled:opacity-60"
          />
          <Button onClick={() => sendMessage(input)} size="icon" disabled={!input.trim() || thinking}
            className="w-9 h-9 rounded-full bg-violet-600 hover:bg-violet-500 active:scale-95
              border-0 shadow-none shrink-0 disabled:opacity-40 transition-all duration-200">
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </Card>

      {/* ── Right sidebar ─────────────────────────────────── */}
      <div className="lg:col-span-4 flex flex-col gap-4">

        {/* About AI Tutor */}
        <Card className={CARD_CLS}>
          <CardContent className="p-5 flex flex-col gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl
              flex items-center justify-center shadow-sm mx-auto">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-900 text-sm">Your AI Tutor</h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Powered by advanced AI. Ask anything — get instant, personalised explanations, solved examples and exam tips.
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              {["Concept explanations", "Step-by-step solutions", "Exam tips & tricks", "Practice problems"].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="w-4 h-4 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 text-[9px] shrink-0">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggested topics */}
        <Card className={CARD_CLS}>
          <CardContent className="p-5 flex flex-col gap-2">
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Try Asking…</h3>
            {[
              "What's the difference between speed and velocity?",
              "Explain Avogadro's Law with a real-life example.",
              "How do I solve quadratic equations quickly?",
              "Summarise the causes of World War I in 5 points.",
            ].map((q, i) => (
              <button key={i} onClick={() => sendMessage(q)}
                className="text-left text-[11px] text-gray-600 p-2.5 rounded-xl bg-white/50 hover:bg-violet-50
                  hover:text-violet-700 border border-transparent hover:border-violet-100
                  transition-all duration-200 leading-relaxed font-medium">
                "{q}"
              </button>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

// ── Simple mock AI response generator ─────────────────────────────────────────

function generateAIReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("integrat"))
    return "Integration by parts follows the formula: ∫u·dv = u·v − ∫v·du. Choose u as the function that simplifies when differentiated (use LIATE: Logarithm, Inverse trig, Algebraic, Trigonometric, Exponential). For example, ∫x·eˣ dx → let u=x, dv=eˣdx, giving xeˣ − eˣ + C 🎯";
  if (lower.includes("quantum"))
    return "Quantum entanglement occurs when two particles become correlated such that measuring one instantly affects the other — regardless of distance. Einstein called it 'spooky action at a distance'. It's the backbone of quantum computing and cryptography! ⚛️";
  if (lower.includes("catalyst"))
    return "Catalysts speed up chemical reactions by providing an alternative reaction pathway with lower activation energy. They are NOT consumed in the reaction. Enzymes are biological catalysts — for example, amylase breaks down starch in your saliva 🧪";
  if (lower.includes("jee") || lower.includes("tip"))
    return "5 JEE Maths tips: 1️⃣ Master NCERT first. 2️⃣ Practice past 10 years' papers. 3️⃣ Learn shortcuts for integration. 4️⃣ Solve 20 problems daily under timed conditions. 5️⃣ Revise formulae every weekend using flashcards. You've got this! 💪";
  return "Great question! Let me break that down for you. This concept is fundamental to understanding the broader topic. I'd suggest starting with the core definition, then working through 2-3 solved examples before attempting practice questions. Want me to walk you through a specific example? 😊";
}
