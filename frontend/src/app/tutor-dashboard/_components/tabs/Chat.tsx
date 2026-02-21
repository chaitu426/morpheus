"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Video, MoreHorizontal } from "lucide-react";
import Avatar from "../ui/Avatar";
import { CARD_CLS, MESSAGES, INITIAL_CHAT_HISTORY } from "../constants";
import type { ChatMessage } from "../types";

export default function Chat() {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage]       = useState("");
  const [history, setHistory]       = useState<ChatMessage[]>(INITIAL_CHAT_HISTORY);
  const bottomRef                   = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!message.trim()) return;
    setHistory((h) => [...h, { from: "tutor", text: message.trim(), time: "Now" }]);
    setMessage("");
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" style={{ minHeight: 520 }}>

      {/* ── Conversation list ─────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-4 flex flex-col`} style={{ maxHeight: 580 }}>
        <CardHeader className="pt-5 pb-2 px-5 shrink-0">
          <h3 className="font-semibold text-gray-800 text-sm">Messages</h3>
        </CardHeader>
        <CardContent className="px-3 pb-3 flex flex-col gap-0.5 flex-1 overflow-y-auto">
          {MESSAGES.map((m, i) => (
            <div
              key={i}
              onClick={() => setActiveChat(i)}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                activeChat === i
                  ? "bg-amber-50 border border-amber-100 shadow-sm"
                  : "hover:bg-white/70 border border-transparent"
              }`}
            >
              <Avatar initials={m.avatar} ci={i} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-semibold truncate ${m.unread ? "text-gray-900" : "text-gray-500"}`}>{m.name}</p>
                  <span className="text-[10px] text-gray-400 ml-1 shrink-0">{m.time}</span>
                </div>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">{m.text}</p>
              </div>
              {m.unread && <div className="w-2 h-2 bg-amber-400 rounded-full mt-1 shrink-0" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Active chat window ────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-8 flex flex-col`} style={{ maxHeight: 580 }}>

        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/60 shrink-0">
          <Avatar initials={MESSAGES[activeChat].avatar} ci={activeChat} size="md" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">{MESSAGES[activeChat].name}</p>
            <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Online
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-gray-200 shadow-none hover:bg-amber-50 hover:border-amber-200 transition-all">
              <Video className="w-3.5 h-3.5 text-gray-500" />
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-gray-200 shadow-none hover:bg-gray-50 transition-all">
              <MoreHorizontal className="w-3.5 h-3.5 text-gray-500" />
            </Button>
          </div>
        </div>

        {/* Message thread */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
          {history.map((c, i) => (
            <div
              key={i}
              className={`flex ${c.from === "tutor" ? "justify-end" : "justify-start"}`}
              style={{ animation: "msgIn .25s ease-out both", animationDelay: `${i * 30}ms` }}
            >
              <div className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                c.from === "tutor"
                  ? "bg-gray-900 text-white rounded-br-sm"
                  : "bg-white/80 text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm"
              }`}>
                {c.text}
                <p className="text-[10px] mt-1.5 opacity-50">{c.time}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Message input */}
        <div className="px-4 py-3.5 border-t border-white/60 shrink-0 flex items-center gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message…"
            className="flex-1 bg-white/70 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-800
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent
              transition-all duration-200"
          />
          <Button
            onClick={send}
            size="icon"
            disabled={!message.trim()}
            className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 border-0 shadow-none shrink-0 disabled:opacity-40 transition-all duration-200"
          >
            <Send className="w-4 h-4 text-gray-900" />
          </Button>
        </div>
      </Card>

    </div>
  );
}