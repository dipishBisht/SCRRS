import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="px-6 text-center lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium border rounded-full bg-secondary/50 border-border/50 text-muted-foreground animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>v1.0 is now live for institutions</span>
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
          Resolve complaints <br /> before they become problems.
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          The Smart Complaint Routing & Resolution System (SCRRS) uses intelligent keyword matching and rule-based logic to ensure every issue reaches the right department instantly.
        </p>

        <div className="flex items-center justify-center gap-x-4 mt-10">
          <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" size="lg" className="rounded-full px-8 h-12 text-base">
            View Live Demo
          </Button>
        </div>
      </div>
      
      {/* Visual Mockup Placeholder */}
      <div className="mt-20 relative mx-auto max-w-6xl rounded-2xl border bg-card/50 p-2 shadow-2xl backdrop-blur-sm overflow-hidden">
        <div className="rounded-xl border bg-background overflow-hidden aspect-[16/9] flex items-center justify-center text-muted-foreground italic">
           [ High-Fidelity Dashboard Preview Image ]
        </div>
      </div>
    </section>
  );
}