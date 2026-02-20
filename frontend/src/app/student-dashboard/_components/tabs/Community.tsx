"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send, TrendingUp, Users, Flame } from "lucide-react";
import Avatar from "../ui/Avatar";
import { CARD_CLS, AVATAR_COLORS, COMMUNITY_POSTS } from "../constants";

const TAG_COLORS: Record<string, string> = {
  Math:      "bg-amber-100  text-amber-700",
  JEE:       "bg-red-100    text-red-700",
  Biology:   "bg-emerald-100 text-emerald-700",
  Chemistry: "bg-violet-100 text-violet-700",
  General:   "bg-sky-100    text-sky-700",
};

const TRENDING = ["Integration tricks", "JEE 2025 prep", "Balancing equations", "Newton's laws"];

export default function Community() {
  const [newPost, setNewPost]   = useState("");
  const [posts,   setPosts]     = useState(COMMUNITY_POSTS);
  const [liked,   setLiked]     = useState<Set<number>>(new Set());
  const inputRef                = useRef<HTMLTextAreaElement>(null);

  const post = () => {
    if (!newPost.trim()) return;
    setPosts(p => [{
      author: "Me (Aanya)", avatar: "AS", text: newPost.trim(),
      time: "Just now", likes: 0, replies: 0, tag: "General",
    }, ...p]);
    setNewPost("");
  };

  const toggleLike = (i: number) =>
    setLiked(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      {/* ── Left: Feed ────────────────────────────────────── */}
      <div className="lg:col-span-8 flex flex-col gap-4">

        {/* Compose box */}
        <Card className={CARD_CLS}>
          <CardContent className="p-4 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-300 to-blue-400
                flex items-center justify-center text-sm font-black text-white shrink-0 ring-2 ring-white">
                AS
              </div>
              <textarea
                ref={inputRef}
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                placeholder="Share a question, tip or resource with the community…"
                rows={2}
                className="flex-1 bg-gray-50/80 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent
                  transition-all duration-200 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" onClick={post} disabled={!newPost.trim()}
                className="rounded-full text-xs h-7 bg-violet-600 hover:bg-violet-500 active:bg-violet-700
                  text-white border-0 shadow-none font-bold transition-all disabled:opacity-40 gap-1.5">
                <Send className="w-3 h-3" /> Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        {posts.map((p, i) => (
          <Card key={i} className={`${CARD_CLS} group/post`}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}
                  rounded-full flex items-center justify-center text-xs font-bold text-gray-900 shrink-0 ring-2 ring-white`}>
                  {p.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-bold text-gray-900">{p.author}</p>
                    <Badge className={`${TAG_COLORS[p.tag] ?? "bg-gray-100 text-gray-600"} border-0 text-[9px] rounded-full px-1.5`}>
                      {p.tag}
                    </Badge>
                    <span className="text-[10px] text-gray-400 ml-auto">{p.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{p.text}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button onClick={() => toggleLike(i)}
                      className={`flex items-center gap-1.5 text-[11px] font-semibold transition-all duration-200
                        ${liked.has(i) ? "text-rose-500" : "text-gray-400 hover:text-rose-400"}`}>
                      <Heart className={`w-3.5 h-3.5 ${liked.has(i) ? "fill-rose-500" : ""}`} />
                      {p.likes + (liked.has(i) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-sky-500 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" /> {p.replies}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Right: Sidebar ────────────────────────────────── */}
      <div className="lg:col-span-4 flex flex-col gap-4">

        {/* Community stats */}
        <Card className={CARD_CLS}>
          <CardContent className="p-5 flex flex-col gap-3">
            <h3 className="font-semibold text-gray-800 text-sm">Community</h3>
            {[
              { icon: Users,     label: "Members",     value: "4,218"  },
              { icon: Flame,     label: "Posts today",  value: "127"    },
              { icon: TrendingUp,label: "Active now",   value: "83"     },
            ].map(({ icon: Ic, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                  <Ic className="w-4 h-4 text-violet-600" />
                </div>
                <p className="text-xs text-gray-600 flex-1">{label}</p>
                <p className="text-sm font-black text-gray-900">{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trending topics */}
        <Card className={CARD_CLS}>
          <CardHeader className="pt-5 pb-2 px-5">
            <h3 className="font-semibold text-gray-800 text-sm">Trending Topics</h3>
          </CardHeader>
          <CardContent className="px-5 pb-5 flex flex-col gap-2">
            {TRENDING.map((t, i) => (
              <div key={i}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-200 group/tr">
                <span className="text-xs font-black text-gray-400 w-4">#{i + 1}</span>
                <p className="text-xs font-semibold text-gray-700 group-hover/tr:text-violet-600 transition-colors flex-1">{t}</p>
                <TrendingUp className="w-3.5 h-3.5 text-gray-300 group-hover/tr:text-violet-400 transition-colors" />
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}