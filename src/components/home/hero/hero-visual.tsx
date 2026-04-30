import { Badge } from "@/components/ui/badge";
import { Clock, Zap } from "lucide-react";

export default function HeroVisual() {
  const mockTickets = [
    { id: "SR-204", title: "Server Rack Overheating", dept: "IT Support", status: "Routing", priority: "High" },
    { id: "SR-205", title: "Water Leakage Room 402", dept: "Maintenance", status: "Assigned", priority: "Urgent" },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-16 p-4 rounded-2xl border bg-card/30 backdrop-blur-sm shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50">Live System Feed</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTickets.map((ticket) => (
          <div key={ticket.id} className="p-4 rounded-xl border bg-background/50 flex flex-col gap-3 group hover:border-primary/50 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
              <Badge variant="outline" className="bg-primary/5 text-[10px] uppercase tracking-tighter">
                {ticket.priority}
              </Badge>
            </div>
            <h4 className="font-semibold text-sm">{ticket.title}</h4>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Zap className="w-3 h-3 text-blue-500" /> {ticket.dept}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="w-3 h-3" /> {ticket.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}