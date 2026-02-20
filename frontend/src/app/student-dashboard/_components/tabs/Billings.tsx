import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingDown } from "lucide-react";
import Avatar from "../ui/Avatar";
import { CARD_CLS, STATUS_PILL, INVOICES } from "../constants";

const SUMMARY = [
  { label: "Total Spent",    value: "₹12,445", sub: "All time",       cls: "border-sky-100    bg-sky-50/40"     },
  { label: "This Month",     value: "₹4,998",  sub: "Feb 2025",       cls: "border-amber-100  bg-amber-50/40"   },
  { label: "Active Plans",   value: "₹3",      sub: "Subscriptions",  cls: "border-emerald-100 bg-emerald-50/40"},
  { label: "Saved",          value: "₹1,200",  sub: "Via offers",     cls: "border-violet-100 bg-violet-50/40"  },
];

export default function Billings() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">

      {/* ── Summary ──────────────────────────────────────── */}
      {SUMMARY.map((s) => (
        <Card key={s.label} className={`${CARD_CLS} lg:col-span-3 border ${s.cls}`}>
          <CardContent className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">{s.label}</p>
            <p className="text-3xl font-black text-gray-900">{s.value}</p>
            <p className="text-[10px] text-gray-400 mt-1">{s.sub}</p>
          </CardContent>
        </Card>
      ))}

      {/* ── Invoice history ───────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-8`}>
        <CardHeader className="flex flex-row items-center justify-between pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Invoice History</h3>
          <Button variant="outline" size="sm"
            className="rounded-full text-xs h-7 border-gray-200 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 shadow-none transition-all">
            Download All
          </Button>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="grid grid-cols-4 px-2 mb-2">
            {["Tutor", "Course", "Amount", "Status"].map(h => (
              <p key={h} className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{h}</p>
            ))}
          </div>
          {INVOICES.map((inv, i) => (
            <div key={i}
              className="grid grid-cols-4 items-center p-2.5 rounded-xl hover:bg-white/70 transition-all duration-200 cursor-pointer group/row">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar initials={inv.tutor.split(" ").map(n => n[0]).join("")} ci={i} size="sm" />
                <p className="text-xs font-medium text-gray-800 truncate group-hover/row:text-amber-700 transition-colors">
                  {inv.tutor}
                </p>
              </div>
              <p className="text-xs text-gray-500 truncate">{inv.course}</p>
              <p className="text-sm font-bold text-gray-900">₹{inv.amount.toLocaleString()}</p>
              <Badge className={`${STATUS_PILL[inv.status]} border-0 rounded-full text-[10px] capitalize font-medium w-fit`}>
                {inv.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Payment method ────────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-4`}>
        <CardHeader className="pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Payment Method</h3>
        </CardHeader>
        <CardContent className="px-5 pb-5 flex flex-col gap-4">
          {/* Card visual */}
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-6 -translate-x-4" />
            <CreditCard className="w-6 h-6 mb-3 opacity-80" />
            <p className="font-bold text-base relative z-10 tracking-widest">•••• •••• •••• 7392</p>
            <div className="flex justify-between items-end mt-2 relative z-10">
              <div>
                <p className="text-[10px] text-blue-200 uppercase tracking-wider">Cardholder</p>
                <p className="text-sm font-bold">Aanya Sharma</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-blue-200 uppercase tracking-wider">Expires</p>
                <p className="text-sm font-bold">08 / 27</p>
              </div>
            </div>
          </div>

          {/* Spending breakdown */}
          <div className="flex flex-col gap-0.5">
            {[
              { label: "Courses",         value: "₹8,497", pct: 68 },
              { label: "Live Sessions",   value: "₹2,948", pct: 24 },
              { label: "Study Material",  value: "₹1,000", pct: 8  },
            ].map(r => (
              <div key={r.label} className="py-2">
                <div className="flex justify-between mb-1.5">
                  <p className="text-xs text-gray-600">{r.label}</p>
                  <p className="text-xs font-bold text-gray-900">{r.value}</p>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full transition-all duration-700"
                    style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline"
            className="w-full rounded-full border-gray-200 text-gray-600 shadow-none hover:bg-gray-50 h-9 text-sm">
            <TrendingDown className="w-3.5 h-3.5 mr-2" /> Manage Subscriptions
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
