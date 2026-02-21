import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Avatar from "../ui/Avatar";
import { CARD_CLS, STATUS_PILL, TRANSACTIONS } from "../constants";

const SUMMARY_CARDS = [
  { label: "Total Earned",   value: "₹89,200", sub: "All time",     cls: "border-emerald-100 bg-emerald-50/40" },
  { label: "This Month",     value: "₹18,450", sub: "Feb 2025",     cls: "border-sky-100    bg-sky-50/40"    },
  { label: "Pending Payout", value: "₹4,200",  sub: "Processing",   cls: "border-amber-100  bg-amber-50/40"  },
  { label: "Refunds",        value: "₹2,999",  sub: "1 this month", cls: "border-red-100    bg-red-50/40"    },
];

const PAYOUT_ROWS = [
  { label: "Platform Fee (10%)", value: "−₹8,920", bold: false },
  { label: "Tax Deducted (TDS)", value: "−₹892",   bold: false },
  { label: "Net Payout",         value: "₹79,388",  bold: true  },
];

export default function Payment() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">

      {/* ── Summary Cards ─────────────────────────────────── */}
      {SUMMARY_CARDS.map((s) => (
        <Card key={s.label} className={`${CARD_CLS} lg:col-span-3 border ${s.cls}`}>
          <CardContent className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">{s.label}</p>
            <p className="text-3xl font-black text-gray-900">{s.value}</p>
            <p className="text-[10px] text-gray-400 mt-1">{s.sub}</p>
          </CardContent>
        </Card>
      ))}

      {/* ── Transaction History ───────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-8`}>
        <CardHeader className="flex flex-row items-center justify-between pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Transaction History</h3>
          <Button
            variant="outline" size="sm"
            className="rounded-full text-xs h-7 border-gray-200 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 shadow-none transition-all"
          >
            Export CSV
          </Button>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="grid grid-cols-4 px-2 mb-2">
            {["Student", "Course", "Amount", "Status"].map((h) => (
              <p key={h} className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{h}</p>
            ))}
          </div>
          {TRANSACTIONS.map((t, i) => (
            <div key={i} className="grid grid-cols-4 items-center p-2.5 rounded-xl hover:bg-white/70 transition-all duration-200 cursor-pointer group/tr">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar initials={t.student.split(" ").map((n) => n[0]).join("")} ci={i} size="sm" />
                <p className="text-xs font-medium text-gray-800 truncate group-hover/tr:text-amber-700 transition-colors">{t.student}</p>
              </div>
              <p className="text-xs text-gray-500 truncate">{t.course}</p>
              <p className="text-sm font-bold text-gray-900">₹{t.amount.toLocaleString()}</p>
              <Badge className={`${STATUS_PILL[t.status]} border-0 rounded-full text-[10px] capitalize font-medium w-fit`}>{t.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Payout Details ────────────────────────────────── */}
      <Card className={`${CARD_CLS} lg:col-span-4`}>
        <CardHeader className="pt-5 pb-2 px-5">
          <h3 className="font-semibold text-gray-800 text-sm">Payout Details</h3>
        </CardHeader>
        <CardContent className="px-5 pb-5 flex flex-col gap-4">
          {/* Bank card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-4" />
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Linked Account</p>
            <p className="font-bold text-base relative z-10">HDFC Bank •••• 4821</p>
            <p className="text-xs text-gray-400 mt-0.5 relative z-10">Next payout: Feb 28, 2025</p>
          </div>

          {/* Breakdown */}
          <div className="flex flex-col gap-0.5">
            {PAYOUT_ROWS.map((r) => (
              <div key={r.label} className={`flex justify-between items-center py-2 ${r.bold ? "border-t border-gray-200 mt-1 pt-3" : ""}`}>
                <p className={`text-xs ${r.bold ? "font-bold text-gray-900" : "text-gray-500"}`}>{r.label}</p>
                <p className={`text-sm ${r.bold ? "font-black text-gray-900" : "text-gray-600"}`}>{r.value}</p>
              </div>
            ))}
          </div>

          <Button className="w-full rounded-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-gray-900 font-bold border-0 shadow-none h-9 transition-all duration-200">
            Request Payout
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}