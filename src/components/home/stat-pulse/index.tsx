import { CheckCircle2 } from "lucide-react";

export default function StatPulse({ label, value, subtext }: any) {
  return (
    <div className="relative overflow-hidden p-8 rounded-3xl border bg-background group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{label}</p>
      <h2 className="text-4xl font-bold mt-2 tracking-tighter">{value}</h2>
      <p className="text-xs text-green-500 font-medium mt-1">{subtext}</p>
    </div>
  );
}